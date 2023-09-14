<template>
    <!-- component -->
       <div>
           <div class="flex flex-col">
               <h2 class="mb-4 text-2xl font-bold">Formas de Pagamento</h2>
   
               <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1">
                   
                   <div v-for="(forma, index) in formasPagamentoOrdenadas" :key="index"  class="flex items-start rounded-xl bg-white p-4 shadow-lg hover:scale-110">
                           <div class="flex h-12 w-12 items-center justify-center rounded-full" :class="forma.iconBgClass">
                           <div :class="forma.iconClass" >
                            <img :src="require(`~/static/${forma.iconPath}`)" alt="Imagem"/>

                           </div>
                           </div>
                           <div class="ml-4">
                           <h2 class="font-semibold">{{ formatarValor(totalFormaPagamento(forma.key)) }}</h2>
                           <p class="mt-2 text-sm text-gray-500">{{ forma.label }}</p>
                           </div>
                           <div class="mt-2 ml-8 text-gray-500">{{ calcularPercentual(forma.key) }}%</div>
                       </div>
                       </div>
                   </div>
               </div>
   </template>
   
   <script>
   
   
   export default {
   
   
       props: {
           vendasOnline: Array
       },
       computed: {
       formasPagamentoOrdenadas() {
           if (!this.vendasOnline) {
           return [];
         }
           return this.formasPagamento.slice().sort((a, b) => this.totalFormaPagamento(b.key) - this.totalFormaPagamento(a.key));
       },
       formasPagamento() {
         return [
           {
             key: 'Dinheiro',
             label: 'Dinheiro',
             iconClass: 'h-8 w-8 text-red-400',
             iconPath: 'din.png',
             iconBgClass: 'border-red-600 bg-red-50'
           },
           {
             key: 'Crediario',
             label: 'Crediário',
             iconClass: 'h-8 w-8 text-red-400',
             iconPath: 'LogoPlaneta.png',
             iconBgClass: 'border-red-600 bg-red-100'
           },
           {
             key: 'Debito',
             label: 'Débito',
             iconClass: 'h-8 w-8 text-red-400',
             iconPath: 'card2.png',
             iconBgClass: 'border-red-600 bg-red-100'
           },
           {
             key: 'Credito',
             label: 'Crédito',
             iconClass: 'h-8 w-8 text-red-400',
             iconPath: 'card1.png',
             iconBgClass: 'border-red-600 bg-red-100'
           },
           {
             key: 'PIX',
             label: 'Pix',
             iconClass: 'h-8 w-8 text-red-400',
             iconPath: 'form-pix.png',
             iconBgClass: 'border-red-600 bg-red-100'
           },
           
         ];
       }
     },
   
       methods:{
   
       totalFormaPagamento(forma) {
           if (!this.vendasOnline) {
               return 0;
               }
           return this.vendasOnline.reduce((total, loja) => {
           return total + parseFloat(loja[forma].replace(/\./g, "").replace(",", "."));
         }, 0);
       },
   
       calcularPercentual(forma) {
           if (!this.vendasOnline) {
               return 0;
               }
         const totalForma = this.totalFormaPagamento(forma);
         const totalPago = this.vendasOnline.reduce((total, loja) => {
           return total + parseFloat(loja.VendasDia.replace(/\./g, "").replace(",", "."));
         }, 0);
         const percentual = (totalForma / totalPago) * 100;
         return percentual.toFixed(2);
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
       },
       name: 'FormPag'
     }
   </script>