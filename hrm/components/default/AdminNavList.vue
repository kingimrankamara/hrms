<template>
  <div>
    <v-list>
      <v-list-item to="/">
      <v-list-item-icon>
        <v-icon>mdi-view-dashboard</v-icon>
      </v-list-item-icon>

      <v-list-item-title>Dashboard</v-list-item-title>
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

  
    <v-list-item to="/salary">
      <v-list-item-icon>
        <v-icon>mdi-daller</v-icon>
      </v-list-item-icon>
      <v-list-item-title>Salaries</v-list-item-title>
    </v-list-item>

    <v-list-item to="/lone/lones">
      <v-list-item-icon>
        <v-icon>mdi-daller</v-icon>
      </v-list-item-icon>
      <v-list-item-title>Lone Requests</v-list-item-title>
    </v-list-item>

    <v-list-item to="/events">
      <v-list-item-icon>
        <v-icon>mdi-calendar-clock-outline</v-icon>
      </v-list-item-icon>
      
      <v-list-item-title>Event & Calender</v-list-item-title>
    </v-list-item>
    <v-list-item to="/settings">
      <v-list-item-icon>
        <v-icon>mdi-cog-outline</v-icon>
      </v-list-item-icon>

      <v-list-item-title>Settings</v-list-item-title>
    </v-list-item>
  </v-list>
  </div>
</template>
<script>
export default {
  data: () => ({
    items: [
     
      {
        action: 'mdi-human-male-board',
        items: [
          { title: 'Staff List', to:'/staff/list' },
          { title: 'Add Staff', to:'/staff/add' },
          { title: 'Attendance', to:'/staff/attendances' },
        ],
        title: 'Staffs',
      },
     
      {
        action: 'mdi-shape-outline',
        items: [
          { title: 'Departments List', to:'/departments/list' },
        ],
        title: 'Departments',
      },
      {
        action: 'mdi-town-hall',
        items: [{ title: 'Requests', to:'/leave/requests' }],
        title: 'Leaves',
      },
    ],
  }),
}
</script>
<style>
.v-list-item__icon  .v-icon {
  color: #5299D3;
}  
</style>