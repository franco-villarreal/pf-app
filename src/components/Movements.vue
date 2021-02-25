<template>
    <div class="container">

        <div class="col-12">
            <Balance :movements="movements" :key="balanceKey"/>
        </div>
       
        <div class="col-12">
             <div class="col-12 alert-dark">
                <h4 class="alert-heading p-1">MOVIMIENTOS</h4>
            </div>
            <form novalidate autocomplete="off" class="" @submit.prevent="reload()">
                <div class="form-row">

                    <div class="form-group col-1">
                        <!-- <label for="year">Año</label> -->
                        <select v-model="year" id="year" class="form-control" @change="reload()">
                            <option v-bind:value=" y.value " v-for="(y, i) in years" v-bind:key="i">{{ y.value }}</option>
                        </select>
                    </div>
                    
                    <div class="from-group col-2">
                        <!-- <label for="month">Mes</label> -->
                        <select v-model="month" id="month" class="form-control" @change="reload()">
                            <option v-bind:value=" month.value " v-for="(month, i) in months" v-bind:key="i">{{ month.name}}</option>
                        </select>
                    </div>
                    
                    <div class="form-group col-3">
                        <!-- <label for="cateogryFilter" class="text-left">Categoría</label> -->
                        <select v-model="categoryFilter" id="categoryFilter" class="form-control" @change="reload()">
                            <option v-bind:value=" category.value " v-for="(category, i) in categories" v-bind:key="i">{{ category.name}}</option>
                            <option value="TODOS">TODOS</option>
                        </select>
                    </div>
                    
                    <div class="form-group col-6">
                        <button class="btn btn-dark float-right" v-on:click="addMovements()">Nuevo movimiento</button>
                    </div>

                </div>    
                    
                
            </form>
        </div>
        

        <div class="col-12" v-if="movements.length > 0">

            <table class="table table-striped table-hover table-sm">
                    <thead class="thead-dark">
                        <tr>
                            <!-- <th scope="col">
                                ID
                            </th> -->
                            <th scope="col">
                                Tipo
                            </th>
                            <th scope="col">
                                Categoría
                            </th>
                            <th scope="col">
                                Descripción
                            </th>
                            <th scope="col">
                                Vencimiento
                            </th>
                            <th scope="col">
                                Cómputo
                            </th>
                            <th scope="col">
                                Estado
                            </th>
                            <th scope="col">
                                Monto
                            </th>
                            <th>
                                
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="(res, i) in movements"
                            :key="i" v-bind:class=" { income: (res.type == 'INGRESO'), expense:  (res.type == 'EGRESO')} ">
                            <!-- <td scope="row" v-if="res.category == categoryFilter || categoryFilter == 'TODOS'">
                                <p class="">
                                    {{ res.id }}
                                </p>
                            </td> -->
                            <td  scope="row" v-if="res.category == categoryFilter || categoryFilter == 'TODOS'">
                                <p class="">
                                    {{ res.type }}
                                </p>
                            </td>
                            <td scope="row" v-if="res.category == categoryFilter || categoryFilter == 'TODOS'">
                                <p class="">
                                    {{ res.category }}
                                </p>
                            </td>
                            <td scope="row" v-if="res.category == categoryFilter || categoryFilter == 'TODOS'">
                                <p class="">
                                    {{ res.description }}
                                </p>
                            </td>
                            <td scope="row" v-if="res.category == categoryFilter || categoryFilter == 'TODOS'">
                                <p class="">
                                    {{ res.exp_date }}
                                </p>
                            </td>
                            <td scope="row" v-if="res.category == categoryFilter || categoryFilter == 'TODOS'">
                                <p class="">
                                    {{ res.com_date }}
                                </p>
                            </td>
                            <td scope="row" v-if="res.category == categoryFilter || categoryFilter == 'TODOS'">
                                <p class="">
                                    {{ res.status }}
                                </p>
                            </td>
                            <td scope="row" v-if="res.category == categoryFilter || categoryFilter == 'TODOS'">
                                <p class="">
                                {{ formatMount(res.mount) }}
                                </p>
                            </td>
                            <td scope="row" v-if="res.category == categoryFilter || categoryFilter == 'TODOS'">
                                <div class="btn-movement btn btn-info" v-on:click="updateMovements(res.id)" v-if="res.status === 'PENDIENTE'">
                                    E
                                </div>
                                <div class="btn-movement btn btn-success ml-1" v-on:click="computeMovement(res.id)" v-if="res.status === 'PENDIENTE'">
                                    C
                                </div>
                                <div class="btn-movement btn btn-danger ml-1" v-on:click="deleteMovement(res.id)"> <!-- v-if="res.status === 'PENDIENTE'" -->
                                    D
                                </div>
                            </td>
                        </tr>
                        
                    </tbody>
                    <tfoot>
                        <tr>
                            <td scope= "row"></td>
                            <td scope= "row"></td>
                            <td scope= "row"></td>
                            <td scope= "row"></td>
                            <td scope= "row"></td>
                            <td scope= "row">SUBTOTAL</td>
                            <td scope= "row">{{ formatMount(totalMount) }}</td>
                            <td scope= "row"></td>
                        </tr>
                    </tfoot>
                </table> 
                  

        </div>

        <div class="col-12" v-else>
            <p class="alert-danger p-2">No tienes movimientos.</p>
        </div>     
    </div>
  
</template>
<script>
import Balance from '@/components/Balance.vue'
import mixins from "../mixins.js"
export default {
  name: 'Movements',
  components: {
    Balance
  },
  mixins: [mixins],
  mounted(){
        this.getMovements()
  },
  data(){
      return {
          url: "http://localhost:3000",
          month: Number(new Date().getMonth()) + 1,
          year: Number(new Date().getFullYear()),
          movements: [],
          balanceKey: 0,
          categoryFilter: 'TODOS',
          totalMount: 0
      }
  },
  methods: {
      async getMovements() {
          try{
            const data = await this.axios.get(this.url + '/movements/filter/?year=' + this.year + '&month=' + this.month)
            console.log(data)
            const movements = Object.assign({}, data);
            //console.log(movements)
            let obj;
            if (movements.data.message.length > 0) {
            for(obj of movements.data.message){
                let comDateParsed = null
                if(obj.com_date){
                    /* comDateParsed = `${new Date(obj.com_date).getDay()}/${new Date(obj.com_date).getMonth() + 1}/${new Date(obj.com_date).getFullYear()}` */
                    comDateParsed = obj.com_date
                }
                let movement = {
                id: obj.id,
                type: obj.type,
                category: obj.category,
                description: obj.description,
                /* exp_date: `${new Date(obj.exp_date).getDay()}/${new Date(obj.exp_date).getMonth() + 1}/${new Date(obj.exp_date).getFullYear()}`, */
                exp_date: obj.exp_date,
                com_date: comDateParsed,
                status: obj.status,
                mount: obj.mount
                };
                console.log(movement)
                if(movement.type == 'INGRESO' && (movement.category == this.categoryFilter || this.categoryFilter == 'TODOS')){
                    this.totalMount += movement.mount
                } else if(movement.type == 'EGRESO' && (movement.category == this.categoryFilter || this.categoryFilter == 'TODOS')){
                    this.totalMount -= movement.mount
                }
                this.movements.push(movement)
                this.balanceKey += 1
            }
            } else {
            this.movements = false;
            }
            //console.log(this.movements);
        } catch (err) {
            console.log(err)
        }      
      },
      async deleteMovement(movId){
          try{
            const data = await this.axios.delete(this.url + '/movements/' + movId + '/delete')
            console.log(data)
        } catch (err) {
            console.log(err)
        }
        this.reload()
      },
      async computeMovement(movId){
          try{
            const data = await this.axios.patch(this.url + '/movements/' + movId + '/compute')
            console.log(data)
        } catch (err) {
            console.log(err)
        }
        this.reload()
      },
      async reload(){
          this.totalMount = 0
          this.movements = []
          this.getMovements()
      },
      addMovements(){
          this.$router.push('/movements/add')
      },
      updateMovements(movId){
          this.$router.push('/movements/update/' + movId)
      }
  }
}
</script>

<style scoped lang="css">
.btn-movement {
    width: 20px;
    font-size: 8px;
    padding: 5px;
}
.income {
    color: green;
}
.expense {
    color: red;
}
</style>