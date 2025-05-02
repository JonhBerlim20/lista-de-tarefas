function mostrarMensagem(mensagem, texto)
{
    mensagem.textContent = texto;
    mensagem.classList.add("transicao");

    setTimeout (() => 
    { 
        mensagem.classList.remove("transicao"); 
            
        setTimeout (() =>
        {
            mensagem.textContent = "";
        }, 1000);
    }, 3000); 
}

function adicionarTarefa() {
    
    let mensagem = document.getElementById("mensagem");
    let inputTarefa = document.getElementById("inputTarefa"); //A variavel inputTarefa armazena a linha do input, ou seja, a caixa de texto, não o valor digitado nela.
    let tarefa = inputTarefa.value; //A variavel tarefa armazena o valor digitado pelo usuario de dentro da caixa de texto devido o uso do .value

    if (tarefa != "")
    {
        let listaTarefa = document.getElementById("listaTarefa"); //listaTarefa armazena a lista ul
        let novaTarefa = document.createElement("li"); //novaTarefa cria uma novo campo vazio
        mostrarMensagem(mensagem , "Tarefa adicionada com sucesso!");

        novaTarefa.textContent = tarefa; //Adicionamos em novaTarefa uma informação, agora o campo possui um dado.
        listaTarefa.appendChild(novaTarefa); //Adicionamos na lista o campo de novaTarefa, atualizando a lista e mostrando no monitor.
        inputTarefa.value = ""; // A informação da caixa é esvaziada.
    }
    else
    {
        mostrarMensagem(mensagem , "O campo está vazio. Digite uma tarefa para continuar");
    }
}

window.onload = () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js')
            .then(() => console.log('Service Worker registrado com sucesso'))
            .catch(error => console.error('Erro ao registrar Service Worker:', error));
    }
};