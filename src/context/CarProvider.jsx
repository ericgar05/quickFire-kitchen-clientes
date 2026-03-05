import { useState, useContext, useEffect } from "react";
import { CarContext } from "./CarContext";

export function CarProvider({ children }) {
  const [carItems, setCarItems] = useState(() => {
    const saved = localStorage.getItem("carItems");
    return saved ? JSON.parse(saved) : [];
  });
  const [contOrders, setContOrders] = useState(() => {
    const saved = localStorage.getItem("contOrders");
    return saved ? JSON.parse(saved) : 0;
  });
  const [total, setTotal] = useState(0);
  const [methodPayment, setMethodPayment] = useState("Tarjeta");

  // Guarda en localStorage cuando cambian
  useEffect(() => {
    localStorage.setItem("carItems", JSON.stringify(carItems));
  }, [carItems]);

  useEffect(() => {
    localStorage.setItem("contOrders", JSON.stringify(contOrders));
  }, [contOrders]);

  const addQuantity = (index, newQuantity) => {
    setCarItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index].quantity = newQuantity;
      return updatedItems;
    });
  };
  const addToCar = (product) => {
    setCarItems((prevItems) => [...prevItems, { ...product, quantity: 1 }]);
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

  const totalCalculated = carItems.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0,
  );

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
    total: totalCalculated,
  };
  return <CarContext.Provider value={data}>{children}</CarContext.Provider>;
}

export function useCar() {
  const context = useContext(CarContext);
  return context;
}
