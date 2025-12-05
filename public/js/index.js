const button = document.getElementById('find-hospitals');

button.addEventListener('click', ()=>{
    window.location.href = '/list'
});


var map = L.map('map').setView([-20.7870, -51.7039], 15);
// Inicializa o mapa


// Adiciona tiles do OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Pontos fixos com suas coordenadas e informações
var pontosFixos = [
  { lat: -20.7839, lng: -51.7171, name: 'USF Santa Rita' }, // R. Alexandre Abraão, 2334
  { lat: -20.7955, lng: -51.7103, name: 'USF Interlagos – Gabriel Marques Fernandes' }, // R. Eurídice Chagas Cruz, 521
  { lat: -20.7873, lng: -51.6990, name: 'USF Santo André' }, // R. Coronel Augusto Corrêa da Costa, 284
  { lat: -20.7774, lng: -51.7302, name: 'USF Vila Piloto' }, // R. 34, 250
  { lat: -20.7741, lng: -51.7257, name: 'USF Chácara Eldorado' }, // R. Rogaciano Garcia Moreira, S/N
  { lat: -20.7804, lng: -51.7034, name: 'UPA 24h' } // R. Irmãos Spinelli, 1855
];


// Adiciona os marcadores no mapa
pontosFixos.forEach(function(ponto) {
    L.marker([ponto.lat, ponto.lng]).addTo(map)
        .bindPopup(ponto.name)
        .openPopup();
});