import { db, Email } from "./db/models.js";
import { emailValidationJWT, validateEmailJWT } from "./lib/jwt.js";

/** @typedef {import("express").RequestHandler} Controller */

/** @type {Controller} */
function apiRootController(_, response) {
  console.log("* Depuración de la API Ok! *")
  response.send("API Ok!");
}

/**
 * Body proporciona un objeto { address: {String} }
 * @type {Controller}
 */
async function postEmail(request, response) {
  try {
    const newEmail = await Email.create(request.body);
    const token = emailValidationJWT(newEmail.address);
    console.log("URL validación:", `http://localhost:8000/validate/${token}`);
    response.sendStatus(200);
  } catch (exception) {
    console.error(exception);
    response.sendStatus(500);
  }
}

/** @type {Controller} */
function validateEmail(request, response) {
  const datosJWT = validateEmailJWT(request.params.jwtToken);
  if (datosJWT) {
    const { email } = datosJWT;
    Email.update({ validated: true }, { where: { address: email } })
      .then(() => {
        console.log("Correo electrónico validado:", email);
        response.sendStatus(200);
      })
      .catch((error) => {
        console.error("Error al actualizar el estado de validación:", error);
        response.sendStatus(500);
      });
  } else {
    console.error("Token de correo electrónico inválido");
    response.sendStatus(400);
  }
}

// Middleware para verificar el token en las rutas protegidas
function authenticateToken(req, res, next) {
  // Obtener el token del encabezado 'Authorization'
  const token = req.header('Authorization');

  if (!token) {
    return res.sendStatus(401); // Unauthorized
  }

  // Verificar el token (aquí se usaría la función validateEmailJWT u otra función para verificar el token)
  // ...

  // Si el token es válido, continúa con la próxima función de middleware
  next();
}

// Función para obtener datos protegidos (ejemplo)
function getProtectedData(req, res) {
  // Aquí puedes manejar la lógica para devolver los datos protegidos
  // Por ejemplo, consultando la base de datos o generando datos simulados
  const data = {
    message: "Datos protegidos obtenidos con éxito",
    user: "John Doe" // Datos simulados, puedes reemplazar esto con la información real
  };

  res.json(data);
}

export {
  apiRootController,
  postEmail,
  validateEmail,
  getProtectedData, // Asegúrate de que esta exportación esté presente
  authenticateToken
};
