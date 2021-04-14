<template>
  <div class="project" 
  @click="edit">
    <div class="row name">
      <div class="pic"><img :src="project.logo_url" alt=""></div>
      <div class="title"> {{project.name}} </div>
    </div>
    <div class="status" :class="{active: project.is_active}">
    {{project.is_active===1?'Active':'Inactive'}}
  </div>
    <div class="time-data">
      <div class="row">
        <p>last 30 day spent</p>
        <p>{{timeOut(lastDaysTime)}}</p>
      </div>
      <div class="row">
        <p>time this month</p>
        <p>{{timeOut(thisMonthTime)}}</p>
      </div>
      <div class="row">
        <p>total</p>
        <p>{{timeOut(totalTime)}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Project",
    props: {
      project:{
        type: Object
      },
      index:{
        type: Number
      }
    },
    data(){
      return{
       totalTime: '',
       lastDaysTime:'',
       thisMonthTime: '', 
      }
    },
    methods: {
      edit(){
        let payload = {
          name:this.project.name,
          id: this.project.id
        }
        this.$router.push({ name: 'editor', params: payload })
      },
      getTime(){
        const options = {
          params: {
            id_project: this.project.id
          }
        }
        this.$axios.get("/stats-bugtracker/issues-bugs-times",options)
           .then(res=>{
            this.totalTime = res.data.task.all_time_spent_sec;
            this.lastDaysTime = res.data.task.last_30_days_spent_sec;
            this.thisMonthTime = res.data.task.this_month_spent_sec; 
          })
           .catch(console.log)
         },
         timeOut(val){
            let date = new Date(0);
            date.setSeconds(val); 
            return date.toISOString().substr(11, 8);
          } 
    },
    mounted(){
        this.getTime()
    }
  }
</script>
<style>

</style>
