<template>
    <!-- component -->
<!-- This is an example component -->
<div>
    
    <Sidebar />

    <div class="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
        
        
        <Navibar/>
        
        <BodyOne />
      
    </div>
      
       
   </div>    
  

</template>
  
<script>

    import Navibar from '../components/Navibar.vue'
    import Sidebar from '../components/Sidebar.vue'
    import BodyOne from '../components/BodyOne.vue'

  export default {

    components: {
      Navibar,
      Sidebar,
      BodyOne
    },
    name: 'VendasOnline'
  }
</script>
  