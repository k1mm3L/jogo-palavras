
// 1. Array de palavras

const palavras = [
    "javascript",
    "html",
    "css",
    "internet",
    "navegador",
    "programacao",
    "computador",
    "teclado",
    "monitor",
    "desenvolvimento",
    "algoritmo",
    "software"
];

// 2. Variáveis que representam o estado do jogo

let palavraSecreta;
let letrasCorretas = [];
let letrasUsadas = [];
let tentativas = 6;
let jogoFinalizado = false;

// 3. Elementos do DOM

const elementoPalavra = document.getElementById("palavra");
const elementoTentativas = document.getElementById("tentativas");
const inputLetra = document.getElementById("letra");
const mensagem = document.getElementById("mensagem");
const elementoLetrasUsadas = document.getElementById("letras-usadas");

const botaoTentar = document.getElementById("btn-tentar");
const botaoReiniciar = document.getElementById("btn-reiniciar");

// 4. Função iniciarJogo()

function iniciarJogo() {

    const indice = Math.floor(
        Math.random() * palavras.length
    );

    palavraSecreta = palavras[indice];

    tentativas = 6;
    letrasCorretas = [];
    letrasUsadas = [];
    jogoFinalizado = false;

    mensagem.textContent = "Bem-vindo ao jogo!";

    elementoTentativas.textContent = tentativas;

    elementoLetrasUsadas.textContent = "";

    inputLetra.value = "";

    inputLetra.disabled = false;
    botaoTentar.disabled = false;

    atualizarPalavra();

}

// 5. Função atualizarPalavra()

function atualizarPalavra() {

    let exibicao = "";

    for (let i = 0; i < palavraSecreta.length; i++) {

        const letra = palavraSecreta[i];

        if (letrasCorretas.includes(letra)) {

            exibicao += letra + " ";

        } else {

            exibicao += "_ ";

        }

    }

    elementoPalavra.textContent = exibicao;

}

// 6. Função verificar se o jogador venceu

function venceu() {

    for (let i = 0; i < palavraSecreta.length; i++) {

        const letra = palavraSecreta[i];

        if (!letrasCorretas.includes(letra)) {

            return false;

        }

    }

    return true;

}

// 7. Função verificarLetra()

function verificarLetra() {

    if (jogoFinalizado) {
        return;
    }

    const letra = inputLetra.value.trim().toLowerCase();

    if (letra === "") {

        mensagem.textContent = "Digite uma letra.";

        return;

    }

    if (!/^[a-záàâãéèêíïóôõöúçñ]$/i.test(letra)) {

        mensagem.textContent = "Digite apenas uma letra.";

        inputLetra.value = "";

        return;

    }

    if (letrasUsadas.includes(letra)) {

        mensagem.textContent = "Letra já utilizada.";

        inputLetra.value = "";

        return;

    }

    letrasUsadas.push(letra);

    if (palavraSecreta.includes(letra)) {

        letrasCorretas.push(letra);

        mensagem.textContent = "Você acertou!";

    } else {

        tentativas--;

        mensagem.textContent = "Você errou!";

    }

    atualizarPalavra();

    elementoTentativas.textContent = tentativas;

    elementoLetrasUsadas.textContent = letrasUsadas.join(", ");

    inputLetra.value = "";

    // Verifica se o jogador venceu

    if (venceu()) {

        mensagem.textContent = "Parabéns! Você venceu!";

        finalizarJogo();

    }

    // Verifica se o jogador perdeu

    else if (tentativas === 0) {

        mensagem.textContent =
            "Você perdeu! A palavra era " + palavraSecreta;

        finalizarJogo();

    }

}

// 8. Função para finalizar o jogo

function finalizarJogo() {

    jogoFinalizado = true;

    inputLetra.disabled = true;

    botaoTentar.disabled = true;

}

// 9. Evento de clique no botão Tentar

botaoTentar.addEventListener(
    "click",
    verificarLetra
);

// 10. Evento de clique no botão Nova partida

botaoReiniciar.addEventListener(
    "click",
    iniciarJogo
);

// 11. Desafio extra: permitir jogar pressionando Enter

inputLetra.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            verificarLetra();

        }

    }
);

// 12. Iniciar o jogo automaticamente

iniciarJogo();
