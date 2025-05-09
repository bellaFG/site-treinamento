function carregarPagina(nome) {
    const container = document.querySelector(".conteiner-centralizado");

    // Esconde o conteúdo principal
    const conteudoPrincipal = document.getElementById("conteudo-principal");
    conteudoPrincipal.style.display = "none";

    // Remove conteúdo dinâmico anterior, se houver
    const existente = document.getElementById("conteudo-dinamico");
    if (existente) {
        existente.remove();
    }

    // Cria novo contêiner dinâmico
    const novaSecao = document.createElement("div");
    novaSecao.id = "conteudo-dinamico";
    novaSecao.innerHTML = "<p>Carregando conteúdo...</p>";

    container.appendChild(novaSecao);

    // Carrega o conteúdo via fetch
    fetch(`pages/${nome}.html`)
        .then(res => {
            if (!res.ok) throw new Error("Erro ao carregar página");
            return res.text();
        })
        .then(html => {
            novaSecao.innerHTML = html;
        })
        .catch(err => {
            novaSecao.innerHTML = `<p style="color:red;">Erro ao carregar a página: ${err.message}</p>`;
        });
}
