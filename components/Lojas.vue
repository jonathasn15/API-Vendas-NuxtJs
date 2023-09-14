<template>
    <table class="min-w-full leading-normal">
        <thead>
            <tr>
                <th
                    class="px-2 text-center md:text-left sm:px-5 py-2 sm:py-3 border-b-2 border-gray-200 bg-gray-100 text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Loja
                </th>
                <th
                    class="px-2 text-center sm:px-5 py-2 sm:py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Valor
                </th>
                <th
                    class="px-2 text-center sm:px-5 py-2 sm:py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Qnt
                </th>
                <th
                    class="px-2 text-center sm:px-5 py-2 sm:py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    T. Méd
                </th>
                <th
                    class="px-2 text-center sm:px-5 py-2 sm:py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(loja, index) in listagem" :key="index" @click="exibirDetalhes(loja)"
                :class="{ 'bg-gray-200 hover:bg-gray-300': loja === lojaSelecionada, 'cursor-pointer': true }">
                <td class="px-2 text-center sm:text-right sm:px-5 py-3 sm:py-5 border-b border-gray-200 bg-white text-xs sm:text-sm">
                    <div class="flex items-center">
                        <div class="flex-shrink-0 w-6 h-6 sm:w-10 sm:h-10">
                            <img v-if="loja.Ramo === 'C'" class="w-full h-full rounded-full" src="../static/sneakers.png"
                                alt="" />
                            <img v-else-if="loja.Ramo === 'T'" class="w-full h-full rounded-full" src="../static/Camisa.png"
                                alt="" />
                            <img v-else class="w-full h-full rounded-full" src="../static/LogoPlaneta.png" alt="" />
                        </div>
                        <div class="ml-2 sm:ml-3">
                            <p class="text-gray-900 whitespace-no-wrap">Loja {{ loja.Filial }}</p>
                        </div>
                    </div>
                </td>
                <td class="px-2 text-center sm:px-5 py-3 sm:py-5 border-b border-gray-200 bg-white text-xs sm:text-sm">
                    <p class="text-gray-900 whitespace-no-wrap">R${{ loja.VendasDia }}</p>
                </td>
                <td class="px-2 text-center sm:px-5 py-3 sm:py-5 border-b border-gray-200 bg-white text-xs sm:text-sm">
                    <p class="text-gray-900 whitespace-no-wrap">{{ loja.QtdVendas }}</p>
                </td>
                <td class="px-2 text-center sm:px-5 py-3 sm:py-5 border-b border-gray-200 bg-white text-xs sm:text-sm">
                    <p class="text-gray-900 whitespace-no-wrap">R${{ loja.TicketMedio }}</p>
                </td>
                <td class="px-2 text-center sm:px-5 py-3 sm:py-5 border-b border-gray-200 bg-white text-xs sm:text-sm">
                    <span class="relative inline-block px-2 py-1 sm:px-3 sm:py-1 font-semibold leading-tight"
                        :class="{ 'text-green-900': loja.Percentual >= 100, 'text-red-900': loja.Percentual < 100 }">
                        <span aria-hidden class="absolute inset-0"
                            :class="{ 'bg-green-200': loja.Percentual >= 100, 'bg-green-200': loja.percentual < 100, ' bg-red-200 opacity-50 rounded-full': true }"></span>
                        <span class="relative">
                            {{ loja.Percentual >= 100 ? 'Meta Atingida' : loja.Percentual + '%' }}
                        </span>
                    </span>
                </td>
            </tr>
        </tbody>
        <ModalForm :showModal="showModal" :lojaSelecionada="lojaSelecionada" @fechar-modal="showModal = false" />
    </table>
</template>
  

<script>

import ModalForm from '../components/ModalForm.vue';

export default {

    components: {
        ModalForm,
    },
    props: {
        listagem: Array
    },
    data() {
        return {
            lojaSelecionada: null,
            showModal: false,
        };
    },

    methods: {
        exibirDetalhes(loja) {
            this.lojaSelecionada = loja;
            this.showModal = true;
        },
        fecharModal() {
            this.showModal = false;
        },
    },


    name: 'Lojas'

}

</script>