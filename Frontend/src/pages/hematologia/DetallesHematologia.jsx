import React, { useEffect } from "react";
import DetallesHematologias from "../../components/hematologia/DetallesHematologia";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";

const HematologiasDetalles = () => {
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
  
      <DetallesHematologias />

  );
};

export default HematologiasDetalles;
