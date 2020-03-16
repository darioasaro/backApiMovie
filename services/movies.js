const fetch = require("node-fetch");
// Dado un id busca en la api la pelicula

exports.findMovie = async id => {
  let response = await fetch(
    "https://api.themoviedb.org/3/movie/" +
      id +
      "?api_key=b813c5783821c2f14ec75f3ae6cb1824&language=en-US"
  );

  let dato = await response.json();

  return dato;
};
// Devuelve todos los generos presentes en la api
exports.getGenre = async () => {
  let response = await fetch(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=b813c5783821c2f14ec75f3ae6cb1824&language=en-US"
  );
  let genres = await response.json();
  return genres;
};

//Busca en la api de acuerdo a lo ingresado en la barra de busqueda de la pagina
exports.searchMovies = async movie => {
  var res = encodeURI(movie);

  var response = await fetch(
    "https://api.themoviedb.org/3/search/movie?api_key=b813c5783821c2f14ec75f3ae6cb1824&query=" +
      res
  );
  let dato = await response.json();

  return dato;
};
