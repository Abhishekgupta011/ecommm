import React from "react";
import { Link, useLocation, NavLink } from "react-router-dom";
import CartButton from "../Cart/CartButton";
import "./Navbar.css";

const Navbar = ({
  title = "Header",
  links = ["Home", "Store", "About", "Contact Us"],
}) => {
  const location = useLocation(); // Get the current path
  return (
    <header aria-label="Main Navigation">
      <nav className="navbar">
        <h1>{title}</h1>
        <div className="navbar-links">
          {links.map((link, index) => (
            <NavLink
              key={index}
              to={`/${link.toLowerCase()}`}
              style={({ isActive }) => ({
                fontWeight: isActive ? "bold" : "normal",
                color: isActive ? "blue" : "black",
              })}
            >
              <span>{link}</span>
            </NavLink>
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
