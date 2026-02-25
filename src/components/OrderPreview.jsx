import { Close, ClipboardList, CreditCard, Cash } from "../assets/Icons/Icons";
import { OrderCard } from "./OrderCard";
import { PaymentMethod } from "./PaymentMethod";
import { useState } from "react";
import { useCar } from "../context/CarProvider";
import "./OrderPreview.css";
export function OrderPreview({ toggleOrder, setToggleOrder }) {
  const { carItems, clearCar, setContOrders, contOrders } = useCar();

  const handleOrder = () => {
    setToggleOrder(!toggleOrder);
  };
  const [step, setStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("Tarjeta");

  const handleNextStep = () => {
    setStep(1);
  };

  const handleOrderSubmit = () => {
    const products = carItems.map((item) => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    }));
    const orderSubmit = {
      products,
      paymentMethod,
    };
    clearCar();
    setContOrders(0);
    setStep(0);
    setToggleOrder(false);
    console.log("Se envio la orden", orderSubmit);
  };

  const cardPayment = [
    {
      name: "Tarjeta",
      description: "Crédito o Débito",
      icon: <CreditCard />,
    },
    {
      name: "Efectivo",
      description: "Paga al recibir",
      icon: <Cash />,
    },
  ];

  return (
    <>
      <div
        className={toggleOrder ? "overlay-active" : "overlay-inactive"}
      ></div>
      <section className={toggleOrder ? "active" : "inactive"}>
        <header className="header-preview">
          <h1>
            <ClipboardList />
            Resumen de la orden
          </h1>
          <button onClick={handleOrder}>
            <Close />
          </button>
        </header>
        <section className="content-card">
          {!contOrders ? (
            <p className="not-product">No hay productos en el carrito</p>
          ) : !step ? (
            carItems.map((order, index) => (
              <OrderCard
                key={index}
                index={index}
                img={order.img}
                title={order.name}
                price={order.price}
              />
            ))
          ) : (
            <>
              <p className="payment-title">
                Selecciona cómo deseas pagar tu orden:
              </p>
              {cardPayment.map((payment, index) => (
                <PaymentMethod
                  key={index}
                  name={payment.name}
                  description={payment.description}
                  icon={payment.icon}
                  isSelected={paymentMethod === payment.name}
                  onClick={() => setPaymentMethod(payment.name)}
                />
              ))}
            </>
          )}
        </section>
        <footer className={contOrders ? "footer-active" : "footer-inactive"}>
          <button
            className="footer-button"
            onClick={step ? handleOrderSubmit : handleNextStep}
          >
            {step ? "Confirmar Pedido" : "Ir a metodos de pago"}
          </button>
        </footer>
      </section>
    </>
  );
}
