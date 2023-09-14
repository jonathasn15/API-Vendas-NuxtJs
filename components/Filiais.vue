<template>
    <!-- component -->
<!-- This is an example component -->
<div>
    
    <Sidebar />

    <div class="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
        
        
        <Navibar />
        
        <ListFiliais :listFil="listFil" />
        

    </div>
      
       
   </div>    
  

</template>
  
<script>

    import Navibar from '../components/Navibar.vue'
    import Sidebar from '../components/Sidebar.vue'
    import ListFiliais from '../components/ListFiliais.vue'

  export default {

    components: {
      Navibar,
      Sidebar,
      //ListFiliais,
      
    },
    data() {
    return {
      showModal: false,
      data: null,
      listFil: [],
    };
  },
async created() {
    await this.fetchData();
    this.setupDataUpdateIntervals();
  },
  destroyed() {
    this.clearDataUpdateIntervals();
  },
  methods: {
    async fetchData() {
      try {
        const response = await this.fetchDataFromServer();
        this.updateData(response);
        this.ordenarLista();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    async fetchDataFromServer() {
        const url = 'http://acesso1.lojasplaneta.com.br:1334/rest/vendasonline/?nOrdem=0&nMes=7&cAno=2023';
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                Authorization: 'Basic ' + btoa('WISER:abc@123'), 
            },
        });
        if (!response.ok) {
        throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        return data;
        },
    updateData(data) {
      this.data = data;
      this.listFil = data.vendasonline;
      
    },
 
    setupDataUpdateIntervals() {
      this.fetchDataInterval = setInterval(this.fetchData, 60000);
      this.updateCurrentDayInterval = setInterval(this.updateCurrentDay, 1000);

    },
    clearDataUpdateIntervals() {
      clearInterval(this.fetchDataInterval);
      clearInterval(this.updateCurrentDayInterval);
    },
    updateCurrentDay() {
      const now = new Date();
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      this.currentDay = now.toLocaleDateString('pt-BR', options);
    },
  },
    name: 'Filiais'
  }
</script>
  