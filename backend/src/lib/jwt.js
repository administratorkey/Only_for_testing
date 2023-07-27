import jwt from "jsonwebtoken";

const JWT_EXPIRATION = "12h";

const JWTSubjects = {
  EMAIL_VALIDATION: "email-validation",
  AUTENTIFICATION: "user-autentification",
  AUTHORIZATION: "user-authorization",
};

/**
 * Emite un JWT para validación de correo electrónico
 * @param {String} email 
 * @returns {String}
 */
function emailValidationJWT(email) {
  try {
    const payload = { email };
    const secret = process.env.JWT_SECRET ?? "JWT_SECRET";
    const options = { subject: JWTSubjects.EMAIL_VALIDATION, expiresIn: JWT_EXPIRATION };
    const token = jwt.sign(payload, secret, options);
    console.log();
    console.log("* Prueba Token JWT:", token); // Prueba del Token
    console.log(); 
    return token;
  } catch (exception) {
    console.error(exception);
  }
}

/**
 * Verifica si un token de verificación de correo es legítimo
 * y, si lo es, entrega los datos contenidos
 * @param {String} jwtToken 
 * @returns {(Object|false)}
 */
function validateEmailJWT(jwtToken) {
  console.log("Valor de jwtToken:", jwtToken); // Prueba valor jwtToken
  try {
    const secret = process.env.JWT_SECRET ?? "JWT_SECRET";
    const options = { subject: JWTSubjects.EMAIL_VALIDATION };
    const datosJWT = jwt.verify(jwtToken, secret, options);
    return datosJWT;
  } catch (exception) {
    console.error(exception);
    return false;
  }
}

export { emailValidationJWT, validateEmailJWT };
