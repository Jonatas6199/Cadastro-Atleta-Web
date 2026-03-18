function cadastrar(event) {
    event.preventDefault(); //Previne o recarregamento da página

    //Capturando os valores dos elementos do meu formulário
    const nome = getElementValue("input-nome");
    const email = getElementValue("input-email");
    const senha = getElementValue("input-senha");

    const usuario = { //Criando um objeto usuario que não é mapeado automaticamente
        nome: nome,
        email: email,
        senha: senha
    };

    //Tenta ler os dados da lista de usuários, se ela não existir, devolve uma vazia
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    //adiciona o usuario na lista de usuários
    usuarios.push(usuario);

    //atualiza ou cria a lista no localStorage com o formato de JSON
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    setElementText("mensagem","Dados do " + nome + " cadastrados!");
    setElementDisplay("overlay","flex");
    resetForm();
}
function showHelpMessage() {
    setElementText("mensagem", "Preencha todos os campos do formulário");
    setElementDisplay("overlay","flex");
}
function fecharOverlay() {
    setElementDisplay("overlay","none");
}

//adiciona um escutador pra quando houver um click no elemento do overlay
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("overlay").onclick = function (e) {
        if (e.target.id === "overlay") {
            fecharOverlay();
        }
    }
});

//adiciona um escutador pra toda vez que o usuário digitar dentro da tela
//se for um esc, ele fecha o overlay
document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
        fecharOverlay();
    }
});


function verCadastrados() {
    //redirecionar para um endereço
    window.location.href = "dashboard.html"
}

function setElementText(element, text){
    document.getElementById(element).textContent = text;
}

function setElementDisplay(element, display){
    document.getElementById(element).style.display = display;
}

function resetForm(){
    document.getElementById("form-login").reset(); // limpa todos os campos
}
function getElementValue(element){
    return document.getElementById(element).value;
}