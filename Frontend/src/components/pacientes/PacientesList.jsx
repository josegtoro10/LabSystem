import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import salud2 from "../../styles/images/salud2.png"
import { IoAddCircle, IoTrashSharp, IoClipboard, IoPencil, IoSearch } from "react-icons/io5";
import Swal from 'sweetalert2'
import dayjs from 'dayjs';


const PacientesList = () => {
  const { user } = useSelector((state) => state.auth);
  const [Pacientes, setPacientes] = useState([]);
  const [count, setCount] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [sizePagina, setSizePagina] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const inicio = (paginaActual - 1) * sizePagina;
  const fin = inicio + sizePagina;
  const datosPaginados = Pacientes.slice(inicio, fin);

  useEffect(() => {
    getCount();
  }, []);

  const getCount = async () => {
    const response = await axios.get("http://localhost:5000/pacientes/count");
    setCount(response.data);
  };

  useEffect(() => {
    getPacientes();
  }, []);

  const getPacientes = async () => {
    const response = await axios.get("http://localhost:5000/pacientes");
    setPacientes(response.data);
  };

  const deletePacientes = async (pacientesId) => {
    Swal.fire({
      title: "¿Estas Seguro?",
      text: "Que quieres eliminar el paciente!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(`http://localhost:5000/pacientes/${pacientesId}`);
        getPacientes();
        Swal.fire({
          title: "Eliminado!",
          text: "El paciente ha sido eliminado",
          icon: "success"
        });
      }
    });
  };


  const handlePageChange = (nuevaPagina) => {
    setPaginaActual(nuevaPagina);
  };

  const handlePageSizeChange = (event) => {
    setSizePagina(parseInt(event.target.value));
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filterOptions = () => {
    const filteredOptions = datosPaginados.filter((datosPaginados) => {
      const searchTermLowerCase = searchTerm.toLowerCase();
      return (
        datosPaginados.cedula.toLowerCase().includes(searchTermLowerCase) ||
        datosPaginados.nombre.toLowerCase().includes(searchTermLowerCase) ||
        datosPaginados.apellido.toLowerCase().includes(searchTermLowerCase)
      );
    });
    return filteredOptions;
  };

  return (
    <div className="container has-background-light">
      <p className="subtitle is-6 is-pulled-right">HOSPITAL GENERAL
        <br />
        "DR ISRAEL RANUAREZ BALZA"
        <br />
        San Juan de los Morros, Edo.Guárico</p>
      <img src={salud2} width="150" alt="salud2" />
      <h1 className="title ">Pacientes</h1>
      <h2 className="subtitle">Lista de Pacientes</h2>
      {user && user.role === "admin" && (<h2 className="subtitle">Total: {count.count}</h2>)}
      <div className="field-body">
        <div className="field">
          <Link to="/pacientes/add" className="button is-link mb-2">
            AGREGAR  <IoAddCircle style={{ fontSize: '15px' }} />
          </Link>
        </div>
        <div className="field">
          <div className="control has-icons-left">
            <span className="icon is-left">
              <IoSearch />
            </span>
            <input
              className="input"
              type="text"
              value={searchTerm}
              onChange={handleChange}
              placeholder="Buscar Paciente"
            />
          </div>
        </div>
      </div>
      <table className="table is-narrow is-fullwidth">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Cedula</th>
            <th>Sexo</th>
            <th>Acciones</th>
            {user && user.role === "admin" && (
              <>
                <th>Creado Por</th>
                <th>Creado</th>
                <th>Actualizado</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {filterOptions().map((Pacientes) => (
            <tr key={Pacientes.uuid}>
              <td>{Pacientes.id}</td>
              <td>{Pacientes.nombre}</td>
              <td>{Pacientes.apellido}</td>
              <td>{Pacientes.cedula}</td>
              <td>{Pacientes.sexo}</td>
              <td className="buttons">
                <Link
                  to={`/pacientes/detalles/${Pacientes.uuid}`}
                  className="button is-small is-primary"
                >
                  <IoClipboard style={{ fontSize: '17px' }} />
                </Link>
                <Link
                  to={`/pacientes/edit/${Pacientes.uuid}`}
                  className="button is-small is-link"
                >
                  <IoPencil style={{ fontSize: '17px' }} />
                </Link>
                <button
                  onClick={() => deletePacientes(Pacientes.uuid)}
                  className="button is-small is-danger"
                >
                  <IoTrashSharp style={{ fontSize: '17px' }} />
                </button>
              </td>
              {user && user.role === "admin" && (
                <>
                  <td>{Pacientes.user.name}</td>
                  <td>{dayjs(Pacientes.createdAt).format('DD/MM/YYYY HH:mm')}</td>
                  <td>{dayjs(Pacientes.updatedAt).format('DD/MM/YYYY HH:mm')}</td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button className="button is-link" onClick={() => handlePageChange(paginaActual - 1)} disabled={paginaActual === 1}>
          Anterior
        </button>
        {[...Array(Math.ceil(Pacientes.length / sizePagina))].map((_, i) => (
          <button key={i + 1} onClick={() => handlePageChange(i + 1)} className={i + 1 === paginaActual ? 'active button' : 'button'}>
            {i + 1}
          </button>
        ))}
        <button className="button is-link" onClick={() => handlePageChange(paginaActual + 1)} disabled={paginaActual === Math.ceil(Pacientes.length / sizePagina)}>
          Siguiente
        </button>
      </div><br />
      <div className="field">
        <div className="select is-multiple">
          <select value={sizePagina} onChange={handlePageSizeChange}>
            <option value="10000000">Todos</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default PacientesList;
