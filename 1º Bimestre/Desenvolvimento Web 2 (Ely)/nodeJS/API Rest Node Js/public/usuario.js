const modalcadastro = new bootstrap.Modal(document.getElementById('modalcadastro'))

var idusuarioatual;

function alterar(idusuario){
    idusuarioatual = idusuario;
    fetch("http://127.0.0.1:4444/usuario/"+idusuario)
    .then(resp => resp.json())
    .then(function(dados){
        document.getElementById("nome").value = dados.nome;
        document.getElementById("telefone").value = dados.telefone;
        document.getElementById("email").value = dados.email;
        modalcadastro.show();
    });
}

function excluir(idusuario){
    desejaexcluir = confirm("Deseja excluir?");
    if (!desejaexcluir){
        return;
    }
    fetch("http://127.0.0.1:4444/usuario/"+idusuario,
        {
            method: "DELETE"
        }

    ).then(function(){
        //recarrega a lista
        listar();
    });
}

function novo(){
    idusuarioatual = 0;
    document.getElementById("nome").value="";
    document.getElementById("telefone").value="";
    document.getElementById("email").value="";
    modalcadastro.show();
}

function salvar(){
    let vnome = document.getElementById("nome").value;
    let vtelefone = document.getElementById("telefone").value;
    let vemail = document.getElementById("email").value;

    let usuario = {
        nome: vnome,
        telefone: vtelefone,
        email: vemail,
        senha: ""
    }

    let url;
    let metodo;
    if (idusuarioatual > 0){
        url = "http://127.0.0.1:4444/usuario/"+idusuarioatual;
        metodo = "PUT";

    } else{
        url = "http://127.0.0.1:4444/usuario";
        metodo = "POST";
    }

    fetch(url,
        {
            method: metodo,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuario)
        }
    ).then(function(){
        //recarrega a lista
        listar();
        //esconde o modal
        modalcadastro.hide();
    })
}


function listar(){
    const lista = document.getElementById("lista");
    lista.innerHTML = "<tr><td colspan='5'>Carregando...</td></tr>";

    fetch("http://127.0.0.1:4444/usuario")
    .then(resp => resp.json())
    .then(dados => mostrar(dados));
}
function mostrar(dados){
    const lista = document.getElementById("lista");
    lista.innerHTML = "";
    for (let i in dados){
        lista.innerHTML += "<tr>"
        + "<td>" + dados[i].idusuario + "</td>"
        + "<td>" + dados[i].nome + "</td>"
        + "<td>" + dados[i].telefone + "</td>"
        + "<td>" + dados[i].email + "</td>"
        + "<td>"
        + "<button type='button' class='btn btn-primary' onclick='alterar("+dados[i].idusuario+")'>A</button>"
        + "<button type='button' class='btn btn-danger' onclick='excluir("+dados[i].idusuario+")'>X</button>"
        + "</td>"
        + "</tr>";
    }

}