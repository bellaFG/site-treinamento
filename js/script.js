document.addEventListener("DOMContentLoaded", function () {
    configurarToggleSidebar();
    configurarLinksDePagina();
    configurarSubmenus();
    configurarBuscaInterna();
    configurarLogoClick();
});

function configurarToggleSidebar() {
    const toggleButton = document.getElementById("toggleSidebar");
    const sidebar = document.querySelector(".sidebar");
    const conteudo = document.querySelector(".conteudo");

    if (toggleButton) {
        toggleButton.addEventListener("click", () => {
            sidebar.classList.toggle("closed");
            conteudo.classList.toggle("expandido");
        });
    }
}

function configurarSubmenus() {
    const submenuToggles = document.querySelectorAll('.menu-toggle');

    submenuToggles.forEach(button => {
        button.addEventListener('click', () => {
            const submenuId = button.dataset.submenu;
            const submenu = document.getElementById(submenuId);

            if (submenu) {
                submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
            }
        });
    });
}

function configurarBuscaInterna() {
    const campoBusca = document.getElementById("pesquisa");

    if (campoBusca) {
        campoBusca.addEventListener("input", function () {
            const termo = this.value.toLowerCase();
            const links = document.querySelectorAll(".sidebar ul li");
            const secoes = document.querySelectorAll(".conteudo section");
            const conteudo = document.getElementById("conteudo-principal");
            const mensagemVazia = document.getElementById("mensagem-vazia");

            links.forEach(li => {
                const texto = li.textContent.toLowerCase();
                li.style.display = texto.includes(termo) ? "block" : "none";
            });

            if (conteudo) {
                const texto = conteudo.innerText.toLowerCase();
                const encontrado = texto.includes(termo);
                conteudo.style.display = encontrado ? "block" : "none";

                if (mensagemVazia) {
                    mensagemVazia.style.display = (termo !== "" && !encontrado) ? "block" : "none";
                }
            }
        });
    }
}

function configurarLogoClick() {
    const logo = document.querySelector('.logo-nome');
    if (logo) {
        logo.addEventListener('click', limparSecao);
    }
}

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
    const mensagemVazia = document.getElementById("mensagem-vazia");

    if (conteudoDinamico) {
        conteudoDinamico.remove();
    }

    if (mensagemVazia) {
        mensagemVazia.style.display = "none";
    }

    conteudoPrincipal.style.display = "block";
}

function carregarPagina(nomeArquivo) {
    fetch(`pages/${nomeArquivo}.html`)
        .then(resp => resp.text())
        .then(html => {
            const principal = document.getElementById("conteudo-principal");
            const anterior = document.getElementById("conteudo-dinamico");

            if (anterior) anterior.remove();
            if (principal) principal.style.display = "none";

            const novo = document.createElement("div");
            novo.id = "conteudo-dinamico";
            novo.innerHTML = html;

            document.querySelector(".conteudo-container").appendChild(novo);
        })
        .catch(() => {
            alert("Erro ao carregar a página.");
        });
}

function configurarLinksDePagina() {
    const containerSidebar = document.querySelector(".sidebar");

    if (containerSidebar) {
        containerSidebar.addEventListener('click', function (e) {
            const link = e.target;

            if (link && link.dataset.pagina) {
                e.preventDefault();
                const pagina = link.dataset.pagina;
                carregarPagina(pagina);
            }
        });
    }
}
