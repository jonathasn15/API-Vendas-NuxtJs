<template>
    <aside class="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div>
        <div class="-mx-6 px-6 py-4">
          <a href="#" title="home">
           <p class="text-gray-300">Lojas Planeta</p>
          </a>
        </div>
  
        <div class="mt-8 text-center">
          <img src="../static/LogoPlaneta.png" alt="" class="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28">
          <h5 class="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">Diretoria</h5>
          <span class="hidden text-gray-400 lg:block">Admin</span>
        </div>
  
        <ul class="space-y-2 tracking-wide mt-8">
          <li>
            <nuxt-link
            to="/vendasOnline"
            :class="getSidebarItemClasses('vendasonline')"
              href="vendasOnline"
              aria-label="dashboard"
            >
              <svg class="-ml-1 h-6 w-6" viewBox="0 0 24 24" fill="none">
                <path d="M6 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8ZM6 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-1Z" 
                        class="fill-current text-gray-400 dark:fill-slate-600"></path>
                        <path d="M13 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2V8Z" class="fill-current text-gray-200 group-hover:text-red-300"></path>
                        <path d="M13 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-1Z" class="fill-current group-hover:text-red-300"></path>
              </svg>
              <span class="-mr-1 font-medium">Dashboard</span>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
            to="/filiais"
            :class="getSidebarItemClasses('filiais')"
              href="filiais"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path class="fill-current text-gray-600 group-hover:text-red-600" d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                        <path class="fill-current text-gray-300 group-hover:text-red-300" d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
              </svg>
              <span class="group-hover:text-gray-700">Filiais</span>
            </nuxt-link>
          </li>
          <!-- ... (other items) -->
        </ul>
      </div>
  
      <div class="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
        <button class="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <!-- ... (path for the icon) -->
          </svg>
          <span class="group-hover:text-red-700" @click="logout" >Sair</span>
        </button>
      </div>
    </aside>
  </template>
  
  <script>
  
  export default {

  inject: ['$root'],
  computed: {
    authenticatedUserName() {
      return this.$root.authenticatedUser;
    },
  },
    methods: {
    getSidebarItemClasses(routeName) {
      const currentRouteName = this.$route.name;
      return {
        'relative px-4 py-3 flex items-center space-x-4 rounded-xl text-white bg-gradient-to-r from-red-600 to-red-400': routeName === currentRouteName,
        'px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group': routeName !== currentRouteName,
      };
    },
    logout() {
      // Redefina o nome de usuário autenticado para null para deslogar o usuário
      this.$root.authenticatedUser = null;

      // Redirecione o usuário para a página de login ou qualquer outra página apropriada após o logout
      this.$router.push('/');
    },
  },
    name: 'Sidebar',
  };
  </script>
  