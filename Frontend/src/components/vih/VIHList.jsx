import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {  useSelector } from "react-redux";
import usePaciente from "../../hooks/PacienteId";
import salud2 from "../../styles/images/salud2.png"
import { IoTrashSharp, IoDownload, IoClipboard, IoPencil, IoAddCircle, IoSearch } from "react-icons/io5";
import PDF from "./PDF";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Swal from "sweetalert2";

const VIHList = () => {
  const [datosMapeados, setDatosMapeados] = useState([]);
  const [VIH, setVIH] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const [paginaActual, setPaginaActual] = useState(1);
  const [sizePagina, setSizePagina] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const inicio = (paginaActual - 1) * sizePagina;
  const fin = inicio + sizePagina;
  const datosPaginados = datosMapeados.slice(inicio, fin);

  const { pacienteId } = usePaciente();

  useEffect(() => {
    getVIH();
  }, []);

  const getVIH = async () => {
    const response = await axios.get("http://localhost:5000/resultados/vih");
    setVIH(response.data);
  };

  const deleteVIH = async (VIHId) => {
    Swal.fire({
      title: "¿Estas Seguro?",
      text: "Quieres eliminar el resultado de orina!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar"
    }).then(async(result) => {
      if (result.isConfirmed) {
        await axios.delete(`http://localhost:5000/resultados/vih/${VIHId}`);
        getVIH();
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
  

  const mapearDatos = (VIH, pacientes) => {
    return VIH.map((vih) => {
      const paciente = pacientes.find((paciente) => paciente.id === vih.pacienteId);
      if (paciente) {
        return {
          ...vih,
          cedula: paciente.cedula,
          numeroCedulas: 1,
          cedulas: [paciente.cedula],
        };
      } else {
        return {
          ...vih,
          cedula: null,
          numeroCedulas: 0,
          cedulas: [],
        };
      }
    });
  };

  useEffect(() => {
    const datosConCedulas = mapearDatos(VIH, pacienteId);
    setDatosMapeados(datosConCedulas);
  }, [VIH, pacienteId]);



  return (
    <div className="container">
      <p className="subtitle is-6 is-pulled-right">HOSPITAL GENERAL
        <br />
        "DR ISRAEL RANUAREZ BALZA"
        <br />
        San Juan de los Morros, Edo.Guárico</p>
      <img src={salud2} width="150" alt="salud2" />
      <h1 className="title">Resultados</h1>
      <h2 className="subtitle">Examenes de VIH</h2>
      <div className="field-body">
        <div className="field">
          <Link to="/resultados/vih/add" className="button is-link mb-2">
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
          </tr>
        </thead>
        <tbody>
          {filterOptions().map((VIH) => (
            <tr key={VIH.uuid}>
              <td>{VIH.id}</td>
              <td>{VIH.muestraId}</td>
              <td>{VIH.pacienteId}</td>
              <td>{VIH.cedula}</td>
              <td>{VIH.fechaEntrega}</td>
              <td>{VIH.estatus}</td>
              {user && user.role === "admin" && (
                <td>
                <div>
                <PDFDownloadLink document={<PDF id={VIH.id} doc={VIH} />} fileName="Resultado-VIH.pdf">
                  {({ loading, url, error, blob }) =>
                    loading ? (
                      <button className="button is-small is-danger" disabled={VIH.estatus !== "Entregado"}>Cargando PDF...</button>
                    ) : (
                      <button className="button is-small is-danger" disabled={VIH.estatus !== "Entregado"}><IoDownload style={{fontSize: '17px'}}/></button>
                    )
                  }
                </PDFDownloadLink>
                </div>
                </td>
              )}
              
              <td className="buttons">
                <Link
                  to={`/resultados/vih/detalles/${VIH.uuid}`}
                  className="button is-small is-primary"
                >
                  <IoClipboard style={{fontSize: '17px'}}/>
                </Link>
                <Link
                  to={`/resultados/vih/edit/${VIH.uuid}`}
                  className="button is-small is-link"
                >
                 <IoPencil style={{fontSize: '17px'}}/>
                </Link>
                <button
                  onClick={() => deleteVIH(VIH.uuid)}
                  className="button is-small is-danger"
                ><IoTrashSharp style={{fontSize: '17px'}} />
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
        {[...Array(Math.ceil(VIH.length / sizePagina))].map((_, i) => (
          <button key={i + 1} onClick={() => handlePageChange(i + 1)} className={i + 1 === paginaActual ? 'active button' : 'button'}>
            {i + 1}
          </button>
        ))}
        <button className="button is-link" onClick={() => handlePageChange(paginaActual + 1)} disabled={paginaActual === Math.ceil(VIH.length / sizePagina)}>
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

export default VIHList;
