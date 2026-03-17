//passo o evento por parâmetro pq eu sei que
//que vai chamar é o form
function login(event){
    event.preventDefault(); //Previne o recarregamento da página
    const usuario = getElementValue("input-nome");
    const senha = getElementValue("input-senha");

    if(usuario === "admin" &&
        senha === "123"
    ){
        //vai ser como se fosse um token
        localStorage.setItem("logado", "true");
        window.location.href = "cadastrados.html"
        return true;
    }
    else{
        showErrorLoginMessage();
        return false;
    }
}

function logout(){
    localStorage.removeItem("logado");
    window.location.href = "cadastro.html"
}

function verificarLogado(){
    if(localStorage.getItem("logado") === "true")
        return true;
    else 
        return false;
}

function getElementValue(element){
    return document.getElementById(element).value;
}

function showErrorLoginMessage() {
    setElementText("mensagem", "Usuário e/ou senha incorretos");
    setElementDisplay("overlay","flex");
}

function setElementText(element, text){
    document.getElementById(element).textContent = text;
}

function setElementDisplay(element, display){
    document.getElementById(element).style.display = display;
}