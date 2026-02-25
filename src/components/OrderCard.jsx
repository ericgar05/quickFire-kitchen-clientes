import { QuantityButton } from "./QuantityButton";
import "./OrderCard.css";
import { useState } from "react";
import { useCar } from "../context/CarProvider";
import { Close } from "../assets/Icons/Icons";
export function OrderCard({ img, title, price, index }) {
  const { removeFromCar, addContOrder, contOrders, setContOrders } = useCar();
  const [cont, setCont] = useState(1);
  const handleRemoveFromCar = (index) => {
    removeFromCar(index);
    setContOrders(contOrders - 1);
  };
  return (
    <main className="order-card">
      <section className="img-container">
        <img src={img} alt="" />
        <div className="info-product">
          <h1>{title}</h1>
          <QuantityButton cont={cont} setCont={setCont} index={index} />
        </div>
      </section>
      <section className="info-container">
        <button
          className="delete-order-button"
          onClick={() => handleRemoveFromCar(index)}
        >
          <Close />
        </button>
        <h4>{price}</h4>
      </section>
    </main>
  );
}
