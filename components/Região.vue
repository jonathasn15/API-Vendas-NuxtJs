<template>
    <table class="min-w-full leading-normal">
        <thead>
            <tr>
          <th
            class="px-2 text-center md:text-left sm:px-5 py-2 sm:py-3 border-b-2 border-gray-200 bg-gray-100 text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wider">
            Região
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
            <tr v-for="(região, index) in resumoRegiao" :key="index">
                <td class="px-2 sm:px-5 py-3 sm:py-5 border-b border-gray-200 bg-white text-xs sm:text-sm">
            <div class="flex items-center">
              <div class="flex-shrink-0 w-10 sm:w-12">
                <img v-if="região.nome === 'MINAS GERAIS'" class="w-full h-full shadow-md" src="../static/MG.png" alt="" />
                <img v-else-if="região.nome === 'BAHIA'" class="w-full h-full" src="../static/Bahia.png" alt="" />
                <img v-else class="w-full h-full rounded-full" src="../static/LogoPlaneta.png" alt="" />
              </div>
              <div class="ml-2 sm:ml-3">
                <p class="text-gray-900 text-xs whitespace-no-wrap">{{ região.nome}}</p>
              </div>
            </div>
          </td>
                <td class="px-2 text-center sm:px-5 py-3 sm:py-5 border-b border-gray-200 bg-white text-xs sm:text-sm">
            {{ FormatarValor(região.totalVendas) }}
          </td>
          <td class="px-2 text-center sm:px-5 py-3 sm:py-5 border-b border-gray-200 bg-white text-xs sm:text-sm">
            <p class="text-gray-900 whitespace-no-wrap">{{ região.totalQtd }}</p>
          </td>
          <td class="px-2 text-center sm:px-5 py-3 sm:py-5 border-b border-gray-200 bg-white text-xs sm:text-sm">
            <p class="text-gray-900 whitespace-no-wrap">{{ FormatarValor(região.totalVendas / região.totalQtd) }}</p>
          </td>
          <td class="px-2  text-center sm:px-5 py-3 sm:py-5 border-b border-gray-200 bg-white text-xs sm:text-sm">
            <span class="relative inline-block px-2 py-1 sm:px-3 sm:py-1 font-semibold"
              :class="{ 'text-green-900': região.totalAcum / região.totalMetas >= 1, 'text-red-900': região.totalAcum / região.totalMetas< 1 }">
              <span aria-hidden class="absolute inset-0"
                :class="{ 'bg-green-200': região.totalAcum / região.totalMetas >= 1, 'bg-gren-200': região.totalAcum / região.totalMetas < 1, ' bg-red-200 opacity-50 rounded-full': true }"></span>
              <span class="relative">{{ região.totalAcum / região.totalMetas >= 1 ? 'Meta Atingida' : ((região.totalAcum / região.totalMetas) * 100).toFixed(2) +'%' }}</span>
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
    resumoRegiao() {

    const cidadeParaRegiao = {
        "BELO HORIZONTE": "MINAS GERAIS",
        "CAMACARI": "BAHIA",
       
        "CANDEIAS": "BAHIA",
        "SIMOES FILHO": "BAHIA",
        "UNAI": "MINAS GERAIS",
        "BETIM": "MINAS GERAIS",
        "PATOS": "MINAS GERAIS",
        "CONTAGEM": "MINAS GERAIS",
        "CATU": "BAHIA",
        "L FREITAS": "BAHIA",
        "VALENCA": "BAHIA",
        "CRUZ DAS ALMAS": "BAHIA",
        "MONTES CLAROS": "MINAS GERAIS",
        "SETE LAGOAS": "MINAS GERAIS",
        "ALAGOINHAS": "BAHIA",
        "STO ANT JESUS": "BAHIA",
      };

    const regioes = {};
    this.listagem.forEach((loja) => {
      const cidade = loja.Cidade;
      const regiao = cidadeParaRegiao[cidade]; // Obtém a região com base no nome da cidade

      if (!regioes[regiao]) {
        regioes[regiao] = {
          nome: regiao,
          totalVendas: 0,
          totalQtd: 0,
          totalMetas: 0,
          totalAcum: 0
        };
      }

      const vendas = parseFloat(loja.VendasDia.replace(/\./g, "").replace(",", "."));
      const qtd = parseInt(loja.QtdVendas);
      const metas = parseFloat(loja.MetaMes.replace(/\./g, "").replace(",", "."));
      const acum = parseFloat(loja.Acumulado.replace(/\./g, "").replace(",", "."));

      regioes[regiao].totalVendas += vendas;
      regioes[regiao].totalQtd += qtd;
      regioes[regiao].totalMetas += metas;
      regioes[regiao].totalAcum += acum;
    });

    // Converte o objeto de resumo em um array de objetos
    return Object.values(regioes);

  }
  },
  methods:{
    FormatarValor(valor){
        
        const valorFormatado = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        return valorFormatado

    }
  },
  name: 'Região',
};
</script>



