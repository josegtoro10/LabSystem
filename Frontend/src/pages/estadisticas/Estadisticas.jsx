import React, { useEffect } from "react";
import Layout from "../Layout";
import PacientesAtendidos from "../../components/estadisticas/Estadisticas";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";

const Estadisticas = () => {
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
    <Layout>
      <PacientesAtendidos />
    </Layout>
  );
};

export default Estadisticas;
