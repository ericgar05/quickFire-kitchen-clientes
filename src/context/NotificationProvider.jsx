import { useState, useEffect } from "react";
import { NotificationContext } from "./NotificationContext";
import { useAuth } from "./AuthContext";
import supabase from "../../api/supabase";

export function NotificationProvider({ children }) {
  const [notification, setNotification] = useState([]);
  const { userData, isAuthenticated } = useAuth();
  const fetchNotification = async () => {
    if (!isAuthenticated || !userData?.id) return;
    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("client_id", userData.id);

    if (error) {
      console.log("Error al cargar notificaciones:", error);
    } else {
      setNotification(data || []);
    }
  };

  const markAllAsRead = async () => {
    if (!userData) return;

    // Actualización optimista en la UI temporalmente
    setNotification((prev) =>
      prev.map((notif) => ({ ...notif, status: "read" })),
    );

    const { error } = await supabase
      .from("notifications")
      .update({ status: "read" })
      .eq("client_id", userData.id)
      .eq("status", "unread");

    if (error) {
      console.log("Error al marcar como leídas:", error);
      fetchNotification(); // revert on fail
    }
  };

  useEffect(() => {
    fetchNotification();
  }, [userData]);
  return (
    <NotificationContext.Provider
      value={{
        setNotification,
        notification,
        fetchNotification,
        markAllAsRead,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}
