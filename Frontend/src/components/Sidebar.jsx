import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoPerson, IoHome, IoPersonAdd, IoWarning, IoReceipt, IoStatsChart, IoPeople, IoLogOut, IoFlask } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";
import salud1 from "../styles/images/salud1.jpg";


const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  return (
    <div>
      <aside className="menu pl-2 has-shadow">
        <div className="column has-text-centered"><img className="is-inline-block" src={salud1} width="100" alt="salud1" /></div>
        {user && user.role === "user" && (
          <div>
            <ul className="menu-list">
              <li className="has-text-centered">
                <p className="menu-label">Bienvenido: {user.name}</p>
              </li>
            </ul>
          </div>
        )} <br />
        {user && user.role === "admin" && (
          <div>
            <ul className="menu-list">
              <li className="has-text-centered">
                <p className="menu-label">Bienvenido: {user.name}</p>
              </li>
            </ul>
          </div>
        )} <br />
        <h4 className="title is-6 has-text-centered">Servicio de Laboratorio</h4>
        <ul className="menu-list">
          {user && user.role === "admin" && (
            <div>
              <ul className="menu-list">
                <li>
                  <NavLink to={"/dashboard"} id="hola">
                    <IoHome /> Inicio
                  </NavLink>
                </li>
              </ul>
            </div>
          )}
          <ul className="menu-list">
            <li>
              <NavLink to={"/pacientes"}>
                <IoPersonAdd /> Pacientes
              </NavLink>
            </li>
            <li>
              <NavLink to={"/muestras"}>
                <IoWarning /> Muestras
              </NavLink>
            </li>
          </ul>
          <NavLink className='menu-list' onClick={toggleMenu}><IoReceipt /> Resultados </NavLink>
              <ul className="menu-list" hidden={!isOpen}>
                <ul className='dropdownMenu'>
                  <li className='dropdown'>
                    <NavLink to={"/resultados/hematologia"}>
                    <IoFlask /> Examenes Hematologia
                    </NavLink>
                  </li>
                  <li className='dropdown'>
                    <NavLink to={"/resultados/orina"}>
                    <IoFlask /> Examenes Orina
                    </NavLink>
                  </li>
                  <li className='dropdown'>
                    <NavLink to={"/resultados/heces"}>
                    <IoFlask /> Examenes Heces
                    </NavLink>
                  </li>
                  <li className='dropdown'>
                    <NavLink to={"/resultados/vih"}>
                    <IoFlask /> Examenes VIH
                    </NavLink>
                  </li>
                </ul>
              </ul>
        </ul>
        {user && user.role === "admin" && (
          <div>
            <ul className="menu-list">
              <li>
                <NavLink to={"/estadisticas"}>
                  <IoStatsChart /> Estadisticas
                </NavLink>
              </li>
            </ul>
            <ul className="menu-list">
              <li>
                <NavLink to={"/personal"}>
                  <IoPeople /> Personal
                </NavLink>
              </li>
            </ul>
            <ul className="menu-list">
              <li>
                <NavLink to={"/users"}>
                  <IoPerson /> Usuarios
                </NavLink>
              </li>
            </ul>
          </div>
        )}
        <ul className="menu-list">
          <li>
            <button onClick={logout} className="button is-white">
              <IoLogOut /> Salir
            </button>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
