import { useContext } from "react";
import { ThemeContext } from "./context/theme.context";
function App() {
  const { darkMode } = useContext(ThemeContext);

  const appStyle = darkMode ? "app dark" : "app";

  return <div className={appStyle}>working</div>;
}

export default App;
