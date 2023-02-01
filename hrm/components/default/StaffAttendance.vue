<template>
  <div>
    <div>
      <v-btn @click="showAttendees" color="info" class="mt-3">Show Attendees</v-btn>
      <v-dialog v-model="attendeesDialog" max-width="850px">
              <v-card>
      <v-data-table
      v-model="selected"
      :headers="Attendanceheaders"
      :items="attendees"
      item-key="_id"
      class="elevation-1"
      :search="search"
    >
      
      <template v-slot:top>
      <v-toolbar
        flat
       ><div>Attendees</div>
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
        <template v-slot:item.staffId="{item}">
          <div class="primary--text">
            {{ item.staffId.staffId }}
          </div>
        </template>
      <template v-slot:item.firstName="{item}">
          <div class="primary--text">
            <nuxt-link :to='"/staff/"+item.staffId._id'>
              <v-avatar
                size="36px"
              >
                <img
                  :src='baseurl+"/"+item.staffId.pp'
                >
                
              </v-avatar>
              <span class="ml-2" v-if="item">{{item.staffId.firstName +" "+ item.staffId.lastName}}</span>
              </nuxt-link>
          </div>
      </template>
      <template v-slot:item.time="{item}">
          <div class="primary--text">
            <v-chip>
              {{ item.clockIn | moment("h:mm:ss a") }}
            </v-chip>
          </div>
      </template>

      <template v-slot:item.actions="{item}" v-if="false">
         <div>
          <v-btn icon><v-icon color="error">mdi-delete</v-icon></v-btn>
         </div>
      </template>
      

    </v-data-table>
    </v-card>
    </v-dialog>
    <div class="mt-5 mb-5 pt-2"></div>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="notClockedIn"
      item-key="_id"
      class="elevation-1"
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
  </div>
</template>
<script>
  export default {
    data () {
      return {
        attendeesDialog:false,
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
        let staff= this.$store.getters['management/getStaff'];
        return staff
      },
      attendance(){
        return this.$store.getters['account/getAttendance']
      },
      attendees(){
        if(this.attendance){
           let today = new Date();
          let list= this.attendance.filter(staff=>{
            let date= new Date(staff.clockIn).toDateString()
            return date==today.toDateString()
          }) 
          return list;
        }
      },
      notClockedIn(){
        if(this.staffs && this.attendance){
          const isIncluded =this.staffs.filter(staff =>
            !this.attendees.some(attendance => attendance.staffId._id === staff._id)
          );
         
        
        return isIncluded;
        }
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
      Attendanceheaders () {
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
            text: 'Time',
            value: 'time',
           
          },
          { text: 'Attendance', value: 'actions' },
        ]
      },
    },
    methods: {
      showAttendees(){
        this.$store.dispatch("account/getAttendance")
        this.attendeesDialog =true
      },
      manageAttendance(user){
        this.$store.dispatch("account/clockIn",user);
      },
      gettime(date) {
        if(date){
          let time= date //.getTime()
        return time
        }
      }
    },
  }
</script>