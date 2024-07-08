import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import usePaciente from "../../hooks/PacienteId";
import salud2 from "../../styles/images/salud2.png"
import { IoTrashSharp, IoDownload, IoClipboard, IoPencil, IoAddCircle, IoSearch, IoDocumentTextOutline } from "react-icons/io5";
import PDF from "./PDF";
import Reporte from "./Reporte";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Swal from 'sweetalert2'
import dayjs from 'dayjs';

const OrinaList = () => {
  const [datosMapeados, setDatosMapeados] = useState([]);
  const [Orina, setOrina] = useState([]);
  const [count, setCount] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const [paginaActual, setPaginaActual] = useState(1);
  const [sizePagina, setSizePagina] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const inicio = (paginaActual - 1) * sizePagina;
  const fin = inicio + sizePagina;
  const datosPaginados = datosMapeados.slice(inicio, fin);

  const { pacienteId } = usePaciente();

  useEffect(() => {
    getCount();
  }, []);

  const getCount = async () => {
    const response = await axios.get("http://localhost:5000/resultados/orina/count");
    setCount(response.data);
  };

  useEffect(() => {
    getOrina();
  }, []);

  const getOrina = async () => {
    const response = await axios.get("http://localhost:5000/resultados/orina");
    setOrina(response.data);
  };

  const deleteOrina = async (orinaId) => {
    Swal.fire({
      title: "¿Estas Seguro?",
      text: "Quieres eliminar el resultado de orina!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(`http://localhost:5000/resultados/orina/${orinaId}`);
        getOrina();
        Swal.fire({
          title: "Eliminado!",
          text: "El resultado ha sido eliminado",
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
    return filteredOptions;
  };


  const mapearDatos = (Orina, pacientes) => {
    return Orina.map((orina) => {
      const paciente = pacientes.find((paciente) => paciente.id === orina.pacienteId);
      if (paciente) {
        return {
          ...orina,
          cedula: paciente.cedula,
          numeroCedulas: 1,
          cedulas: [paciente.cedula],
        };
      } else {
        return {
          ...orina,
          cedula: null,
          numeroCedulas: 0,
          cedulas: [],
        };
      }
    });
  };

  useEffect(() => {
    const datosConCedulas = mapearDatos(Orina, pacienteId);
    setDatosMapeados(datosConCedulas);
  }, [Orina, pacienteId]);

  return (
    <div className="container">
      <p className="subtitle is-6 is-pulled-right">HOSPITAL GENERAL
        <br />
        "DR ISRAEL RANUAREZ BALZA"
        <br />
        San Juan de los Morros, Edo.Guárico</p>
      <img src={salud2} width="150" alt="salud2" />
      <h1 className="title">Resultados</h1>
      <h2 className="subtitle">Examenes de Orina</h2>
      {user && user.role === "admin" && (<h2 className="subtitle">Total: {count.count}</h2>)}
      <div className="field-body">
        <div className="field">
          <Link to="/resultados/orina/add" className="button is-link mb-2">
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
              placeholder="Buscar Resultado por: ID o Cedula del Paciente"
            />
          </div>
        </div>
        {user && user.role === "admin" && (
          <div className="field">
            <PDFDownloadLink document={<Reporte id={Orina.id} doc={datosMapeados} />} fileName="Reporte-Orina.pdf">
              {({ loading, url, error, blob }) =>
                loading ? (
                  <button className="button is-small is-danger">Cargando Reporte...</button>
                ) : (
                  <button className="button is-small is-danger"><IoDocumentTextOutline style={{ fontSize: '17px' }} />Reporte</button>
                )
              }
            </PDFDownloadLink>
          </div>
        )}
      </div>
      <table className="table is-narrow is-fullwidth">
        <thead>
          <tr>
            <th>Id</th>
            <th>Id de la Muestra</th>
            <th>Id del Paciente</th>
            <th>Cedula del Paciente</th>
            <th>Fecha Entrega</th>
            <th>Estatus</th>
            {user && user.role === "admin" && (
              <th>PDF</th>
            )}
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
          {filterOptions().map((Orina) => (
            <tr key={Orina.uuid}>
              <td>{Orina.id}</td>
              <td>{Orina.muestraId}</td>
              <td>{Orina.pacienteId}</td>
              <td>{Orina.cedula}</td>
              <td>{dayjs(Orina.fechaEntrega).format('DD/MM/YYYY')}</td>
              <td>{Orina.estatus}</td>
              {user && user.role === "admin" && (
                <td>
                  <div>
                    <PDFDownloadLink document={<PDF id={Orina.id} doc={Orina} />} fileName="Resultado-Orina.pdf">
                      {({ loading, url, error, blob }) =>
                        loading ? (
                          <button className="button is-small is-danger" disabled={Orina.estatus !== "Entregado"}>Cargando PDF...</button>
                        ) : (
                          <button className="button is-small is-danger" disabled={Orina.estatus !== "Entregado"}><IoDownload style={{ fontSize: '17px' }} /></button>
                        )
                      }
                    </PDFDownloadLink>
                  </div>
                </td>
              )}

              <td className="buttons">
                <Link
                  to={`/resultados/orina/detalles/${Orina.uuid}`}
                  className="button is-small is-primary"
                >
                  <IoClipboard style={{ fontSize: '17px' }} />
                </Link>
                <Link
                  to={`/resultados/orina/edit/${Orina.uuid}`}
                  className="button is-small is-link"
                >
                  <IoPencil style={{ fontSize: '17px' }} />
                </Link>
                <button
                  onClick={() => deleteOrina(Orina.uuid)}
                  className="button is-small is-danger"
                ><IoTrashSharp style={{ fontSize: '17px' }} />
                </button>
              </td>
              {user && user.role === "admin" && (
                <>
                  <td>{Orina.user.name}</td>
                  <td>{dayjs(Orina.createdAt).format('DD/MM/YYYY HH:mm')}</td>
                  <td>{dayjs(Orina.updatedAt).format('DD/MM/YYYY HH:mm')}</td>
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
        {[...Array(Math.ceil(Orina.length / sizePagina))].map((_, i) => (
          <button key={i + 1} onClick={() => handlePageChange(i + 1)} className={i + 1 === paginaActual ? 'active button' : 'button'}>
            {i + 1}
          </button>
        ))}
        <button className="button is-link" onClick={() => handlePageChange(paginaActual + 1)} disabled={paginaActual === Math.ceil(Orina.length / sizePagina)}>
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

export default OrinaList;
