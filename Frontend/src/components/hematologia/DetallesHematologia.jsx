import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";

const DetallesHematologias = () => {
  const [hematologia, setHematologia] = useState([]);
  const [paciente, setPaciente] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchHematologia = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/resultados/hematologia/${id}`);
        setHematologia(data);
      } catch (error) {
        console(error);
      }
    };

    fetchHematologia();
  }, [id]);

  useEffect(() => {
    const fetchPaciente = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/pacientes/${hematologia.pacienteId}`);
        setPaciente(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPaciente();
  }, [hematologia.pacienteId]);


  return (
    <div className="container has-background-success">
      <Link to="/resultados/hematologia" style={{ margin: '8px' }} className="button is-white mb-2">
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
                <h4 className="mt-3"><b>Fecha de Entrega:</b> {hematologia.fechaEntrega}</h4><br />
              </div>
              <div className="field">
                <h2 className="title is-4 mt-3">Examen de Hematologia</h2>
                <h4 className="mt-3"><b>Hemoglobina:</b> {hematologia.hemoglobina}g/dL</h4>
                <h4 className="mt-3"><b>Hematocritos:</b> {hematologia.hematocrito}%</h4>
                <h4 className="mt-3"><b>C.H.C.M:</b> {hematologia.chcm}%</h4>
                <h4 className="mt-3"><b>V.S.G:</b> {hematologia.vsg}mm/Horas</h4>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

  );
};

export default DetallesHematologias;
