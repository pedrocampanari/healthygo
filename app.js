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

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/html/index.html');
});

app.get('/list', (req, res) => {
    res.sendFile(__dirname + '/public/html/hospital-list.html');
})

app.get('/admin', (req, res) => {
    res.sendFile(__dirname + '/public/html/admin-page.html');
});

app.get('/:id', async (req, res) => {
    res.sendFile(__dirname + '/public/html/avaliableTimeWait.html');
});


mongoose.connect('mongodb+srv://pedrocampanari09_db_user:SZwcbh26hRQB5Rlp@healthgo.csoyflo.mongodb.net/?appName=healthgo').then(() => {
    console.log('Conectado ao mongoDb');
}).catch(err => {
    console.log(err);
});



const hospitalSchema = new mongoose.Schema({
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



const Hospital = mongoose.model('Hospital', hospitalSchema);

const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

const Users = mongoose.model('User', userSchema);


// const dadosHospitais = [
//   {
//     "nome": "ESF VILA ALEGRE",
//     "tipo": "Centro de Saúde/Unidade Básica",
//     "cidade": "Três Lagoas",
//     "aberto": true,
//     "espera": 30,
//     "telefone": "(67) 3929-1853",
//     "cnes": "2757133",
//     "lat": "-20.7907809",
//     "lng": "-51.6848044",
//     "url": "http://cnes2.datasus.gov.br/Mod_Conjunto.asp?VCo_Unidade=5008302757133"
//   },
//   {
//     "nome": "CENTRO DE ATENCAO PSICOSSOCIAL ALCOOL E OUTRAS DROGAS CAPSAD",
//     "tipo": "CAPS - Álcool e Drogas",
//     "cidade": "Três Lagoas",
//     "aberto": true,
//     "espera": 15,
//     "telefone": "(67) 99182-0850",
//     "cnes": "6726747",
//     "lat": "-20.7954929",
//     "lng": "-51.7195179",
//     "url": "https://cnes2.datasus.gov.br/Lista_Es_Municipio.asp?VEstado=50&VCodMunicipio=500830"
//   },
//   {
//     "nome": "BANCO DE SANGUE DO HOSPITAL NOSSA SENHORA AUXILIADORA",
//     "tipo": "Banco de Sangue (Unidade Hospitalar)",
//     "cidade": "Três Lagoas",
//     "aberto": true,
//     "espera": 45,
//     "telefone": "(67) 2105-3500",
//     "cnes": "3101290",
//     "lat": "-20.7954929",
//     "lng": "-51.7195179",
//     "url": "https://cnes2.datasus.gov.br/Lista_Es_Municipio.asp?VEstado=50&VCodMunicipio=500830"
//   },
//   {
//     "nome": "HOSPITAL NOSSA SENHORA AUXILIADORA",
//     "tipo": "Hospital Geral",
//     "cidade": "Três Lagoas",
//     "aberto": true,
//     "espera": 60,
//     "telefone": "(67) 2105-3500",
//     "cnes": "2757052",
//     "lat": "-20.7954929",
//     "lng": "-51.7195179",
//     "url": "https://cnes2.datasus.gov.br/Mod_Conjunto.asp?VCo_Unidade=5008302757052"
//   },
//   {
//     "nome": "CEM - CENTRO DE ESPECIALIDADES MÉDICAS",
//     "tipo": "Clínica de Especialidades",
//     "cidade": "Três Lagoas",
//     "aberto": true,
//     "espera": 10,
//     "telefone": "(67) 3929-1275",
//     "cnes": "2376040",
//     "lat": "-20.7921451",
//     "lng": "-51.716056",
//     "url": "https://cnes2.datasus.gov.br/Exibe_Ficha_Estabelecimento.asp?VCo_Unidade=5000702376040"
//   },
//   {
//     "nome": "UNIDADE DE PRONTO ATENDIMENTO UPA 24 HORAS",
//     "tipo": "Unidade de Pronto Atendimento (UPA)",
//     "cidade": "Três Lagoas",
//     "aberto": true,
//     "espera": 90,
//     "telefone": "(67) 3929-1254",
//     "cnes": "9369324",
//     "lat": "-20.8088705",
//     "lng": "-51.7152431",
//     "url": "https://cnes2.datasus.gov.br/Mod_Conjunto.asp?VCo_Unidade=5008309369324"
//   },
//   {
//     "nome": "HOSPITAL REGIONAL DE TRÊS LAGOAS",
//     "tipo": "Hospital Regional",
//     "cidade": "Três Lagoas",
//     "aberto": true,
//     "espera": 30,
//     "telefone": "(67) 4042-9967",
//     "cnes": "2945622",
//     "lat": "-20.7954102",
//     "lng": "-51.7195179",
//     "url": "https://cnes2.datasus.gov.br/Mod_Conjunto.asp?VCo_Unidade=5008302945622"
//   },
//   {
//     "nome": "CLINICA DA MULHER TRÊS LAGOAS",
//     "tipo": "Clinica da mulher",
//     "cidade": "Três Lagoas",
//     "aberto": true,
//     "espera": 30,
//     "telefone": "(67) 3929-1780",
//     "cnes": "2757176",
//     "lat": "-20.7953275",
//     "lng": "-51.7195179",
//     "url": "https://cnes2.datasus.gov.br/Mod_Conjunto.asp?VCo_Unidade=5008302757176"
//   },
//   {
//     "nome": "ESF SANTA RITA",
//     "tipo": "Centro de Saúde/Unidade Básica",
//     "cidade": "Três Lagoas",
//     "aberto": true,
//     "espera": 30,
//     "telefone": "(67) 3929-9897",
//     "cnes": "2224631",
//     "lat": "-20.7779705",
//     "lng": "-51.7172759",
//     "url": "https://cnes2.datasus.gov.br/Exibe_Ficha_Estabelecimento.asp?VCo_Unidade=4300852224631"
//   },
//   {
//     "nome": "ESF VILA HARO",
//     "tipo": "Centro de Saúde/Unidade Básica",
//     "cidade": "Três Lagoas",
//     "aberto": true,
//     "espera": 30,
//     "telefone": "(67) 3929-1826",
//     "cnes": "2757141",
//     "lat": "-20.8044566",
//     "lng": "-51.7353328",
//     "url": "https://cnes2.datasus.gov.br/Mod_Conjunto.asp?VCo_Unidade=5008302757141"
//   },
//   {
//     "nome": "USF NOVA TRÊS LAGOAS",
//     "tipo": "Centro de Saúde/Unidade Básica",
//     "cidade": "Três Lagoas",
//     "aberto": true,
//     "espera": 30,
//     "telefone": "(67) 99226-7060",
//     "cnes": "9543333",
//     "lat": "-20.8081622",
//     "lng": "-51.7059919",
//     "url": "https://cnes2.datasus.gov.br/Exibe_Ficha_Estabelecimento.asp?VCo_Unidade=5008309543333&VListar=1&VEstado=50&VMun=500830"
//   },
//   {
//     "nome": "ESF JARDIM MARISTELA",
//     "tipo": "Centro de Saúde/Unidade Básica",
//     "cidade": "Três Lagoas",
//     "aberto": true,
//     "espera": 30,
//     "telefone": "(67) 3929-1486",
//     "cnes": "6343864",
//     "lat": "-20.798871",
//     "lng": "-51.7371049",
//     "url": "https://cnes2.datasus.gov.br/Mod_Conjunto.asp?VCo_Unidade=5008306343864"
//   }
// ];
// --- 4. ROTA CORRIGIDA COM TRATAMENTO DE ERROS ---

const dadosHospitais = [
     {
    "nome": "HOSPITAL REGIONAL ALVARO FONTOURA",
    "tipo": "Hospital geral",
    "cidade": "Coxim",
    "aberto": true,
    "espera": 30,
    "telefone": "(67) 3291-1250",
    "cnes": "6426190",
    "lat": "-18.507684475917134",
    "lng": "-54.75100566481013",
    "url": "http://cnes2.datasus.gov.br/Exibe_Ficha_Estabelecimento.asp?VCo_Unidade=5003306426190&VListar=1&VEstado=50&VMun=500330"
  },
  {
    "nome": "ESF ILDA MARIA KOHL",
    "tipo": "Centro de Saúde/Unidade Básica",
    "cidade": "Coxim",
    "aberto": true,
    "espera": 30,
    "telefone": "(67) 3291-5068",
    "cnes": "3338258",
    "lat": "-18.5098747",
    "lng": "-54.7642535",
    "url": "https://cnes2.datasus.gov.br/Mod_Ambulatorial.asp?VCo_Unidade=5003303338258"
  }
]


app.get('/Teste/2', async (req, res) => {
    console.log('OK RE')

    try {
        // Verifica se a conexão com o banco está pronta antes de tentar a inserção
        if (mongoose.connection.readyState !== 1) {
            return res.status(503).send({ 
                mensagem: "Serviço Indisponível. A conexão com o banco de dados falhou ou ainda não foi estabelecida." 
            });
        }

        //const response = await Hospital.insertMany(dadosHospitais);
        const response = await Hospital.deleteMany({cidade:"Coxim"});


        console.log(`Sucesso: ${response.length} documentos inseridos.`);

        // Retorna a resposta de sucesso com os documentos inseridos
        res.status(201).send({
            mensagem: `Inserção de ${response.length} documentos realizada com sucesso!`,
            dados_inseridos: response.map(doc => doc.nome) // Mostra apenas os nomes inseridos
        });

    } catch (error) {
        console.error("Erro durante a inserção de dados:", error);
        
        // Retorna um erro 500 para o cliente, detalhando a falha
        res.status(500).send({
            mensagem: "Erro ao tentar inserir os dados no MongoDB.",
            detalhe: error.message
        });
    }

});



app.get('/api/hospitals-list', async (req, res) => {
    console.log('OK');

    try {
        const hospital = await Hospital.find().sort({ espera: 1 });
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

app.get('/admin/102ks/dashboard/', (req, res) => {
    res.sendFile(__dirname + '/public/html/dashboard.html');
});

app.post('/loginValidation', async (req, res) => {
    console.log('TESTE - OK', req.body);
    try {
        const user = await Users.find({ username: req.body.username, password: req.body.password });
        console.log(user);
        if (user.length != 0) {
            res.json({ validation: true });
        } else {
            res.json({ validation: false });
        }
    } catch (err) {
        console.log(err);
    }


});

app.listen(3000, '0.0.0.0', () => {
    console.log('Server is online - http://localhost:2321/');
});