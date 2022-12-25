<template>
    <v-data-table
      :headers="headers"
      :items="subjects"
      sort-by="level"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>Levels</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-dialog
            v-model="dialog"
            max-width="500px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >
                Add New Level
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
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.grade"
                        label="Level Name"
                        dense
                        outlined 
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.level"
                        label="Level"
                        dense
                        outlined 
                        type="number"
                      ></v-text-field>
                    </v-col>
                    
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.minSubjects"
                        label="Minimum Subjects"
                        dense
                        outlined 
                        type="number"
                      ></v-text-field>
                    </v-col>

                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-combobox
                        v-model="editedItem.subjects"
                        :items="subjectsOption"
                        label="Subjects"
                        dense
                        outlined  
                        multiple
                        ></v-combobox>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                     
                      <v-text-field
                        v-model="editedItem.passMark"
                        label="Min Grade"
                        dense
                        outlined 
                        type="number"
                      ></v-text-field>
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
              <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        
        <nuxt-link :to='"/subjects/"+item.id'>
          <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
          >
            mdi-eye
          </v-icon>
        </nuxt-link>
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn
          color="primary"
          @click="initialize"
        >
          Reset
        </v-btn>
      </template>
    </v-data-table>
  </template>
  <script>
    export default {
      data: () => ({
        dialog: false,
        dialogDelete: false,
        subjectsOption:[
          'Mathematics','Language Art','Science Core','SSS 1'
        ],
        headers: [
          
          {
            text: 'Level Nmae',
            align: 'start',
            sortable: false,
            value: 'grade',
          },
          {
            text: 'Subjects',
            align: 'start',
            sortable: false,
            value: 'subjects',
          },
          { text: 'Levels', value: 'level' },
          
          { text: 'Actions', value: 'actions', sortable: false },
        ],
        subjects: [],
        editedIndex: -1,
        editedItem: {
          grade: '',
          subjects:[],
          level: 0,
          passMark:'',
          minSubjects:1,
        },
        defaultItem: {
          grade: '',
          subjects:[],
          level: 0,
          passMark:'',
          minSubjects:1,
        },
      }),
  
      computed: {
        formTitle () {
          return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
      },
  
      watch: {
        dialog (val) {
          val || this.close()
        },
        dialogDelete (val) {
          val || this.closeDelete()
        },
      },
  
      created () {
        this.initialize()
      },
  
      methods: {
        initialize () {
          this.subjects = [
            
            {
              id:"1",
              code:'uls',
              grade: 'Junior Secondary',
              level: 237,
              passMark: "awesome"
            },
            {
              id:"2",
              code:'uls',
              grade: 'SSS SCIENCE',
              level: 262,
              passMark: "awesome descr"
             
            },
            {
              id:"3",
              code:'uls',
              grade: 'SSS ART',
              level: "awesome"
            },
          
          ]
        },
  
        editItem (item) {
          this.editedIndex = this.subjects.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.dialog = true
        },
  
        deleteItem (item) {
          this.editedIndex = this.subjects.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.dialogDelete = true
        },
  
        deleteItemConfirm () {
          this.subjects.splice(this.editedIndex, 1)
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
            this.editedIndex = -1
          })
        },
  
        save () {
          if (this.editedIndex > -1) {
            Object.assign(this.subjects[this.editedIndex], this.editedItem)
          } else {
            this.subjects.push(this.editedItem)
          }
          this.close()
        },
      },
    }
  </script>