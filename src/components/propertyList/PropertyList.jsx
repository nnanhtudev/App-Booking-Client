import { useEffect, useState } from "react";
import "./propertyList.css";
import { handleGetHotelsHomePage } from "../../services/apiHotelServices";
const PropertyList = () => {
  const [properties, setProperties] = useState([
    {
      name: 'Hotels', type: 'hotel',
      image: 'https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o=', state: {}
    },
    {
      name: 'Apartments', type: 'apartments',
      image: 'https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg', state: {}
    },
    {
      name: 'Resorts', type: 'resorts',
      image: 'https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg', state: {}
    },
    {
      name: 'Villas', type: 'villas',
      image: 'https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg', state: {}
    },
    {
      name: 'Cabins', type: 'cabins',
      image: 'https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg', state: {}
    },
  ])

  const handleGetDataHotelFormType = async (type) => {
    let data = await handleGetHotelsHomePage(null, type, null);
    if (data && +data.EC === 0) {
      setProperties((prevProperties) =>
        prevProperties.map((typeArr) => (typeArr.type === type ? { ...typeArr, state: data.DT } : typeArr))
      );
    }
  }
  useEffect(() => {
    properties.forEach((item) => {
      handleGetDataHotelFormType(item.type)
    })
  }, [])
  return (
    <div className="pList">
      {properties.map((property) => (
        <div key={property.type} className="pListItem">
          <img src={property.image} alt={property.name} className="pListImg" />
          <div className="pListTitles">
            <h1>{property.name}</h1>
            <h2>{property.state.length || 0} hotels</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertyList;
