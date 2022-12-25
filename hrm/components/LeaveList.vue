<template>
    <v-card
      max-width="750"
      class="mx-auto"
      v-if="leavesRequests"
    >
      <v-list three-line>
        <v-subheader
          >Leave Requests</v-subheader>

        <div v-for="(item, index) in leavesRequests"  :key="index">
         
            
          <v-divider
          
          v-if="isOdd(index)"
            inset
          ></v-divider>
            

          <v-list-item
            :key="item._id"
          >
            <v-list-item-avatar>
              <v-img :src="baseUrl+'/'+item.requestedBy.pp"></v-img>
            </v-list-item-avatar>
  
            <v-list-item-content>
             
              <v-expansion-panels flat>
                <v-expansion-panel
               
                >
                <v-expansion-panel-header>
                   <div :class="{'error--text':item.status =='Denied', 'success--text':item.status =='Approved'}">
                    <span>{{item.requestedBy.firstName}}</span> 
                    <span v-if="item.requestedBy.middleName">{{item.requestedBy.middleName}}</span>
                    <span>{{item.requestedBy.lastName}}</span> / {{item.leaveType}}
                   </div>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                   <div> <v-chip>Status :{{item.status}}</v-chip></div>
                    {{item.description}}

                    <div class="mt-5 d-flex mb-4">
                      <div class="primary--text mr-5">
                        Starting Date: {{item.startDate | moment("dddd, MMMM Do YYYY")}}
                      </div>
                      <div class="primary--text ml-5">
                        Ending Date: {{item.endDate | moment("dddd, MMMM Do YYYY")}}
                      </div>

                    </div>
                    <div class="mt-5">
                        <v-btn color="error" @click="deny(item)" v-if="item.status !='Denied'">Deny </v-btn>
                        <v-btn color="primary" class="ml-5" @click="approve(item)" v-if="item.status !='Approved'">Approve</v-btn>
                      </div>
                </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
            </v-list-item-content>
          </v-list-item>
        </div>
      </v-list>
    </v-card>
  </template>
  <script>
  export default {
    data: () => ({
     
    }),
    computed:{
      baseUrl(){
            return this.$store.getters['management/baseUrl']
        },
       
      leavesRequests(){
        let l= this.$store.getters['management/getLeaves']
        let newleaves = l.slice()
        return newleaves.reverse();
      }
    },
    methods: {
      isOdd(num) { 
        return num % 2;
      },
      approve(data){
        let newData =Object.assign({}, data)
        newData.status="Approved"
        this.$store.dispatch('management/updateLeave',newData);
      },
      deny(data){
        let newData =Object.assign({}, data)
        newData.status="Denied"
        this.$store.dispatch('management/updateLeave',newData);
      }
    },
  }
</script>