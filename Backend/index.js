import express from "express";
import argon2 from "argon2";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import {ejecutarRespaldoDiario} from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import UserRoute from "./routes/UserRoute.js";
import PacientesRoute from "./routes/PacientesRoute.js"
import MuestrasRoute from "./routes/MuestrasRoute.js"
import PersonalRoute from "./routes/PersonalRoute.js"
import AuthRoute from "./routes/AuthRoute.js";
import HecesRoute from "./routes/HecesRoute.js";
import HematologiaRoute from "./routes/HematologiaRoute.js";
import OrinaRoute from "./routes/OrinaRoute.js";
import VIHRoute from "./routes/VIHRoute.js"
import Users from "./models/UserModel.js";
dotenv.config();
ejecutarRespaldoDiario()

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db: db
});


// (async()=>{
//     await db.sync({force: true});
//     const user = await Users.create({
//         email: "laboratorio@gmail.com",
//         name: "admin",
//         password: await argon2.hash("admin"),
//         role: "admin"
//     })
//     console.log("Admin Creado",user);
// })();


app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}));

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use(UserRoute);
app.use(PacientesRoute);
app.use(MuestrasRoute);
app.use(PersonalRoute);
app.use(AuthRoute);
app.use(HecesRoute);
app.use(HematologiaRoute);
app.use(OrinaRoute);
app.use(VIHRoute);


app.listen(process.env.APP_PORT, ()=> {
    console.log('Servidor en Funcionamiento...');
});
