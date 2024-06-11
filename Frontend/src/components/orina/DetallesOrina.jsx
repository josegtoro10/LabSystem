import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";

const DetallesOrina = () => {
    const [orina, setOrina] = useState([]);
    const [paciente, setPaciente] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const fetchOrina = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/resultados/orina/${id}`);
                setOrina(data);
            } catch (error) {
                console(error);
            }
        };

        fetchOrina();
    }, [id]);

    useEffect(() => {
        const fetchPaciente = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/pacientes/${orina.pacienteId}`);
                setPaciente(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPaciente();
    }, [orina.pacienteId]);
    

    return (
        <div className="container has-background-success">
            <Link to="/resultados/orina" style={{ margin: '8px' }} className="button is-white mb-2">
                <IoArrowBackOutline style={{ fontSize: '30px' }} />
            </Link>
            <section class="hero">
                <div className="hero-body">
                    <div className="box">
                        <h2 className="title is-4 mt-3">Datos del Paciente</h2>
                        <h4 className="mt-3" ><b>Nombre del Paciente:</b> {paciente.nombre} {paciente.apellido} </h4>
                        <h4 className="mt-3" ><b>Cedula:</b> {paciente.cedula} </h4>
                        <h4 className="mt-3" ><b>Fecha de Entrega:</b> {orina.fechaEntrega}</h4><br/>
                        <h2 className="title is-3 has-text-centered">Examen de Orina</h2>
                        <div className="columns">
                             <h4 className="column"><b>Aspecto:</b> {orina.aspecto}</h4>
                             <h4 className="column"><b>Color:</b> {orina.color}</h4> 
                             <h4 className="column"><b>Olor:</b> {orina.olor}</h4>
                             <h4 className="column"><b>Densidad:</b> {orina.densidad}</h4>
                        </div>
                            <div className="columns">
                                <h4 className="column"><b>PH:</b> {orina.ph}</h4>
                                <h4 className="column"><b>Proteinas:</b> {orina.proteinas}</h4>
                                <h4 className="column" ><b>Glucosa:</b> {orina.glucosa}</h4>
                                <h4 className="column"><b>Nitritos:</b> {orina.nitritos}</h4>
                            </div>
                            <div className="columns">
                                <h4 className="column"><b>C Cetonicos:</b> {orina.c_cetonicos}</h4>
                                <h4 className="column"><b>Bilirrubina:</b> {orina.bilirrubina}</h4>
                                <h4 className="column"><b>Urobilinogeno:</b> {orina.urobilinogeno}</h4>
                                <h4 className="column"><b>Hemoglobina:</b> {orina.hemoglobina}</h4>
                            </div>
                            <div className="columns">
                                <h4 className="column"><b>Cel Epiteliales:</b> {orina.cel_epiteliales}</h4>
                                <h4 className="column"><b>Bacterias:</b> {orina.bacterias}</h4>
                                <h4 className="column"><b>Leucocitos:</b> {orina.leucocitos}</h4>
                                <h4 className="column"><b>Hematies:</b> {orina.hematies}</h4>
                            </div>
                            <div className="columns">
                                <h4 className="column"><b>Mucina:</b> {orina.mucina}</h4>
                                <h4 className="column"><b>Piocitos:</b> {orina.piocitos}</h4>
                                <h4 className="column"><b>Cilindros:</b> {orina.cilindros}</h4>
                                <h4 className="column"><b>Cristales:</b> {orina.cristales}</h4>
                            </div>
                                <h4 className="mt-3"><b>Otros:</b> {orina.otros}</h4>
                    </div>
                </div>
            </section>
        </div>

    );
};

export default DetallesOrina;
