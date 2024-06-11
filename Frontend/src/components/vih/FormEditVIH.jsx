import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import useMuestra from "../../hooks/MuestraId";
import usePaciente from "../../hooks/PacienteId";
import { Link } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import Swal from "sweetalert2";

const FormEditVIH = () => {
    const [resultado, setResultado] = useState("");
    const [observaciones, setObservaciones] = useState("");
    const [estatus, setEstatus] = useState("");
    const [fechaEntrega, setFechaEntrega] = useState(null);
    const [muestra, setMuestra] = useState("");
    const [paciente, setPaciente] = useState("");
    const [searchTerm, setSearchTerm] = useState('');
    const [searchMuestra, setSearchMuestra] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    const { muestraId } = useMuestra();
    const { pacienteId } = usePaciente();

    const handleEstatusChange = (event) => {
        const selectedEstatus = event.target.value;
        setEstatus(selectedEstatus);
        if (selectedEstatus === "No Entregado") {
            setFechaEntrega(null);
        }
    };

    useEffect(() => {
        const getVIHById = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/resultados/vih/${id}`
                );
                setResultado(response.data.resultado);
                setObservaciones(response.data.observaciones);
                setFechaEntrega(response.data.fechaEntrega);
                setEstatus(response.data.estatus);
                setMuestra(response.data.muestra);
                setPaciente(response.data.paciente)
            } catch (error) {
                if (error.response) {
                    console.log(error.response)
                }
            }
        };
        getVIHById();
    }, [id]);

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filterOptions = () => {
        const filteredOptions = pacienteId.filter((pacienteId) =>
            pacienteId.cedula.toLowerCase().includes(searchTerm.toLowerCase())
        );
        return filteredOptions;
    };

    const handleChangeMuestra = (event) => {
        setSearchMuestra(event.target.value);
    };

    const filterOptionsMuestras = () => {
        const filteredOptionsMuestras = muestraId.filter((muestraId) =>
            muestraId.pacienteId.toString().toLowerCase().includes(searchMuestra.toLowerCase())
        );
        return filteredOptionsMuestras;
    };


    const updateVIH = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:5000/resultados/vih/${id}`, {
                resultado: resultado,
                observaciones: observaciones,
                estatus: estatus,
                fechaEntrega: fechaEntrega,
                muestraId: muestra,
                pacienteId: paciente

            });
            navigate("/resultados/vih");
            Swal.fire({
                title: "Actualizado Exitosamente",
                text: "El resultado de VIH",
                icon: "success"
              });
        } catch (error) {
            if (error.response) {
                Swal.fire({
                    icon: "error",
                    title: "¡Error!",
                    text: "Verifica los campos e intenta nuevamente!",
                  });
                  console.error(error.response)
            }
        }
    };

    return (
        <div className="container has-background-danger">
            <Link to="/resultados/vih" style={{ margin: '8px' }} className="button is-white mb-2">
                <IoArrowBackOutline style={{ fontSize: '30px' }} />
            </Link>
            <section className="hero">
                <div className="hero-body">
                    <div className="box">
                        <h1 className="title">Examen de VIH</h1>
                        <h2 className="subtitle">Actualizar Resultado</h2>
                        <form onSubmit={updateVIH} >
                            <div className="field-body">
                                <div className="field">
                                    <label className="label">Buscar Paciente por N° Cedula</label>
                                    <div className="control">
                                        <input
                                            className="input"
                                            type="number"
                                            value={searchTerm}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Paciente</label>
                                    <div className="control">
                                        <div className="select is-multiple">
                                            <select value={paciente} onChange={(e) => setPaciente(e.target.value)} name="pacienteId">
                                                <option value="">Seleccione el Paciente</option>
                                                {filterOptions().map((pacienteId) => (
                                                    <option key={pacienteId.id} value={pacienteId.id}>
                                                        ID: {pacienteId.id}   Paciente: {pacienteId.nombre} {pacienteId.apellido} Cedula: {pacienteId.cedula}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <label className="label">Buscar Muestra por ID del Paciente</label>
                                    <div className="control">
                                        <input
                                            className="input"
                                            type="number"
                                            value={searchMuestra}
                                            onChange={handleChangeMuestra}
                                        />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Muestra</label>
                                    <div className="control">
                                        <div className="select is-multiple">
                                            <select value={muestra} name="muestraId" onChange={(e) => setMuestra(e.target.value)} disabled={!paciente}>
                                                <option value="">Seleccione la Muestra a procesar:</option>
                                                {filterOptionsMuestras().map((muestraId) => {
                                                    if (muestraId.examen === "Serología del VIH") {
                                                        return (
                                                            <option key={muestraId.id} value={muestraId.id}>
                                                                ID de la Muestra: {muestraId.id}   Tipo de Muestra: {muestraId.tipo} ID del Paciente: {muestraId.pacienteId}
                                                            </option>
                                                        );
                                                    } else {
                                                        return false
                                                    }
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <label className="label">Resultado</label>
                                    <div className="control">
                                        <input
                                            type="text"
                                            className="input"
                                            value={resultado}
                                            onChange={(e) => setResultado(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Observaciones</label>
                                    <div className="control">
                                        <input
                                            type="text"
                                            className="input"
                                            value={observaciones}
                                            onChange={(e) => setObservaciones(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <label className="label">Estatus</label>
                                    <div className="control">
                                        <div className="select is-fullwidth">
                                            <select
                                                value={estatus}
                                                onChange={handleEstatusChange}
                                            >
                                                <option value="">Selecciona el estatus del Resultado</option>
                                                <option value="Entregado">Entregado</option>
                                                <option value="No Entregado">No Entregado</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {estatus === "Entregado" && (
                                    <div className="field">
                                        <label className="label">Fecha de Entrega</label>
                                        <div className="control">
                                            <input
                                                hid
                                                disabled={estatus !== "Entregado"}
                                                type="date"
                                                className="input"
                                                value={fechaEntrega}
                                                onChange={(e) => setFechaEntrega(e.target.value)}
                                                placeholder="Fecha en que se entrego el resultado"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div><br />

                            <div className="field">
                                <div className="control">
                                    <button type="submit" className="button is-link">
                                        Actualizar
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FormEditVIH;
