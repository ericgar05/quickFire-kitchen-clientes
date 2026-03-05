import "./Auth.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../api/supabase";
import bcrypt from "bcryptjs";

//Siempre poner el .js
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validar que las contraseñas coincidan
    console.log("Datos de registro:", formData);

    //? Encriptación de la contraseña con bcrypt (bcryptjs)
    const dniHashed = await bcrypt.hash(formData.dni, 12);
    console.log(dniHashed);

    //? Peticion para registrar con Supabase
    const { error } = await supabase.from("clients").insert({
      name: formData.name,
      last_name: formData.lastname,
      dni: dniHashed,
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
    });

    if (error) {
      console.log(error);
      if (error.code === "23505") {
        alert("Este correo ya está registrado.");
      } else {
        alert("Error: " + error.message);
      }
      return;
    }
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
