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
      projects: "",
    };
  },
  methods: {
    ...mapMutations(["setToken"]),
    getProjects(){
      this.setToken();
       this.$axios
          .get("/projects-manage/index")
          .then(res=>{
            this.projects = res.data.projects
          })
          .catch(err=>{
            if (err.response.status==401){
              this.routeToLogin()
            }
          });
    },
    logout(){
      this.$axios.
      post('/auth/logout')
      .then(()=>{
       this.routeToLogin()
      })
      .catch(console.log)
    },
    routeToLogin(){
       localStorage.clear();
        this.$router.push({name:'login'})
    }
  },
  mounted() {
    this.getProjects();
  },
};
</script>

<style>
</style>