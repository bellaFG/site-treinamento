function carregarPagina(pagina) {
    fetch(`pages/${pagina}.html`)
        .then(res => res.text())
        .then(html => {
            document.getElementById("conteudo-principal").innerHTML = html;
        })
        .catch(err => {
            document.getElementById("conteudo-principal").innerHTML =
                "<p>Erro ao carregar o conteúdo.</p>";
        });
}
