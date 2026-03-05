import "./Auth.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { sileo } from "sileo";

export const Login = () => {
  const navigate = useNavigate();
  const { handleLogin } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    dni: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSwitch = () => {
    navigate("/register");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //Agregado para la base de datos
    sileo.promise(handleLogin(formData), {
      loading: {
        title: "Iniciando sesión",
      },
      success: () => ({
        title: `Sesión iniciada correctamente`,
      }),
      error: (err) => {
        console.log("Error detallado en Login:", err);
        return {
          title: "Error al iniciar sesión",
          description: err.message,
          fill: "black",
        };
      },
    });
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <header className="auth-header">
          <img src="/isotipo.svg" alt="QuickFire Logo" className="logo-image" />
          <div className="header-text">
            <h1>
              QUICK<span>FIRE</span>
            </h1>
            <h3>KITCHEN</h3>
          </div>
        </header>
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="dni"
              placeholder="Cédula"
              value={formData.dni}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="auth-button">
            Iniciar Sesión
          </button>
        </form>
        <p className="auth-switch">
          ¿No tienes cuenta?{" "}
          <span onClick={handleSwitch} className="auth-link">
            Regístrate
          </span>
        </p>
      </div>
    </div>
  );
};
