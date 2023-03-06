import "./App.css";
import NavBar from "./components/nav/NavBar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home.js";
import Favorites from "./pages/favourites/favourites";
import Page404 from "./pages/404 page/Page404";

function App() {
  return (
    <div className="app">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favourites" element={<Favorites />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default App;
