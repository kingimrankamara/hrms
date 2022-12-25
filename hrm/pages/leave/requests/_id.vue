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
        id(){
            return this.$route.params.id
        },
      baseUrl(){
            return this.$store.getters['management/baseUrl']
        },
       
      leavesRequests(){
        return this.$store.getters['management/getLeavesById'](this.id);
      }
    },
    methods: {
      isOdd(num) { 
        return num % 2;
      },
    },
  }
</script>