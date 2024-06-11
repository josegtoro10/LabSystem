import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser, reset } from "../features/authSlice";
import { IoLockClosed, IoPerson } from "react-icons/io5";
import salud from "../styles/images/salud.png";
import salud1 from "../styles/images/salud1.jpg";
import salud2 from "../styles/images/salud2.png"

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user || isSuccess) {
      navigate("/dashboard");
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  const Auth = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ name, password }));
  };

  return (
    <div className="container has-background-light">
      <div className="columns">
        <div className="column is-three-fifths">
          <img src={salud2} width="230" alt="salud2" />
          <h3 className="subtitle is-4 is-pulled-right">Hospital General<br />"Dr.Israel Ranuarez Balza"</h3><br />
          <h3 className="title is-3 is-pulled-right">Servicio de Laboratorio</h3>
          <img src={salud} width="350" alt="salud" />
        </div>
        <form onSubmit={Auth} className="box column">
          <div className="column has-text-centered"><img className="is-inline-block" src={salud1} width="150" alt="salud1" /></div>
          <h3 className="title is-3 has-text-centered">Inicio de Sesión</h3>
          {isError && <p className="has-text-centered">{message}</p>}
          <div className="field">
            <label className="label">Usuario</label>
            <div className="control has-icons-left">
              <span className="icon is-left">
                <IoPerson />
              </span>
              <input
                type="text"
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Usuario"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Contraseña</label>
            <div className="control has-icons-left">
              <span className="icon is-left">
                <IoLockClosed />
              </span>
              <input
                type="password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
              />
            </div>
          </div>
          <div className="field mt-5">
            <button
              type="submit"
              className="button is-link is-medium is-fullwidth"
            >
              {isLoading ? "Ingresando..." : "Ingresar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
