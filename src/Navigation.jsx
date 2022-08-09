import { NavLink, Link, useNavigate } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { useState } from "react";
import useGlobalUser from "./hooks/useGlobalUser";
import { useLocalStorage } from "./hooks/useLocalStorage";
import logo from "/src/images/logo-ecopetrol.webp";
import "./views/styles/navigation.css";

let active = "nav-link option text-white fw-bold";
let inactive = "nav-link option text-white";

export default function Navigation() {
  const [estado, setEstado] = useState(false);

  let navigate = useNavigate();

  const { user, setUser } = useGlobalUser();
  const [storedValue, setValue] = useLocalStorage("login", user);

  let onAuth = Object.entries(user).length === 0;

  const handleClick = () => {
    setEstado(!estado);
  };

  const handleLogout = () => {
    navigate("session");
    setUser({});
    setValue({});
    localStorage.clear();
  };

  const marginr = {
    marginRight: "15px",
  };

  const handleReject = (e) => {
    if (!onAuth) {
      e.preventDefault();
      Swal.fire({
        icon: "warning",
        title: "Debe cerrar sesión",
        showConfirmButton: false,
        timer: 1000,
      });
    }
    return;
  };

  return (
    <Navbar
      className="nav-sticky"
      expand="sm"
      style={{ background: "#BAD405" }}
    >
      <Navbar.Brand>
        <Link to="/" className="container">
          <img
            src={logo}
            className="d-inline-block align-top logo"
            loading="lazy"
            alt="Home"
            onClick={handleLogout}
          />
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav ">
        <Nav className="mr-auto">
          <NavLink
            onClick={handleReject}
            style={marginr}
            className={({ isActive }) => (isActive ? active : inactive)}
            to="/"
          >
            <span>Inicio</span>
          </NavLink>
          <NavLink
            onClick={handleReject}
            style={marginr}
            className={({ isActive }) => (isActive ? active : inactive)}
            to="/lup"
          >
            LUP
          </NavLink>
          <div className={onAuth ? "optionNav" : "optionNavAc"}>
            <NavLink
              onClick={handleReject}
              style={marginr}
              className={({ isActive }) => (isActive ? active : inactive)}
              to="/aut/lmd"
            >
              LMD
            </NavLink>
          </div>
        </Nav>
      </Navbar.Collapse>

      <div
        className={onAuth ? "action__inactive" : "action"}
        onClick={handleClick}
      >
        <div className="profile">
          <i className="bi bi-list"></i>
        </div>
        <div className={estado ? "menu active" : "menu"}>
          <h3>
            {user.name === undefined
              ? ""
              : user.name[0].toUpperCase() +
                user.name.slice(1).toLowerCase()}{" "}
            <br />
            <span>
              {user.role === undefined
                ? ""
                : user.role[0].toUpperCase() + user.role.slice(1).toLowerCase()}
            </span>
          </h3>
          <ul>
            <li className={user.role === "administrador" ? "" : "optionNav"}>
              <Link to="/aut/register" className="Link">
                <i className="bi bi-person-plus"></i>Crear usuario
              </Link>
            </li>
            <li className={user.role === "administrador" ? "" : "optionNav"}>
              <Link to="/aut/deleteUser" className="Link">
                <i className="bi bi-person-dash"></i>Eliminar usuario
              </Link>
            </li>
            <li>
              <Link to="/aut/file" className="Link">
                <i className="bi bi-file-earmark-arrow-up"></i>Cargar archivos
              </Link>
            </li>
            <li>
              <Link to="/aut/down" className="Link">
                <i className="bi bi-file-earmark-arrow-down"></i>Descargar
              </Link>
            </li>
            <li onClick={handleLogout} className="logout">
              <i className="bi bi-box-arrow-left"></i>Salir
            </li>
          </ul>
        </div>
      </div>
    </Navbar>
  );
}
