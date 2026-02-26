import { AddIcon, MinusIcon } from "../assets/Icons/Icons";
import { useCar } from "../context/CarProvider";
import "./QuantityButton.css";
export function QuantityButton({ cont, setCont, index }) {
  const { addQuantity } = useCar();
  const handleIncrement = () => {
    const newCont = cont + 1;
    setCont(newCont);
    addQuantity(index, newCont);
  };
  const handleDecrement = () => {
    if (cont > 1) {
      const newCont = cont - 1;
      setCont(newCont);
      addQuantity(index, newCont);
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
