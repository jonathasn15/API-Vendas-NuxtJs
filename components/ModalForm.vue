<template>
  <div>
    <!-- Outros elementos do seu template -->

    <transition
      enter-active-class="transition ease-out duration-300"
      enter-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      enter-to-class="opacity-100 translate-y-0 sm:scale-100"
      leave-active-class="transition ease-in duration-200"
      leave-class="opacity-100 translate-y-0 sm:scale-100"
      leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    >
      <div v-if="showModal" class="fixed inset-0 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg shadow-lg overflow-hidden max-w-md w-full">
          <div class="bg-red-700 text-white p-2">
            <h3 class="text-lg font-semibold">
              Loja {{ lojaSelecionada.Filial }} - {{ lojaSelecionada.Cidade }}
            </h3>
          </div>
          <div class="p-2">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
              <!-- Primeira Coluna -->
              <div class="bg-white rounded-lg shadow p-2">
                <div class="text-xs font-semibold text-gray-600">Vendas do Dia</div>
                <div class="text-sm font-semibold text-gray-900">R$ {{ lojaSelecionada.VendasDia }}</div>
              </div>

              <div class="bg-white rounded-lg shadow p-2">
                <div class="text-xs font-semibold text-gray-600">Qtd. de Vendas</div>
                <div class="text-sm font-semibold text-gray-900">{{ lojaSelecionada.QtdVendas }}</div>
              </div>

              <!-- Segunda Coluna -->
              <div class="bg-white rounded-lg shadow p-2">
                <div class="text-xs font-semibold text-gray-600">Acumulado</div>
                <div class="text-sm font-semibold text-gray-900">R$ {{ lojaSelecionada.Acumulado }}</div>
              </div>

              <div class="bg-white rounded-lg shadow p-2">
                <div class="text-xs font-semibold text-gray-600">Meta do Mês</div>
                <div class="text-sm font-semibold text-gray-900">R$ {{ lojaSelecionada.MetaMes }}</div>
              </div>
              <div class="bg-white rounded-lg shadow p-2">
                <div class="text-xs font-semibold text-gray-600">Ticket Médio</div>
                <div class="text-sm font-semibold text-gray-900">R$ {{ lojaSelecionada.TicketMedio  }}</div>
              </div>
            </div>
            <div class="p-1 text-xs mb-5">
              <div class="mb-2 font-semibold text-gray-600">Percentual</div>
              <div class="w-full h-4 bg-gray-200 rounded-full dark:bg-gray-700">
                <div class="h-4 bg-red-600 text-xs text-center text-white rounded-full dark:bg-red-500" :style="{width: lojaSelecionada.Percentual +'%'}">{{ lojaSelecionada.Percentual }}%</div>
              </div>
            </div>
            

            <div class="mb-2">
              <div class="min-w-full shadow rounded-lg overflow-hidden">
                <table class="min-w-full text-xs sm:text-sm">
                  <thead>
                    <tr class="bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      <th class="px-4 py-2">Forma de Pagamento</th>
                      <th class="px-4 py-2 text-right">Valor</th>
                      <th class="px-4 py-2 text-right">Percentual</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="text-sm">
                      <td class="px-4 py-2">Crediário</td>
                      <td class="px-4 py-2 text-right">R$ {{ lojaSelecionada.Crediario }}</td>
                      <td class="px-4 py-2 text-right">{{ Percentual(lojaSelecionada.Crediario, lojaSelecionada.VendasDia) }}%</td>
                    </tr>
                    <tr class="text-sm">
                      <td class="px-4 py-2">Crédito</td>
                      <td class="px-4 py-2 text-right">R$ {{ lojaSelecionada.Credito }}</td>
                      <td class="px-4 py-2 text-right">{{ Percentual(lojaSelecionada.Credito, lojaSelecionada.VendasDia) }}%</td>
                    </tr>
                    <tr class="text-sm">
                      <td class="px-4 py-2">Débito</td>
                      <td class="px-4 py-2 text-right">R$ {{ lojaSelecionada.Debito }}</td>
                      <td class="px-4 py-2 text-right">{{ Percentual(lojaSelecionada.Debito, lojaSelecionada.VendasDia) }}%</td>
                    </tr>
                    <tr class="text-sm">
                      <td class="px-4 py-2">PIX</td>
                      <td class="px-4 py-2 text-right">R$ {{ lojaSelecionada.PIX }}</td>
                      <td class="px-4 py-2 text-right">{{ Percentual(lojaSelecionada.PIX, lojaSelecionada.VendasDia) }}%</td>
                    </tr>
                    <tr class="text-sm">
                      <td class="px-4 py-2">Dinheiro</td>
                      <td class="px-4 py-2 text-right sm:text-xs">R$ {{ lojaSelecionada.Dinheiro }}</td>
                      <td class="px-4 py-2 text-right">{{ Percentual(lojaSelecionada.Dinheiro, lojaSelecionada.VendasDia) }}%</td>
                    </tr>
                    <tr class="text-sm">
                      <td class="px-4 py-2 text-gray-600 font-semibold">Total dia</td>
                      <td class="px-4 py-2 text-right text-gray-600 font-semibold">R$ {{ lojaSelecionada.VendasDia }}</td>
                      <td class="px-4 py-2 text-right text-gray-600 font-semibold">100%</td>
                    </tr>
                  </tbody>
                </table>
               

        
        
              </div>
                 <!-- Botão de fechar -->
              <div class="bg-gray-100 p-2 flex justify-end">
                <button @click="closeModal" class="px-3 bg-red-600 text-white rounded-full hover:bg-red-700 focus:outline-none">X</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <button v-if="showModal" @click="closeModal" class="fixed inset-0 w-full h-full bg-black opacity-50 cursor-pointer">Fechar</button>
  </div>
</template>

  <script>
  import { CountUp } from 'countup.js';
  
  export default {
    props: {
      showModal: Boolean,
      lojaSelecionada: Object,
    },
    data() {
      return {
        vendasDiaValue: '0', 
      };
    },
    methods: {
      closeModal() {
        this.$emit('fechar-modal');
      },

      Percentual(valor,valorTotal){

        const valorBase = parseFloat(valor.replace(/\./g, "").replace(",", "."));
        const valorTotalizador = parseFloat(valorTotal.replace(/\./g, "").replace(",", ".")); 

        const resultado = ((valorBase/valorTotalizador) * 100).toFixed(2);

        return resultado
      },
    },
    watch: {
      showModal(value) {
        if (value) {
          const countUp = new CountUp(this.$refs.vendasDiaValue, 0, this.lojaSelecionada.VendasDia, 2, 2.5);
          if (!countUp.error) {
            countUp.start();
          }
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    background-color: rgba(0, 0, 0, 0.5);
  }
  .modal {
    transition: opacity 0.2s, transform 0.3s;
  }
  </style>
  