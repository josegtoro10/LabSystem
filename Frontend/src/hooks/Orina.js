import { useState, useEffect } from "react";
import axios from "axios";


const useOrina = () => {
  const [orina, setOrina] = useState([]);

  useEffect(() => {
    const fetchOrina = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/resultados/orina");
        setOrina(data);
      } catch (error) {
        console(error);
      } 
    };

    fetchOrina();
  }, []);
  

  return { orina };
};

export default useOrina;