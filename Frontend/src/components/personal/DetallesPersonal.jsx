import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";

const DetallesPersonal = () => {
  const [personal, setPersonal] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchPersonal = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/personal/${id}`);
        setPersonal(data);
      } catch (error) {
        console(error);
      }
    };

    fetchPersonal();
  }, [id]);

  return (
    <div className="container has-background-success">
      <Link to="/personal" style={{ margin: '8px' }} className="button is-white mb-2">
        <IoArrowBackOutline style={{ fontSize: '30px' }} />
      </Link>
      <section className="hero">
        <div className="hero-body">
          <div className="box">
            <h1 className="title is-3 has-text-centered">Datos del Empleado</h1>
              <div className="columns">
                <div className="column">
                  <h1 className="title is-4">Datos Personales</h1>
                  <h3 className="mt-3"><b>Nombre:</b> {personal.nombre}</h3>
                  <h3 className="mt-3"><b>Apellido:</b>{personal.apellido} </h3>
                  <h3 className="mt-3"><b>Cedula:</b> {personal.cedula}</h3>
                  <h3 className="mt-3"><b>Sexo:</b> {personal.sexo}</h3>
                  <h3 className="mt-3"><b>Edad:</b> {personal.edad} años</h3>
                  <h3 className="mt-3"><b>Telefono:</b> {personal.telefono}</h3>
                  <h3 className="mt-3"><b>Dirección:</b> {personal.direccion}</h3>
                </div>
                <div className="column">
                  <h1 className="title is-4">Datos Laborales</h1>
                  <h3 className="mt-3"><b>Codigo:</b> {personal.codigo}</h3>
                  <h3 className="mt-3"><b>Cargo:</b> {personal.cargo}</h3>
                  <h3 className="mt-3"><b>Turno:</b> {personal.turno}</h3>
                  <h3 className="mt-3"><b>Estatus:</b> {personal.estatus}</h3>
                  <h3 className="mt-3"><b>Fecha de Ingreso:</b> {personal.fechaIngreso}</h3>
                </div>
              </div>
            </div>
        </div>
      </section>
    </div>

  );
};

export default DetallesPersonal;
