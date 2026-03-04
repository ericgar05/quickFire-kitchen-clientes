import { CarShopping, BellIcon } from "../assets/Icons/Icons";
import { useState } from "react";
import { useCar } from "../context/CarProvider";
import "./Header.css";

export function Header({ toggleOrder, setToggleOrder }) {
  const [handleNotifications, setHandleNotifications] = useState(false);
  const { contOrders } = useCar();

  const handleOrder = () => {
    setToggleOrder(!toggleOrder);
    console.log("Order");
  };
  return (
    <header className="header-container">
      <section className="header-info">
        <label>
          <h1>
            QUICK<span>FIRE</span>
          </h1>
          <h3>KITCHEN</h3>
        </label>
      </section>
      <section className="header-buttons">
        {/* <button className="header-notification-button">
          <BellIcon />
        </button> */}
        <button className="header-order-button" onClick={handleOrder}>
          <CarShopping />
          <span>{contOrders}</span>
        </button>
      </section>
    </header>
  );
}
