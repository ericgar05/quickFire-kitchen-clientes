import { Routes, Route } from "react-router-dom";
import { HomePage } from "./Pages/HomePage.jsx";
import "./App.css";
import { Layout } from "./Layout.jsx";
import { Login } from "./components/Login.jsx";
import Register from "./components/Register.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
