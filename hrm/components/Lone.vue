<template>
  <div v-if="lones">
    <v-data-table
      :headers="headers"
      :items="lones"
      sort-by="name"
      class="elevation-1"
      
    >
    <template v-slot:item.stffId="{item}">
      <div v-if="item.requestedBy">{{ item.requestedBy.staffId }}</div>
    </template>
    <template v-slot:item.status="{item}">
      <v-chip :class="{'error':item.status=='denied', 'success':item.status=='approved'}">
        {{ item.status }}
      </v-chip>
    </template>
      <template v-slot:item.name="{item}">
          <div class="primary--text" v-if="item.requestedBy">
            <nuxt-link :to='"/staff/"+item.requestedBy._id'>
              <v-avatar
                size="36px"
              >
                <img
                  alt="Avatar"
                  :src='baseUrl+"/"+item.requestedBy.pp'
                >
                
            </v-avatar>
            <span v-if="item.requestedBy" class="ml-2">{{item.requestedBy.firstName}}
               <span v-if="item.requestedBy.middleName">{{item.requestedBy.middleName}}</span> {{item.requestedBy.lastName}}
            </span>
            </nuxt-link>
          </div>
        </template>
      <template v-slot:top>
        <v-toolbar
          flat
         >
          <v-toolbar-title>Lone Requests</v-toolbar-title>
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
            <template v-slot:activator="{ on, attrs }" v-if="false">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >
                Add New Lone
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">Request Details</span>
              </v-card-title>
  
              <v-card-text>
                <v-container>
                 
                 <v-row v-if="editedItem.requestedBy">
                    <v-col cols="12" sm="5">
                      Name: {{ editedItem.requestedBy.firstName }} 
                      <span v-if="editedItem.requestedBy.middleName"> {{ editedItem.requestedBy.firstName }}</span>
                      <span>{{editedItem.requestedBy.lastName}}</span>
                    </v-col>
                    <v-col cols="6" sm="4">
                      Staff ID: {{ editedItem.requestedBy.staffId }}
                    </v-col>
                    <v-col cols="6" sm="3">
                      <v-chip :class="{'error':editedItem.status=='cancled', 'success':editedItem.status=='approved'}">
                        {{ editedItem.status }}
                      </v-chip>
                    </v-col>
                    <v-col cols="6">
                      <h3 class="text--primary">
                        {{ editedItem.amount | currency }}
                      </h3>
                    </v-col>
                    <v-col cols="6">
                      <v-chip>
                        {{ editedItem.dateApplied | moment("dddd, MMMM Do YYYY") }}
                      </v-chip>
                    </v-col>
                    <v-col cols="12">
                      <p>
                        {{ editedItem.message }}
                      </p>
                    </v-col>
                    <v-col cols="12">
                        <v-combobox
                                v-model="editedItem.status"
                                :items="status"
                                label="Process Request"
                                dense
                                outlined  
                                @change="processLone"
                            ></v-combobox>
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
                  Close
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
          v-if="user.role =='Admin'"
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
  </div>
  </template>
  <script>
    export default {
      data: () => ({
        dialog: false,
        dialogDelete: false,
        status:['pending','approved','cancled','denied'],
        headers: [
          {
            text: 'Staff ID',
            align: 'start',
            sortable: true,
            value: 'stffId',
          },
          {
            text: 'Name',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          
          
          { text: 'Amount', value: 'amount' },
          { text: 'Status', value: 'status' },
          { text: 'Actions', value: 'actions' },
        ],
        editedIndex: -1,
        editedItem: {
          staff: {},
          status:null,
          amount:null,
          message:'',
          dateApplied:null
        },
        defaultItem: {
          staff: {},
          status:null,
          amount:null,
          message:'',
          dateApplied:null
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
  
     mounted() {
      this.$store.dispatch('management/getLones')
     },
      computed: {
        formTitle () {
          return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
        baseUrl(){
            return this.$store.getters['management/baseUrl']
        },
        user(){
            return this.$store.getters['account/getUser']
        },
        lones(){
          let allLones= this.$store.getters['management/getLones']
          if(allLones && this.user){
            if(this.user.role !='Admin'){
              let userLone =allLones.filter(lone=>{
                if(lone.requestedBy){
                  return lone.requestedBy._id == this.user._id
                }
                
              })
              return userLone
            }else return allLones
          }
        },
        
        
      },
      methods: {
   
        editItem (item) {
          this.editedIndex = this.lones.indexOf(item);
          this.editedItem = Object.assign({}, item)
          this.dialog=true;
        },
  
        deleteItem (item) {
          this.editedIndex = this.lones.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.dialogDelete = true
        },
  
        deleteItemConfirm () {
          this.$store.dispatch('management/deleteDepartment',this.editedItem)
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
        
        processLone(){
          this.$store.dispatch('management/processLone',this.editedItem);
          this.dialog=false
        }
      },
    }
  </script>