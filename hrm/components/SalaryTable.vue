<template>
    <v-data-table
      :headers="headers"
      :items="salary"
      sort-by="name"
      class="elevation-1"
    >
   
      <template v-slot:top>
        <v-toolbar
          flat
         >
          <v-toolbar-title>Salarys</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          
        </v-toolbar>
      </template>
      
     
    </v-data-table>
  </template>
  <script>
    export default {
      data: () => ({
        dialog: false,
        dialogDelete: false,
        headers: [
          {
            text: 'ID',
            align: 'start',
            sortable: true,
            value: '_id',
          },
          {
            text: 'Name',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          
          
          { text: 'HOD', value: 'hods' },
          { text: 'Actions', value: 'actions' },
        ],
        editedIndex: -1,
        editedItem: {
          name: '',
          hods: [],
          salary: [],
          description:'',
          subjects:[]
        },
        defaultItem: {
          name: '',
          hods: [],
          salary: [],
          description:'',
          subjects:[]
        },
      }),
  
      watch: {
        dialog (val) {
          val || this.close()
        },
        dialogDelete (val) {
          val || this.closeDelete()
        },
      },
  
     
      computed: {
        formTitle () {
          return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
        salary(){
          return this.$store.getters['accounting/getSalarys']
        },
        salary(){
          let salary =this.$store.getters['accounting/getSalary']
          let data=[]
           salary.forEach(teacher=>{
             data.push({ value: teacher._id, text:teacher.staffId + '/'+ teacher.firstName +" " +teacher.lastName},)
           })
          
           return data
        },
        
      },
      methods: {
   
        prepData(){
          let subject=[];
          let teacher=[];
          if(this.editedItem.subjects.length>0){
            this.editedItem.subjects.forEach(sub=>{
              subject.push({_id:sub.value})
            })
            this.editedItem.subjects=subject
           }
           if(this.editedItem.salary.length>0){
            this.editedItem.salary.forEach(te=>{
              teacher.push({_id:te.value})
            })
            this.editedItem.salary=teacher
           }
        },
     
      },
    }
  </script>