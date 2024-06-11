import { useState, useEffect } from "react";
import axios from "axios";


const useMuestra = () => {
  const [muestraId, setMuestraId] = useState([]);

  useEffect(() => {
    const fetchMuestra = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/muestras");
        setMuestraId(data);
      } catch (error) {
        console(error);
      } 
    };

    fetchMuestra();
  }, []);
  

  return { muestraId};
};

export default useMuestra;