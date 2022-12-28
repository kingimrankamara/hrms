<template >
  <div>
      <v-container>
          <AdminDashboard v-if="user"/>
      </v-container>
  </div>
</template>
<script>
  import AdminDashboard from '../components/AdminDashboard.vue';
export default {
  components:{AdminDashboard},

  computed: {
    user(){
          let u = this.$store.getters['account/getUser'];
          if(u){
            if(u.role !='Admin'){
            this.$router.push('/staff/'+u._id) 
          }
          }
          return u
        },
  },
}
</script>