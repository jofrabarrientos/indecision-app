<template>
<h2>{{ customTitle }}</h2>
  <p>{{counter}}<sup>2</sup> = {{calculaCuadrado}}</p>
  <p data-testid="counter">{{counter}}</p>
  <div class="hola">
    <button v-on:click="incrementar">+</button>
    <button v-on:click="decrementar">-</button>
  </div>
</template>

<script>
export default {
  name: "Counter",
  props: {
    title : String,
    start : {
      type: Number,
      default : 100,
      validator(value) {
        return value > 100;
      }
    }
  },
  data(){
    return{
      counter: this.start
    }
  },
  methods:{
    incrementar(){
      this.counter = this.counter + 1
    },
    decrementar(){
      this.counter = this.counter - 1
    }
  },
  computed:{
    calculaCuadrado(){
      return this.counter * this.counter
    },
    customTitle(){
      return this.title || 'Counter'
    }
  }
}
</script>

<style>
button{
  background-color: #64bb87;
  border-radius: 5px;
  border: 1px solid white;
  margin: 0 5px;
}
button:hover{
  background-color: #7cdba0
}
</style>