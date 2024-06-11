import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import Swal from "sweetalert2";

const FormEditUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getUserById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${id}`);
        setName(response.data.name);
        setEmail(response.data.email);
        setRole(response.data.role);
        setPassword(response.data.password);
        setConfPassword(response.data.confPassword)
      } catch (error) {
        if (error.response) {
          console.error(error.response)
        }
      }
    };
    getUserById();
  }, [id]);

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/users/${id}`, {
        name: name,
        email: email,
        password: password,
        confPassword: confPassword,
        role: role,
      });
      navigate("/users");
      Swal.fire({
        title: "Usuario Actualizado Exitosamente",
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
    <div className="container has-background-link">
      <Link to="/users" style={{ margin: '8px' }} className="button is-white mb-2">
        <IoArrowBackOutline style={{ fontSize: '30px' }} />
      </Link>
      <section className="hero">
        <div className="hero-body">
          <div className="box">
            <h1 className="title">Usuarios</h1>
            <h2 className="subtitle">Agregar Nuevo Usuario</h2>
            <form onSubmit={updateUser}>
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
                  <button type="submit" className="button is-danger">
                    Actualizar
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

export default FormEditUser;
