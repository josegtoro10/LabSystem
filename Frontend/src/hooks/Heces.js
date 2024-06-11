import { useState, useEffect } from "react";
import axios from "axios";


const useHeces = () => {
  const [heces, setHeces] = useState([]);

  useEffect(() => {
    const fetchHeces = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/resultados/heces");
        setHeces(data);
      } catch (error) {
        console(error);
      } 
    };

    fetchHeces();
  }, []);
  

  return { heces };
};

export default useHeces;