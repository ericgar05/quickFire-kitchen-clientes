import { useState, useContext } from "react";
import { OrderContext } from "./OrderContext";
import supabase from "../../api/supabase.js";

export function OrderProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitOrder = async ({ carItems, paymentMethod, buyerName }) => {
    setLoading(true);
    setError(null);

    try {
      // 1. Insertar la orden principal
      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .insert([
          {
            buyer_name: buyerName || "Cliente",
            payment_type: paymentMethod,
            status: "pendiente",
          },
        ])
        .select()
        .single();

      if (orderError) throw orderError;

      const orderId = orderData.id;
      console.log("Orden creada, id:", orderId);

      if (!orderId) throw new Error("No se obtuvo el ID de la orden");

      // 2. Insertar los items de la orden
      // Ya que los items del carrito a veces solo tienen {name, price, quantity} sin ID,
      // obtenemos los IDs reales de la tabla menus basados en los nombres de los productos del carrito.
      const productNames = carItems.map((item) => item.name);

      const { data: menusMatch, error: menusError } = await supabase
        .from("menus")
        .select("id, name")
        .in("name", productNames);

      if (menusError) throw menusError;

      const orderItems = carItems.map((item) => {
        // Encontrar el ID de la base de datos que coincide con el nombre del producto en el carrito
        const realMenu = menusMatch.find((m) => m.name === item.name);
        const realMenuId = realMenu
          ? realMenu.id
          : item.id
            ? parseInt(item.id, 10)
            : null;

        return {
          order_id: orderId,
          menu_id: realMenuId,
          quantity: item.quantity ?? 1,
          unit_price: item.price,
        };
      });

      const validOrderItems = orderItems.filter(
        (item) => item.menu_id !== null && !isNaN(item.menu_id),
      );

      if (
        validOrderItems.length === 0 ||
        validOrderItems.length !== carItems.length
      ) {
        console.error(
          "Productos sin ID de menú encontrado:",
          orderItems.filter((i) => !i.menu_id),
        );
        throw new Error(
          "No se pudo encontrar el ID original de algunos productos del carrito en la base de datos.",
        );
      }

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(validOrderItems);

      if (itemsError) throw itemsError;

      return { success: true, orderId };
    } catch (err) {
      console.error("Error al subir la orden:", err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return (
    <OrderContext.Provider value={{ submitOrder, loading, error }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  return context;
}
