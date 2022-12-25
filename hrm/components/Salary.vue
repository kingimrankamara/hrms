<template>
    <v-data-table
      :headers="headers"
      :items="staff"
      sort-by="name"
      class="elevation-1"
    >
      <template v-slot:item.firstName="{item}">
          <div class="primary--text">
            <nuxt-link :to='"/staff/"+item._id'>
              <v-avatar
                size="36px"
              >
                <img
                  alt="Avatar"
                  :src="baseUrl+'/'+item.pp"
                >
                
            </v-avatar>
            <span v-if="item">{{item.firstName +" "+ item.lastName}}</span>
            </nuxt-link>
          </div>
        </template>
       <template v-slot:item.gross="{item}">
        <div>
          {{gross(item) | currency}}
        </div>
      </template>
      <template v-slot:item.tax="{item}">
        <div>
          {{tax(item) | currency}}
        </div>
      </template>
       <template v-slot:item.nasit="{item}">
        <div>
          {{nasit(item) | currency}}
        </div>
      </template>
       <template v-slot:item.net="{item}">
        <div>
          {{net(item) |  currency}}
        </div>
      </template>

      <template v-slot:top>
        <v-toolbar
          flat
         >
          <v-toolbar-title>Salaries</v-toolbar-title>
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
                    >
                      <v-text-field
                        v-model="editedItem.salary"
                        label="Salary"
                        dense
                        outlined
                        type="number"
                      ></v-text-field>
                    </v-col>
        

                    <v-col
                      cols="12"
                      sm="6"
                    >
                      <v-text-field
                        v-model="editedItem.allowance"
                        label="Allowance"
                        dense
                        outlined
                        type="number"  
                        ></v-text-field>
                    </v-col>

                    <v-col
                      cols="12"
                     
                    >
                      <v-text-field
                        v-model="editedItem.bankName"
                        label="Bank Name"
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
                        v-model="editedItem.accountNumber"
                        label="Account Number"
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
                        v-model="editedItem.nassitId"
                        label="Nassit ID Number"
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
                        v-model="editedItem.taxId"
                        label="PAYEE/Tax ID"
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
            text: 'Staff ID',
            align: 'start',
            sortable: true,
            value: 'staffId',
          },
          {
            text: 'Name',
            align: 'start',
            sortable: false,
            value: 'firstName',
          },
          
          
          { text: 'Basic', value: 'salary',sortable: false },
          { text: 'Monthly Allowance', value: 'allowance',sortable: false},
          {text:"Gross",value:'gross'},
          { text: 'TAX %(15,20,30)',sortable: false, value: 'tax' },
          { text: 'Nasit %5', value: 'nasit' },
          {text:"Net", sortable: false,value:'net'},
        ],
        basic:600,
        editedIndex: -1,
        editedItem: {
          salary:0,
          allowance:0,
          taxId:null,
          nassitId:null,
          bankName:"",
          accountNumber:null
        },
        defaultItem: {
          salary:0,
          allowance:0,
          taxId:null,
          nassitId:null,
          bankName:"",
          accountNumber:null
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
        baseUrl(){
            return this.$store.getters['management/baseUrl']
        },
        formTitle () {
          return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
        staff(){
          return this.$store.getters['management/getStaff']
        },
       
      },
      methods: {
   
        editItem (item) {
          this.editedIndex = this.staff.indexOf(item);
          this.editedItem = Object.assign({}, item)
    
          this.dialog = true
        },
  
        deleteItem (item) {
          this.editedIndex = this.staff.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.dialogDelete = true
        },
  
      
        close () {
          this.dialog = false
          this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
          })
        },
  
       
      
        save () {
          if (this.editedIndex > -1) {
            this.editedItem.hods=[{_id: this.editedItem.hods.value}]
            this.$store.dispatch('management/updateStaff',this.editedItem)
          } 
          this.close()
          
        },

        nasit(staff){
          let gross = staff.salary + staff.allowance -this.basic
          let tr=5/100
          let nasitContribution =gross * tr
          return nasitContribution
        },
        tax(staff){
          let gross = staff.salary + staff.allowance -this.basic
          let tr=15/100
          let taxAmount =gross * tr
          return taxAmount
        },
        gross(staff){
          return staff.salary + staff.allowance
         
        },
        net(staff){
          let gross = staff.salary + staff.allowance -this.basic
          let tr=15/100
          let taxAmount =gross * tr

          //nasit
          let nr=5/100
          let nasitContribution =gross * nr;
          return gross +this.basic - taxAmount-nasitContribution
        }
      },
    }
  </script>