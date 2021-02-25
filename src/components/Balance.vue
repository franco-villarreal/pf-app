<template>
    <div class="alert-dark">
        <h4 class="alert-heading p-1">BALANCE</h4>
    </div>
    
    <table class="table table-sm align-middle">
        <thead class="">
            <tr>
                <th>CÓMPUTO</th>
                <th scope="col">
                    INGRESO
                </th>
                <th scope="col">
                    EGRESO
                </th>
                <th scope="col">
                    SALDO
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class=""
                >
                <td scope="row">S/C</td>
                <td scope="row">
                    <p class="">
                        {{ formatMount(incomes) }}
                    </p>
                </td>
                <td scope="row">
                    <p class="">
                        {{ formatMount(expenses) }}
                    </p>
                </td>
                <td scope="row">
                    <p class="">
                        {{ formatMount(total) }}
                    </p>
                </td>
            </tr>
            <tr>
                <td scope="row">C</td>
            <td scope="row">
                <p class="">
                    {{ formatMount(computedIncomes) }}
                </p>
            </td>
            <td scope="row">
                <p class="">
                    {{ formatMount(computedExpenses) }}
                </p>
            </td>
            <td scope="row">
                <p class="">
                    {{ formatMount(computedTotal) }}
                </p>
            </td>
        </tr>
        </tbody>
        
    </table>        
</template>

<script>
import mixins from "../mixins.js"
export default {
  name: 'Movements',
  props: {
      movements: Array
  },
  mixins: [mixins],
  mounted(){
        this.getBalance()
  },
  data(){
      return {
          url: "http://localhost:3000",
          incomes: 0,
          computedIncomes: 0,
          expenses: 0,
          computedExpenses: 0,
          total: 0,
          computedTotal: 0
      }
  },
  methods: {
      getBalance() {
          try{
            
            for (let i=0; i<this.movements.length; i++) {
                
                console.log(this.movements[i].mount)
                if (this.movements[i].type == 'INGRESO'){
                    if (this.movements[i].status == 'COMPUTADO'){
                        this.computedIncomes += Number(this.movements[i].mount)
                    }
                    this.incomes += Number(this.movements[i].mount)
                } else {
                    if (this.movements[i].status == 'COMPUTADO'){
                        this.computedExpenses += Number(this.movements[i].mount)
                    }
                    this.expenses += Number(this.movements[i].mount)
                }

            }
            this.total = this.incomes - this.expenses
            this.computedTotal = this.computedIncomes - this.computedExpenses
        } catch (err) {
            console.log(err)
        }      
      }
      
  }
}
</script>

<style scoped lang="css">
.resume-table {
    
}
</style>