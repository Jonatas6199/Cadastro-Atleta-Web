//Quando a minha tela carregar o conteúdo
document.addEventListener("DOMContentLoaded", function () {

    if(!verificarLogado()){
        window.location.href = "login.html"
    }
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const lista = document.getElementById("listaUsuarios");

    if(usuarios.length === 0){

        const li = document.createElement("li");
        li.textContent = "Nenhum usuário cadastrado.";
        lista.appendChild(li);

    }else{

        usuarios.forEach(usuario => {

            const li = document.createElement("li");

            li.textContent = usuario.nome + " - " + usuario.email;

            lista.appendChild(li);

        });

    }
});


function voltar(){
    window.location.href = "login.html";
    logout();
}