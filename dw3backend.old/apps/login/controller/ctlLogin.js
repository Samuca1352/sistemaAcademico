const jwt = require("jsonwebtoken");
const bCrypt = require("bcryptjs");
const mdlLogin = require("../model/mdlLogin");

const Login = async (req, res, next) => {
    try {
        const credencial = await mdlLogin.GetCredencial(req.body.username);
        if (credencial.length === 0) {
            return res.status(404).json({ message: "Usuário não identificado!" });
        }

        if (bCrypt.compareSync(req.body.password, credencial[0].password)) {
            //auth ok
            const username = credencial[0].username;
            // Cria um token JWT
            // NOTA: Para que req.userId funcione na autenticação, o payload do token
            // precisaria incluir o ID do usuário. Ex: const token = jwt.sign({ id: credencial[0].usuarioid, username }...
            const token = jwt.sign({ username }, process.env.SECRET_API, {
                expiresIn: 600, // Expira em 10 minutos
            });
            return res.json({ auth: true, token: token });
        } else {
            // O status 200 para "Login Inválido" foi mantido conforme o código fornecido,
            // embora o status 401 (Unauthorized) seja mais comum para esta situação.
            return res.status(200).json({ message: "Login inválido!" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erro interno do servidor." });
    }
};

function AutenticaJWT(req, res, next) {
    const tokenHeader = req.headers["authorization"];
    
    if (!tokenHeader) {
        // O status 200 para erro foi mantido conforme o código fornecido,
        // embora 401 (Unauthorized) ou 403 (Forbidden) sejam mais apropriados.
        return res.status(200).json({ auth: false, message: "Não foi informado o token JWT" });
    }
        
    const bearer = tokenHeader.split(" ");
    const token = bearer[1];

    jwt.verify(token, process.env.SECRET_API, function (err, decoded) {
        if (err) {
             return res
                .status(200)
                .json({ auth: false, message: "JWT inválido ou expirado" });
        }
        // Se a autenticação for bem-sucedida, salva o id decodificado no request
        // para ser usado pelas próximas rotas.
        req.userId = decoded.id;
        next();
    });
}

const Logout = (req, res, next) => {
    res.json({ auth: false, token: null });
};

module.exports = {
    Login,
    Logout,
    AutenticaJWT,
};

