import { useState, useContext } from "react";
import { CarContext } from "./CarContext";

export function CarProvider({ children }) {
  const [carItems, setCarItems] = useState([]);
  const [contOrders, setContOrders] = useState(0);
  const [total, setTotal] = useState(0);
  const [methodPayment, setMethodPayment] = useState("Tarjeta");
  const addQuantity = (index, newQuantity) => {
    setCarItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index].quantity = newQuantity;
      return updatedItems;
    });
    // console.log("Se agrego cantidad");
  };
  const addToCar = (product) => {
    setCarItems((prevItems) => [...prevItems, product]);
    setContOrders((prevCont) => prevCont + 1);
  };

  const removeFromCar = (indexToRemove) => {
    setCarItems((prevItems) =>
      prevItems.filter((_, index) => index !== indexToRemove),
    );
    setContOrders((prevCont) => Math.max(0, prevCont - 1));
    console.log("Se elimino orden", indexToRemove);
  };
  const clearCar = () => {
    setCarItems([]);
    setContOrders(0);
    console.log("Se limpio el carrito");
  };
  const data = {
    carItems,
    contOrders,
    methodPayment,
    setMethodPayment,
    setContOrders,
    addToCar,
    clearCar,
    removeFromCar,
    addQuantity,
    // total,
  };
  return <CarContext.Provider value={data}>{children}</CarContext.Provider>;
}

export function useCar() {
  const context = useContext(CarContext);
  return context;
}
