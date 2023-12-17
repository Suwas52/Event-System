import { useContext, lazy, Suspense } from "react";
import { ThemeContext } from "./context/theme.context";
import Navbar from "./component/navbar/Navbar";

import { Routes, Route } from "react-router-dom";
import CustomLazyProgress from "./lazy-progress/CustomLazyProgress";
import Job from "./pages/job/Job";

const Home = lazy(() => import("./pages/Home"));
const Companies = lazy(() => import("./pages/company/Companies"));
const AddCompany = lazy(() => import("./component/company/AddCompany"));

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
            <Route path="/companies">
              <Route index element={<Companies />} />
              <Route path="add" element={<AddCompany />} />
            </Route>
            <Route path="jobs">
              <Route index element={<Job />} />
            </Route>
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
