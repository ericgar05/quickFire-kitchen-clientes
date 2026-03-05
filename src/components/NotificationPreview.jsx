import { ModalRight } from "./ModalRight";
import "./NotificationPreview.css";
import { useNotification } from "../context/NotificationContext";
import { BellIcon } from "../assets/Icons/Icons";
import { NotificationCard } from "./NotificationCard";

export function NotificationPreview({
  toggleNotifications,
  setToggleNotifications,
}) {
  const { notification } = useNotification();

  const handleNotifications = () => {
    setToggleNotifications(!toggleNotifications);
    console.log(toggleNotifications);
  };
  return (
    <ModalRight
      toggleOrder={toggleNotifications}
      handleOrder={handleNotifications}
      tittle="Notificaciones"
      icon={<BellIcon />}
    >
      <section className="card-notification">
        {notification.map((item) => {
          return (
            <NotificationCard
              key={item.id}
              title={item.title}
              orderId={item.order_id}
              description={item.description}
            />
          );
        })}
      </section>
    </ModalRight>
  );
}
