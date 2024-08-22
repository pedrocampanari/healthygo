const username = document.getElementById('username');
const password = document.getElementById('password');
const btnSubmit = document.getElementById('btn-submit');



async function requestPost(){
    const url = '/loginValidation'
    const data = {
        username: username.value,
        password: password.value
    };
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    
    let response = await fetch(url, options);
    let jsonData = await response.json();

    if(jsonData.validation){
        window.location.href = '/admin/102ks/dashboard/';
    }
    console.log(jsonData);
}


document.getElementById('myform').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o comportamento padrão do formulário
    requestPost();   
});