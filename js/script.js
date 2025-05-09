document.getElementById("pesquisa").addEventListener("input", function () {
    const filtro = this.value.toLowerCase();

    const links = document.querySelectorAll(".sidebar ul li");
    const secoes = document.querySelectorAll(".conteudo section");

    links.forEach((li) => {
        const texto = li.textContent.toLowerCase();
        if (texto.includes(filtro)) {
            li.style.display = "block";
        } else {
            li.style.display = "none";
        }
    });

    secoes.forEach((secao) => {
        const texto = secao.textContent.toLowerCase();
        if (texto.includes(filtro)) {
            secao.style.display = "block";
        } else {
            secao.style.display = "none";
        }
    });
});
function mostrarSecao(id) {

    const secoes = document.querySelectorAll(".conteudo section");
    secoes.forEach(secao => secao.style.display = "none");

    const alvo = document.getElementById(id);
    if (alvo) {
        alvo.style.display = "block";
        alvo.scrollIntoView({ behavior: "smooth" });
    }

}
function limparSecao() {
    const conteudoPrincipal = document.getElementById("conteudo-principal");
    const conteudoDinamico = document.getElementById("conteudo-dinamico");

    if (conteudoDinamico) {
        conteudoDinamico.remove();
    }

    conteudoPrincipal.style.display = "block";
}

document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.getElementById("toggleSidebar");
    const sidebar = document.querySelector(".sidebar");
    const conteudo = document.querySelector(".conteudo");

    toggleButton.addEventListener("click", () => {
        sidebar.classList.toggle("closed");
        conteudo.classList.toggle("expandido");
    });
});