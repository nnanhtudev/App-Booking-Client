import { Routes, Route, useParams } from "react-router-dom";
import React, { useContext, useEffect, useRef, useState } from "react";
import "./hotel-booking.scss";
import Calendar from "../calendar/Calendar";
import MailList from "../mailList/MailList";
import Header from "../header/Header";
import { handleGetHotelById } from "../../services/apiHotelServices";
import { fetchRoomByIds } from "../../services/apiRoomServices";
import { UserContext } from "../../context/UserContext";
import { BallTriangle, LineWave } from "react-loader-spinner";
import _ from "lodash";
import { toast } from "react-toastify";
import { handleCreateTransaction } from "../../services/apiTransaction";
import { useNavigate } from "react-router-dom";
const HotelBooking = (props) => {
  let navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const [loadingComplete, setLoadingComplete] = useState(true);
  //Data Hotels & Data Room For Hotels
  const [dataHotelById, setDataHotelById] = useState([]);
  const [roomById, setRoomById] = useState([]);
  //TotalBills
  const [totalBills, setTotalBills] = useState(0);
  const [totalAmountFormHotel, setTotalAmountFormHotel] = useState(0);
  //Dates check in check out ref Calendar
  const datesRef = useRef();
  //Input Value
  const defaultValueInput = {
    fullNameInput: { fullName: "", isValid: true },
    emailInput: { email: "", isValid: true },
    phoneInput: { phone: "", isValid: true },
    cardNumberInput: { cardNumber: "", isValid: true },
    paymentTypeInput: { payment: "", isValid: true },
  };
  //Value room & price roomNumber
  const [roomSelect, setRoomSelect] = useState([]);
  //List inputs
  const [dataInput, setDataInput] = useState(defaultValueInput);
  //check dates
  const [checkDataDates, setCheckDataDates] = useState(false);
  const [dTDates, setDTDates] = useState({});

  //Convert String Input
  const formatKeyToLabel = (key) => {
    // Example: fullNameInput -> Full Name
    return key.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/\b\w/g, (word) => word.toUpperCase());
  };
  // Onchange List Input
  const handleOnchangeInput = (child, key, value) => {
    let _dataInput = _.cloneDeep(dataInput);
    _dataInput[child][key] = value;
    if (key !== "") {
      _dataInput[child].isValid = true;
    }
    setDataInput(_dataInput);
  };

  // CheckValidInput
  const handleCheckValidInput = () => {
    let check = true;
    let _dataInputValid = _.cloneDeep(dataInput);
    let isKey = Object.keys(_dataInputValid).find((key) => {
      return Object.values(_dataInputValid[key]).some((value) => value === "");
    });
    if (isKey) {
      const formattedKey = formatKeyToLabel(isKey);
      toast.error(`Input ${formattedKey} must not be empty...`);
      setDataInput({
        ..._dataInputValid,
        [isKey]: { ..._dataInputValid[isKey], isValid: false },
      });
      return;
    }
    return check;
  };
  //Fetch data Hotels by id && Fetch data Room By Hotels
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data Hotels by id
        const hotelResponse = await handleGetHotelById(id);
        if (hotelResponse && +hotelResponse.EC === 0) {
          setDataHotelById(hotelResponse.DT);

          // Fetch room data using Promise
          fetchRoomByIds(hotelResponse.DT.rooms)
            .then((roomResponse) => {
              // if get room successfully, set room and calculate total bills
              if (roomResponse && +roomResponse.EC === 0) {
                setRoomById(roomResponse.DT);

                // const totalBill = roomResponse.DT.reduce((total, room) => total + room.price, 0);
                // setTotalBills(totalBill);

                // Set loading complete after getting both hotel and room data
                setLoadingComplete(false);
              }
            })
            .catch((error) => {
              console.error("Error fetching room data:", error);
              setLoadingComplete(false);
            });
        }
      } catch (error) {
        console.error("Error fetching hotel data:", error);
        setLoadingComplete(false);
      }
    };

    fetchData();
  }, [id, setLoadingComplete]);

  const fetchDates = async () => {
    let date = null;
    if (datesRef.current !== undefined) {
      const fetchDates = await datesRef.current.FetchDates();
      date = fetchDates;
    }
    return date;
  };
  const isValidDate = async () => {
    const data = await fetchDates();
    if (data !== null) {
      setCheckDataDates(true);
      setDTDates(data);
    }
    return data;
  };

  const handleOnchangeRoomNumber = (roomId, price, roomNumber, title) => {
    // Check if the room is already selected
    const isRoomSelected = roomSelect.find((selectedRoom) => selectedRoom.roomId === roomId);

    // If the room is not selected, add it to the selected rooms
    if (!isRoomSelected) {
      // Add a new entry to roomSelect with the roomId, title, price, and a new array containing the selected roomNumber
      setRoomSelect((prevRoomSelect) => [...prevRoomSelect, { roomId, title, price, roomNumbers: [roomNumber] }]);
    } else {
      // If the room is already selected, update roomNumbers based on whether the roomNumber is already in the list or not
      setRoomSelect((prevRoomSelect) => {
        // Map through the existing roomSelect and update the roomNumbers for the selected room
        const updatedRoomSelect = prevRoomSelect.map((selectedRoom) => {
          if (selectedRoom.roomId === roomId) {
            // Check if the roomNumber is already in the list, remove it; otherwise, add it
            const updatedRoomNumbers = selectedRoom.roomNumbers.includes(roomNumber)
              ? selectedRoom.roomNumbers.filter((rn) => rn !== roomNumber)
              : [...selectedRoom.roomNumbers, roomNumber];

            // Return the updated selectedRoom object with the modified roomNumbers
            return { ...selectedRoom, roomNumbers: updatedRoomNumbers };
          }

          // Return unmodified selectedRoom if it's not the room being updated
          return selectedRoom;
        });
        totalPriceRoom();
        // Return the updated roomSelect
        return updatedRoomSelect;
      });
    }
  };

  const totalPriceRoom = async () => {
    let __dates = await fetchDates();
    if (__dates !== null) {
      let totalAmount = 0;
      for (const room of roomSelect) {
        const roomTotal = room.price * room.roomNumbers.length;
        totalAmount += roomTotal;
      }

      setTotalAmountFormHotel(totalAmount);

      let dates = Math.ceil((__dates.checkOut - __dates.checkIn) / (24 * 60 * 60 * 1000));
      const totalBill = totalAmount * dates;
      setTotalBills(totalBill);
    }
  };
  useEffect(() => {
    // fetchDates();
    totalPriceRoom();
  }, [datesRef, roomSelect, dTDates]);
  const buildDataPersistsModel = async () => {
    let results = [];
    const roomNumbersArray = roomSelect.map((item) => item.roomNumbers);
    const flattenedRoomNumbers = roomNumbersArray.flat();
    let data = {
      user: {
        email: user.account.email,
        phone: dataInput.phoneInput.phone,
        cardNumber: dataInput.cardNumberInput.cardNumber,
      },
      hotel: dataHotelById._id,
      room: flattenedRoomNumbers,
      dateStart: dTDates.checkIn,
      dateEnd: dTDates.checkIn,
      price: totalBills,
      payment: dataInput.paymentTypeInput.payment,
      status: "Booked",
    };
    results.push(data);
    return results;
  };
  const handleReserveNow = async () => {
    let check = handleCheckValidInput();
    if (check === true) {
      let data = await buildDataPersistsModel();
      if (data) {
        let res = await handleCreateTransaction(data);
        if (res && +res.EC === 0) {
          toast.success("Created transaction successfully");
          navigate("/transaction");
        }
      }
    }
  };

  // Loading pages if Fetch data successfully set loadingComplete === false
  if (loadingComplete === true) {
    return (
      <>
        <div className="loading-container">
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#003580"
            ariaLabel="ball-triangle-loading"
            wrapperClass={{}}
            wrapperStyle=""
            visible={true}
          />
          <div>Loading ...</div>
        </div>
        ;
      </>
    );
  } else {
    return (
      <>
        <Header type="list" />
        <div className="container-hotel-booking row mt-4">
          {/* Header Booking */}
          <div className="row col-12 hotel-booking-header">
            <div className="col-8 hotel-booking-header-title row">
              <div className="title">
                <h1 className="title">{dataHotelById.title}</h1>
              </div>
              <div className="description mt-2">
                <span>{dataHotelById.desc}</span>
              </div>
            </div>
            <div className="col-4 hotel-booking-header-book-now row">
              <div className=" price">
                <h4>
                  ${dataHotelById.cheapestPrice}
                  <span> (1 nights)</span>
                </h4>
              </div>
              <div className="button">
                <button className="btn btn-primary">Reserve or Book Now</button>
              </div>
            </div>
          </div>
          {/* Body */}
          <div className="row col-12 hotel-booking-content mt-4">
            <div className="dates col-5">
              <h1 className="title">Select Dates</h1>
              <div className="calendar">
                <Calendar ref={datesRef} isValidDate={isValidDate} />
              </div>
            </div>
            <div className="info col-7">
              <h1 className="title">Reserve Info</h1>
              <div className="info-content">
                <div className="reserve-info row">
                  <div className="col-12">
                    <label>Your Full Name:</label>
                    <input
                      className={dataInput.fullNameInput.isValid ? `form-control mt-2` : "form-control mt-2 is-invalid"}
                      type="text"
                      placeholder="Full Name"
                      value={dataInput.fullNameInput.fullName}
                      onChange={(event) => handleOnchangeInput("fullNameInput", "fullName", event.target.value)}
                    />
                  </div>
                  <div className="col-12 mt-3">
                    <label>Your Email:</label>
                    <input
                      className={dataInput.emailInput.isValid ? `form-control mt-2` : "form-control mt-2 is-invalid"}
                      type="text"
                      placeholder="Email"
                      value={dataInput.emailInput.email}
                      onChange={(event) => handleOnchangeInput("emailInput", "email", event.target.value)}
                    />
                  </div>
                  <div className="col-12  mt-3">
                    <label>Your Phone Number:</label>
                    <input
                      className={dataInput.phoneInput.isValid ? `form-control mt-2` : "form-control mt-2 is-invalid"}
                      type="text"
                      placeholder="Phone Number"
                      value={dataInput.phoneInput.phone}
                      onChange={(event) => handleOnchangeInput("phoneInput", "phone", event.target.value)}
                    />
                  </div>
                  <div className="col-12  mt-3">
                    <label>Your Identity Card Number:</label>
                    <input
                      className={
                        dataInput.cardNumberInput.isValid ? `form-control mt-2` : "form-control mt-2 is-invalid"
                      }
                      type="text"
                      placeholder="Card Number"
                      value={dataInput.cardNumberInput.cardNumber}
                      onChange={(event) => handleOnchangeInput("cardNumberInput", "cardNumber", event.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {checkDataDates ? (
            <div className="row col-12 hotel-booking-room mt-4">
              <div className="col-12 room">
                <div className="tile">
                  <h1 className="title">Select Rooms</h1>
                </div>
              </div>
              {roomById &&
                roomById.length > 0 &&
                roomById.map((item, index) => {
                  return (
                    <div key={index} className={`room-body-${item._id} col-6 row`}>
                      <div className="col-12">
                        <div className="tile-room">
                          <h1 className="title">{item.title}</h1>
                        </div>
                        <div className="desc-room row">
                          <div className="des-room-tile col-10">
                            <span>{item.desc}</span>
                            <p>
                              Max people: <span className="number-people">{item.maxPeople}</span>
                            </p>
                            <h4 className="number-people">${item.price}</h4>
                          </div>
                          <div className="col-2 form-check-box">
                            {item.roomNumbers &&
                              item.roomNumbers.length > 0 &&
                              item.roomNumbers.map((rn, indexRn) => {
                                const isSelected = roomSelect[item._id];
                                return (
                                  <div key={indexRn} className={`form-check ${indexRn}`}>
                                    <label className="form-check-label" htmlFor="flexCheckChecked">
                                      {rn}
                                    </label>
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      id="flexCheckChecked"
                                      value={rn}
                                      checked={isSelected && isSelected.roomNumber === rn}
                                      onChange={() => handleOnchangeRoomNumber(item._id, item.price, rn, item.title)}
                                    />
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          ) : (
            <>
              <div className="row col-12 hotel-booking-room mt-4">
                <div className="col-12 room">
                  <div className="tile">
                    <h1 className="title">Select Rooms</h1>
                  </div>
                </div>
              </div>
              <div className="loading-container-hotel">
                <LineWave
                  height="100"
                  width="100"
                  color="#0B5ED7"
                  ariaLabel="line-wave"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                  firstLineColor=""
                  middleLineColor=""
                  lastLineColor=""
                />
                <div>Please select check-in check-out date before selecting rooms. ...</div>
              </div>
              ;
            </>
          )}

          {/* Body */}
          {/* Footer */}
          <div className="hotel-booking-footer row mt-3">
            <div className="title col-12">
              <h1 className="title">Provisional Invoice : ${totalBills}</h1>
              {/* Total Bill */}
            </div>
            <div className="option-submit row">
              <div className="option-payment col-6">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  value={dataInput.paymentTypeInput.payment}
                  onChange={(event) => handleOnchangeInput("paymentTypeInput", "payment", event.target.value)}
                >
                  <option defaultValue>Select Payment Method</option>
                  <option value="Credit card">Credit Card</option>
                  <option value="Cash">Cash</option>
                </select>
              </div>
              <div className="option-payment col-6">
                <button className="btn btn-primary" onClick={() => handleReserveNow()}>
                  Reserve Now
                </button>
              </div>
            </div>
          </div>
          {/* Footer */}
        </div>
        <MailList />
      </>
    );
  }
};

export default HotelBooking;
