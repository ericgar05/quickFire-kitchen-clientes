import { Routes, Route } from "react-router-dom";
import { HomePage } from "./Pages/HomePage.jsx";
import "./App.css";
import { Layout } from "./Layout.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
