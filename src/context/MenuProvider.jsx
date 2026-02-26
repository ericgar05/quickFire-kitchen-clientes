import { useState, useEffect } from "react";
import { MenuContext } from "./MenuContext";
import supabase from "../../api/supabase.js";
export const MenuProvider = ({ children }) => {
  const [menu, setMenu] = useState([]);
  const fetchMenu = async () => {
    const { data, error } = await supabase.from("menus").select("*");
    if (error || !data) {
      console.log(error);
      return;
    }
    const menuData = data.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      description: item.description,
      category: item.category,
    }));
    setMenu(menuData);
  };
  useEffect(() => {
    fetchMenu();
  }, []);
  return (
    <MenuContext.Provider value={{ menu, fetchMenu }}>
      {children}
    </MenuContext.Provider>
  );
};
