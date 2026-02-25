import { Outlet } from "react-router-dom";
import { Header } from "./components/Header";
import { useState } from "react";
import { OrderPreview } from "./components/OrderPreview";

export function Layout() {
  const [toggleOrder, setToggleOrder] = useState(false);
  return (
    <main className="main-container">
      <section className="header-container">
        <Header toggleOrder={toggleOrder} setToggleOrder={setToggleOrder} />
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
    </main>
  );
}
