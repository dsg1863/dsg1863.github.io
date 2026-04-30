function ampliarImagem(img) {
  if (img.style.width === "400px") {
    img.style.width = "200px";
  } else {
    img.style.width = "400px";
  }
}

let temaAtual = 0;

function trocarTema() {
  let body = document.body;
  let botao = document.getElementById("botaoTema");

  body.classList.remove("tema-praia", "tema-noite");

  if (temaAtual === 0) {
    body.classList.add("tema-noite");
    botao.innerHTML = "🌙 Noite";
    temaAtual = 1;
  } else {
    body.classList.add("tema-praia");
    botao.innerHTML = "🌴 Praia";
    temaAtual = 0;
  }
}

function ampliarImagem(img) {
  if (img.classList.contains("grande")) {
    img.classList.remove("grande");
  } else {
    img.classList.add("grande");
  }
}
