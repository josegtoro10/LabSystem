import { useState, useEffect } from "react";
import axios from "axios";


const useVIH = () => {
  const [vih, setVIH] = useState([]);

  useEffect(() => {
    const fetchVIH = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/resultados/vih");
        setVIH(data);
      } catch (error) {
        console(error);
      } 
    };

    fetchVIH();
  }, []);
  

  return { vih };
};

export default useVIH;