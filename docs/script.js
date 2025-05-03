const mensagem = document.getElementById("mensagem");
let tarefas = [];
function mostrarMensagem(texto, cor)
{
    mensagem.textContent = texto;
    mensagem.style.color = cor;
    mensagem.classList.add("transicao");

    setTimeout (() => 
    { 
        mensagem.classList.remove("transicao"); 
            
        setTimeout (() =>
        {
            mensagem.textContent = "";
        }, 1000);
    }, 4000); 
}

function adicionarTarefa() {
    
    const inputTarefa = document.getElementById("inputTarefa"); //A variavel inputTarefa armazena a linha do input, ou seja, a caixa de texto, não o valor digitado nela.
    let tarefa = inputTarefa.value.trim(); //A variavel tarefa armazena o valor digitado pelo usuario de dentro da caixa de texto devido o uso do .value

    if (tarefas.includes(tarefa)) 
    {
        mostrarMensagem("Esta tarefa já está registrada!", "#ea0000");
    } 
    else 
    {
        if (tarefa != "")
        {
            mostrarMensagem("Tarefa adicionada com sucesso!", "#008000");
            tarefas.push(tarefa);
            atualizarTarefas();
        }
        else
        {
            mostrarMensagem("O campo está vazio. Digite uma tarefa para continuar!", "#ea0000");
        }
    }

    inputTarefa.value = ""; // A informação da caixa é esvaziada.
}

function atualizarTarefas() {
    const listaTarefa = document.getElementById("listaTarefa"); //listaTarefa armazena a lista ul
    listaTarefa.innerHTML = "";

    for (i in tarefas) {
        let novaTarefa = document.createElement("li"); //novaTarefa cria uma novo campo vazio
        novaTarefa.textContent = tarefas[i]; //Adicionamos em novaTarefa uma informação, agora o campo possui um dado.
        listaTarefa.appendChild(novaTarefa); //Adicionamos na lista o campo de novaTarefa, atualizando a lista e mostrando no monitor.
    }
    
}

window.onload = () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js')
            .then(() => console.log('Service Worker registrado com sucesso'))
            .catch(error => console.error('Erro ao registrar Service Worker:', error));
    }
};
