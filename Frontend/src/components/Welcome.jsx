import { useState, useEffect } from "react";
import axios from "axios";
import salud2 from "../styles/images/salud2.png"
import "../styles/css/fondo.css"
import { useSelector } from "react-redux";


const Welcome = () => {
  const [pacientes, setPacientes] = useState([]);
  const [muestras, setMuestras] = useState([]);
  const [hematologia, setHematologia] = useState([]);
  const [heces, setHeces] = useState([]);
  const [orina, setOrina] = useState([]);
  const [vih, setVIH] = useState([]);
  const [personal, setPersonal] = useState([]);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    getPacientes();
  }, []);

  useEffect(() => {
    getMuestras();
  }, []);

  useEffect(() => {
    getHematologia();
  }, []);

  useEffect(() => {
    getHeces();
  }, []);

  useEffect(() => {
    getOrina();
  }, []);

  useEffect(() => {
    getVIH();
  }, []);

  useEffect(() => {
    getPersonal();
  }, []);

  const getPacientes = async () => {
    const response = await axios.get("http://localhost:5000/pacientes/count");
    setPacientes(response.data);
  };

  const getMuestras = async () => {
    const response = await axios.get("http://localhost:5000/muestras/count");
    setMuestras(response.data);
  };

  const getHematologia = async () => {
    const response = await axios.get("http://localhost:5000/resultados/hematologia/count");
    setHematologia(response.data);
  };

  const getHeces = async () => {
    const response = await axios.get("http://localhost:5000/resultados/heces/count");
    setHeces(response.data);
  };

  const getOrina = async () => {
    const response = await axios.get("http://localhost:5000/resultados/orina/count");
    setOrina(response.data);
  };

  const getVIH = async () => {
    const response = await axios.get("http://localhost:5000/resultados/vih/count");
    setVIH(response.data);
  };

  const getPersonal = async () => {
    const response = await axios.get("http://localhost:5000/personal/count");
    setPersonal(response.data);
  };

  const resultHematologia = parseInt(hematologia.count);
  const resultHeces = parseInt(heces.count);
  const resultOrina = parseInt(orina.count);
  const resultVIH = parseInt(vih.count);

  const totalResult = resultHematologia + resultHeces + resultOrina + resultVIH;

  return (
    <>
      <div className="container">
        <p className="subtitle is-6 is-pulled-right">HOSPITAL GENERAL
          <br />
          "DR ISRAEL RANUAREZ BALZA"
          <br />
          San Juan de los Morros, Edo.Guárico</p>
        <img src={salud2} width="150" alt="salud2" />
        <h2 className="title is-2 has-text-centered">Servicio de Laboratorio</h2>
       
          {user && user.role === "admin" && (
            <>
             <div id="fondo" className="has-text-centered">
          <div className="field-body">
          <div id="field" className="field">
            <div className="box">
              <h2 className="title is-4">Pacientes</h2>
              <h2 className="title is-4">{pacientes.count}</h2>
            </div>
          </div>
          <div id="field" className="field">
            <div className="box">
              <h2 className="title is-4">Muestras</h2>
              <h2 className="title is-4">{muestras.count}</h2>
            </div>
          </div>
        </div>
        <div className="field-body">
          <div id="field" className="field">
            <div className="box">
              <h2 className="title is-4">Resultados</h2>
              <h2 className="title is-4">{totalResult}</h2>
            </div>
          </div>
          <div id="field" className="field">
            <div className="box">
              <h2 className="title is-4">Personal</h2>
              <h2 className="title is-4">{personal.count}</h2>
            </div>
          </div>
        </div>
        </div>
        </>
          )}
      </div>
    </>
  );
};

export default Welcome;
