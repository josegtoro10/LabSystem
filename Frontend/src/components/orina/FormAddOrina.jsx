import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import usePaciente from "../../hooks/PacienteId";
import useOrina from "../../hooks/Orina"
import { Link } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import Swal from "sweetalert2";

const FormAddOrina = () => {
    const [aspecto, setAspecto] = useState("");
    const [color, setColor] = useState("");
    const [olor, setOlor] = useState("");
    const [densidad, setDensidad] = useState("");
    const [ph, setPh] = useState("");
    const [proteinas, setProteinas] = useState("");
    const [glucosa, setGlucosa] = useState("");
    const [nitritos, setNitritos] = useState("");
    const [c_cetonicos, setC_cetonicos] = useState("");
    const [bilirrubina, setBilirrubina] = useState("");
    const [urobilinogeno, setUrobilinogeno] = useState("");
    const [hemoglobina, setHemoglobina] = useState("");
    const [cel_epiteliales, setCel_epiteliales] = useState("");
    const [bacterias, setBacterias] = useState("");
    const [leucocitos, setLeucocitos] = useState("");
    const [hematies, setHematies] = useState("");
    const [mucina, setMucina] = useState("");
    const [piocitos, setPiocitos] = useState("");
    const [cilindros, setCilindros] = useState("");
    const [cristales, setCristales] = useState("");
    const [otros, setOtros] = useState("");
    const [estatus, setEstatus] = useState("");
    const [fechaEntrega, setFechaEntrega] = useState(null);
    const [Muestras, setMuestras] = useState([]);
    const [muestra, setMuestra] = useState("");
    const [paciente, setPaciente] = useState("");
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();


    const { pacienteId } = usePaciente();

    const { orina } = useOrina();

    useEffect(() => {
        if (paciente) {
            axios.get(`http://localhost:5000/muestras/pacienteId/${paciente}`)
                .then(response => {
                    const muestrasFiltradas = response.data.filter(muestra => {
                        const muestraYaExiste = orina.some(orina => {
                            return orina.muestraId === muestra.id && orina.pacienteId
                        });
                        return !muestraYaExiste;
                    });
                    setMuestras(muestrasFiltradas);
                })
                .catch(error => console.error(error));
        } else {
            setMuestras([]);
        }
    }, [paciente, orina]);



    const handleEstatusChange = (event) => {
        const selectedEstatus = event.target.value;
        setEstatus(selectedEstatus);
        if (selectedEstatus === "No Entregado") {
            setFechaEntrega(null);
        }
    };

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filterOptions = () => {
        const filteredOptions = pacienteId.filter((pacienteId) =>
            pacienteId.cedula.toLowerCase().includes(searchTerm.toLowerCase())
        );
        return filteredOptions;
    };

    const saveOrina = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/resultados/orina", {
                aspecto: aspecto,
                color: color,
                olor: olor,
                densidad: densidad,
                ph: ph,
                proteinas: proteinas,
                glucosa: glucosa,
                nitritos: nitritos,
                c_cetonicos: c_cetonicos,
                bilirrubina: bilirrubina,
                urobilinogeno: urobilinogeno,
                hemoglobina: hemoglobina,
                cel_epiteliales: cel_epiteliales,
                bacterias: bacterias,
                leucocitos: leucocitos,
                hematies: hematies,
                mucina: mucina,
                piocitos: piocitos,
                cilindros: cilindros,
                cristales: cristales,
                otros: otros,
                estatus: estatus,
                fechaEntrega: fechaEntrega,
                muestraId: muestra,
                pacienteId: paciente
            });
            navigate("/resultados/orina");
            Swal.fire({
                title: "Agregado Exitosamente",
                text: "El resultado de orina",
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
        <div className="container has-background-link">
            <Link to="/resultados/orina" style={{ margin: '8px' }} className="button is-white mb-2">
                <IoArrowBackOutline style={{ fontSize: '30px' }} />
            </Link>
            <section className="hero">
                <div className="hero-body">
                    <div className="box">
                        <h1 className="title">Examen de Orina</h1>
                        <h2 className="subtitle">Agregar nuevo resultado</h2>
                        <form onSubmit={saveOrina} >
                            <div className="field">
                                <label className="label">Buscar Paciente por N° Cedula</label>
                                <div className="control">
                                    <input
                                        className="input"
                                        type="number"
                                        value={searchTerm}
                                        onChange={handleChange}
                                        style={{ width: '300px', height:'35px' }}
                                    />
                                </div>
                            </div>
                            <div className="field-body">
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
                                <div className="field">
                                    <label className="label">Muestra</label>
                                    <div className="control">
                                        <div className="select is-multiple">
                                            <select value={muestra} name="muestra" onChange={(e) => setMuestra(e.target.value)} disabled={!paciente}>
                                                <option value="">Seleccione la Muestra a procesar:</option>
                                                {Muestras.map((Muestras) => {
                                                    if (Muestras.examen === "Examen de Orina") {
                                                        return (
                                                            <option key={Muestras.id} value={Muestras.id}>
                                                                ID de la Muestra: {Muestras.id}   Tipo de Muestra: {Muestras.tipo} ID del Paciente: {Muestras.pacienteId}
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
                                    <label className="label">Aspecto</label>
                                    <div className="control">
                                        <input
                                            type="text"
                                            className="input"
                                            value={aspecto}
                                            onChange={(e) => setAspecto(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Color</label>
                                    <div className="control">
                                        <input
                                            type="text"
                                            className="input"
                                            value={color}
                                            onChange={(e) => setColor(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="field">
                                    <label className="label">Olor</label>
                                    <div className="control">
                                        <input
                                            type="text"
                                            className="input"
                                            value={olor}
                                            onChange={(e) => setOlor(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="field">
                                    <label className="label">Densidad</label>
                                    <div className="control">
                                        <input
                                            type="text"
                                            className="input"
                                            value={densidad}
                                            onChange={(e) => setDensidad(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="field-body">
                                <div className="field">
                                    <label className="label">PH</label>
                                    <div className="control">
                                        <div className="select is-fullwidth">
                                            <select
                                                value={ph}
                                                onChange={(e) => setPh(e.target.value)}
                                            >
                                                <option value="">Selecciona el PH</option>
                                                <option value="Acido">Acido</option>
                                                <option value="Neutro">Neutro</option>
                                                <option value="Alcalino">Alcalino</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Proteínas</label>
                                    <div className="control">
                                        <input
                                            type="text"
                                            className="input"
                                            value={proteinas}
                                            onChange={(e) => setProteinas(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Glucosa</label>
                                    <div className="control">
                                        <input
                                            type="text"
                                            className="input"
                                            value={glucosa}
                                            onChange={(e) => setGlucosa(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Nitritos</label>
                                    <div className="control">
                                        <input
                                            type="text"
                                            className="input"
                                            value={nitritos}
                                            onChange={(e) => setNitritos(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="field-body">
                                <div className="field">
                                    <label className="label">C Cetonicos</label>
                                    <div className="control">
                                        <input
                                            type="text"
                                            className="input"
                                            value={c_cetonicos}
                                            onChange={(e) => setC_cetonicos(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Bilirrubina</label>
                                    <div className="control">
                                        <input
                                            type="text"
                                            className="input"
                                            value={bilirrubina}
                                            onChange={(e) => setBilirrubina(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Urobilinogeno</label>
                                    <div className="control">
                                        <input
                                            type="text"
                                            className="input"
                                            value={urobilinogeno}
                                            onChange={(e) => setUrobilinogeno(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Hemoglobina</label>
                                    <div className="control">
                                        <input
                                            type="text"
                                            className="input"
                                            value={hemoglobina}
                                            onChange={(e) => setHemoglobina(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <label className="label">Cel Epiteliales</label>
                                    <div className="control">
                                        <input
                                            type="text"
                                            className="input"
                                            value={cel_epiteliales}
                                            onChange={(e) => setCel_epiteliales(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Bacterias</label>
                                    <div className="control">
                                        <input
                                            type="text"
                                            className="input"
                                            value={bacterias}
                                            onChange={(e) => setBacterias(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Leucocitos</label>
                                    <div className="control">
                                        <input
                                            type="text"
                                            className="input"
                                            value={leucocitos}
                                            onChange={(e) => setLeucocitos(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Hematies</label>
                                    <div className="control">
                                        <input
                                            type="text"
                                            className="input"
                                            value={hematies}
                                            onChange={(e) => setHematies(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <label className="label">Mucina</label>
                                    <div className="control">
                                        <input
                                            type="text"
                                            className="input"
                                            value={mucina}
                                            onChange={(e) => setMucina(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Piocitos</label>
                                    <div className="control">
                                        <input
                                            type="text"
                                            className="input"
                                            value={piocitos}
                                            onChange={(e) => setPiocitos(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Cilindros</label>
                                    <div className="control">
                                        <input
                                            type="text"
                                            className="input"
                                            value={cilindros}
                                            onChange={(e) => setCilindros(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Cristales</label>
                                    <div className="control">
                                        <input
                                            type="text"
                                            className="input"
                                            value={cristales}
                                            onChange={(e) => setCristales(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Otros</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={otros}
                                        onChange={(e) => setOtros(e.target.value)}
                                    />
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
                                                value={fechaEntrega || '0000/00/00'}
                                                onChange={(e) => setFechaEntrega(e.target.value)}
                                                placeholder="Fecha en que se entrego el resultado"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div><br />

                            <div className="field">
                                <div className="control">
                                    <button type="submit" className="button is-danger">
                                        Agregar
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div >
            </section >
        </div >

    );


};

export default FormAddOrina;
