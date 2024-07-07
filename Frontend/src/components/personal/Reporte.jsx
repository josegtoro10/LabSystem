import React, { useState, useEffect } from "react";
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
        fontSize: 22,
        textAlign: "center",
        fontWeight: "bold",
    },
    subtitle: {
        fontSize: 15,
        textAlign: "center",
        fontWeight: "bold",
        marginTop: 15,
    },
    section: {
        display: "flex",
        flexDirection: "column",
        margin: 10,
        padding: 10,
    },
    row: {
        display: "flex",
        flexDirection: 'row',
    },
    texto: {
        fontSize: 14,
        marginTop: 10,
        marginBottom: 10,
        fontWeight: "bold",
    },
    textobox: {
        fontSize: 11,
        fontWeight: "bold",
        border: 1,
        borderColor: '#000',
        width: 120,
        margin: 0,
        paddingLeft: 2
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
    column: {
        display: "flex",
        flexDirection: "column",
    },
    pageNumber: {
        position: "absolute",
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: "center",
        color: '#000',
    }
});


const Reporte = ({ id, doc }) => {
    const [count, setCount] = useState([]);

    useEffect(() => {
        getCount();
    }, []);

    const getCount = async () => {
        const response = await axios.get("http://localhost:5000/personal/count");
        setCount(response.data);
    };

    return (
        <Document>
            <Page style={styles.page}>
                <View style={styles.section}>
                    <Image style={styles.imagen} source={salud2}></Image>
                    <Text style={styles.textoimagen}> HOSPITAL GENERAL</Text>
                    <Text style={styles.textoimagen}>"DR ISRAEL RANUAREZ BALZA</Text>
                    <Text style={styles.textoimagen}>San Juan de los Morros, Edo.Guárico</Text>
                    <Text style={styles.title}>Servicio de Laboratorio</Text>
                    <Text style={styles.subtitle}>Lista de Empleados</Text>
                    <Text style={styles.texto}>Fecha: {dayjs().format('DD/MM/YYYY')}</Text>
                    <Text style={styles.texto}>Total: {count.count}</Text>
                    <View style={styles.row}>
                        <Text style={styles.textobox}>Codigo</Text>
                        <Text style={styles.textobox}>Nombre</Text>
                        <Text style={styles.textobox}>Apellido</Text>
                        <Text style={styles.textobox}>Cedula</Text>
                        <Text style={styles.textobox}>Cargo</Text>
                        <Text style={styles.textobox}>Turno</Text>
                        <Text style={styles.textobox}>Estatus</Text>
                        <Text style={styles.textobox}>Ingreso</Text>
                    </View>
                    <View style={styles.column}>
                        {doc.map((doc) => (
                            <View key={doc.id}>
                                <View style={styles.row}>
                                    <Text style={styles.textobox}>{doc.codigo}</Text>
                                    <Text style={styles.textobox}>{doc.nombre}</Text>
                                    <Text style={styles.textobox}>{doc.apellido}</Text>
                                    <Text style={styles.textobox}>{doc.cedula}</Text>
                                    <Text style={styles.textobox}>{doc.cargo}</Text>
                                    <Text style={styles.textobox}>{doc.turno}</Text>
                                    <Text style={styles.textobox}>{doc.estatus}</Text>
                                    <Text style={styles.textobox}>{dayjs(doc.fechaIngreso).format('DD/MM/YYYY')}</Text>
                                </View >
                            </View >
                        ))}
                    </View>
                </View>
                <View style={styles.pageNumber}>
                    <Text render={({ pageNumber, totalPages }) => `${pageNumber}/${totalPages}`} />
                </View>
            </Page>
        </Document >
    );
}

export default Reporte;