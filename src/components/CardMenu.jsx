import { useState } from "react";
import { AddIcon } from "../assets/Icons/Icons";
import { useCar } from "../context/CarProvider";
import "./CardMenu.css";
export function CardMenu({ item }) {
  const { addToCar, removeFromCar, carItems } = useCar();
  // Buscamos el índice del producto en el carrito
  const indexInCar = carItems.findIndex((carItem) => carItem.id === item.id);
  const isSelected = indexInCar !== -1;

  const handleToggleCar = (e) => {
    e?.stopPropagation();
    if (!isSelected) {
      addToCar(item);
    } else {
      removeFromCar(indexInCar);
    }
  };
  return (
    <main
      onClick={handleToggleCar}
      className={`card-menu ${isSelected ? "selected" : ""}`}
    >
      <section className="img-container-menu">
        <img src={item.image} />
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
        <button onClick={handleToggleCar}>
          <AddIcon />
        </button>
      </section>
    </main>
  );
}
