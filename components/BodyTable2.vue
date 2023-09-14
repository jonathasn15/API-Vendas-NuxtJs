<template>
    <table class="mt-6 -mb-2 w-full text-gray-600">
        <tbody>
            <tr v-for="loja in topMetas" :key="loja.Filial">
                <td class="py-2">Loja {{ loja.Filial }}</td>
                <td class="text-gray-500">{{ loja.Percentual }}%</td>
                <td class="w-16 ml-auto ">

                    <div class="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                        <div class="h-1.5 rounded-full" :class="{
                            'bg-green-600': loja.Percentual >= 100,
                            'bg-red-600': loja.Percentual < 100,
                        }" :style="{ width: loja.Percentual <= 100 ? loja.Percentual + '%' : 100 + '%' }">
                        </div>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>
<script>
export default {
    props: {
        topMetas: Array
    },

    name: 'BodyTable2'
}

</script>  