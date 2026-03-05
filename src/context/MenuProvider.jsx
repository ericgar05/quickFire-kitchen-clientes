import { useState, useEffect } from "react";
import { MenuContext } from "./MenuContext";
import supabase from "../../api/supabase.js";
import { useAuth } from "./AuthContext.jsx";

export const MenuProvider = ({ children }) => {
  const [menu, setMenu] = useState([]);
  const [categories, setCategories] = useState([]);
  const { isAuthenticated } = useAuth();

  const fetchMenu = async () => {
    if (!isAuthenticated) return;

    // 1. Cargar menús y categorías en paralelo
    const [menusResponse, categoriesResponse] = await Promise.all([
      supabase.from("menus").select("*"),
      supabase.from("menu_categories").select("*"),
    ]);

    if (menusResponse.error || categoriesResponse.error) {
      console.log(
        "Error al cargar datos:",
        menusResponse.error || categoriesResponse.error,
      );
      return;
    }

    const rawMenus = menusResponse.data;
    const rawCategories = categoriesResponse.data;

    // 2. Mapear categorías para fácil acceso
    setCategories(rawCategories);

    // 3. Unir menú con nombres de categorías
    const menuData = rawMenus.map((item) => {
      const categoryObj = rawCategories.find((c) => c.id === item.category_id);
      return {
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        description: item.description,
        category: categoryObj ? categoryObj.name : "Sin categoría",
        category_id: item.category_id,
      };
    });

    setMenu(menuData);
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchMenu();
    } else {
      setMenu([]);
      setCategories([]);
    }
  }, [isAuthenticated]);

  return (
    <MenuContext.Provider value={{ menu, categories, fetchMenu }}>
      {children}
    </MenuContext.Provider>
  );
};
