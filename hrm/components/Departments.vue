<template>
    <v-data-table
      :headers="headers"
      :items="departments"
      sort-by="name"
      class="elevation-1"
    >
      <template v-slot:item.hods="{item}">
          <div class="primary--text" v-if="item.hods.length>0">
            <nuxt-link :to='"/staff/"+item.hods[0]._id'>
              <v-avatar
                size="36px"
              >
                <img
                  alt="Avatar"
                  :src='baseUrl+"/"+item.hods[0].pp'
                >
                
            </v-avatar>
            <span v-if="item" class="ml-2">{{item.hods[0].firstName}}
               <span v-if="item.hods[0].middleName">{{item.hods[0].middleName}}</span> {{item.hods[0].lastName}}
            </span>
            </nuxt-link>
          </div>
        </template>
      <template v-slot:top>
        <v-toolbar
          flat
         >
          <v-toolbar-title>Departments</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-dialog
            v-model="dialog"
            max-width="600px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >
                Add New Department
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>
  
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-text-field
                        v-model="editedItem.name"
                        label="Department name"
                        dense
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-combobox
                        v-model="editedItem.hods"
                        :items="staff"
                        label="Hod"
                        dense
                        outlined  
                        ></v-combobox>
                    </v-col>

                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-combobox
                        v-model="editedItem.staff"
                        :items="staff"
                        label="Staff"
                        dense
                        outlined  
                        multiple
                        ></v-combobox>
                    </v-col>
                    <v-col
                      cols="12"
                    >
                      <v-textarea
                        v-model="editedItem.description"
                        label="Description"
                        outlined
                        dense
                      ></v-textarea>
                    </v-col>
                  </v-row>
                 
                </v-container>
              </v-card-text>
  
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="secondary darken-1"
                  text
                  @click="close"
                >
                  Cancel
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="save"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5 warning--text">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="red darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }" >
        
        
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
          color="info"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="deleteItem(item)"
          color="error"
        >
          mdi-delete
        </v-icon>
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
          staff: [],
          description:'',
        },
        defaultItem: {
          name: '',
          hods: [],
          staff: [],
          description:'',
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
            return this.$store.getters['account/getUser']
        },
        
      },
      methods: {
   
        editItem (item) {
          this.editedIndex = this.departments.indexOf(item);
          this.editedItem = Object.assign({}, item)
          let ho=[]
          let te=[]
          if(this.editedItem.hods.length >0){
              let hod=this.editedItem.hods
              //h.push(hod._id)
              ho.push(hod[0]._id)
          }
          this.editedItem.hods=ho;

          if(this.editedItem.staff.length >0){
            this.editedItem.staff.forEach(teacher=>{
              te.push({text:teacher.staffId +'/'+ teacher.firstName,  value:teacher._id})
            })
          }
          this.editedItem.staff=te;
          this.dialog = true
        },
  
        deleteItem (item) {
          this.editedIndex = this.departments.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.dialogDelete = true
        },
  
        deleteItemConfirm () {
          this.$store.dispatch('management/deleteDepartment',this.editedItem)
          //this.departments.splice(this.editedIndex, 1)
          this.closeDelete()
        },
  
        close () {
          this.dialog = false
          this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
          })
        },
  
        closeDelete () {
          this.dialogDelete = false
          this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex =-1
          })
        },
        prepData(){
          let teacher=[];
          
           if(this.editedItem.staff.length>0){
            this.editedItem.staff.forEach(te=>{
              teacher.push({_id:te.value})
            })
            this.editedItem.staff=teacher
           }
        },
        save () {
          this.prepData();
          if (this.editedIndex > -1) {
            this.editedItem.hods={_id:this.editedItem.hods[0]}
            this.editedItem.hods={_id:this.editedItem.hods._id[0]}
            this.$store.dispatch('management/updateDepartment',this.editedItem)
          } else {
            this.editedItem.hods={_id: this.editedItem.hods.value}
           this.$store.dispatch('management/addDepartment',this.editedItem)
          }
          this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex =-1
          })
          this.close()
          
        },
      },
    }
  </script>