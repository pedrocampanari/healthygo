const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');


app.use(express.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/public/html/index.html');
});

app.get('/list', (req, res)=>{
    res.sendFile(__dirname + '/public/html/hospital-list.html');
})

app.get('/admin', (req, res)=>{
    res.sendFile(__dirname + '/public/html/admin-page.html');
});

app.get('/:id', async (req, res)=>{
    res.sendFile(__dirname + '/public/html/avaliableTimeWait.html');
});


mongoose.connect('mongodb://localhost:27017').then(()=>{
    console.log('Conectado ao mongoDb');
}).catch(err => {
    console.log(err);
});



const testeSchema = new mongoose.Schema({
  nome: String,
  tipo: String,
  cidade: String,
  aberto: Boolean,
  espera: Number,
  telefone: String,
  cnes: String,
  lat: String,
  lng: String,
  url: String
});

const Hospital = mongoose.model('Hospital', testeSchema);

const userSchema = new mongoose.Schema({
    username: String,
    password: String
});
  
const Users = mongoose.model('User', userSchema);

app.get('/api/hospitals-list', async (req, res)=>{
    console.log('OK');

    try {
        const hospital = await Hospital.find().sort({espera:1});
        console.log(hospital)
        res.json(hospital);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.put('/api/hospitals/', async (req, res) => {
    try {
        const updatedHospital = await Hospital.findByIdAndUpdate(
            req.body.id, 
            { espera: req.body.value },
            { new: true }  
        );
        
        if (!updatedHospital) {
            return res.status(404).json({ message: 'Hospital not found' });
        }
        
        res.json(updatedHospital);
        console.log(updatedHospital);
    } catch (err) {
        res.status(400).send(err);
    }
});

app.get('/admin/102ks/dashboard/', (req, res)=>{
    res.sendFile(__dirname + '/public/html/dashboard.html');
});

app.post('/loginValidation', async (req, res)=>{
    console.log('TESTE - OK', req.body);
    try{
        const user = await Users.find({username: req.body.username, password: req.body.password});
        console.log(user);
        if(user.length != 0){
            res.json({validation: true});
        }else{
            res.json({validation: false});
        }
    }catch(err){
        console.log(err);
    }

    
});

app.listen(2321, '0.0.0.0', ()=>{
    console.log('Server is online - http://localhost:2321/');
});