
<template>
  <v-container v-if="user">
    <v-row>
      <v-col sm="6" md="3">
          <DataCardVue :data='data1'/>
      </v-col>
      <v-col sm="6" md="3">
          <DataCardVue :data='data2'/>
      </v-col>
      <v-col sm="6" md="3">
          <DataCardVue :data='data3'/>
      </v-col>
      <v-col sm="6" md="3">
          <DataCardVue :data='data4'/>
      </v-col>
    </v-row>

    
    <v-row class="pt-5">
      <v-col md="6" cols="12">
       <v-card>
        <div class="pa-1">
            <apexcharts width="100%" type="bar" :options="options" :series="series" class="primary--text"></apexcharts>
        </div>
       </v-card>
      </v-col>
      <v-col md="6" cols="12">
        <v-card>
          <div  class="pa-1" dark>
            <apexcharts width="100%" type="bar" :options="options2" :series="options2.series" class="info-text"></apexcharts>
        </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-if="departments">
      <v-col cols="6" sm="6" md="4" v-for="dep in departments" :key="dep._id">
        <v-card>
          <v-toolbar class=" primary" align-center dark>{{dep.name}}</v-toolbar>
          <div class="mt-3 pa-3">
            <div class="primary--text">
              <nuxt-link :to='"/staff/"+dep.hods[0]._id'>
                <v-avatar
                  size="36px"
                >
                  <img
                    :src='baseUrl+"/"+dep.hods[0].pp'
                  >
                  
                </v-avatar>
                <span class="ml-2" v-if="dep.hods[0]">{{dep.hods[0].firstName +" "+ dep.hods[0].lastName}}</span>
                </nuxt-link>
            </div>
            <div>Number of Staff: {{dep.staff.length}}</div>
          </div>
        </v-card>
      </v-col>
    </v-row>
    
    
  </v-container>
</template>
<script>
import DataCardVue from './default/DataCard.vue';
export default {
  components:{DataCardVue},
  data() {
      return {
        admin:false,
        data1:{
          title:'450',
          subtitle:"Employees",
          icon:'mdi-account-school-outline ',
          color:'success'
        },
        data2:{
          title:'4',
          subtitle:"Temporal",
          icon:'mdi-file-certificate-outline ',
          color:'info'
        },
        data3:{
          title:'50',
          subtitle:"Interms",
          icon:'mdi-human-male-board ',
          color:'secondary'
        },
        data4:{
          title:'Le 450,050',
          subtitle:"Revernue",
          icon:'mdi-cash-multiple ',
          color:'primary'
        },


          options: {
      chart: {
        id: 'vuechart-example'
      },
      xaxis: {
        categories: ["HR", "IT", "MARKETING", "FINANCE", "LOGISTIC", "LGAL", "TECH", "1998"]
      },
      yaxis: {
          title: {
            text: 'Departments By Monthly Salarys'
          }
        },
    },
    series: [{
      name: 'series-1',
      data: [30, 40, 45, 50, 49, 60, 70, 91]
    }],


    //second chat
    options2:{
          series: [
            {
          name: 'Female',
          data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
        }, {
          name: 'Male',
          data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
        },
        ],
          chart: {
          type: 'bar',
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
          },
          
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          categories: ["HR", "IT", "MARKETING", "FINANCE", "LOGISTIC", "LGAL", "TECH"],
        },
        yaxis: {
          title: {
            text: 'Departments By Employees Gender'
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return   val + " thousands"
            }
          }
        }
        },
      
      
    
      }
  },
  computed: {
    baseUrl(){
            return this.$store.getters['management/baseUrl']
    },
    departments(){
      return this.$store.getters['management/getDepartments']
    },
    staff(){
      let staff =this.$store.getters['management/getStaff']
      let data=[]
        if(staff.length>0){
        staff.forEach(st=>{
          data.push({ value: st._id, text:st.staffId + '/'+ st.firstName +" " +st.lastName},)
        })
        }
      
        return data
    },
    user(){
          let u = this.$store.getters['account/getUser'];
          if(u){
            if(u.role =='Admin'){
           return u
          }
          }
          return null
        },
  },
}
</script>