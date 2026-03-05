import { Close } from "../assets/Icons/Icons";
import "./ModalRight.css";
export function ModalRight({
  toggleOrder,
  children,
  handleOrder,
  tittle,
  icon,
}) {
  if (!toggleOrder) return null;
  return (
    <>
      <div
        className={toggleOrder ? "overlay-active" : "overlay-inactive"}
      ></div>
      <section className={toggleOrder ? "active" : "inactive"}>
        <header className="header-preview">
          <h1>
            {icon}
            {tittle}
          </h1>
          <button onClick={handleOrder}>
            <Close />
          </button>
        </header>
        {children}
      </section>
    </>
  );
}
