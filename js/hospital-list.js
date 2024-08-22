const ul = document.getElementById('hospitals-list');
const url = '/api/hospitals-list';

async function buscarDados() {
    try {
        const response = await fetch(url);
        const data = await response.json();

        data.forEach((hospital, i) => {
            ul.innerHTML += `
                        <li class="p-2 mt-2">
                            <a href="../html/avaliableTimeWait.html" target="_self" onclick="openWaze('${hospital.aberto? hospital.url : '/list'}')">
                                <h5>${hospital.nome}</h5>
                                <p><b>End:</b> ${hospital.end}</p>
                                <p><b>Cidade:</b> ${hospital.cidade}</p>
                                <p><b>Tel:</b> ${hospital.telefone}</p>
                                <h5 class="pt-2"><b>${hospital.aberto? 'Espera: ' + hospital.espera + 'min': 'Fechado'}</b></h5>
                            </a>
                        </li>
                    `
        });

        return data;
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
    }
}

let dados = [];

buscarDados().then(data => {
    dados = data;
    console.log(dados);
});

function openWaze(urlWaze) {
    window.open(urlWaze, '_blank');
}

