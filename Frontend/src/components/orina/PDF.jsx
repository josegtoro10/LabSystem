import { useState, useEffect } from "react";
import axios from "axios";
import salud2 from "../../styles/images/salud2.png"
import { Document, Text, Page, StyleSheet, View, Image } from "@react-pdf/renderer";
import dayjs from 'dayjs';

const styles = StyleSheet.create({
  page: {

    backgroundColor: '#ffffff',
    padding: 30,
  },
  title: {
    marginTop: 30,
    fontSize: 20,
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
  texto: {
    fontSize: 14,
    marginTop: 10,
    fontWeight: "bold",
  },
  imagen: {
    width: 150,
    height: 100
  },
  textoimagen: {
    textAlign: "right",
    fontSize: 14,
    fontWeight: "bold",
  },
  bioanalista: {
    textAlign: "center",
    fontSize: 14,
    marginTop: 35,
    fontWeight: "bold",
  },
  line: {
    marginTop: 40,
    textAlign: "center",
    fontWeight: "bold",
  },
  rows: {
    display: 'flex',
    flexDirection: 'row',
    textAlign: 'justify',
    gap: 20,
  }
});





const PDF = ({ id, doc }) => {
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
          <View style={{ marginTop: 25 }}>
            <Text style={styles.subtitle}>
              Examen de Orina
            </Text >
            <View style={{ marginTop: 20 }}>
              <Text style={styles.texto} >
                QUIMICO - FISICO
              </Text>
              <View style={styles.rows}>
                <Text style={styles.texto}>
                  <Text style={{ textDecoration: 'underline' }}>Aspecto:</Text> {doc.aspecto}
                </Text>
                <Text style={styles.texto}>
                  <Text style={{ textDecoration: 'underline' }}>Color:</Text> {doc.color}
                </Text>
                <Text style={styles.texto}>
                  <Text style={{ textDecoration: 'underline' }}>Olor:</Text> {doc.olor}
                </Text>
              </View>
              <View style={styles.rows}>
                <Text style={styles.texto}>
                  <Text style={{ textDecoration: 'underline' }}>Densidad:</Text> {doc.densidad}
                </Text>
                <Text style={styles.texto}>
                  <Text style={{ textDecoration: 'underline' }}>PH:</Text> {doc.ph}
                </Text>
                <Text style={styles.texto}>
                  <Text style={{ textDecoration: 'underline' }}>Proteinas:</Text> {doc.proteinas}
                </Text>
              </View>
              <View style={styles.rows}>
                <Text style={styles.texto}>
                  <Text style={{ textDecoration: 'underline' }}>Glucosa:</Text> {doc.glucosa}
                </Text>
                <Text style={styles.texto}>
                  <Text style={{ textDecoration: 'underline' }}>Nitritos:</Text> {doc.nitritos}
                </Text>
                <Text style={styles.texto}>
                  <Text style={{ textDecoration: 'underline' }}>C.Cetonicos:</Text> {doc.c_cetonicos}
                </Text>
              </View>
              <View style={styles.rows}>
                <Text style={styles.texto}>
                  <Text style={{ textDecoration: 'underline' }}>Bilirrubina:</Text> {doc.bilirrubina}
                </Text>
                <Text style={styles.texto}>
                  <Text style={{ textDecoration: 'underline' }}>Urobilinogeno:</Text> {doc.urobilinogeno}
                </Text>
                <Text style={styles.texto}>
                  <Text style={{ textDecoration: 'underline' }}>Hemoglobina:</Text> {doc.hemoglobina}
                </Text>
              </View>
            </View>
            <View style={{ marginTop: 20 }}>
              <Text style={styles.texto}>
                SEDIMENTO URINARIO
              </Text>
              <View style={styles.rows}>
                <Text style={styles.texto}>
                  <Text style={{ textDecoration: 'underline' }}>Cel.Epiteliales:</Text> {doc.cel_epiteliales}
                </Text>
                <Text style={styles.texto}>
                  <Text style={{ textDecoration: 'underline' }}>Bacterias:</Text> {doc.bacterias}
                </Text>
                <Text style={styles.texto}>
                  <Text style={{ textDecoration: 'underline' }}>Leucocitos:</Text> {doc.leucocitos}
                </Text>
              </View>
              <View style={styles.rows}>
                <Text style={styles.texto}>
                  <Text style={{ textDecoration: 'underline' }}>Hematies:</Text> {doc.hematies}
                </Text>
                <Text style={styles.texto}>
                  <Text style={{ textDecoration: 'underline' }}>Mucina:</Text> {doc.mucina}
                </Text>
                <Text style={styles.texto}>
                  <Text style={{ textDecoration: 'underline' }}>Piocitos:</Text> {doc.piocitos}
                </Text>
              </View>
              <View style={styles.rows}>
                <Text style={styles.texto}>
                  <Text style={{ textDecoration: 'underline' }}>Cilindros:</Text> {doc.cilindros}
                </Text>
                <Text style={styles.texto}>
                  <Text style={{ textDecoration: 'underline' }}>Cristales:</Text> {doc.cristales}
                </Text>
              </View>
              <View>
                <Text style={styles.texto}>
                  <Text style={{ textDecoration: 'underline' }}>Otros:</Text>{doc.otros}
                </Text>
              </View>
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