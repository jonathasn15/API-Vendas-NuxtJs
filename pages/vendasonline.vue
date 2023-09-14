<template>

    <VendasOnline /> 
  
</template>
  
<script>

import VendasOnline from '../components/VendasOnline.vue';

  export default {
    middleware: 'auth',

    components:{
      VendasOnline,
    },

    name: 'vendasOnline'
  }

</script>
  