import { Nav } from "../components/Nav";
import { CardMenu } from "../components/CardMenu";
import { useState } from "react";
import { useMenuContext } from "../context/MenuContext";
export function HomePage() {
  const { menu, categories } = useMenuContext();

  const tabs = [
    { id: "all", path: "/", label: "Todos" },
    ...categories.map((cat) => ({
      id: cat.id,
      path: "/",
      label: cat.name,
    })),
  ];

  const [active, setActive] = useState("Todos");

  const filterMenu = menu.filter((item) => {
    if (item.status === true) return false;

    if (active === "Todos") return true;

    const normalize = (str) =>
      str
        ?.toLowerCase()
        .trim()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

    const itemCat = normalize(item.category);
    const activeCat = normalize(active);

    if (!itemCat || !activeCat) return itemCat === activeCat;

    return (
      itemCat === activeCat ||
      (itemCat.length > 1 && itemCat === activeCat.slice(0, -1)) ||
      (activeCat.length > 1 && activeCat === itemCat.slice(0, -1))
    );
  });
  return (
    <>
      <h1>
        ¿Qué quieres <span>ordenar hoy?</span>{" "}
      </h1>

      <section className="add-inventory-container">
        <Nav tabs={tabs} active={active} setActive={setActive} />
      </section>
      <section className="card-menu-container">
        {filterMenu.map((item) => (
          <CardMenu key={item.id} item={item} />
        ))}
      </section>
    </>
  );
}
