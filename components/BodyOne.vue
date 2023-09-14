<!-- component -->

<template>
  <div class="px-4 pt-4 md:px-6 xl:container">
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div class="md:col-span-2 lg:col-span-1">
        <div class="h-full py-4 px-3 md:py-6 md:px-4 space-y-4 rounded-xl border border-gray-200 bg-white">
          <!-- component -->
          <div class="bg-white-100 antialiased">

            <div class="flex items-center justify-center h-full">
              <div class="bg-white shadow-2xl p-6 rounded-2xl border-2 border-gray-50">
                <div class="flex flex-col">
                  <div>
                    <h2 class="font-bold text-gray-600 text-center">Quantidade</h2>
                  </div>
                  <div class="my-6">
                    <div class="flex flex-row space-x-4 items-center">
                      <div id="icon">
                        <span>
                            <img
                              v-if="isNaN(totalDiaPerc / totalMetas * 100)"
                              src="../static/LogoPlaneta.png"
                              class="w-20 h-20 fill-stroke text-yellow-400"
                              alt=""
                            />
                          <img
                                v-if="totalDiaPerc / totalMetas * 100 < 1"
                                src="../static/muitoruim.png"
                                class="w-20 h-20 fill-stroke text-yellow-400"
                                alt=""
                              />
                              <img
                                v-else-if="totalDiaPerc / totalMetas * 100 >= 1 && totalDiaPerc / totalMetas * 100 <= 2.5"
                                src="../static/ruim.png"
                                class="w-20 h-20 fill-stroke text-yellow-400"
                                alt=""
                              />
                              <img
                                v-else-if="totalDiaPerc / totalMetas * 100 > 2.5 && totalDiaPerc / totalMetas * 100 <= 3.8"
                                src="../static/maismenos.png"
                                class="w-20 h-20 fill-stroke text-yellow-400"
                                alt=""
                              />
                              <img
                                v-else-if="totalDiaPerc / totalMetas * 100 > 3.8 && totalDiaPerc / totalMetas * 100 <= 4.5"
                                src="../static/feliz.png"
                                class="w-20 h-20 fill-stroke text-yellow-400"
                                alt=""
                              />
                              <img
                                v-else-if="totalDiaPerc / totalMetas * 100 > 4.5"
                                src="../static/muitofeliz.png"
                                class="w-20 h-20 fill-stroke text-yellow-400"
                                alt=""
                              />
                        </span>
                      </div>
                      <div id="temp">
                        <h4 class="text-4xl text-center items-center"><VueCountUp :endVal="totalVendas" :options="{ startVal: 0, separator: '.' }" /></h4>
                        <p class="text-xs text-gray-500">vendas hoje</p>
                      </div>
                    </div>
                  </div>
                  <div class="w-full place-items-end text-right border-t-2 border-gray-100 mt-2">
                    <a href="#" class="text-red-600 text-xs font-medium">{{ currentDay }}</a>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div>
            <h5 class="text-xl text-gray-600 text-center">Total do Dia</h5>
            <div class="mt-2 flex justify-center gap-4">
              <h3 class="text-3xl font-bold text-gray-700">
                R$ <VueCountUp ref="countUp" :endVal="parseTotalDia(totalDia)" :options="{ startVal: 0, separator: '.', decimal: ',',decimals: 2,decimalPlaces: 2 }" /> 
              </h3>
              <div class="flex items-end gap-1 text-green-500">
                <svg class="w-3" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.00001 0L12 8H-3.05176e-05L6.00001 0Z" fill="currentColor" />
                </svg>
                <span>{{ (totalDiaPerc / totalMetas * 100).toFixed(2) }}%</span>
              </div>
            </div>
            <span class="block text-center text-gray-500">Acumulado mês: {{ formatarValor(totalAcumulado) }}</span>
          </div>
          <BodyTable1 :TopVendas="topSales" />
        </div>
      </div>
      <div class="mt-4 lg:mt-0">
        <div class="h-full py-4 px-3 md:py-6 md:px-4 space-y-4 rounded-xl border border-gray-200 bg-white">
          <h5 class="text-xl text-gray-700">Percentual Meta</h5>
          <div class="my-8">
            <h1 class="text-5xl font-bold text-gray-800">{{ ((totalAcumulado / totalMetas) * 100).toFixed(2) }}%</h1>
            <span class="text-gray-500">Falta {{ formatarValor(totalMetas - totalAcumulado) }} para a meta</span>
          </div>
          <div class="mb-1 text-lg font-medium dark:text-white">Progresso</div>
          <div class="w-full h-4 mb-4 bg-gray-200 rounded-full dark:bg-gray-700">
            <div class="h-4 rounded-full" :class="{
              'bg-green-600': (totalAcumulado / totalMetas) * 100 >= 100,
              'bg-red-600': (totalAcumulado / totalMetas) * 100 < 100,
            }" 
            :style="{width: ((totalAcumulado / totalMetas) * 100 <= 100 ? ((totalAcumulado / totalMetas) * 100) +'%' : 100 + '%')}">
            </div>
          </div>
          <BodyTable2 :topMetas="topMetas" />
      <div class="flex justify-center items-center"
                  >
          <button
                    @click="redirecionarFiliais"
                    class="px-10 bg-red-600 py-1 text-white rounded-3xl hover:bg-red-700 focus:outline-none"
                  >
                    Ver mais
            </button>
          </div>
        </div>
      </div>
      <div class="mt-4 lg:mt-0">
        <div class="h-full py-4 px-3 md:py-6 md:px-4 space-y-4 rounded-xl border border-gray-200 bg-white">

          <FormPag v-if="dataLoaded" :vendasOnline="data.vendasonline" />


        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BodyTable2 from '../components/BodyTable2.vue';
import FormPag from '../components/FormPag.vue';
import BodyTable1 from '../components/BodyTable1.vue';
import VueCountUp from 'vue-countup-v2';



export default {
  components: {
    BodyTable1,
    BodyTable2,
    FormPag,
    VueCountUp

  },
  data() {
    return {
      data: null,
      dataLoaded: false,
      vendasOnline: [],
      totalAcumulado: null,
      totalDia: null,
      currentDay: null,
      totalVendas: null,
      totalMetas: null,
      topSales: [],
      topMetas: [],
      showPulseEffect: false,
      previousTotalVendas: null,
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
        const newTotalVendas = this.calculateTotalVendas(response.vendasonline);
        if (newTotalVendas !== this.previousTotalVendas) {
          // Verifica se o valor realmente mudou antes de ativar o efeito de pulsação
          this.showPulseEffect = true;
          this.rollingNumbers = true;
          setTimeout(() => {
            this.showPulseEffect = false;
            this.rollingNumbers = false;
          }, 1000);

          this.previousTotalVendas = newTotalVendas; // Atualiza o valor anterior
        }
        this.updateData(response);
        this.dataLoaded = true;
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
      const totalAcumulado = data.TotalAcum[0];
      const totalDia = data.TotalDia[0];
      const totalVendas = this.calculateTotalVendas(data.vendasonline);
      const totalMetas = this.calculateTotalMetas(data.vendasonline);


      this.totalAcumulado = parseFloat(totalAcumulado.replace(/\./g, "").replace(",", "."));
      this.totalDiaPerc = parseFloat(totalDia.replace(/\./g, "").replace(",", "."));
      this.totalDia = totalDia;
      this.totalVendas = totalVendas;
      this.totalMetas = totalMetas;
      this.topSales = this.getTopSales(data.vendasonline);
      this.topMetas = this.getTopMetas(data.vendasonline);
    },
    calculateTotalVendas(vendasonline) {
      return vendasonline.reduce((total, venda) => total + parseInt(venda.QtdVendas), 0);
    },
    calculateTotalMetas(vendasonline) {
      return vendasonline.reduce((total, meta) => total + parseFloat(meta.MetaMes.replace(/\./g, "").replace(",", ".")), 0);
    },
    formatarValor(valor) {
      if (valor !== null && valor !== undefined) {
        return valor.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
          minimumFractionDigits: 2,
        });
      } else {
        return 'R$0,00';
      }
    },
    setupDataUpdateIntervals() {
      this.fetchDataInterval = setInterval(this.fetchData, 60000);
      this.updateCurrentDayInterval = setInterval(this.updateCurrentDay, 1000);
      this.updateTotalVendasInterval = setInterval(this.updateTotalVendas, 60000);
      this.updateTotalMetasInterval = setInterval(this.updateTotalMetas, 60000);
      //////////////////////////////////////////////////////////////////////////////
    },

    clearDataUpdateIntervals() {
      clearInterval(this.fetchDataInterval);
      clearInterval(this.updateCurrentDayInterval);
      clearInterval(this.updateTotalVendasInterval);
      clearInterval(this.updateTotalMetasInterval);

    },

    updateCurrentDay() {
      const now = new Date();
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      this.currentDay = now.toLocaleDateString('pt-BR', options);
    },

    getTopSales(vendasonline) {
      const sortedSales = vendasonline.slice(0);
      sortedSales.sort((a, b) => {
        const valueA = parseFloat(a.VendasDia.replace(',', '.')) || 0;
        const valueB = parseFloat(b.VendasDia.replace(',', '.')) || 0;
        return valueB - valueA;
      });
      return sortedSales.slice(0, 3);
    },

    getTopMetas(vendasonline) {
      const sortedMetas = vendasonline.slice(0);
      sortedMetas.sort((a, b) => {
        const percentualA = (parseFloat(a.Acumulado.replace(/\./g, "").replace(",", ".")) / parseFloat(a.MetaMes.replace(/\./g, "").replace(",", "."))) * 100 || 0;
        const percentualB = (parseFloat(b.Acumulado.replace(/\./g, "").replace(",", ".")) / parseFloat(b.MetaMes.replace(/\./g, "").replace(",", "."))) * 100 || 0;
        return percentualB - percentualA;
      });
      return sortedMetas.slice(0, 6);
    },
    redirecionarFiliais() {
      //redirecionar para outra página
      this.$router.push('/filiais') 
    },

    parseTotalDia(valor) {
      
   // Verifica se valor não é null ou undefined
   if (valor !== null && valor !== undefined) {
      // Remove os caracteres não numéricos (pontos e vírgulas)
      const valorNumerico = parseFloat(valor.replace(/[^\d,]/g, '').replace(',', '.'));

      // Verifica se o valor é um número válido
      if (!isNaN(valorNumerico)) {
        return valorNumerico;
      }
    }

    // Caso contrário, retorna 0
    return 0;
    
   
    },
  
  },
  watch: {
    totalDia(newValue, oldValue) {
      // Use a referência para chamar a animação do VueCountUp
      this.$refs.countUp.update(Number(newValue.replace(/[^\d,]/g, '').replace(',', '.')));
    },
  },

  name: 'BodyOne',
};
</script>

