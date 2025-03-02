const mineflayer = require('mineflayer');
require('dotenv').config();

// Configurações do Bot
const serverIP = process.env.SERVER_IP;
const serverPort = parseInt(process.env.SERVER_PORT);
const botUsername = process.env.BOT_USERNAME;

console.log('IP:', serverIP);
console.log('PORT:', serverPort);
console.log('USERNAME:', botUsername);

function startBot() {
  const bot = mineflayer.createBot({
    host: serverIP,
    port: serverPort,
    username: botUsername,
  });

  bot.on('spawn', () => {
    console.log(`[+] ${botUsername} entrou no servidor!`);
    // Confirmação de que o bot entrou no servidor
    setTimeout(() => {
      moverBot(bot); // Começa a mover o bot
    }, 1000); // Atraso de 1 segundo para garantir que o bot esteja pronto
  });

  bot.on('end', () => {
    console.log('[-] Bot desconectado! Tentando reconectar...');
    setTimeout(startBot, 5000); // Tenta reconectar após 5 segundos
  });

  bot.on('error', (err) => {
    console.log('Erro:', err);
  });
}

// Função para mover o bot para frente e para trás
function moverBot(bot) {
  console.log("[+] Iniciando movimento para frente e para trás.");

  // Loop infinito de movimento
  setInterval(() => {
    // Mover para frente
    console.log("[+] Bot começando a andar para frente.");
    bot.setControlState('forward', true); // Ativa o movimento para frente

    // Após 3 segundos, parar e mover para trás
    setTimeout(() => {
      bot.setControlState('forward', false); // Para de andar para frente
      console.log("[+] Bot parou de andar para frente.");
      console.log("[+] Bot começando a andar para trás.");
      bot.setControlState('back', true); // Ativa o movimento para trás

      // Após 3 segundos, parar o movimento para trás
      setTimeout(() => {
        bot.setControlState('back', false); // Para de andar para trás
        console.log("[+] Bot parou de andar para trás.");
      }, 500); // Anda para trás por 3 segundos

    }, 500); // Anda para frente por 3 segundos

  }, 20000); // Repete o ciclo a cada 6 segundos
}

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send("Bot está online!");
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

startBot(); // Inicia o bot


