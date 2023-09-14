<template>

    <table class="w-full text-gray-600">
                            <tbody>
                                <tr v-for="sale in TopVendas" :key="sale.Loja">
                                    <td class="py-2"> Loja {{ sale.Filial }}</td>
                                    <td class="text-gray-500">R$ {{ sale.VendasDia }}</td>
                                    <td>
                                        
                                        <div class="flex items-end gap-1">
                                            <span>{{ calculaPercentual(sale.VendasDia,sale.MetaMes)}}%</span>
                                            <svg class="w-2 text-green-500" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.00001 0L12 8H-3.05176e-05L6.00001 0Z" fill="currentColor"/>
                                            </svg>
                                        </div>  
                                    </td>   
                                </tr>
                            </tbody>
                        </table> 
    </template>
    
    <script>
    
      export default {
    
        props:{
            TopVendas: Array,
        },

        methods:{

            calculaPercentual(VendasDia,MetaMes){

                const venda = parseFloat(VendasDia.replace(/\./g, "").replace(",", "."));
                const meta = parseFloat(MetaMes.replace(/\./g, "").replace(",", "."));

                const perc = ((venda / meta) * 100).toFixed(2);

                return perc;
            }
        },
    
    name: 'BodyTable1'
    }
    
    
    
    </script>