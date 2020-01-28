const endereco = document.querySelector('input[name=endereco]');
const bairro = document.querySelector('input[name=bairro]');
const cidade = document.querySelector('input[name=cidade]');
const uf = document.querySelector('input[name=uf]');
const btn = document.querySelector('button');

const consultaCEP = (cep) => {

    return novaConsulta = new Promise((sendOK, sendFail) => {

        const ajax = new XMLHttpRequest();

        ajax.open('GET', `https://viacep.com.br/ws/${cep}/json`);

        ajax.send(null);

        ajax.onreadystatechange = () => {
            if (ajax.readyState === 4) {
                if (ajax.status === 200) {
                    sendOK(JSON.parse(ajax.responseText));
                } else {
                    sendFail("Erro durante a requisição");
                }
            }
        }
    });
}

btn.onclick = () => {

    consultaCEP(document.querySelector('input[name=cep]').value)
        .then((sendOK) =>{
            endereco.value = sendOK.logradouro;
            bairro.value = sendOK.bairro;
            cidade.value = sendOK.localidade;
            uf.value = sendOK.uf;
        })
        .catch((error)=> {
            console.log(error)
        })
}