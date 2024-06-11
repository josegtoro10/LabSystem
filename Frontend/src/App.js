import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import Pacientes from "./pages/pacientes/Pacientes";
import AddPacientes from "./pages/pacientes/AddPacientes";
import EditPacientes from "./pages/pacientes/EditPacientes";
import PacientesDetalles from "./pages/pacientes/DetallesPacientes"
import Users from "./pages/usuarios/Users";
import AddUser from "./pages/usuarios/AddUser";
import EditUser from "./pages/usuarios/EditUser";
import Muestras from "./pages/muestras/Muestras";
import AddMuestras from "./pages/muestras/AddMuestras";
import EditMuestras from "./pages/muestras/EditMuestras";
import MuestrasDetalles from "./pages/muestras/DetallesMuestras";
import Hematologia from "./pages/hematologia/Hematologia";
import AddHematologia from "./pages/hematologia/AddHematologia";
import EditHematologia from "./pages/hematologia/EditHematologia";
import HematologiasDetalles from "./pages/hematologia/DetallesHematologia"
import Orina from "./pages/orina/Orina";
import AddOrina from "./pages/orina/AddOrina";
import EditOrina from "./pages/orina/EditOrina"
import OrinaDetalles from "./pages/orina/DetallesOrina";
import Heces from "./pages/heces/Heces";
import AddHeces from "./pages/heces/AddHeces";
import EditHeces from "./pages/heces/EditHeces";
import HecesDetalles from "./pages/heces/DetallesHeces";
import VIH from "./pages/vih/VIH";
import AddVIH from "./pages/vih/AddVIH";
import EditVIH from "./pages/vih/EditVIH";
import VIHDetalles from "./pages/vih/DetallesVIH";
import Personal from "./pages/personal/Personal";
import AddPersonal from "./pages/personal/AddPersonal";
import EditPersonal from "./pages/personal/EditPersonal";
import PersonalDetalles from "./pages/personal/DetallesPersonal";
import Estadisticas from "./pages/estadisticas/Estadisticas"



function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/add" element={<AddUser />} />
          <Route path="/users/edit/:id" element={<EditUser />} />
          <Route path="/pacientes" element={<Pacientes />} />
          <Route path="/pacientes/add" element={<AddPacientes />} />
          <Route path="/pacientes/edit/:id" element={<EditPacientes />} />
          <Route path="/pacientes/detalles/:id" element={<PacientesDetalles />} />
          <Route path="/muestras" element={<Muestras />} />
          <Route path="/muestras/add" element={<AddMuestras />} />
          <Route path="/muestras/edit/:id" element={<EditMuestras />} />
          <Route path="/muestras/detalles/:id" element={<MuestrasDetalles />} />
          <Route path="/resultados/hematologia" element={<Hematologia />} />
          <Route path="/resultados/hematologia/add" element={<AddHematologia />} />
          <Route path="/resultados/hematologia/edit/:id" element={<EditHematologia />} />
          <Route path="/resultados/hematologia/detalles/:id" element={<HematologiasDetalles />} />
          <Route path="/resultados/orina" element={<Orina />} />
          <Route path="/resultados/orina/add" element={<AddOrina />} />
          <Route path="/resultados/orina/edit/:id" element={<EditOrina />} />
          <Route path="/resultados/orina/detalles/:id" element={<OrinaDetalles />} />
          <Route path="/resultados/heces" element={<Heces />} />
          <Route path="/resultados/heces/add" element={<AddHeces />} />
          <Route path="/resultados/heces/edit/:id" element={<EditHeces />} />
          <Route path="/resultados/heces/detalles/:id" element={<HecesDetalles />} />
          <Route path="/resultados/vih" element={<VIH />} />
          <Route path="/resultados/vih/add" element={<AddVIH />} />
          <Route path="/resultados/vih/edit/:id" element={<EditVIH />} />
          <Route path="/resultados/vih/detalles/:id" element={<VIHDetalles />} />
          <Route path="/personal" element={<Personal />} />
          <Route path="/personal/add" element={<AddPersonal />} />
          <Route path="/personal/edit/:id" element={<EditPersonal />} />
          <Route path="/personal/detalles/:id" element={<PersonalDetalles />} />
          <Route path="/estadisticas" element={<Estadisticas />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
