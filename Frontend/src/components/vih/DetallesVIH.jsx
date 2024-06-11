import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";

const DetallesVIHs = () => {
  const [vih, setVIH] = useState([]);
  const [paciente, setPaciente] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchVIH = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/resultados/vih/${id}`);
        setVIH(data);
      } catch (error) {
        console(error);
      }
    };

    fetchVIH();
  }, [id]);

  useEffect(() => {
    const fetchPaciente = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/pacientes/${vih.pacienteId}`);
        setPaciente(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPaciente();
  }, [vih.pacienteId]);


  return (
    <div className="container has-background-success">
      <Link to="/resultados/vih" style={{ margin: '8px' }} className="button is-white mb-2">
        <IoArrowBackOutline style={{ fontSize: '30px' }} />
      </Link>
      <section class="hero">
        <div className="hero-body">
          <div className="box">
            <div className="field-body">
              <div className="field">
            <h2 className="title is-4 mt-3">Datos del Paciente</h2>
            <h4 className="mt-3"><b>Paciente:</b> {paciente.nombre} {paciente.apellido} </h4>
            <h4 className="mt-3"><b>Cedula:</b> {paciente.cedula} </h4>
            <h4 className="mt-3"><b>Fecha de Entrega:</b> {vih.fechaEntrega}</h4><br />
            </div>
            <div className="field">
            <h2 className="title is-4 mt-3">Examen de VIH</h2>
              <h4 className="mt-3"><b>Resultado:</b> {vih.resultado}</h4>
              <h4 className="mt-3"><b>Observaciones:</b> {vih.observaciones}</h4>
              </div>
          </div>
          </div>
        </div>
      </section>
    </div>

  );
};

export default DetallesVIHs;
