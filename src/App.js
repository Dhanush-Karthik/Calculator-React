import Calculator from "./components/calculator/Calculator";
import NavBar from "./components/navbar/NavBar";
import "./App.css";

function App() {
  return (
    <div>
      <NavBar />
      <div className="window">
        <Calculator />
      </div>
    </div>
  );
}

export default App;
