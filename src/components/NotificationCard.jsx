import { ClockIon } from "../assets/Icons/Icons";
import "./NotificationCard.css";

export function NotificationCard({ orderId, description }) {
  return (
    <div className="card-notification-item">
      <header className="header-notification">
        <div>
          <ClockIon />
          <p>Orden #{orderId}</p>
        </div>
      </header>
      <div className="description-notification">
        <p>{description}</p>
      </div>
    </div>
  );
}
