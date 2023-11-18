import { useEffect, useState } from "react";
import "./featuredProperties.css";
import { handleGetHotelsHomePage } from "../../services/apiHotelServices";
const FeaturedProperties = () => {
  const [rating, setRating] = useState([]);

  const handleGetDataHotel = async () => {
    try {
      let data = await handleGetHotelsHomePage(null, null, -1);
      if (data && +data.EC === 0) {
        let dataRating = data.DT;
        let results = dataRating.map((rt) => ({
          name: rt.name,
          city: rt.city,
          images: rt.photos,
          price: rt.cheapestPrice,
          rating: rt.rating,
          id: rt._id,
        }));
        setRating(results);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    handleGetDataHotel();
  }, []);

  const getRandomElementFromArray = (arr) => {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  };

  return (
    <div className="fp">
      {rating &&
        rating.length > 0 &&
        rating.map((item, index) => (
          <div className="fpItem" key={index}>
            <img src={getRandomElementFromArray(item.images)} alt="" className="fpImg" />
            <span className="fpName">
              <a href={`./hotels/${item.id}`} target="_blank">
                {item.name}
              </a>
            </span>
            <span className="fpCity">{item.city}</span>
            <span className="fpPrice">Starting from ${item.price}</span>
            <div className="fpRating">
              <button>{item.rating}</button>
              <span>Excellent</span>
            </div>
          </div>
        ))}
    </div>
  );
};

export default FeaturedProperties;
