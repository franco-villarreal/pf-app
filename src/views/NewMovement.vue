<template>
  <div class="container">
    <!-- CREATE MOVEMENT FORM -->

        <form novalidate autocomplete="off" class="" @submit.prevent="send()">
            <!-- title -->
            <h4>Nuevo movimiento</h4>

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
  mounted(){
      this.resetForm()
  },
  data(){
      return {
          url: "http://localhost:3000",
          movements: [],
          error: false,
          type: '',
          category: '',
          description: '',
          exp_date: null,
          mount: 0
      }
  },
  methods: {
      sendDataFormAxios(data) {
            this.axios.post(this.url + '/movements/create', data)
                .then(res => {
                    if (res.data) {
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
                description: this.formatText(this.description),
                expDate: this.exp_date,
                mount: this.mount
            }
            this.sendDataFormAxios(form)   
        },
        resetForm() {
            return {
                type: '',
                category: '',
                description: '',
                exp_date: null,
                mount: 0
            }
        }
  }
}
</script>

<style scoped lang="css">

</style>