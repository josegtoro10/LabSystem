import { useState, useEffect } from "react";
import axios from "axios";


const usePaciente = () => {
  const [pacienteId, setPacienteId] = useState([]);

  useEffect(() => {
    const fetchPaciente = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/pacientes");
        setPacienteId(data);
      } catch (error) {
        console(error);
      } 
    };

    fetchPaciente();
  }, []);

  return { pacienteId };
};

export default usePaciente;