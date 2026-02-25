import { AddIcon, MinusIcon } from "../assets/Icons/Icons";
import { useCar } from "../context/CarProvider";
import "./QuantityButton.css";
export function QuantityButton({ cont, setCont, index }) {
  const { addQuantity } = useCar();
  const handleIncrement = () => {
    setCont(cont + 1);
    addQuantity(index, cont);
  };
  const handleDecrement = () => {
    if (cont > 1) {
      setCont(cont - 1);
      addQuantity(index, cont);
    }
  };
  return (
    <main className="quantity-button">
      <button onClick={handleDecrement}>
        <MinusIcon />
      </button>
      <p>{cont}</p>
      <button onClick={handleIncrement}>
        <AddIcon />
      </button>
    </main>
  );
}
