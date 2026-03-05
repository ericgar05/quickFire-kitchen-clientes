import {
  Close,
  ClipboardList,
  CreditCard,
  Cash,
  CheckIcon,
} from "../assets/Icons/Icons";
import { OrderCart } from "./OrderCart";
import { PaymentMethod } from "./PaymentMethod";
import { useState } from "react";
import { useCar } from "../context/CarProvider";
import { useOrder } from "../context/OrderProvider";
import { useNotification } from "../context/NotificationContext";
import { useAuth } from "../context/AuthContext";
import { Modal } from "./Modal";
import { ModalRight } from "./ModalRight";
import "./OrderPreview.css";

export function OrderPreview({ toggleOrder, setToggleOrder }) {
  const { carItems, clearCar, contOrders, total } = useCar();
  const { submitOrder, loading, error, orderId } = useOrder();
  const { fetchNotification } = useNotification();
  const { userData } = useAuth();

  const handleOrder = () => {
    setToggleOrder(!toggleOrder);
  };
  const [step, setStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("Tarjeta");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handleNextStep = () => {
    setStep(1);
  };

  const handlePreviousStep = () => {
    setStep(0);
  };

  const handleOrderSubmit = async () => {
    const result = await submitOrder({
      carItems,
      paymentMethod,
      buyerName: userData.name,
    });

    if (result.success) {
      setIsSuccessModalOpen(true);
    }
  };

  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
    clearCar();
    setToggleOrder(false);
    setStep(0);
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
      <ModalRight
        toggleOrder={toggleOrder}
        handleOrder={handleOrder}
        tittle="Resumen de la orden"
        icon={<ClipboardList />}
      >
        <section className="content-card">
          {!contOrders ? (
            <p className="not-product">No hay productos en el carrito</p>
          ) : !step ? (
            carItems.map((order, index) => (
              <OrderCart
                key={index}
                index={index}
                img={order.image}
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
          <section className="total-container">
            <h3>Total:</h3>
            <h3>${total.toFixed(2)}</h3>
          </section>
          <section
            className={
              step
                ? "footer-buttons-container-active"
                : "footer-buttons-container-inactive"
            }
          >
            <button
              className={!step ? "close-button" : "footer-button"}
              onClick={handlePreviousStep}
              disabled={loading}
            >
              Volver
            </button>
            <button
              className="footer-button"
              onClick={step ? handleOrderSubmit : handleNextStep}
              disabled={loading}
            >
              {loading
                ? "Enviando..."
                : step
                  ? "Confirmar Pedido"
                  : "Ir a metodos de pago"}
            </button>
          </section>
        </footer>

        <Modal
          isOpen={isSuccessModalOpen}
          onClose={handleCloseSuccessModal}
          title="¡Orden Creada!"
        >
          <div className="order-modal">
            <CheckIcon />
            <p>Su orden #{orderId} ha sido creada con éxito.</p>
            <p>Pase por la caja #1 para pagar su orden.</p>
            <button
              onClick={handleCloseSuccessModal}
              className="order-modal-button"
            >
              Aceptar
            </button>
          </div>
        </Modal>
      </ModalRight>
    </>
  );
}
