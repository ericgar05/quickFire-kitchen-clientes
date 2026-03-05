import { Outlet, Navigate } from "react-router-dom";
import { Header } from "./components/Header";
import { useState } from "react";
import { OrderPreview } from "./components/OrderPreview";
import { NotificationPreview } from "./components/NotificationPreview";
import { useAuth } from "./context/AuthContext";

export function Layout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  const [toggleOrder, setToggleOrder] = useState(false);
  const [toggleNotifications, setToggleNotifications] = useState(false);
  return (
    <main className="main-container">
      <section className="header-container">
        <Header
          toggleOrder={toggleOrder}
          setToggleOrder={setToggleOrder}
          toggleNotifications={toggleNotifications}
          setToggleNotifications={setToggleNotifications}
        />
      </section>
      <section className="outlet-container">
        <Outlet />
      </section>
      <section className="order-container">
        <OrderPreview
          toggleOrder={toggleOrder}
          setToggleOrder={setToggleOrder}
        />
      </section>
      <section className="notification-container">
        <NotificationPreview
          toggleNotifications={toggleNotifications}
          setToggleNotifications={setToggleNotifications}
        />
      </section>
    </main>
  );
}
