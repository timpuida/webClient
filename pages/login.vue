<template>
 <div class="container">
    <div class="login">
      <form action="#" @submit.prevent="signIn">
        <div class="title">login</div>
        <input type="email" placeholder="Email" v-model="auth.email">
        <input type="password" placeholder="password" v-model="auth.password">
        <button class="btn">LOGIN</button>
      </form>
    </div>  
  </div>
</template>

<script>
  import { mapActions } from 'vuex'; 

export default {
  data(){
    return {
      auth:{
        email: null,
        password: null
      },
    }
  },
  methods: {
    ...mapActions([
      'getToken' 
      ]),
    signIn(){
      this.getToken(this.auth)
      .then(()=>this.$axios.defaults.baseURL = this.$store.state.url)
    }
  }
}
</script>

<style>

</style>
