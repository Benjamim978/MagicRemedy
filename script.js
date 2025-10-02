// IA: alternância entre texto e voz
let modoAtual = "texto";

function alternarIA() {
  const container = document.getElementById("ia-container");
  container.style.display = container.style.display === "none" ? "block" : "none";
  carregarIframe();
}

function carregarIframe() {
  const wrapper = document.getElementById("iframe-wrapper");
  const iframe = document.createElement("iframe");
  iframe.id = "JotFormIFrame-0195f36245af76f5baf040a9db2a4f59c524";
  iframe.title = "Tina: Assistente de Enfermagem";
  iframe.allow = "geolocation; microphone; camera; fullscreen";
  iframe.allowTransparency = true;
  iframe.frameBorder = "0";
  iframe.scrolling = "no";
  iframe.style = "max-width:100%; height:688px; border:none; width:100%;";

  iframe.src = modoAtual === "texto"
    ? "https://agent.jotform.com/0195f36245af76f5baf040a9db2a4f59c524?embedMode=iframe&background=1&shadow=1"
    : "https://agent.jotform.com/0195f36245af76f5baf040a9db2a4f59c524/voice?embedMode=iframe&background=1&shadow=1";

  wrapper.innerHTML = "";
  wrapper.appendChild(iframe);

  window.jotformEmbedHandler("iframe[id='JotFormIFrame-0195f36245af76f5baf040a9db2a4f59c524']", "https://www.jotform.com");
}

function alternarModo() {
  modoAtual = modoAtual === "texto" ? "voz" : "texto";
  document.getElementById("botao-modo").textContent =
    modoAtual === "texto" ? "Mudar para Voz" : "Mudar para Texto";
  carregarIframe();
}

// Dicas: alternar cards
function alternarCard(numero) {
  const card = document.getElementById(`card-${numero}`);
  card.style.display = card.style.display === "none" ? "block" : "none";
}

// Ferramentas
function verificarFebre() {
  const temp = parseFloat(document.getElementById("temperatura").value);
  const resultado = document.getElementById("resultado");
  if (isNaN(temp)) {
    resultado.textContent = "Digite uma temperatura válida.";
  } else if (temp >= 37.5) {
    resultado.textContent = "Febre detectada.";
  } else {
    resultado.textContent = "Temperatura normal.";
  }
}

let respiracoes = 0;

function iniciarContador() {
  respiracoes++;
  document.getElementById("contador-respiracao").textContent = `Respirações: ${respiracoes}`;
}

function reiniciarContador() {
  respiracoes = 0;
  document.getElementById("contador-respiracao").textContent = `Respirações: ${respiracoes}`;
}

function verificarPressao() {
  const sistolica = parseInt(document.getElementById("pressao-sistolica").value);
  const diastolica = parseInt(document.getElementById("pressao-diastolica").value);
  const resultado = document.getElementById("resultado-pressao");

  if (isNaN(sistolica) || isNaN(diastolica)) {
    resultado.textContent = "Digite valores válidos para ambas as pressões.";
  } else if (sistolica >= 140 || diastolica >= 90) {
    resultado.textContent = "Pressão alta.";
  } else if (sistolica <= 90 || diastolica <= 60) {
    resultado.textContent = "Pressão baixa.";
  } else {
    resultado.textContent = "Pressão normal.";
  }
}

function verificarSistolica() {
  const sistolica = parseInt(document.getElementById("sistolica-unica").value);
  const resultado = document.getElementById("resultado-sistolica");

  if (isNaN(sistolica)) {
    resultado.textContent = "Digite um valor válido.";
  } else if (sistolica >= 140) {
    resultado.textContent = "Sistólica alta.";
  } else if (sistolica <= 90) {
    resultado.textContent = "Sistólica baixa.";
  } else {
    resultado.textContent = "Sistólica normal.";
  }
}

function verificarDiastolica() {
  const diastolica = parseInt(document.getElementById("diastolica-unica").value);
  const resultado = document.getElementById("resultado-diastolica");

  if (isNaN(diastolica)) {
    resultado.textContent = "Digite um valor válido.";
  } else if (diastolica >= 90) {
    resultado.textContent = "Diastólica alta.";
  } else if (diastolica <= 60) {
    resultado.textContent = "Diastólica baixa.";
  } else {
    resultado.textContent = "Diastólica normal.";
  }
}

function calcularIMC() {
  const peso = parseFloat(document.getElementById("peso").value);
  const altura = parseFloat(document.getElementById("altura").value);
  const resultado = document.getElementById("resultado-imc");

  if (
    isNaN(peso) || isNaN(altura) ||
    peso <= 0 || altura <= 0 ||
    peso > 300 || altura > 2.5
  ) {
    resultado.textContent = "Valores fora do intervalo realista.";
    return;
  }

  const imc = peso / (altura * altura);
  let classificacao = "";

  if (imc < 18.5) {
    classificacao = "Abaixo do peso";
  } else if (imc < 25) {
    classificacao = "Peso normal";
  } else if (imc < 30) {
    classificacao = "Sobrepeso";
  } else if (imc < 40) {
    classificacao = "Obesidade";
  } else {
    classificacao = "Obesidade grave";
  }

  resultado.textContent = `IMC: ${imc.toFixed(1)} (${classificacao})`;
}

let segundos = 0;
let cronometroAtivo = false;
let intervalo;

function iniciarCronometro() {
  if (!cronometroAtivo) {
    cronometroAtivo = true;
    intervalo = setInterval(() => {
      segundos++;
      const min = Math.floor(segundos / 60);
      const sec = segundos % 60;
      document.getElementById("cronometro").textContent =
        `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
    }, 1000);
  }
}

function pararCronometro() {
  cronometroAtivo = false;
  clearInterval(intervalo);
}

function zerarCronometro() {
  pararCronometro();
  segundos = 0;
  document.getElementById("cronometro").textContent = "00:00";
}

function autenticarLogin() {
  const nome = document.getElementById("nome").value.trim();
  const mensagem = document.getElementById("mensagem-login");

  if (nome === "") {
    mensagem.textContent = "Preencha nome.";
    return false;
  }

  // Oculta login e mostra conteúdo principal
  document.getElementById("tela-login").style.display = "none";
  document.getElementById("conteudo-principal").style.display = "block";

  // Mostra apresentação só se for Adaneide
  const apresentacao = document.getElementById("apresentacao");
  if (nome.toLowerCase() === "adaneide") {
    apresentacao.style.display = "block";
  } else {
    apresentacao.style.display = "none";
  }

  return false;
}
