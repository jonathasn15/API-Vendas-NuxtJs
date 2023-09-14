<template>
    <!-- component -->
    <div class="bg-white p-4 md:p-8 rounded-md w-full">
        <div class="flex flex-col md:flex-row items-center justify-between pb-4">
            <h2 class="text-gray-600 font-semibold mb-2 md:mb-0">Lista de Lojas</h2>
            <div class="mt-2 md:mt-0">
                <div
                    class="inline-flex overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700">
                    <div
                        class="inline-flex overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700">
                        <button @click="selecionarVisao('Loja')" :class="{ 'bg-gray-100': visaoSelecionada === 'Loja' }"
                            class="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:bg-gray-800 dark:text-gray-300">
                            Loja
                        </button>

                        <button @click="selecionarVisao('Praça')" :class="{ 'bg-gray-100': visaoSelecionada === 'Praça' }"
                            class="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">
                            Praça
                        </button>

                        <button @click="selecionarVisao('Região')" :class="{ 'bg-gray-100': visaoSelecionada === 'Região' }"
                            class="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">
                            Região
                        </button>

                        <button @click="selecionarVisao('Ramo')" :class="{ 'bg-gray-100': visaoSelecionada === 'Ramo' }"
                            class="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">
                            Ramo
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex flex-col md:flex-row items-left space-y-2 md:space-y-0 md:space-x-4 mt-4 md:mt-0">
            <p class="mb-2 md:mb-0 text-gray-600 md:text-left">Ordenar por:</p>
            <div class="flex flex-col md:flex-row items-left space-y-2 md:space-y-0 md:space-x-4">
                <div class="flex items-center">
                    <input id="Valor" type="radio" value="Valor" name="Ordenação" v-model="ordemSelecionada"
                        @change="ordenarLista"
                        class="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                    <label for="Valor" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Valor</label>
                </div>
                <div class="flex items-center">
                    <input id="Qnt" type="radio" value="Qnt" name="Ordenação" v-model="ordemSelecionada"
                        @change="ordenarLista"
                        class="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                    <label for="Qnt" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Qnt</label>
                </div>
                <div class="flex items-center">
                    <input id="Ticket Médio" type="radio" value="Ticket" name="Ordenação" v-model="ordemSelecionada"
                        @change="ordenarLista"
                        class="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                    <label for="Ticket Médio" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Ticket
                        Médio</label>
                </div>
            </div>
            <div class="flex items-center">
                <input id="Acumulado" type="radio" value="Acumulado" name="Ordenação" v-model="ordemSelecionada"
                    @change="ordenarLista"
                    class="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                <label for="Acumulado" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Acumulado</label>
            </div>
            <div class="flex items-center">
                <input id="Percentual" type="radio" value="Percentual" name="Ordenação" v-model="ordemSelecionada"
                    @change="ordenarLista"
                    class="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                <label for="Percentual" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Percentual</label>
            </div>

        </div>
        <div class="mt-4">
            <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
                    <div class="bg-white p-4 md:p-8 rounded-md w-full">

                        <component :is="componenteVisao" :listagem="listFil" />

                        <div
                            class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                            <span class="text-xs xs:text-sm text-gray-900">
                                Lojas Planeta - você merece!
                            </span>
                        </div>
                        <ModalForm :showModal="mostrarModal" :lojaSelecionada="lojaSelecionada"
                            @fechar-modal="fecharModal" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>

import Lojas from '../components/Lojas.vue';
import Praça from '../components/Praça.vue';
import Ramo from '../components/Ramo.vue';
import Região from '../components/Região.vue';
import ModalForm from '../components/ModalForm.vue';

export default {

    components: {

        ModalForm,
        Lojas,
        Praça,
        Ramo,
        Região

    },

    props: {
        listFil: Array,
    },
    data() {
        return {
            mostrarModal: false,
            lojaSelecionada: null,
            visaoSelecionada: 'Loja',
            ordemSelecionada: '',
        };
    },
    computed: {
        // Computed property para determinar qual componente de visão usar com base na seleção
        componenteVisao() {
            switch (this.visaoSelecionada) {
                case 'Loja':
                    return 'Lojas';
                case 'Praça':
                    return 'Praça';
                case 'Ramo':
                    return 'Ramo';
                case 'Região':
                    return 'Região';
                default:
                    return 'Lojas'; // Define o padrão para 'Lojas' se a visão não for reconhecida
            }
        },
    },
    methods: {

        exibirDetalhes(loja) {
            this.lojaSelecionada = loja;
            this.mostrarModal = true;
        },
        fecharModal() {
            this.mostrarModal = false;
        },
        selecionarVisao(visao) {
            this.visaoSelecionada = visao;
            // Reinicializa a ordemSelecionada para evitar problemas de ordenação
            this.ordemSelecionada = '';
        },
        ordenarPorValor() {
            this.listFil.sort((a, b) => {
                const valorA = parseFloat(a.VendasDia.replace(/\./g, '').replace(',', '.'));
                const valorB = parseFloat(b.VendasDia.replace(/\./g, '').replace(',', '.'));
                return valorB - valorA;
            });
        },

        ordenarPorQuantidade() {
            this.listFil.sort((a, b) => b.QtdVendas - a.QtdVendas);
        },

        ordenarPorTicketMedio() {
            this.listFil.sort((a, b) => {
                const ticketMedioA = parseFloat(a.TicketMedio.replace(/\./g, '').replace(',', '.'));
                const ticketMedioB = parseFloat(b.TicketMedio.replace(/\./g, '').replace(',', '.'));
                return ticketMedioB - ticketMedioA;
            });
        },

        ordenarPorAcumulado() {
            this.listFil.sort((a, b) => {
                const acumuladoA = parseFloat(a.Acumulado.replace(/\./g, '').replace(',', '.'));
                const acumuladoB = parseFloat(b.Acumulado.replace(/\./g, '').replace(',', '.'));
                return acumuladoB - acumuladoA;
            });
        },

        ordenarPorPercentual() {
            this.listFil.sort((a, b) => b.Percentual - a.Percentual);
        },
        ordenarLista() {
            switch (this.ordemSelecionada) {
                case 'Valor':
                    this.ordenarPorValor();
                    break;
                case 'Qnt':
                    this.ordenarPorQuantidade();
                    break;
                case 'Ticket':
                    this.ordenarPorTicketMedio();
                    break;
                case 'Acumulado':
                    this.ordenarPorAcumulado();
                    break;
                case 'Percentual':
                    this.ordenarPorPercentual();
                    break;
                default:
                // Lidar com um caso padrão, se necessário
            }
        },
        async fetchData() {
            try {
                const response = await this.fetchDataFromServer();
                this.listFil = [];
                this.updateData(response);
                // Após atualizar os dados, reordena a lista com base na ordemSelecionada
                this.ordenarLista();
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },
    },

    name: 'ListFiliais'
}

</script>
    