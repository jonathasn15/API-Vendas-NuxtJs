<template>
    <table class="min-w-full leading-normal">
        <thead>
            <tr>
          <th
            class="px-2 text-center md:text-left sm:px-5 py-2 sm:py-3 border-b-2 border-gray-200 bg-gray-100 text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wider">
            Ramo
          </th>
          <th
            class="px-2 text-center sm:px-5 py-2 sm:py-3 border-b-2 border-gray-200 bg-gray-100  text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wider">
            Valor
          </th>
          <th
            class="px-2 text-center sm:px-5 py-2 sm:py-3 border-b-2 border-gray-200 bg-gray-100  text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wider">
            Qnt
          </th>
          <th
            class="px-2 text-center sm:px-5 py-2 sm:py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wider">
            T. Méd
          </th>
          <th
            class="px-2 text-center sm:px-5 py-2 sm:py-3 border-b-2 border-gray-200 bg-gray-100 text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wider">
            Status
          </th>
        </tr>
        </thead>
        <tbody>
            <tr v-for="(ramo, index) in resumoRamos" :key="index">
                <td class="px-2 justify-center items-center text-center sm:text-right sm:px-5 py-3 sm:py-5 border-b border-gray-200 bg-white text-xs sm:text-sm">
                
                        <div class="flex-shrink-0 justify-center items-center w-10 h-10 sm:w-10 sm:h-10">
                            <img v-if="ramo.nome === 'C'" class="w-full justify-center items-center h-full rounded-full" src="../static/sneakers.png"
                                alt="" />
                            <img v-else-if="ramo.nome=== 'T'" class="w-full h-full rounded-full" src="../static/Camisa.png"
                                alt="" />
                            <img v-else class="w-full h-full rounded-full" src="../static/LogoPlaneta.png" alt="" />
                        </div>
                    
                </td>
                <td class="px-2 text-center sm:px-5 py-3 sm:py-5 border-b border-gray-200 bg-white text-xs sm:text-sm">
            {{ FormatarValor(ramo.totalVendas) }}
          </td>
          <td class="px-2 text-center sm:px-5 py-3 sm:py-5 border-b border-gray-200 bg-white text-xs sm:text-sm">
            <p class="text-gray-900 whitespace-no-wrap">{{ ramo.totalQtd }}</p>
          </td>
          <td class="px-2 text-center sm:px-5 py-3 sm:py-5 border-b border-gray-200 bg-white text-xs sm:text-sm">
            <p class="text-gray-900 whitespace-no-wrap">{{ FormatarValor(ramo.totalVendas / ramo.totalQtd) }}</p>
          </td>
          <td class="px-2  text-center sm:px-5 py-3 sm:py-5 border-b border-gray-200 bg-white text-xs sm:text-sm">
            <span class="relative inline-block px-2 py-1 sm:px-3 sm:py-1 font-semibold"
              :class="{ 'text-green-900': ramo.totalAcum / ramo.totalMetas >= 1, 'text-red-900': ramo.totalAcum / ramo.totalMetas< 1 }">
              <span aria-hidden class="absolute inset-0"
                :class="{ 'bg-green-200': ramo.totalAcum / ramo.totalMetas >= 1, 'bg-gren-200': ramo.totalAcum / ramo.totalMetas < 1, ' bg-red-200 opacity-50 rounded-full': true }"></span>
              <span class="relative">{{ ramo.totalAcum / ramo.totalMetas >= 1 ? 'Meta Atingida' : ((ramo.totalAcum / ramo.totalMetas) * 100).toFixed(2) +'%' }}</span>
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </template>

<script>
    export default {
  props: {
    listagem: Array,
  },
  computed: {
    resumoRamos() {
      // Agrupamento de dados por ramo e calculo do total de vendas em cada ramo
      const ramos = {};
      this.listagem.forEach((loja) => {

        const ramo = loja.Ramo;
        const vendas = parseFloat(loja.VendasDia.replace(/\./g, "").replace(",", ".")); // Converte a string para número
        const qtd = parseInt(loja.QtdVendas);
        const metas = parseFloat(loja.MetaMes.replace(/\./g, "").replace(",", "."));
        const acum = parseFloat(loja.Acumulado.replace(/\./g, "").replace(",", "."));

        if (!ramos[ramo]) {
          ramos[ramo] = {
            nome: ramo,
            totalVendas: 0,
            totalQtd:0,
            totalMetas:0,
            totalAcum:0
          };
        }
        ramos[ramo].totalVendas += vendas;
        ramos[ramo].totalQtd += qtd;
        ramos[ramo].totalMetas += metas;
        ramos[ramo].totalAcum += acum;
      });

      // Converta o objeto de volta para um array
      return Object.values(ramos);
    },
  },
  methods:{
    FormatarValor(valor){
        
        const valorFormatado = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        return valorFormatado

    }
  },
  name: 'Ramo',
};
</script>



