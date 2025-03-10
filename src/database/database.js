//Esse arquivo contém as configs de acesso ao db no mongoDB via mongoose
import mongoose from "mongoose";

// essa função define a url em que o mongoose irá se conectar e qual o nome do db que será acessado, ou, caso não exista ainda, criado
mongoose.connect('mongodb://localhost:27017/medi-app');

// Nessa inserimos numa variável a 'connection' que usaremos para definições de retornos abaixo
const db = mongoose.connection;

// Essa função define o retorno caso haja erro na conexão!
db.on('error', console.error.bind(console, 'connection error: '));

//Nessa função do mongoose.connection definimos que, uma vez conectado, dispare a callback que confirma!
db.once(
    'open', function() {
        console.log('database connected successfully!')
    }
);

export default db;