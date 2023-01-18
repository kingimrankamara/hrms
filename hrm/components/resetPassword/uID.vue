<template>
    <div class="text-center" v-if="loading">
      <v-dialog
        v-model="loading.loading"
        persistent
        max-width="600px"
      >
      
        <v-card
          color="primary"
          dark
        >
          <v-card-text>
            {{loading.nessage}}
            <v-progress-linear
              indeterminate
              color="white"
              class="mb-0"
            ></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
  </template>
  <script>
    export default {
       
        computed:{
          loading(){
            return this.$store.getters['settings/loading']
          },
          
        }
    }
  </script>