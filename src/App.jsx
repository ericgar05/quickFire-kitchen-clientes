import { Routes, Route } from "react-router-dom";
import { HomePage } from "./Pages/HomePage.jsx";
import "./App.css";
import { Layout } from "./Layout.jsx";
import { CarProvider } from "./context/CarProvider.jsx";

function App() {
  return (
    <>
      <CarProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
          </Route>
        </Routes>
      </CarProvider>
    </>
  );
}

export default App;
