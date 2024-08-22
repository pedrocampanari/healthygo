const button = document.getElementById('find-hospitals');

button.addEventListener('click', ()=>{
    window.location.href = '/html/hospital-list.html'
});


var map = L.map('map').setView([-21.7967, -50.8786], 15); // São Paulo, por exemplo

// Inicializa o mapa


// Adiciona tiles do OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Pontos fixos com suas coordenadas e informações
var pontosFixos = [
    { lat: -21.803564, lng: -50.8781468, name: 'Santa Casa da Misericórdia de Osvaldo Cruz'},
    { lat: -21.7974525, lng: -50.8787077, name: 'Centro de Saúde'},
];

// Adiciona os marcadores no mapa
pontosFixos.forEach(function(ponto) {
    L.marker([ponto.lat, ponto.lng]).addTo(map)
        .bindPopup(ponto.name)
        .openPopup();
});