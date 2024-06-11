import React, { useState, useEffect } from "react";
import axios from "axios";
import {  useParams } from "react-router-dom";
import {  IoArrowBackOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const DetallesMuestras = () => {
  const [muestra, setMuestra] = useState([]);
  const [paciente, setPaciente] = useState([]); 
  const { id } = useParams();


  useEffect(() => {
    const fetchMuestra = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/muestras/${id}`);
        setMuestra(data);
      } catch (error) {
        console(error);
      }
    };

    fetchMuestra();
  }, [id]);

  useEffect(() => {
    const fetchPaciente = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/pacientes/${muestra.pacienteId}`);
        setPaciente(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPaciente();
  }, [muestra.pacienteId]);


  return (
    <div className="container has-background-success">
      <Link to="/muestras" style={{ margin: '8px' }} className="button is-white mb-2">
        <IoArrowBackOutline style={{ fontSize: '30px' }} />
      </Link>
      <section class="hero">
        <div className="hero-body">
          <div className="box">
            <h2 className="title is-3 has-text-centered">Datos de la Muestra</h2>
            <h4 className="mt-3"><b>Nombre del Paciente:</b> {paciente.nombre} {paciente.apellido} </h4>
            <h4 className="mt-3"><b>Cedula:</b> {paciente.cedula} </h4>
            <h3 className="mt-3"><b>Tipo de Muestra:</b> {muestra.tipo}</h3>
            <h3 className="mt-3"><b>Examen a realizar:</b> {muestra.examen}</h3>
            <h3 className="mt-3"><b>Fecha de Recepción:</b> {muestra.fechaRecepcion}</h3>
          </div>
        </div>
      </section>
    </div>

  );
};

export default DetallesMuestras;
