import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import salud2 from "../../styles/images/salud2.png"
import { IoAddCircle, IoTrashSharp, IoClipboard, IoPencil, IoSearch } from "react-icons/io5";
import usePaciente from "../../hooks/PacienteId";
import Swal from 'sweetalert2'
import dayjs from 'dayjs';

const MuestrasList = () => {
  const { user } = useSelector((state) => state.auth);
  const [datosMapeados, setDatosMapeados] = useState([]);
  const [Muestras, setMuestras] = useState([]);
  const [count, setCount] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [sizePagina, setSizePagina] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const inicio = (paginaActual - 1) * sizePagina;
  const fin = inicio + sizePagina;
  const datosPaginados = datosMapeados.slice(inicio, fin, datosMapeados);

  const { pacienteId } = usePaciente();

  useEffect(() => {
    getCount();
  }, []);

  const getCount = async () => {
    const response = await axios.get("http://localhost:5000/muestras/count");
    setCount(response.data);
  };

  useEffect(() => {
    getMuestras();
  }, []);


  const getMuestras = async () => {
    const response = await axios.get("http://localhost:5000/muestras");
    setMuestras(response.data);
  };

  const deleteMuestras = async (muestrasId) => {
    Swal.fire({
      title: "¿Estas Seguro?",
      text: "Que quieres eliminar la muestra!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar"
    }).then(async(result) => {
      if (result.isConfirmed) {
        await axios.delete(`http://localhost:5000/muestras/${muestrasId}`);
        getMuestras();
        Swal.fire({
          title: "Eliminada!",
          text: "La Muestra ha sido eliminado",
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
      if (!datosPaginados) {
        return false; 
      }
      const searchTermLowerCase = searchTerm.toLowerCase(); 
      return (
        datosPaginados.cedula?.toLowerCase().includes(searchTermLowerCase) ||
        datosPaginados.pacienteId?.toString().toLowerCase().includes(searchTermLowerCase)
        );
      });
      return filteredOptions
  };
  

  const mapearDatos = (Muestras, pacientes) => {
    return Muestras.map((muestra) => {
      const paciente = pacientes.find((paciente) => paciente.id === muestra.pacienteId);
      if (paciente) {
        return {
          ...muestra,
          cedula: paciente.cedula,
          numeroCedulas: 1,
          cedulas: [paciente.cedula],
        };
      } else {
        return {
          ...muestra,
          cedula: null,
          numeroCedulas: 0,
          cedulas: [],
        };
      }
    });
  };

  useEffect(() => {
    const datosConCedulas = mapearDatos(Muestras, pacienteId);
    setDatosMapeados(datosConCedulas);
  }, [Muestras, pacienteId]);

  return (
    <div className="container">
      <p className="subtitle is-6 is-pulled-right">HOSPITAL GENERAL
        <br />
        "DR ISRAEL RANUAREZ BALZA"
        <br />
        San Juan de los Morros, Edo.Guárico</p>
      <img src={salud2} width="150" alt="salud2" />
      <h1 className="title">Muestras</h1>
      <h2 className="subtitle">Lista de Muestras</h2>
      {user && user.role === "admin" && (<h2 className="subtitle">Total: {count.count}</h2>)}
      <div className="field-body">
        <div className="field">
          <Link to="/muestras/add" className="button is-link mb-2">
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
              placeholder="Buscar Muestra Por: ID o Cedula del Paciente"
            />
          </div>
        </div>
      </div>
      <table className="table is-narrow is-fullwidth">
        <thead>
          <tr>
            <th>Id</th>
            <th>Tipo</th>
            <th>Examen</th>
            <th>Id del Paciente</th>
            <th>Cedula del Paciente</th>
            <th>Fecha de Recepción</th>
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
          {filterOptions().map((Muestras) => (
            <tr key={Muestras.uuid}>
              <td>{Muestras.id}</td>
              <td>{Muestras.tipo}</td>
              <td>{Muestras.examen}</td>
              <td>{Muestras.pacienteId}</td>
              <td>{Muestras.cedula}</td>
              <td>{dayjs(Muestras.fechaRecepcion).format('DD/MM/YYYY')}</td>
              <td className="buttons">
                <Link
                  to={`/muestras/detalles/${Muestras.uuid}`}
                  className="button is-small is-primary" 
                >
                  <IoClipboard style={{ fontSize: '17px' }} />
                </Link>
                <Link
                  to={`/muestras/edit/${Muestras.uuid}`}
                  className="button is-small is-link"
                >
                  <IoPencil style={{ fontSize: '17px' }} />
                </Link>
                <button
                  onClick={() => deleteMuestras(Muestras.uuid)}
                  className="button is-small is-danger"
                >
                  <IoTrashSharp style={{ fontSize: '17px' }} />
                </button>
              </td>
              {user && user.role === "admin" && (
                <>
                  <td>{Muestras.user.name}</td>
                  <td>{dayjs(Muestras.createdAt).format('DD/MM/YYYY HH:mm')}</td>
                  <td>{dayjs(Muestras.updatedAt).format('DD/MM/YYYY HH:mm')}</td>
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
        {[...Array(Math.ceil(Muestras.length / sizePagina))].map((_, i) => (
          <button key={i + 1} onClick={() => handlePageChange(i + 1)} className={i + 1 === paginaActual ? 'active button' : 'button'}>
            {i + 1}
          </button>
        ))}
        <button className="button is-link" onClick={() => handlePageChange(paginaActual + 1)} disabled={paginaActual === Math.ceil(Muestras.length / sizePagina)}>
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

export default MuestrasList;
