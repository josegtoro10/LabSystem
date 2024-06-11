import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import Swal from "sweetalert2";

const FormAddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const saveUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/users", {
        name: name,
        email: email,
        password: password,
        confPassword: confPassword,
        role: role,
      });
      navigate("/users");
      Swal.fire({
        title: "Usuario Agregado Exitosamente",
        icon: "success"
      });
    } catch (error) {
      if (error.response) {
        Swal.fire({
          icon: "error",
          title: "¡Error!",
          text: "Verifica los campos e intenta nuevamente!",
        });
        console.error(error.response)
      }
    }
  };
  return (
    <div className="container has-background-danger">
      <Link to="/users" style={{ margin: '8px' }} className="button is-white mb-2">
        <IoArrowBackOutline style={{ fontSize: '30px' }} />
      </Link>
      <section className="hero">
        <div className="hero-body">
          <div className="box">
            <h1 className="title">Usuarios</h1>
            <h2 className="subtitle">Agregar Nuevo Usuario</h2>
            <form onSubmit={saveUser}>
              <div className="field-body">
                <div className="field">
                  <label className="label">Nombre de Usuario</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Nombre de Usuario"
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Correo Electrónico</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Correo Electrónico"
                    />
                  </div>
                </div>
              </div>
              <div className="field-body">
                <div className="field">
                  <label className="label">Contraseña</label>
                  <div className="control">
                    <input
                      type="password"
                      className="input"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="******"
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Confirmar Contraseña</label>
                  <div className="control">
                    <input
                      type="password"
                      className="input"
                      value={confPassword}
                      onChange={(e) => setConfPassword(e.target.value)}
                      placeholder="******"
                    />
                  </div>
                </div>
              </div>
              <div className="field">
                <label className="label">Role</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="">Selecciona el Role</option>
                      <option value="admin">Administrador</option>
                      <option value="user">Usuario</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-link">
                    Agregar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FormAddUser;
