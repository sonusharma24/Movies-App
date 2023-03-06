import "./App.css";
import Banner from "./components/banner/Banner";
import Movies from "./components/movies/Movies";
import NavBar from "./components/nav/NavBar";

function App() {
  return (
    <div className="app">
      <NavBar />
      <Banner />
      <Movies />
    </div>
  );
}

export default App;
