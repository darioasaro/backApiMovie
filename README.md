# Backend del proyecto Flixnet

Servicio web que ofrece listas de películas trídas desde una API ('https://www.themoviedb.org/').
Cuenta con dos tipos de usuarios: usuarios administradores y usuarios registrados.

#### Usuario administrador:
Será el responsable de hacer las llamadas a la API, que posteriormente verán los usuarios registrados. A demás podrá agregar películas que no se encuentren en la API.

#### Usuario registrado:
Podrá ver las películas según su preferencia y agregarlas a favoritos.

### Pre-requisitos
```
- Node.js
- redis
- mysql
```

### Instalación
Para el funcionamiento del proyecto se deberán instalar las dependencias ejecutando el  siguiente comando:
```
npm install.
```

### Ejecución
Para iniciar el programa se usará el comando:
```
nodemon server/server.js
```

## Endpoints

#### Movies

- Muestra la lista de películas cargada en la base de datos.
```
° URL:  http://localhost:3000/api/movies
° METHOD:   GET
° SUCCES RESPONSE:  movies[], retorna un arreglo con las películas.
° ERROR RESPONSE:   movies[], retorna un arreglo vacío en caso de no haber películas cargadas.
```


- Búsqueda de una película en particular por su ID enviado mediante la URL.
```
URL:  http://localhost:3000/api/movies/find/
METHOD: GET
PARAMS: :id
SUCCES RESPONSE:  'movie[]', retorna la película buscada.
ERROR RESPONSE:  'movie[]', retorna un arreglo vacío en caso de no encontrarla.
                 'Internal Server Error', en caso de un problema con el servidor.
```

- Agrega una película propia a la base de datos mediante los valores recibidos desde el BODY.
```
URL:  http://localhost:3000/api/movies
METHOD: POST
BODY: {
        "id_api": , (int)
        "original_title": " ", (int)
        "backdrop_path": " ", (varchar)
        "poster_path": " ", (varchar)
        "overview": " ", (text)
        "vote_average": , (int)
        "vote_count": (int)
      }
SUCCES RESPONSE:  'Se agregó correctamente la película'
ERROR RESPONSE:   'La película ya existe', en caso de que la película ya se encuentre cargada.
                  'Internal Server Error', en caso de un problema con el servidor.
```

- Elimina una película especificada por el ID enviado mediante URL.
```
URL:  http://localhost:3000/api/movies/
METHOD: DELETE
PARAMS: :id  
SUCCES RESPONSE: 'Se eliminó correctamente'
ERROR RESPONSE: 'Internal Server Error', en caso de un problema con el servidor.
                 error.
```

- Edita una película especificada por el ID enviado mediante URL.
```
URL:  http://localhost:3000/api/movies
METHOD: PATCH
PARAMS  :id  
BODY: {
        "id_api": , (int)
        "original_title": " ", (int)
        "backdrop_path": " ", (varchar)
        "poster_path": " ", (varchar)
        "overview": " ", (text)
        "vote_average": , (int)
        "vote_count": (int)
      }
SUCCES RESPONSE: 'La película se editó correctamente'.
ERROR RESPONSE  error.
```

- Agrega una película especificada por el ID enviado mediante URL.
```
URL:  http://localhost:3000/api/movies/list/
METHOD: GET
PARAMS: :id  
SUCCES RESPONSE: 'Película agregada'.
ERROR RESPONSE:  'Internal Server Error', en caso de un problema con el servidor.
                  error.
```

- Muestra el listado de películas favoritas según el ID del usuario enviado mediante URL.
```
URL:  http://localhost:3000/api/user/PARAMS/favoritos
METHOD: GET
PARAMS: :id  
SUCCES RESPONSE:  movies[], muestra las películas en la lista.
ERROR RESPONSE: error.
```

- Agrega una película al listado de favoritos, toma tanto el ID de la película como el ID del usuario.
```
URL:  http://localhost:3000/api/user/PARAM1/favoritos/PARAM
METHOD: POST
PARAMS: -1- :id
        -2- :idMovie    
SUCCES RESPONSE:  'Se agrego correctamente!'.
ERROR RESPONSE: error.
```

- Elimina una película del listado de favoritos toma tanto el ID de la película como el ID del usuario.
```
URL: http://localhost:3000/api/user/PARAM1/favoritos/PARAM2
METHOD: DELETE
PARAMS: -1- :id
        -2- :idMovie    
SUCCES RESPONSE:  'Se quitó exitosamete de la lsita de favoritos'.
ERROR RESPONSE: -error.
```

#### Users

- Muestra el listado de usuarios. Aquellos usuarios con el valor de 'id_role' = 1 son los usuarios administradores, aquellos con el valor 'id_role' = 2 son los usuarios registrados.
```
URL:  http://localhost:3000/api/users/
METHOD: GET
SUCCES RESPONSE:  users[], muestra el listado de usuarios.
ERROR RESPONSE:  error.     
```

- Busca un usuario en específico mediante un ID enviado mediante URL y lo retorna
```
URL:  http://localhost:3000/api/users/
METHOD: GET
PATAMS: :id
SUCCES RESPONSE:  user[], muestra el usuario con todos sus datos.
ERROR RESPONSE: 'Internal Server Error', en caso de un problema con el servidor.
                 error.     
```

- Crea un nuevo usuario tomando los valores recibidos por el BODY
```
URL:  http://localhost:3000/api/users/
METHOD: POST
BODY: {
        "userName": " ", (varchar)
        "password": " ", (varchar)
        "id_role":  (1 para administrador) / (2 para registrado)
      }
SUCCES RESPONSE:  created[], retorna el usuario nuevo.
ERROR RESPONSE: 'Internal Server Error', en caso de un problema con el servidor.
                 error.   
```

- Edita los valores name y password de un usuario específico según el ID ingresado por el BODY
```
URL:  http://localhost:3000/api/users/
METHOD: PUT
BODY: {
        "userName": " ", (varchar)
        "password": " ", (varchar)
        "id_role":  (1 para administrador) / (2 para registrado)
      }
SUCCES RESPONSE:  update[], retorna el usuario modificado.
ERROR RESPONSE:  'Internal Server Error', en caso de un problema con el servidor.
                  error.
```

- Elimina de forma lógica un usuario
```
URL:  http://localhost:3000/api/users/
METHOD: DELETE
BODY: {
        "id": , (int)
        "userName": " ", (varchar)
        "password": " ", (varchar)
        "deleted_at": , (datetime)
        "id_role":  
       }
SUCCES RESPONSE:  'deleted'.
ERROR RESPONSE: 'Internal Server Error', en caso de un problema con el servidor.
                 error.
```
