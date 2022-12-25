<template>
    <v-data-table
      :headers="headers"
      :items="programs"
      sort-by="startedDate"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>Programs</v-toolbar-title>
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
                Add New Program
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
                        v-model="editedItem.name"
                        label="Subject name"
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
                        v-model="editedItem.startedDate"
                        label="Started Date"
                        dense
                        outlined 
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-combobox
                        v-model="editedItem.levels"
                        :items="gradesOption"
                        label="Levels"
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
                        dense
                        outlined 
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
        
        <nuxt-link :to='"/programs/"+item.id'>
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
        gradesOption:[
          'JSS 1','JSS 2','JSS 3','SSS 1'
        ],
        headers: [
          
          {
            text: 'Program Nmae',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          {
            text: 'Grade/Form',
            align: 'start',
            sortable: false,
            value: 'levels',
          },
          { text: 'Date Started', value: 'startedDate' },
          
          { text: 'Actions', value: 'actions', sortable: false },
        ],
        programs: [],
        editedIndex: -1,
        editedItem: {
          name: '',
          levels:[],
          startedDate: null,
          description:''
        },
        defaultItem: {
          name: '',
          levels:[],
          startedDate: null,
          description:''
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
          this.programs = [
            
            {
              id:"1",
              code:'uls',
              name: 'Junior Secondary',
              startedDate: 237,
              description: "awesome"
            },
            {
              id:"2",
              code:'uls',
              name: 'SSS SCIENCE',
              startedDate: 262,
              description: "awesome descr"
             
            },
            {
              id:"3",
              code:'uls',
              name: 'SSS ART',
              startedDate: "awesome"
            },
          
          ]
        },
  
        editItem (item) {
          this.editedIndex = this.programs.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.dialog = true
        },
  
        deleteItem (item) {
          this.editedIndex = this.programs.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.dialogDelete = true
        },
  
        deleteItemConfirm () {
          this.programs.splice(this.editedIndex, 1)
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
            Object.assign(this.programs[this.editedIndex], this.editedItem)
          } else {
            this.programs.push(this.editedItem)
          }
          this.close()
        },
      },
    }
  </script>