import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.scss";
import { DarkMode, LightMode, Menu } from "@mui/icons-material";
import { ToggleButton } from "@mui/material";
import { ThemeContext } from "../../context/theme.context";

const links = [
  { hrefs: "/", label: "Home" },
  { hrefs: "/companies", label: "Companies" },
  { hrefs: "/jobs", label: "Jobs" },
  { hrefs: "/candidates", label: "Candidate" },
];

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const [open, setOpen] = useState<boolean>(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  const menuStyle = open ? "menu open" : "menu";

  return (
    <div className="navbar">
      <div className="brand">
        <span>Resume Management</span>
      </div>
      <div className={menuStyle}>
        <ul>
          {links.map((items) => (
            <li key={items.hrefs}>
              <Link to={items.hrefs}>{items.label}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="hamburger">
        <Menu onClick={toggleOpen} />
      </div>
      <div className="toggle">
        <ToggleButton
          value={"check"}
          selected={darkMode}
          onClick={toggleDarkMode}
        >
          {darkMode ? <LightMode /> : <DarkMode />}
        </ToggleButton>
      </div>
    </div>
  );
};

export default Navbar;
