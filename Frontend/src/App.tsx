import { useContext, lazy, Suspense } from "react";
import { ThemeContext } from "./context/theme.context";
import Navbar from "./component/navbar/Navbar";

import { Routes, Route } from "react-router-dom";
import CustomLazyProgress from "./lazy-progress/CustomLazyProgress";

const Home = lazy(() => import("./pages/Home"));
const Companies = lazy(() => import("./pages/company/Companies"));

function App() {
  const { darkMode } = useContext(ThemeContext);

  const appStyle = darkMode ? "app dark" : "app";

  return (
    <div className={appStyle}>
      <Navbar />
      <div className="wrapper">
        <Suspense fallback={<CustomLazyProgress />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/companies" element={<Companies />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
