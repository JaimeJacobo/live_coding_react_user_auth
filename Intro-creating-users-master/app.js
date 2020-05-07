const express = require('express');
const chalk = require('chalk');
const app = express();
const PORT = process.env.PORT || 5000
const database = require('./conf');
const bcrypt = require('bcrypt');


//Activamos el body parser de express
app.use(express.urlencoded({extended: false}));
app.use(express.json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

//Ruta GET para ver todos los usuarios
app.get('/users', (req, res)=>{
  database.query('SELECT * FROM user', (error, results)=>{
    !error
    ? res.send(results)
    : res.send(error)
  })
})


//Ruta POST para registrar un nuevo usuario
app.post('/register', async (req, res)=>{

  //Array de errores donde vamos a meter todos los errores 
  let errors = [];

  const name = req.body.name;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  const email = req.body.email;

  //Comprobar si hay algún campo vacío
  if(!name || !password || !confirmPassword || !email){
    errors.push({msg: 'Tienes que rellenar todos los campos', subMsg: 'Acuerdate que las dos contraseñas tienen que ser iguales'})
  }

  //Comprobar si la contraseña es demasiado corta
  if(password.length < 6){
    errors.push({msg: 'Tu contraseña es demasiado corta', subMsg: 'Acuerdate que las dos contraseñas tienen que ser iguales'})
  }

  //Comprobar si las dos contraseñas introducidas son iguales
  if(password !== confirmPassword){
    errors.push({msg: 'Las dos contraseñas no coinciden', subMsg: 'Acuerdate que las dos contraseñas tienen que ser iguales'})
  }

  //Comprobar que el email tenga una @
  if(!email.includes('@')){
    errors.push({msg: 'Email incorrecto', subMsg: 'Acuerdate que las dos contraseñas tienen que ser iguales'})
  }

  if(errors.length > 0){
    res.send(errors)
  } else {
    const hashedPassword =  await bcrypt.hash(password, 5)
    const validatedBody = {
      name: name,
      password: hashedPassword,
      email: email
    }
    database.query('INSERT INTO user SET ?', validatedBody, (error, results)=>{
      !error
      ? res.send([{msg: 'Usuario creado con exito'}])
      : res.send(error)
    })
  }
})

app.listen(PORT, ()=>{
  console.log(chalk.green.inverse.bold(`Conectado servidor en puerto ${PORT}`))
})