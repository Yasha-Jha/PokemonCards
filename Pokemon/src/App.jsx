import "./App.css";
import { DarkLight, ThemeProvider } from "./component/DarkLight";
import { Pokemon } from "./component/Pokemon";

function App() {
  return (
    <>
      {/* <Pokemon /> */}
      <ThemeProvider>
        <DarkLight />
      </ThemeProvider>
    </>
  );
}

export default App;
