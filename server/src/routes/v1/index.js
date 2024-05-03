const authRouter = require("./auth");
const roleRouter = require("./role");

const initRoutes = (app) => {
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/role", roleRouter);
};

module.exports = initRoutes;
