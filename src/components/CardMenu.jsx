import { useState } from "react";
import { AddIcon } from "../assets/Icons/Icons";
import { useCar } from "../context/CarProvider";
import "./CardMenu.css";
export function CardMenu({ item }) {
  const { addToCar, contOrders, setContOrders } = useCar();

  const handleAddToCar = () => {
    addToCar(item);
    setContOrders(contOrders + 1);
  };
  return (
    <main className="card-menu">
      <section className="img-container-menu">
        <img src={item.img} alt={item.name} />
      </section>
      <section className="title-product-menu">
        <h2>{item.name}</h2>
        <h2>
          <span>${item.price}</span>
        </h2>
      </section>
      <section className="description-product-menu">
        <p>{item.description}</p>
      </section>
      <section className="button-container-menu">
        <button onClick={handleAddToCar}>
          <AddIcon />
        </button>
      </section>
    </main>
  );
}
