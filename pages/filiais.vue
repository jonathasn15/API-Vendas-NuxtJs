<template>

  <Filiais /> 

</template>

<script>
import Filiais from '../components/Filiais.vue';

export default {
  middleware: 'auth',

  components:{
  Filiais,
},

  name: 'filiais'
}

</script>
