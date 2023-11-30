import React, { useEffect, useState } from "react";
import "./Transaction.scss";
import MailList from "../mailList/MailList";
import Header from "../header/Header";
import { handleGetTransactionByUser } from "../../services/apiTransaction";

const Transaction = () => {
  const [dataTransaction, setDataTransaction] = useState([]);

  const getTransaction = async () => {
    let res = await handleGetTransactionByUser();
    if (res && +res.EC === 0) {
      setDataTransaction(res.DT);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const convertArrayToString = (roomArray) => {
    return roomArray.join(", ");
  };

  useEffect(() => {
    getTransaction();
  }, []);

  return (
    <>
      <Header type="list" />
      <div className="transaction-container">
        <h3>Your Transactions</h3>
        <table className="transaction-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Hotel</th>
              <th>Room</th>
              <th>Date</th>
              <th>Price</th>
              <th>Payment Method</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {dataTransaction && dataTransaction.length > 0 ? (
              dataTransaction.map((item, index) => (
                <tr key={index + 1}>
                  <td>{index + 1}</td>
                  <td>{item.hotel.title}</td>
                  <td>{convertArrayToString(item.room)}</td>
                  <td>
                    {formatDate(item.dateStart)} - {formatDate(item.dateEnd)}
                  </td>
                  <td>${item.price}</td>
                  <td>{item.payment}</td>
                  <td>
                    <span className={`status-span status-${item.status.toLowerCase()}`}>{item.status}</span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No transactions available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <MailList />
    </>
  );
};

export default Transaction;
