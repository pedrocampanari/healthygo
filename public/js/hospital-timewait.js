const url = window.location.href;
const urlParts = url.split('/:');
const id = urlParts[urlParts.length - 1];

console.log(id);

const button = document.getElementById('btn-avaliar');
const radios = document.querySelectorAll('input[type="radio"]');


button.addEventListener('click', async()=>{
    let radioValue = 0;
    for (const radio of radios) {
        // Verifica se o botão de rádio está selecionado
        if (radio.checked) {
            radioValue = radio.value;
        }
    }
    console.log(radioValue);

    const url = '/api/hospitals/';
    let dados = {
        id: id,
        value: radioValue
    }
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    }
    await fetch(url, options).then(response => response.json()).then(dados =>{
        console.log(dados);
    })

    window.location.href = '/';


});



