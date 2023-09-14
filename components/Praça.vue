<template>
    <table class="min-w-full leading-normal">
      <thead>
        <tr>
          <th
            class="px-2 text-center md:text-left sm:px-5 py-2 sm:py-3 border-b-2 border-gray-200 bg-gray-100 text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wider">
            Cidade
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
        <tr v-for="(cidade, index) in resumoCidades" :key="index">
          <td class="px-2 sm:px-5 py-3 sm:py-5 border-b border-gray-200 bg-white text-xs sm:text-sm">
            <div class="flex items-center">
              <div class="flex-shrink-0 w-6 h-6 sm:w-12 sm:h-12">
                <img
                    :src="require(`~/static/${getCidadeImagem(cidade.nome)}`)" alt="Imagem"
                    class="w-full h-full rounded-full"
                  />
              </div>
              <div class="ml-2 sm:ml-3">
                <p class="text-gray-900 text-xs whitespace-no-wrap">{{ cidade.nome}}</p>
              </div>
            </div>
          </td>
          <td class="px-2 text-center sm:px-5 py-3 sm:py-5 border-b border-gray-200 bg-white text-xs sm:text-sm">
            {{ FormatarValor(cidade.totalVendas) }}
          </td>
          <td class="px-2 text-center sm:px-5 py-3 sm:py-5 border-b border-gray-200 bg-white text-xs sm:text-sm">
            <p class="text-gray-900 whitespace-no-wrap">{{ cidade.totalQtd }}</p>
          </td>
          <td class="px-2 text-center sm:px-5 py-3 sm:py-5 border-b border-gray-200 bg-white text-xs sm:text-sm">
            <p class="text-gray-900 whitespace-no-wrap">{{ FormatarValor(cidade.totalVendas / cidade.totalQtd) }}</p>
          </td>
          <td class="px-2  text-center sm:px-5 py-3 sm:py-5 border-b border-gray-200 bg-white text-xs sm:text-sm">
            <span class="relative inline-block px-2 py-1 sm:px-3 sm:py-1 font-semibold"
              :class="{ 'text-green-900': cidade.totalAcum / cidade.totalMetas >= 1, 'text-red-900': cidade.totalAcum / cidade.totalMetas< 1 }">
              <span aria-hidden class="absolute inset-0"
                :class="{ 'bg-green-200': cidade.totalAcum / cidade.totalMetas >= 1, 'bg-gren-200': cidade.totalAcum / cidade.totalMetas < 1, ' bg-red-200 opacity-50 rounded-full': true }"></span>
              <span class="relative">{{ cidade.totalAcum / cidade.totalMetas >= 1 ? 'Meta Atingida' : ((cidade.totalAcum / cidade.totalMetas) * 100).toFixed(2) +'%' }}</span>
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
      data() {
  return {
    cidadeParaImagem: {
      "BELO HORIZONTE": "BH.png",
      "CAMACARI": "Camaçari.png",
      "CANDEIAS": "Candeias.png",
      "SIMOES FILHO": "Simoes Filho.png",
      "UNAI": "Unai.png",
      "BETIM": "Betim.png",
      "PATOS": "Patos.png",
      "CONTAGEM": "Contagem.png",
      "CATU": "Catu.png",
      "L FREITAS": "Lauro.png",
      "VALENCA": "Valença.png",
      "CRUZ DAS ALMAS": "Cruz das Almas.png",
      "MONTES CLAROS": "Montes Claros.png",
      "SETE LAGOAS": "Sete Lagoas.png",
      "ALAGOINHAS": "Alagoinhas.png",
      "STO ANT JESUS": "saj.png",

        },
      };
    },


      computed: {
        resumoCidades() {
          // Agrupamento dos dados por cidade e calcule o total de vendas em cada cidade
          const cidades = {};
          this.listagem.forEach((loja) => {
            
            const cidade = loja.Cidade;
            const vendas = parseFloat(loja.VendasDia.replace(/\./g, "").replace(",", ".")); // Converte a string para número
            const qtd = parseInt(loja.QtdVendas);
            const metas = parseFloat(loja.MetaMes.replace(/\./g, "").replace(",", "."));
            const acum = parseFloat(loja.Acumulado.replace(/\./g, "").replace(",", "."));

            if (!cidades[cidade]) {
              cidades[cidade] = {
                nome: cidade,
                totalVendas: 0,
                totalQtd:0,
                totalMetas:0,
                totalAcum:0
              };
            }
            cidades[cidade].totalVendas += vendas;
            cidades[cidade].totalQtd += qtd;
            cidades[cidade].totalMetas += metas;
            cidades[cidade].totalAcum += acum;
          });

          // Converta o objeto de volta para um array
          return Object.values(cidades);
        },
    
      },
      methods:{
    FormatarValor(valor){
        
        const valorFormatado = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        return valorFormatado
      },

    getCidadeImagem(nomeCidade) {

        if (this.cidadeParaImagem[nomeCidade]) {

          return this.cidadeParaImagem[nomeCidade];

        } else {

          return "LogoPlaneta.png"; // Caminho padrão se não houver correspondência
        }
      },
    },
      
      name: 'Cidade',
    };
    </script>



