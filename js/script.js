document.addEventListener("DOMContentLoaded", function () {
    configurarToggleSidebar();
    configurarLinksDePagina();
    configurarSubmenus();
    configurarBuscaInterna();
    configurarLogoClick();
    configurarLinksGeraisComDataPagina();
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
            const termo = this.value.toLowerCase().trim();
            const links = document.querySelectorAll(".sidebar a[data-pagina]");
            const mensagemVazia = document.getElementById("mensagem-vazia");

            let encontrou = false;

            if (termo === "") {
                const todosLi = document.querySelectorAll(".sidebar ul li");
                todosLi.forEach(li => li.style.display = "block");

                const submenus = document.querySelectorAll(".submenu");
                submenus.forEach(sub => sub.style.display = "none");

                if (mensagemVazia) mensagemVazia.style.display = "none";
                return;
            }

            const todosLi = document.querySelectorAll(".sidebar ul li");
            todosLi.forEach(li => li.style.display = "none");

            const submenus = document.querySelectorAll(".submenu");
            submenus.forEach(sub => sub.style.display = "none");

            links.forEach(link => {
                const texto = link.textContent.toLowerCase();

                if (texto.includes(termo)) {
                    const li = link.closest("li");
                    if (li) li.style.display = "block";

                    let parent = link.parentElement;
                    while (parent && parent !== document) {
                        if (parent.classList.contains("submenu")) {
                            parent.style.display = "block";
                        }
                        if (parent.tagName === "LI") {
                            parent.style.display = "block";
                        }
                        parent = parent.parentElement;
                    }

                    encontrou = true;
                }
            });

            if (mensagemVazia) {
                mensagemVazia.style.display = encontrou ? "none" : "block";
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

    if (conteudoPrincipal) {
        conteudoPrincipal.style.display = "block";
    }


    const links = document.querySelectorAll(".sidebar ul li a");
    links.forEach(link => link.classList.remove("active"));
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


            marcarItemAtivoSidebar(nomeArquivo);
        })
        .catch(() => {
            alert("Erro ao carregar a página.");
        });
}

function marcarItemAtivoSidebar(nomePagina) {
    const links = document.querySelectorAll('.sidebar ul li a');

    links.forEach(link => {
        const pagina = link.dataset.pagina;
        if (pagina === nomePagina) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
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

function configurarLinksGeraisComDataPagina() {
    document.body.addEventListener("click", function (e) {
        const alvo = e.target.closest('[data-pagina]');
        if (alvo) {
            e.preventDefault();
            const pagina = alvo.dataset.pagina;
            if (pagina) {
                carregarPagina(pagina);
            }
        }
    });
}