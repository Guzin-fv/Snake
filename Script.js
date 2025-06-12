const tela = document.getElementById('tela');
const contexto = tela.getContext('2d');
const tamanhoBloco = 20;
const totalBlocos = tela.width / tamanhoBloco;
let cobrinha = [{ x: 5, y: 5 }];
let direcao = 'direita';
let comida = gerarComida();
let pontuacao = 0;
let intervaloJogo;

document.addEventListener('keydown', (evento) => {
  if (evento.key === 'ArrowUp' && direcao !== 'baixo') direcao = 'cima';
  if (evento.key === 'ArrowDown' && direcao !== 'cima') direcao = 'baixo';
  if (evento.key === 'ArrowLeft' && direcao !== 'direita') direcao = 'esquerda';
  if (evento.key === 'ArrowRight' && direcao !== 'esquerda') direcao = 'direita';
});

function iniciarJogo() {
  cobrinha = [{ x: 5, y: 5 }];
  direcao = 'direita';
  pontuacao = 0;
  atualizarPontuacao();

  let dificuldade = document.getElementById('dificuldade').value;
  let velocidade;
  switch (dificuldade) {
    case 'facil': velocidade = 200; break;
    case 'medio': velocidade = 120; break;
    case 'dificil': velocidade = 70; break;
  }

  clearInterval(intervaloJogo);
  intervaloJogo = setInterval(() => {
    desenharCenario();
    moverCobrinha();
    desenharCobrinha();
    desenharComida();
    verificarComida();
    verificarColisoes();
  }, velocidade);
}

function desenharCenario() {
  contexto.fillStyle = 'Black';
  contexto.fillRect(0, 0, tela.width, tela.height);
}

function desenharCobrinha() {
  for (let parte of cobrinha) {
    contexto.fillStyle = 'blue';
    contexto.fillRect(parte.x * tamanhoBloco, parte.y * tamanhoBloco, tamanhoBloco, tamanhoBloco);
  }
}

function moverCobrinha() {
  let cabeca = { ...cobrinha[0] };

  if (direcao === 'direita') cabeca.x++;
  if (direcao === 'esquerda') cabeca.x--;
  if (direcao === 'cima') cabeca.y--;
  if (direcao === 'baixo') cabeca.y++;

  cobrinha.unshift(cabeca);
  cobrinha.pop();
}

function gerarComida() {
  return {
    x: Math.floor(Math.random() * totalBlocos),
    y: Math.floor(Math.random() * totalBlocos)
  };
}

function desenharComida() {
  contexto.fillStyle = 'red';
  contexto.fillRect(comida.x * tamanhoBloco, comida.y * tamanhoBloco, tamanhoBloco, tamanhoBloco);
}

function verificarComida() {
  if (cobrinha[0].x === comida.x && cobrinha[0].y === comida.y) {
    comida = gerarComida();
    cobrinha.push({});
    pontuacao++;
    atualizarPontuacao();
    somComida.play();
  }
}

function atualizarPontuacao() {
  document.getElementById('pontuacao').innerText = pontuacao;
}

function verificarColisoes() {
  let cabeca = cobrinha[0];

  if (cabeca.x < 0 || cabeca.x >= totalBlocos || cabeca.y < 0 || cabeca.y >= totalBlocos) {
    gameOver();
  }

  for (let i = 1; i < cobrinha.length; i++) {
    if (cabeca.x === cobrinha[i].x && cabeca.y === cobrinha[i].y) {
      gameOver();
    }
  }
}

function gameOver() {
  clearInterval(intervaloJogo);
  somColisao.play();
  alert('Fim de jogo! Sua pontuação: ' + pontuacao);
}
