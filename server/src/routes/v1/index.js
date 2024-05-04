const authRouter = require("./auth");
const roleRouter = require("./role");
const propertyTypeRouter = require("./propertyType");

const initRoutes = (app) => {
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/role", roleRouter);
  app.use("/api/v1/property-type", propertyTypeRouter);
};

module.exports = initRoutes;
