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

    const inputTarefa = document.getElementById("inputTarefa");
    let tarefa = capitalize(inputTarefa.value.trim()); //A variavel tarefa armazena o valor digitado pelo usuario de dentro da caixa de texto devido o uso do .value

    if (tarefas.includes(tarefa)) {
        mostrarMensagem("Esta tarefa já está registrada!", "#ea0000");
    } 
    else {
        if (tarefa != "") {
            mostrarMensagem("Tarefa adicionada com sucesso!", "#008000");
            tarefas.push(tarefa);
            atualizarTarefas();
        }
        else {
            mostrarMensagem("O campo está vazio. Digite uma tarefa para continuar!", "#ea0000");
        }
    }

    inputTarefa.value = ""; // A informação da caixa é esvaziada.
}

function capitalize(str) {
    return str.split(" ").map(i => i.charAt(0).toUpperCase() + i.slice(1).toLowerCase()).join(" ");
}

function atualizarTarefas() {
    const listaTarefa = document.getElementById("listaTarefa"); //listaTarefa armazena a lista ul
    listaTarefa.innerHTML = "";

    tarefas.sort();

    for (let [i, tarefa] of tarefas.entries()) {
        let novaTarefa = document.createElement("li"); //novaTarefa cria uma novo campo vazio
        novaTarefa.textContent = tarefa; //Adicionamos em novaTarefa uma informação, agora o campo possui um dado.
        
        let botaoRemover = document.createElement("button");
        botaoRemover.className = "remover";
        botaoRemover.textContent = "Remover";
        botaoRemover.onclick = () => removerTarefa(i, tarefa);

        let botaoEditar = document.createElement("button");
        botaoEditar.className = "editar";
        botaoEditar.textContent = "Editar";
        botaoEditar.onclick = () => editarTarefa(i);

        novaTarefa.appendChild(botaoRemover);
        novaTarefa.appendChild(botaoEditar);
        listaTarefa.appendChild(novaTarefa); //Adicionamos na lista o campo de novaTarefa, atualizando a lista e mostrando no monitor.
    }
}

function removerTarefa(i, tarefa) {
    tarefas.splice(i, 1);
    atualizarTarefas();
    mostrarMensagem(`Tarefa ${tarefa} removida!`, "#ea0000");
}

function editarTarefa(i) {
    let tarefaEditada = capitalize(prompt("Edite a tarefa:"));
    if (tarefaEditada.trim() != "") {
        tarefas[i] = tarefaEditada;
        atualizarTarefas();
        mostrarMensagem("Tarefa editada com sucesso!", "#008000");
    }
}

function limparTudo() {
    if (tarefas.length > 0) {
        tarefas = [];
        atualizarTarefas();
        mostrarMensagem("Lista de tarefas limpa com sucesso!", "#008000");
    }
    else {
        mostrarMensagem("Não há nenhum item na lista!", "#ea0000");
    }
}

window.onload = () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js')
            .then(() => console.log('Service Worker registrado com sucesso'))
            .catch(error => console.error('Erro ao registrar Service Worker:', error));
    }
};
