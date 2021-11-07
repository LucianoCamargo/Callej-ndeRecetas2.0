const express = require ('express');
const Router = express.Router();
const path = require('path');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { TOKEN_SECRET, verifyToken } = require("../middlewares/Tokens-validate");


Router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/../frontend/CallejondeRecetas.html"));
 
});
Router.get("./login", (req, res) => {
  res.sendFile(path.join(__dirname + "/../frontend/Login.html"));
 
});
Router.get("/calculadora", (req, res) => {
  res.sendFile(path.join(__dirname + "/../frontend/calculadora.html"));
 
});

const usuarios = [
    {
        mail: "luciano@mail.com",
        password: "Luciano"  
    }
]


Router.post("/login", async (req, res, next) => {
    try {
        console.log(req.body);
        
        const user = usuarios.find((u) => u.mail === req.body.mail);

        if (!user) {
            return res.status(400).json({ error: "Usuario no encontrado" });
        }

        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!validPassword) {
            return res.status(400).json({ error: "contraseña no valida" });
        }

        const token = jwt.sign(
            {
                mail: user.mail,
                name: user.password
            },
            TOKEN_SECRET
        );

        return res.json({ error: null, data: "Login exitoso", token });
    }   catch (error) {
        return next(error);
    }
});

Router.get("/usuarios", verifyToken, (req, res) => {
    return res.json({ error: null, usuarios });
});



module.exports = Router;