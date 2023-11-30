import React, { useState } from "react";

const HotelContext = React.createContext(null);

const HotelProvider = ({ children }) => {
  const [loadingComplete, setLoadingComplete] = useState("");
  return <HotelContext.Provider value={{ loadingComplete, setLoadingComplete }}>{children}</HotelContext.Provider>;
};

export { HotelContext, HotelProvider };
