<template>
  <div>
    <div class="home-top">
      <p style="font-weight: bold; font-size: 2em; cursor: pointer;">Q</p>
      <div>
        <a href="#" class="link">projects</a>
        <a href="#" class="link" @click.prevent="logout">logout</a>
      </div>
    </div>
    <div class="container">
      
        <div class="projects">
          <project
            v-for="(project, index) in projects"
            :key="project.id"
            :index="index"
            :project="project"
          />
          
        </div>
         
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { mapState } from "vuex";

import project from "./../components/Project.vue";
export default {
  components: {
    project,
  },
  data() {
    return {
      token: null,
      projects: "",
    };
  },
  computed: {
    ...mapState({
      url: (state)=>state.url
    })
  },
  methods: {
    ...mapMutations(["setToken"]),
    getProjects(){
      this.setToken();
      const token = this.$store.state.token;
       this.$axios
          .get("/projects-manage/index")
          .then(res=>{
            this.projects = res.data.projects
          })
          .catch(console.log);
    },
    logout(){
      this.$axios.
      post('/auth/logout')
      .then(()=>{
        localStorage.clear();
        this.$router.push({name:'login'})
      })
      .catch(console.log)
    }
  },
  mounted() {
    this.getProjects();
  },
};
</script>

<style>
</style>
