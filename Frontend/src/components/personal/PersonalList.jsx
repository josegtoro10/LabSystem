import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import salud2 from "../../styles/images/salud2.png"
import { IoAddCircle, IoTrashSharp, IoClipboard, IoPencil, IoSearch } from "react-icons/io5";
import Swal from "sweetalert2";

const PersonalList = () => {
  const [Personal, setPersonal] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [sizePagina, setSizePagina] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const inicio = (paginaActual - 1) * sizePagina;
  const fin = inicio + sizePagina;
  const datosPaginados = Personal.slice(inicio, fin);

  useEffect(() => {
    getPersonal();
  }, []);

  const getPersonal = async () => {
    const response = await axios.get("http://localhost:5000/personal");
    setPersonal(response.data);
  };

  const deletePersonal = async (personalId) => {
    Swal.fire({
      title: "¿Estas Seguro?",
      text: "Que quieres eliminar el paciente!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar"
    }).then(async(result) => {
      if (result.isConfirmed) {
        await axios.delete(`http://localhost:5000/personal/${personalId}`);
        getPersonal();
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
    const filteredOptions = datosPaginados.filter((datosPaginados) =>
      datosPaginados.codigo.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return filteredOptions;
  };

  return (
    <div className="container has-background-light">
      <p className="subtitle is-6 is-pulled-right">HOSPITAL GENERAL
      <br/>
      "DR ISRAEL RANUAREZ BALZA"
      <br/>
      San Juan de los Morros, Edo.Guárico</p>
      <img src={salud2} width="150" alt="salud2" />
      <h1 className="title ">Personal</h1>
      <h2 className="subtitle">Lista de Personal</h2>
      <div className="field-body">
        <div className="field">
          <Link to="/personal/add" className="button is-link mb-2">
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
              type="number"
              value={searchTerm}
              onChange={handleChange}
              placeholder="Buscar Codigo del Empleado"
            />
          </div>
        </div>
      </div>
      <table className="table is-narrow is-fullwidth">
        <thead>
          <tr>
            <th>Codigo</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Cargo</th>
            <th>Turno</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filterOptions().map((Personal) => (
            <tr key={Personal.uuid}>
              <td>{Personal.codigo}</td>
              <td>{Personal.nombre}</td>
              <td>{Personal.apellido}</td>
              <td>{Personal.cargo}</td>
              <td>{Personal.turno}</td>
              <td className="buttons">
                <Link
                  to={`/personal/detalles/${Personal.uuid}`}
                  className="button is-small is-primary"
                >
                  <IoClipboard style={{fontSize: '17px'}}/>
                </Link>
                <Link
                  to={`/personal/edit/${Personal.uuid}`}
                  className="button is-small is-link"
                >
                  <IoPencil style={{fontSize: '17px'}}/>
                </Link>
                <button
                  onClick={() => deletePersonal(Personal.uuid)}
                  className="button is-small is-danger"
                >
                  <IoTrashSharp style={{fontSize: '17px'}} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button className="button is-link" onClick={() => handlePageChange(paginaActual - 1)} disabled={paginaActual === 1}>
          Anterior
        </button>
        {[...Array(Math.ceil(Personal.length / sizePagina))].map((_, i) => (
          <button key={i + 1} onClick={() => handlePageChange(i + 1)} className={i + 1 === paginaActual ? 'active button' : 'button'}>
            {i + 1}
          </button>
        ))}
        <button className="button is-link" onClick={() => handlePageChange(paginaActual + 1)} disabled={paginaActual === Math.ceil(Personal.length / sizePagina)}>
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

export default PersonalList;
