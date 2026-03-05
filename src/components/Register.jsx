import "./Auth.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../api/supabase";
import bcrypt from "bcryptjs";
import { sileo } from "sileo";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    dni: "",
    phone: "",
    email: "",
    address: "",
  });

  const navigate = useNavigate();

  const handleSwitch = () => {
    navigate("/login");
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const registerTask = async () => {
    const dniHashed = await bcrypt.hash(formData.dni, 12);
    const { error } = await supabase.from("clients").insert({
      name: formData.name,
      last_name: formData.lastname,
      dni: dniHashed,
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
    });

    if (error) {
      if (error.code === "23505") {
        throw new Error("Este correo ya está registrado.");
      } else {
        throw new Error(error.message);
      }
    }
    return "success";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    sileo.promise(registerTask(), {
      loading: { title: "Creando cuenta..." },
      success: () => {
        handleSwitch();
        return { title: "Cuenta creada exitosamente" };
      },
      error: (err) => ({
        title: "Error al registrarse",
        description: err.message,
        fill: "black",
      }),
    });
  };

  //si hay un await la funcion debe ser async
  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Crear Cuenta</h2>
        <form onSubmit={handleSubmit}>
          <div className="client-data">
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Nombre"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="lastname"
                placeholder="Apellido"
                value={formData.lastname}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <input
              type="text"
              name="dni"
              placeholder="Cédula"
              value={formData.dni}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="email"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="address"
              placeholder="Dirección"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="phone"
              placeholder="Teléfono"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="auth-button">
            Registrarse
          </button>
        </form>
        <p className="auth-switch">
          ¿Ya tienes cuenta?{" "}
          <span onClick={handleSwitch} className="auth-link">
            Inicia sesión
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
