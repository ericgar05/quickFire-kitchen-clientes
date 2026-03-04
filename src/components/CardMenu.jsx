import { useState } from "react";
import { AddIcon } from "../assets/Icons/Icons";
import { useCar } from "../context/CarProvider";
import "./CardMenu.css";
export function CardMenu({ item }) {
  const { addToCar, carItems } = useCar();
  //Mejorar esto aca porque necesito un handle para que no se pueda agregar el mismo producto dos veces
  const isSelected = carItems.some((carItem) => carItem.id === item.id);

  const handleAddToCar = () => {
    if (!isSelected) {
      addToCar(item);
    }
  };
  return (
    <main
      onClick={handleAddToCar}
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
        <button onClick={handleAddToCar} disabled={isSelected}>
          <AddIcon />
        </button>
      </section>
    </main>
  );
}
