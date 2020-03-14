module.exports = routes = app => {
  app.use("/api/auth", require('./auth.js'));
};
