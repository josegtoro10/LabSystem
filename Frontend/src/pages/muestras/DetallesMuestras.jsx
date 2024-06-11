import React, { useEffect } from "react";
import DetallesMuestras from "../../components/muestras/DetallesMuestras";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";

const MuestrasDetalles = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);
  return (
 
      <DetallesMuestras />

  );
};

export default MuestrasDetalles;
