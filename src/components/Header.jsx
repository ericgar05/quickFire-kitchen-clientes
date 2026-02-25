import { CarShopping } from "../assets/Icons/Icons";
import { useCar } from "../context/CarProvider";
import "./Header.css";

export function Header({ toggleOrder, setToggleOrder }) {
  const { contOrders } = useCar();
  const handleOrder = () => {
    setToggleOrder(!toggleOrder);
    console.log("Order");
  };
  return (
    <header className="header-container">
      <section className="header-info">
        <img src=".././public/isotipo.svg" alt="Logo" />
        <label>
          <h1>
            QUICK<span>FIRE</span>
          </h1>
          <h3>KITCHEN</h3>
        </label>
      </section>
      <section className="header-order">
        <button className="header-order-button" onClick={handleOrder}>
          <CarShopping />
          <span>{contOrders}</span>
        </button>
      </section>
    </header>
  );
}
