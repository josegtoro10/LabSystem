import { useState, useEffect } from "react";
import axios from "axios";
import salud2 from "../../styles/images/salud2.png"
import {Document,Text,Page,StyleSheet,View,Image} from "@react-pdf/renderer";
import dayjs from 'dayjs';


const styles = StyleSheet.create({
  page: {

    backgroundColor: '#ffffff',
    padding: 30,
  },
  title: {
    marginTop: 30,
    fontSize: 22,
    textAlign: "center",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  section: {
    display: "flex",
    flexDirection: "column",
    margin: 10,
    padding: 10,
  },
  texto:{
    fontSize: 14,
    marginTop: 10,
    fontWeight: "bold",
  },
  imagen: {
     width: 150,
     height: 100
  },
  textoimagen:{
    textAlign: "right",
    fontSize: 14,
    fontWeight: "bold",
  },
  bioanalista:{
    textAlign: "center",
    fontSize: 14,
    marginTop: 35,
    fontWeight: "bold",
  },
  line:{
    marginTop: 65,
    textAlign: "center",
    fontWeight: "bold",
  }
});





const PDF = ({id, doc})=> {
  const [paciente, setPaciente] = useState([]);
  useEffect(() => {
    const fetchPaciente = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/pacientes/${doc.pacienteId}`);
        setPaciente(data);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchPaciente();
  }, [doc.pacienteId]);
  
  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
        <Image style={styles.imagen} source={salud2}></Image>
        <Text style={styles.textoimagen}> HOSPITAL GENERAL</Text>
        <Text style={styles.textoimagen}>"DR ISRAEL RANUAREZ BALZA</Text>
        <Text style={styles.textoimagen}>San Juan de los Morros, Edo.Guárico</Text>
        <Text style={styles.title}>Servicio de Laboratorio</Text>
        <View style={{ marginTop: 20 }}>
        <Text style={styles.texto}>
          Nombre del Paciente: {paciente.nombre} {paciente.apellido}
          </Text>
        <Text style={styles.texto}>
          Cedula: {paciente.cedula} 
          </Text>
        <Text style={styles.texto}>
          Fecha: {dayjs(doc.fechaEntrega).format('DD/MM/YYYY')}
          </Text>
          </View>
          <View style={{ marginTop: 40 }}>
          <Text style={styles.subtitle}>
          Examen de Hematologia
          </Text >
          <View style={{ marginTop: 20 }}>
          <Text style={styles.texto} >
          <Text style={{ textDecoration: 'underline' }}>Hemoglobina:</Text> {doc.hemoglobina}g/dL
          </Text>
          <Text style={styles.texto}>
          <Text style={{ textDecoration: 'underline' }}>Hematocritos:</Text> {doc.hematocrito}%
          </Text>
          <Text style={styles.texto}>
          <Text style={{ textDecoration: 'underline' }}>C.H.C.M:</Text> {doc.chcm}%
          </Text>
          <Text style={styles.texto}>
          <Text style={{ textDecoration: 'underline' }}>V.S.G:</Text> {doc.vsg} mm/Horas
          </Text>
          <Text style={styles.texto}>
          VR 0-13 mm/Horas
          </Text>
          </View>
          </View>
          <Text style={styles.line}>
            ________________
          </Text>
          <Text style={styles.bioanalista}>
            Bioanalsita
          </Text>
        </View>
      </Page>
    </Document>
  );
}

export default PDF;