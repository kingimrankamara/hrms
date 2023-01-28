<template>
  <div>
  
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="staffs"
      item-key="_id"
      class="elevation-1"
      show-select
      :search="search"
    >
      
      <template v-slot:top>
      <v-toolbar
        flat
       >
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <div class="pt-4">
          <v-text-field
          v-model="search"
          label="Search...."
          class="mx-4"
          outlined
          dense
          append-icon="mdi-magnify"
        ></v-text-field>
        </div>
            
          </v-toolbar>
        </template>

      <template v-slot:item.firstName="{item}">
          <div class="primary--text">
            <nuxt-link :to='"/staff/"+item._id'>
              <v-avatar
                size="36px"
              >
                <img
                  :src='baseurl+"/"+item.pp'
                >
                
              </v-avatar>
              <span class="ml-2" v-if="item">{{item.firstName +" "+ item.lastName}}</span>
              </nuxt-link>
          </div>
      </template>
     

      <template v-slot:item.actions="{item}">
         <div>
          <v-switch color="success" @change="manageAttendance(item)">

          </v-switch>
         </div>
      </template>
      

    </v-data-table>
    
   

    
  </div>
</template>
<script>
  export default {
    data () {
      return {
        progressDialog:false,
        progress:0,
        baseurl:'http://localhost:5000',
        payroal:false,
        staffInfo:false,
        selected: [],
        search: '',
       
        
        
            
      }
    },
    computed: {
      staffs(){
        return this.$store.getters['management/getStaff'];
      },
      headers () {
        return [
        {
            text: 'StaffID',
            align: 'start',
            sortable: true,
            value: 'staffId',
          },
          {
            text: 'Name',
            align: 'start',
            sortable: false,
            value: 'firstName',
          },
          {
            text: 'Phone',
            value: 'phone',
           
          },
          { text: 'Attendance', value: 'actions' },
        ]
      },
    },
    methods: {
      manageAttendance(user){
        this.$store.dispatch("account/clockIn",user);
      }
     
    },
  }
</script>