<template>
  <div>
    <div class="editor-top">
      <div class="btn btn-back" @click="back">Back</div>
    </div>
    <div  class="container">
      <div class="edit-project">
        <form action="#" @submit.prevent="changeName">
          <p>Name</p>
          <div>
            <input type="text" v-model="name"> 
            <button class="btn">OK</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      name: this.$route.params.name
    }
  },
  methods: {
    back(){
      this.$router.back();
    },
    changeName(){
      let body={
        name: this.name
      }
      this.$axios
      .post('/projects-manage/update?id='+this.$route.params.id,
        body)
      .then(()=>this.$router.push('/'))
      .catch(console.log)
    }
  },
  mounted(){
    if(!this.$route.params?.name){
      this.$router.push('/')
    }
  }
}
</script>

<style>

</style>
