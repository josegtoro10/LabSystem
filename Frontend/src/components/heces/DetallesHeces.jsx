import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";

const DetallesHeces = () => {
    const [heces, setHeces] = useState([]);
    const [paciente, setPaciente] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const fetchHeces = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/resultados/heces/${id}`);
                setHeces(data);
            } catch (error) {
                console(error);
            }
        };

        fetchHeces();
    }, [id]);

    useEffect(() => {
        const fetchPaciente = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/pacientes/${heces.pacienteId}`);
                setPaciente(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPaciente();
    }, [heces.pacienteId]);



    return (
        <div className="container has-background-success">
            <Link to="/resultados/heces" style={{ margin: '8px' }} className="button is-white mb-2">
                <IoArrowBackOutline style={{ fontSize: '30px' }} />
            </Link>
            <section className="hero">
                <div className="hero-body">
                    <div className="box">
                        <div className="field-body">
                            <div className="field">
                                <h4 className="title is-4 mt-3">Datos del Paciente</h4>
                                <h4 className="mt-3"><b>Nombre y Apellido:</b> {paciente.nombre} {paciente.apellido} </h4>
                                <h4 className="mt-3"><b>Cedula:</b> {paciente.cedula} </h4>
                                <h4 className="mt-3"><b>Fecha de Entrega:</b> {heces.fechaEntrega}</h4><br />
                            </div>
                            <div className="field">
                                <h2 className="title is-3 mt-3">Examen de Heces</h2>
                                <div className="columns">
                                    <h4 className="column"><b>Aspecto:</b> {heces.aspecto}</h4>
                                    <h4 className="column"><b>Consistencia:</b> {heces.consistencia}</h4>
                                    <h4 className="column"><b>Color:</b> {heces.color}</h4>
                                </div>
                                <div className="columns">
                                    <h4 className="column"><b>Olor:</b> {heces.olor}</h4>
                                    <h4 className="column"><b>Moco:</b> {heces.moco}</h4>
                                    <h4 className="column"><b>Sangre:</b> {heces.sangre}</h4>
                                </div>
                                <h4 className="mt-3" ><b>Restos Alimenticios:</b> {heces.restosAlimenticios}</h4>
                                <h4 className="mt-3"><b>Examen Microscopico:</b> {heces.microscopio}</h4>
                                <h4 className="mt-3"><b>Otros Elementos:</b> {heces.otrosElementos}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    );
};

export default DetallesHeces;
