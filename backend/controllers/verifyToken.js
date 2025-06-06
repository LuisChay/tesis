const jwt = require('jsonwebtoken');
const jwtsecret = process.env.JWT_SECRET;

const verifyToken = (allowedRoles = []) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Token no proporcionado" });

    jwt.verify(token, jwtsecret, (err, decoded) => {
      if (err) return res.status(403).json({ error: "Token inválido o expirado" });

      req.user = decoded;

      // ✅ Permitir si el rol está en la lista
      if (allowedRoles.length > 0 && !allowedRoles.includes(decoded.rol_id)) {
        return res.status(403).json({ error: "No tienes permiso para acceder a esta ruta" });
      }

      next();
    });
  };
};

module.exports = verifyToken;
