const modalcadastro = new bootstrap.Modal(document.getElementById('modalcadastro'))

var idvendedoratual;

function alterar(idvendedor){
    idvendedoratual = idvendedor;
    fetch("http://127.0.0.1:5000/vendedor/"+idvendedor)
    .then(resp => resp.json())
    .then(function(dados){
        document.getElementById("nome").value = dados.nome;
        document.getElementById("telefone").value = dados.telefone;
        document.getElementById("email").value = dados.email;
        document.getElementById("cidade").value = dados.cidade;
        modalcadastro.show();
    });
}

function excluir(idvendedor){
    desejaexcluir = confirm("Deseja excluir esse cadastro?");
    if (!desejaexcluir){
        return;
    }
    fetch("http://127.0.0.1:5000/vendedor/"+idvendedor,
        {
            method: "DELETE"
        }

    ).then(function(){
        //recarrega a lista
        listar();
    });
}

function novo(){
    idvendedoratual = 0;
    document.getElementById("nome").value="";
    document.getElementById("telefone").value="";
    document.getElementById("email").value="";
    document.getElementById("cidade").value="";
    modalcadastro.show();
}

function salvar(){
    let vnome = document.getElementById("nome").value;
    let vtelefone = document.getElementById("telefone").value;
    let vemail = document.getElementById("email").value;
    let vcidade = document.getElementById("cidade").value;

    let vendedor = {
        nome: vnome,
        telefone: vtelefone,
        email: vemail,
        cidade: vcidade
    }

    let url;
    let metodo;
    if (idvendedoratual > 0){
        url = "http://127.0.0.1:5000/vendedor/"+idvendedoratual;
        metodo = "PUT";

    } else{
        url = "http://127.0.0.1:5000/vendedor";
        metodo = "POST";
    }

    fetch(url,
        {
            method: metodo,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(vendedor)
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

    fetch("http://127.0.0.1:5000/vendedor")
    .then(resp => resp.json())
    .then(dados => mostrar(dados));
}
function mostrar(dados){
    const lista = document.getElementById("lista");
    lista.innerHTML = "";
    for (let i in dados){
        lista.innerHTML += "<tr>"
        + "<td>" + dados[i].idvendedor + "</td>"
        + "<td>" + dados[i].nome + "</td>"
        + "<td>" + dados[i].telefone + "</td>"
        + "<td>" + dados[i].email + "</td>"
        + "<td>" + dados[i].cidade + "</td>"
        + "<td>"
        + "<button type='button' class='btn btn-primary' onclick='alterar("+dados[i].idvendedor+")'>ALTERAR</button>"
        + "<button type='button' class='btn btn-danger' onclick='excluir("+dados[i].idvendedor+")'>EXCLUIR</button>"
        + "</td>"
        + "</tr>";
    }

}