import "./featured.css";
import { handleGetHotelsHomePage } from "../../services/apiHotelServices";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";

const Featured = () => {
  const { setLoading } = useContext(UserContext);
  const [cities, setCities] = useState([
    { name: "Ha Noi", city: "hanoi", images: "Ha_Noi", state: {} },
    { name: "Ho Chi Minh", city: "hochiminh", images: "HCM", state: {} },
    { name: "Da Nang", city: "danang", images: "Da_Nang", state: {} },
  ]);

  const handleGetDataHotel = async (city) => {
    let data = await handleGetHotelsHomePage(city);
    if (data && +data.EC === 0) {
      setCities((prevCities) =>
        prevCities.map((cityArr) => (cityArr.city === city ? { ...cityArr, state: data.DT } : cityArr))
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    cities.forEach((item) => {
      handleGetDataHotel(item.city);
    });
  }, []);

  return (
    <div className="featured">
      {cities.map((city, index) => (
        <div className="featuredItem" key={index}>
          <img src={`/images/City_Image/${city.images}.jpg`} alt="" className="featuredImg" />
          <div className="featuredTitles">
            <h1>{city.name}</h1>
            <h2>{city.state.length || 0} properties</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Featured;
