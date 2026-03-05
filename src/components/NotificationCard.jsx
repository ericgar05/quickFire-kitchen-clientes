import { ClockIon, CheckIcon, CookingIcon } from "../assets/Icons/Icons";
import "./NotificationCard.css";

export function NotificationCard({ orderId, description, orderStatus }) {
  let statusMessage = description;
  let IconToRender = ClockIon;

  if (orderStatus === "Pagado") {
    statusMessage = "Su orden se está cocinando";
    IconToRender = CookingIcon;
  } else if (orderStatus === "pendiente") {
    statusMessage = "Su orden está pendiente de pago";
    IconToRender = ClockIon;
  } else if (orderStatus === "completada") {
    statusMessage = "Vaya a retirar su orden";
    IconToRender = CheckIcon;
  }

  return (
    <div className="card-notification-item">
      <header className="header-notification">
        <div>
          <IconToRender />
          <p>Orden #{orderId}</p>
        </div>
        <p>{orderStatus}</p>
      </header>
      <div className="description-notification">
        <p>{statusMessage}</p>
      </div>
    </div>
  );
}
