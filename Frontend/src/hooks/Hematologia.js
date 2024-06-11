import { useState, useEffect } from "react";
import axios from "axios";


const useHematologia = () => {
  const [hematologia, setHematologia] = useState([]);

  useEffect(() => {
    const fetchHematologia = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/resultados/hematologia");
        setHematologia(data);
      } catch (error) {
        console(error);
      } 
    };
    fetchHematologia();
  }, []);
  

  return { hematologia };
};

export default useHematologia;