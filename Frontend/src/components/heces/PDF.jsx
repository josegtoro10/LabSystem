import { useState, useEffect } from "react";
import axios from "axios";
import salud2 from "../../styles/images/salud2.png"
import { Document, Text, Page, StyleSheet, View, Image } from "@react-pdf/renderer";


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
                            Nombre del paciente: {paciente.nombre} {paciente.apellido}
                        </Text>
                        <Text style={styles.texto}>
                            Cedula: {paciente.cedula}
                        </Text>
                        <Text style={styles.texto}>
                            Fecha: {doc.fechaEntrega}
                        </Text>
                    </View>
                    <View style={{ marginTop: 40 }}>
                        <Text style={styles.subtitle}>
                            Examen de Heces
                        </Text >

                        <View style={{ marginTop: 20 }}>
                            <Text style={styles.texto} >
                                EXAMEN MACROSCOPICO
                            </Text>
                            <View style={styles.rows}>
                                <View>
                                    <Text style={styles.texto}>
                                    <Text style={{ textDecoration: 'underline' }}>Aspecto:</Text> {doc.aspecto}
                                    </Text>
                                </View>
                                <View>
                                    <Text style={styles.texto}>
                                    <Text style={{ textDecoration: 'underline' }}>Consistencia:</Text> {doc.consistencia}
                                    </Text>
                                </View>
                                <View>
                                    <Text style={styles.texto} >
                                    <Text style={{ textDecoration: 'underline' }}>Color:</Text> {doc.color}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.rows}>
                                <View>
                                    <Text style={styles.texto}>
                                    <Text style={{ textDecoration: 'underline' }}>Olor:</Text> {doc.olor}
                                    </Text>
                                </View>
                                <View>
                                    <Text style={styles.texto} >
                                    <Text style={{ textDecoration: 'underline' }}>Moco:</Text> {doc.moco}
                                    </Text>
                                </View>
                                <View>
                                    <Text style={styles.texto}>
                                    <Text style={{ textDecoration: 'underline' }}>Sangre:</Text> {doc.sangre}
                                    </Text>
                                </View>
                            </View>
                            <Text style={styles.texto}>
                            <Text style={{ textDecoration: 'underline' }}>Restos Alimenticios:</Text> {doc.restosAlimenticios}
                            </Text>
                            <View style={{ marginTop: 20 }}>
                                <Text style={styles.texto}>
                                    EXAMEN MICROSCOPICO
                                </Text>
                                <Text style={styles.texto}>
                                    {doc.microscopio}
                                </Text>
                            </View>
                            <View style={{ marginTop: 20 }}>
                                <Text style={styles.texto}>
                                    OTROS ELEMENTOS
                                </Text>
                                <Text style={styles.texto}>
                                    {doc.otrosElementos}
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
        </Document >
    );
}

export default PDF;