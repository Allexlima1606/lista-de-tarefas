const button = document.querySelector('.button')
const input = document.querySelector('.input-task')
const listaCompleta = document.querySelector('.list-tasks')

let minhaListaDeItens = []

function adicionarNovaTarefa() {
    minhaListaDeItens.push({
        tarefa: input.value,
        concluida: false
    })

    if (document.getElementById("inputs").value == "") {
         alert('Por favor, preencha o campo Minha Lista');
         document.getElementById("inputs").focus();
         return false
         
     }


    input.value = ''

    mostrarTarefas()
}

function mostrarTarefas() {
    let novaLi = ''

    minhaListaDeItens.forEach((item, posicao) => {
        novaLi = novaLi + `

            <li class="task ${item.concluida && "done"}">
                <img src="./img/checked.png" alt="checked" onclick="concluirTarefa(${posicao})">
                <p>${item.tarefa}</p>
                <img src="./img/trash.png" alt="lixeira" onclick="deletarItem(${posicao})">
            </li>
        
        `
    })

    listaCompleta.innerHTML = novaLi

    localStorage.setItem('lista', JSON.stringify(minhaListaDeItens))

}

function concluirTarefa(posicao) {

    minhaListaDeItens[posicao].concluida = !minhaListaDeItens[posicao].concluida

    mostrarTarefas()
}

function deletarItem(posicao) {
    minhaListaDeItens.splice(posicao, 1)

    mostrarTarefas()
}

function recaregarTarefas() {
    const tarefasDoLocalStorage = localStorage.getItem('lista')

    if (tarefasDoLocalStorage) {
        minhaListaDeItens = JSON.parse(tarefasDoLocalStorage)
    }

    mostrarTarefas()
}

recaregarTarefas()

input.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        adicionarNovaTarefa()
    }
});






button.addEventListener('click', adicionarNovaTarefa)