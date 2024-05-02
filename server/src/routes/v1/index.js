const authRouter = require("./auth");

const initRoutes = (app) => {
  app.use("/api/v1/auth", authRouter);
};

module.exports = initRoutes;
