import { useNavigate } from "react-router-dom";
import "./Nav.css";

export function Nav({ tabs, active, setActive }) {
  const navigate = useNavigate();

  const handleTabChange = (tab) => {
    navigate(tab.path);
    setActive(tab.label);
  };

  return (
    <header className="nav-container">
      {tabs.map((tab) => (
        <button
          className={
            active === tab.label
              ? "nav-container-button-active"
              : "nav-container-button"
          }
          key={tab.id}
          onClick={() => handleTabChange(tab)}
        >
          {tab.label}
        </button>
      ))}
    </header>
  );
}
export default Nav;
