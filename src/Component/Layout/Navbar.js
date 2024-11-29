import React from "react";
import { useLocation, NavLink } from "react-router-dom";
import CartButton from "../Cart/CartButton";
import "./Navbar.css";

const Navbar = ({
  title = "Header",
  links = [
    { name: "Home", path: "home", submenu: [] },
    {
      name: "Store",
      path: "store",
      submenu: ["Electronics", "Clothing", "Toys"],
    },
    { name: "About", path: "about", submenu: [] },
    {
      name: "Contact Us",
      path: "contact-us",
      submenu: ["Support", "Feedback"],
    },
  ],
}) => {
  const location = useLocation();

  return (
    <header aria-label="Main Navigation">
      <nav className="navbar">
        <NavLink to={`/home`}>
          <h1>{title}</h1>
        </NavLink>
        <div className="navbar-links">
          {links.map((link, index) => (
            <div key={index} className="navbar-item">
              <NavLink
                to={`/${link.path}`}
                className="navbar-link"
                style={({ isActive }) => ({
                  fontWeight: isActive ? "bold" : "normal",
                  color: isActive ? "blue" : "black",
                })}
              >
                {link.name}
              </NavLink>
              {link.submenu.length > 0 && (
                <ul className="dropdown-menu">
                  {link.submenu.map((submenuItem, subIndex) => (
                    <li key={subIndex}>
                      <NavLink
                        to={`/${link.path}/${submenuItem.toLowerCase()}`}
                      >
                        {submenuItem}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Conditionally render the cart button only on the /store path */}
        {location.pathname === "/store" && (
          <span>
            <CartButton />
          </span>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
