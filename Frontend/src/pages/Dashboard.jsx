import React, { useEffect } from "react";
import Layout from "./Layout";
import Welcome from "../components/Welcome";
import PacientesList from "../components/pacientes/PacientesList";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);

  return (
    <>
    {user && user.role === "admin" && (
      <>
    <Layout>
      <Welcome />
    </Layout>
    </>
    )}
    {user && user.role === "user" && (
      <>
    <Layout>
      <PacientesList />
    </Layout>
    </>
    )}
    </>
  );
};

export default Dashboard;
