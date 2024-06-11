import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { IoArrowBackOutline  } from "react-icons/io5";

const DetallesPacientes = () => {
  const [paciente, setPaciente] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchPaciente = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/pacientes/${id}`);
        setPaciente(data);
      } catch (error) {
        console(error);
      }
    };

    fetchPaciente();
  }, [id]);

  return (
    <div className="container has-background-success">
      <Link to="/pacientes" style={{margin:'8px'}} className="button is-white mb-2">
        <IoArrowBackOutline  style={{ fontSize: '30px' }} />
      </Link>
      <section className="hero">
        <div className="hero-body">
          <div className="box">
                <h1 className="title is-3">Datos del Paciente</h1>
                <h3 className="mt-3"><b>Nombre y Apellido:</b> {paciente.nombre} {paciente.apellido} </h3>
                <h3 className="mt-3"><b>Cedula:</b> {paciente.cedula}</h3>
                <h3 className="mt-3"><b>Sexo:</b> {paciente.sexo}</h3>
                <h3 className="mt-3"><b>Edad:</b> {paciente.edad} años</h3>
                <h3 className="mt-3"><b>Telefono:</b> {paciente.telefono}</h3>
                <h3 className="mt-3"><b>Dirección:</b> {paciente.direccion}</h3>
              </div>
            </div>
          </section>
        </div>

  );
};

export default DetallesPacientes;
