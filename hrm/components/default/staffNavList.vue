<template>
    <div>
      <v-list v-if="user">

        <v-list-item :to="'/staff/'+user._id">
          <v-list-item-icon>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-icon>
          <v-list-item-title>My Informations</v-list-item-title>
        </v-list-item>

        <v-list-item to="/profile">
          <v-list-item-icon>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-icon>
          <v-list-item-title>My Profile</v-list-item-title>
        </v-list-item>

        <v-list-item :to="'/performance/'+user._id">
          <v-list-item-icon>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-icon>
          <v-list-item-title>My Performance</v-list-item-title>
        </v-list-item>

        <v-list-item :to="'/attendance/'+user._id">
          <v-list-item-icon>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Attendance</v-list-item-title>
        </v-list-item>

        <v-list-item to="/leave/request">
          <v-list-item-icon>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Request Leave</v-list-item-title>
        </v-list-item>
        <v-list-item :to="'/leave/requests/'+user._id">
          <v-list-item-icon>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-icon>
          <v-list-item-title>My Leave Requests</v-list-item-title>
        </v-list-item>
 

        <v-list-group
            v-for="item in items"
            :key="item.title"
            v-model="item.active"
            :prepend-icon="item.action"
            no-action
            class:prependIcon="primary"
          >
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title v-text="item.title"></v-list-item-title>
                </v-list-item-content>
              </template>

              <v-list-item
                v-for="child in item.items"
                :key="child.title"
                :to="child.to"
              >
                <v-list-item-content>
                  <v-list-item-title v-text="child.title"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>
     
    </v-list>
    </div>
</template>
<script>
  export default {
    data: () => ({
      staffItem:[
        {
          title: 'Attendance', to:'/staff/attendance',icon:'mdi-request'
        },
        {
          title: 'Leave Requests', to:'/staff/leave',icon:'mdi-time'
        },
        {
          title: 'Profile', to:'/staff/profile',icon:'mdi-person'
        }
      ],

      items:[
      {
        action: 'mdi-money',
        items: [
          { title: 'Request Lone', to:'/lone/request' },
          { title: 'Lones', to:'/lone/lones' },
        ],
        title: 'Lone',
      },
      ]
      
     
    }),
    computed: {
        user(){
            return this.$store.getters['account/getUser']
        },
       
	    },
  }
</script>
<style>
  .v-list-item__icon  .v-icon {
    color: #5299D3;
}  
</style>