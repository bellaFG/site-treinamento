
document.getElementById("pesquisa").addEventListener("input", function () {
    const filtro = this.value.toLowerCase();

    const links = document.querySelectorAll(".sidebar ul li");
    const secoes = document.querySelectorAll(".conteudo section");

    links.forEach((li) => {
        const texto = li.textContent.toLowerCase();
        li.style.display = texto.includes(filtro) ? "block" : "none";
    });

    secoes.forEach((secao) => {
        const texto = secao.textContent.toLowerCase();
        secao.style.display = texto.includes(filtro) ? "block" : "none";
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

function configurarToggleSidebar() {
    const toggleButton = document.getElementById("toggleSidebar");
    const sidebar = document.querySelector(".sidebar");
    const conteudo = document.querySelector(".conteudo");

    toggleButton.addEventListener("click", () => {
        sidebar.classList.toggle("closed");
        conteudo.classList.toggle("expandido");
    });
}


function configurarLinksSidebar() {
    const links = document.querySelectorAll('.sidebar ul li a');
    links.forEach(link => {
        link.addEventListener('click', function () {
            links.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function toggleSubmenu(id) {
    const submenu = document.getElementById(id);
    if (submenu) {
        submenu.style.display = submenu.style.display === "block" ? "none" : "block";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    configurarToggleSidebar();
    configurarLinksSidebar();
});
