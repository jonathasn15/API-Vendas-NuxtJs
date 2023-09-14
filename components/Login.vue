<template>
  <!-- component -->
  <div class="flex items-center justify-center h-screen">
    <!-- Login Container -->
    <div class="w-full md:w-[400px] lg:w-[500px] xl:w-[600px] mx-4 sm:mx-8 md:mx-16 lg:mx-32 xl:mx-48 flex-col border bg-white px-6 py-14 shadow-md rounded-[4px]">
      <div class="mb-8 flex justify-center">
        <img class="w-24" src="../static/LogoPlaneta.png" alt="" />
      </div>
      <div class="flex flex-col text-sm rounded-md">
        <form @submit.prevent="handleSubmit" class="flex-col border bg-white px-6 py-14 shadow-md rounded-[4px]">
          <input v-model="username" :class="{ 'border-red-500': errors.username }" class="rounded-[4px] border p-3 w-full hover:outline-none focus:outline-none hover:border-red-500" type="text" placeholder="Usuário" />
          <div class="mb-5">
            <span v-if="errors.username" class="text-red-500 text-xs">{{ errors.username }}</span>
          </div>
          

          <input v-model="password" :class="{ 'border-red-500': errors.password }" class="rounded-[4px] border p-3 w-full hover:outline-none focus:outline-none hover:border-red-500" type="password" placeholder="Senha" />
          <div class="mb-5">
          <span v-if="errors.password" class="text-red-500 text-xs">{{ errors.password }}</span>
          <span v-if="errors.invalidCredentials" class="text-red-500 text-xs">{{ errors.invalidCredentials }}</span>
            </div>
          <button class="w-full border p-2 bg-gradient-to-r from-red-800 bg-red-500 text-white rounded-[4px] hover:bg-red-400 scale-105 duration-300" type="submit">Entrar</button>
          <div class="mt-5 flex justify-between text-sm text-gray-600">
          </div>
        </form>
      </div>
      <div class="mt-5 flex text-center text-sm text-gray-400">
        <p>
          É necessário fazer o login para acessar as informações. <br />
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      errors: {
        username: '',
        password: '',
        invalidCredentials: '', // Adicione uma mensagem de erro para credenciais inválidas
      },
    };
  },
  methods: {
    async handleSubmit() {
      // Limpe os erros ao enviar o formulário
      this.errors.invalidCredentials = '';
      
      // Validação do formulário (exemplo simples)
      if (!this.username) {
        this.errors.username = 'Por favor, insira seu nome de usuário.';
        return; // Pare aqui se houver um erro de validação
      } else {
        this.errors.username = '';
      }

      if (!this.password) {
        this.errors.password = 'Por favor, insira sua senha.';
        return; // Pare aqui se houver um erro de validação
      } else {
        this.errors.password = '';
      }
      
      const authenticatedUser = this.authenticateUser(this.username, this.password);

      if (authenticatedUser) {
        // Credenciais válidas, usuário autenticado
        console.log('Usuário autenticado:', authenticatedUser.username);
        
        this.$root.$data.authenticatedUser = authenticatedUser.username;

        // Redirecionar o usuário para a página de vendas online
        this.$router.push('/vendasonline');
      } else {
        // Credenciais inválidas, exiba uma mensagem de erro
        this.errors.invalidCredentials = 'Credenciais inválidas. Por favor, tente novamente.';
      }
    },
    authenticateUser(username, password) {
      const users = [
        { username: '@paulorabelo', password: 'PRpl@neta', name: 'Paulo Rabelo' },
        { username: '@matheusrabelo', password: 'MRpl@neta', name: 'Matheus Rabelo' },
        { username: '@gabrielarabelo', password: 'GRpl@neta', name: 'Gabriela Rabelo' },
        { username: '@caiomedeiros', password: 'CMpl@neta', name: 'Caio Medeiros' },
        { username: '@jprabelo', password: 'JPRpl@neta', name: 'Joao P Rabelo' },
        { username: '@ademilsonrabelo', password: 'ARpl@neta', name: 'Ademilson Rabelo' },
        { username: '@valdecimedeiros', password: 'VMpl@neta', name: 'Valdeci Medeiros' },
        { username: '@nicerabelo', password: 'NRpl@neta', name: 'Cleonice Rabelo' },
        { username: '@emanuelsilva', password: 'ESpl@neta', name: 'Emanuel Silva' },
        { username: '@lojasplaneta', password: 'senha123', name: 'amdin' },
        { username: '@matheusmedeiros', password: 'MMpl@neta', name: 'Matheus Medeiros' },
      ];

      return users.find((user) => user.username === username && user.password === password);
    },
  },
  name: 'Login',
};
</script>
