<template>
  <div class="container">
    <!-- UPDATE MOVEMENT FORM -->
        <form novalidate autocomplete="off" class="" @submit.prevent="send()">
            <!-- title -->
            <h4>Modificar movimiento</h4>
            <hr>
            <!-- error -->
            <div v-if="error" class="alert alert-danger">
                Los datos ingresados son incorrectos.
            </div>
            <div class="form-row">
            <!-- type -->
            <div class="form-group col-2">
                <label for="type">Tipo</label>
                <select id="type" class="form-control" v-model="type">
                    <option v-bind:value=" t.value " v-for="(t, i) in types" v-bind:key="i">{{ t.name }}</option>
                </select>
            </div>
            <!-- category -->
            <div class="form-group col-2">
                <label for="category">Categoría</label>
                <select id="category" class="form-control" v-model="category">
                     <option v-bind:value=" category.value " v-for="(category, i) in categories" v-bind:key="i">{{ category.name}}</option>
                </select>
            </div>
            <!-- description -->
            <div class="form-group col-4">
                <label for="description">Descripción</label>
                <input type="text" id="description" class="form-control" v-model="description">
            </div>
            <!-- exp_date -->
            <div class="form-group col-2">
                <label for="exp_date">Vencimiento</label>
                <input type="date" id="exp_date" class="form-control" v-model="exp_date">
            </div>
            <!-- mount -->
            <div class="form-group col-2">
                <label for="mount">Importe ($)</label>
                <input type="number" id="mount" class="form-control" v-model="mount">
            </div>
            </div>
            <div class="form-row">
                <!-- submit -->
            <div class="form-group col-12">
                <input type="submit" :disabled="false" class="btn btn-success" value="Enviar">
            </div>
            </div>

        </form>
  </div>
</template>

<script>
import mixins from "../mixins.js"
export default {
  name: 'NewMovement',
  components: {
  },
  mixins: [mixins],
  props: {
      movId: Number
  },
  mounted(){
    this.getMovementByMovId()
  },
  data(){
      return {
          url: "http://localhost:3000",
          error: false,
          type: '',
          category: '',
          description: '',
          exp_date: null,
          mount: 0
      }
  },
  methods: {
        async getMovementByMovId() {
            try{
            const data = await this.axios.get(this.url + '/movements/' + this.movId)
            const movement = Object.assign({}, data);
            console.log(movement)
            let obj;
            if (movement.data.message) {

                obj = movement.data.message[0]
                console.log(obj)
                this.type = obj.type
                this.category = obj.category
                this.description = obj.description
                this.exp_date = obj.exp_date
                this.com_date = obj.com_date
                this.status = obj.status
                this.mount = obj.mount
                
                console.log(this.type)
            }
            // console.log(this.resultados);
        } catch (err) {
            console.log(err)
        }
        },
        sendDataFormAxios(data, movId) {
            this.axios.patch(this.url + '/movements/' + movId + '/update', data)
                .then(res => {
                    if (res.data) {
                        //console.log(res.data)
                        this.$router.push('/movements')
                    }
                })
                .catch(error => {
                    console.log(error)
                    this.error = true
                })
        },
        send() {  
            let form = {
                type: this.type,
                category: this.category,
                description: this.description,
                expDate: this.exp_date,
                mount: this.mount
            }
            console.log(form)
            this.sendDataFormAxios(form, this.movId)   
        }
  }
}
</script>

<style scoped lang="css">

</style>