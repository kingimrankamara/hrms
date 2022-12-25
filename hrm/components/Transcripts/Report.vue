<template>
    <v-data-table
      :headers="headers"
      :items="desserts"
      hide-default-footer
      class="elevation-1"
    ></v-data-table>
  </template>
  <script>
  export default {
    data () {
      return {
        headers: [
          {
            text: 'Subject',
            align: 'start',
            value: 'name',
            sortable:false
          },
          { text: 'First Term(%)', value: 'calories',sortable:false },
          { text: 'Second Term(%)', value: 'fat',sortable:false },
          { text: 'Final Exam (%)', value: 'carbs',sortable:false },
          { text: 'Average (%)', value: 'protein',sortable:false },
        ],
        desserts: [
          {
            name: 'Agriculture',
            calories: 100,
            fat: 69,
            carbs: 24,
            protein: 63.4,
          },
          {
            name: 'Mathematics',
            calories: 78,
            fat: 90,
            carbs: 79,
            protein: 83,
          },
          {
            name: 'Ecology',
            calories: 62,
            fat: 62,
            carbs: 63,
            protein: 62.1,
          },
          {
            name: 'Geography',
            calories: 99,
            fat: 97,
            carbs: 97,
            protein: 98.3,
          },        
        ],
      }
    },
  }
</script>