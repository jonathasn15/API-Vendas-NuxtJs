const express = require('express');
const { Nuxt, Builder } = require('nuxt');

const app = express();

// Configuração do Nuxt.js
const config = require('./nuxt.config.js');
config.dev = process.env.NODE_ENV !== 'production';

async function start() {
  const nuxt = new Nuxt(config);

  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  }

  app.use(nuxt.render);

  // Porta definida pelo Heroku ou 3000 por padrão
  const port = process.env.PORT || 3000;

  app.listen(port, '0.0.0.0');
  console.log(`Servidor ouvindo na porta: ${port}`);
}

start();
