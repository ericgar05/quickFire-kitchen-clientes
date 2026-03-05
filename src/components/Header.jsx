import {
  CarShopping,
  BellIcon,
  UserIcon,
  AngleDownIcon,
} from "../assets/Icons/Icons";
import { useCar } from "../context/CarProvider";
import { useNotification } from "../context/NotificationContext";
import "./Header.css";

export function Header({
  toggleOrder,
  setToggleOrder,
  toggleNotifications,
  setToggleNotifications,
}) {
  const { contOrders } = useCar();
  const { notification, markAllAsRead } = useNotification();
  const unreadCount =
    notification?.filter((item) => item.status === "unread").length || 0;

  const handleOrder = () => {
    setToggleOrder(!toggleOrder);
    console.log("Order");
  };
  const handleNotifications = () => {
    setToggleNotifications(!toggleNotifications);
    if (unreadCount > 0 && !toggleNotifications) {
      markAllAsRead();
    }
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
        <button
          className="header-notification-button"
          onClick={handleNotifications}
        >
          <BellIcon />
          {unreadCount > 0 && <span>{unreadCount}</span>}
        </button>
        <button className="header-order-button" onClick={handleOrder}>
          <CarShopping />
          {contOrders > 0 && <span>{contOrders}</span>}
        </button>
        <button className="header-user-button" onClick={handleOrder}>
          <UserIcon />
          <div>
            <AngleDownIcon />
          </div>
        </button>
      </section>
    </header>
  );
}
