
module.exports = routes = app => {
  app.use("/api/auth", require('./auth.js'));

  app.use('/api/movies', require( './movieRoute' ));

};

