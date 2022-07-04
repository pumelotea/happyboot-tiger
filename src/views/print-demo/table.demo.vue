<hb-demo>打印表格</hb-demo>
<script setup>
import { NButton, NSpace } from 'naive-ui'
import HbAdminPrint from '@/components/HbAdminPrint'
import { ref } from 'vue'

const printTableInstance = ref(null)
function printTable () {
  printTableInstance.value.print()
}
</script>
<template>
  <div>
    <hb-admin-print ref="printTableInstance">
      <table class="reference">
        <tbody>
          <tr>
            <th>Company</th>
            <th>Contact</th>
            <th>Country</th>
          </tr>
          <tr>
            <td>Alfreds Futterkiste</td>
            <td>Maria Anders</td>
            <td>Germany</td>
          </tr>
          <tr class="alt">
            <td>Berglunds snabbköp</td>
            <td>Christina Berglund</td>
            <td>Sweden</td>
          </tr>
          <tr>
            <td>Centro comercial Moctezuma</td>
            <td>Francisco Chang</td>
            <td>Mexico</td>
          </tr>
          <tr class="alt">
            <td>Ernst Handel</td>
            <td>Roland Mendel</td>
            <td>Austria</td>
          </tr>
          <tr>
            <td>Island Trading</td>
            <td>Helen Bennett</td>
            <td>UK</td>
          </tr>
          <tr class="alt">
            <td>Königlich Essen</td>
            <td>Philip Cramer</td>
            <td>Germany</td>
          </tr>
          <tr>
            <td>Laughing Bacchus Winecellars</td>
            <td>Yoshi Tannamuri</td>
            <td>Canada</td>
          </tr>
          <tr class="alt">
            <td>Magazzini Alimentari Riuniti</td>
            <td>Giovanni Rovelli</td>
            <td>Italy</td>
          </tr>
          <tr>
            <td>North/South</td>
            <td>Simon Crowther</td>
            <td>UK</td>
          </tr>
          <tr class="alt">
            <td>Paris spécialités</td>
            <td>Marie Bertrand</td>
            <td>France</td>
          </tr>
          <tr>
            <td>The Big Cheese</td>
            <td>Liz Nixon</td>
            <td>USA</td>
          </tr>
          <tr class="alt">
            <td>Vaffeljernet</td>
            <td>Palle Ibsen</td>
            <td>Denmark</td>
          </tr>
        </tbody>
      </table>
    </hb-admin-print>
    <n-space
      justify="flex-end"
      style="margin-top: 10px"
    >
      <n-button
        type="info"
        @click="printTable"
      >
        打印表格
      </n-button>
    </n-space>
  </div>
</template>
<style scoped>
table.reference, table {
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 4px;
  margin-top: 4px;
}

table.reference td {
  line-height: 2em;
  min-width: 24px;
  border: 1px solid rgb(212 212 212);
  padding: 5px;
  padding-top: 7px;
  padding-bottom: 7px;
  vertical-align: top;
}

table.reference th {
  line-height: 2em;
  min-width: 24px;
  border: 1px solid rgb(212 212 212);
  padding: 5px;
  padding-top: 7px;
  padding-bottom: 7px;
  vertical-align: top;
}
</style>
