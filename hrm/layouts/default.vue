<template>
  <v-app >
   <Drawbar/>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
   
    <v-footer
     
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>
<script>
  import Drawbar from '../components/Drawbar.vue';
export default {
  components:{Drawbar}
}
</script>

