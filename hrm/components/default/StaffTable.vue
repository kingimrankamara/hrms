<template>
  <div>
  
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="staffs"
      item-key="_id"
      class="elevation-1"
      show-select
      :search="search"
    >
      
      <template v-slot:top>
      <v-toolbar
        flat
       >
        <v-toolbar-title>
        <div v-if="selected.length >0">
      <v-menu offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="info"
        dark
        v-bind="attrs"
        v-on="on"
      >
        Actions
      </v-btn>
    </template>
    <v-list>
      <v-list-item
        @click="printStaffInfo"
      >
        <v-list-item-title>Print Info</v-list-item-title>
      </v-list-item>

      <v-list-item
        @click="paySlip"
      >
        <v-list-item-title>Print Payslip</v-list-item-title>
      </v-list-item>

     
    </v-list>
  </v-menu>
        </div>
        </v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <div class="pt-4">
          <v-text-field
          v-model="search"
          label="Search...."
          class="mx-4"
          outlined
          dense
          append-icon="mdi-magnify"
        ></v-text-field>
        </div>
            <v-btn
              color="primary"
              dark
              class="mb-2"
              to="/staff/add"
            >
              Add New Staff
            </v-btn>

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

      <template v-slot:item.firstName="{item}">
          <div class="primary--text">
            <nuxt-link :to='"/staff/"+item._id'>
              <v-avatar
                size="36px"
              >
                <img
                  :src='baseurl+"/"+item.pp'
                >
                
              </v-avatar>
              <span class="ml-2" v-if="item">{{item.firstName +" "+ item.lastName}}</span>
              </nuxt-link>
          </div>
      </template>
      <template v-slot:item.dateStarted="{item}">
        <v-chip
          class="ma-2"
          color="info"
          outlined
        >
        {{item.dateStarted | moment("dddd, MMMM Do YYYY")}}
        </v-chip>
      </template>

      <template v-slot:item.actions="{item}">
         <div>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="info"
                dark
                v-bind="attrs"
                v-on="on"
                icon
              >
              <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(link, index) in links"
                :key="index"
                :to='"/"+link.to+"/"+ item._id'
              >
                <v-list-item-title>{{ link.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
         <v-btn icon color="success" :to='"/staff/edit/"+item._id'>
          <v-icon>mdi-pencil</v-icon>
         </v-btn>

         <v-btn icon color="error" @click="deleteItem(item)">
          <v-icon>mdi-delete</v-icon>
         </v-btn>
         </div>
      </template>
      

    </v-data-table>
    
    <vue-html2pdf
    :show-layout="false"
    :float-layout="true"
    :enable-download="false"
    :preview-modal="true"
    :paginate-elements-by-height="1100"
    :pdf-quality="2"
    :filename="fileNmae"
    :manual-pagination="false"
    pdf-format="a4"
    pdf-orientation="portrait"
    pdf-content-width="100%"

    @progress="onProgress($event)"
    @hasStartedGeneration="hasStartedGeneration()"
    @hasDownloaded="hasGenerated($event)"
    ref="html2Pdf"
>
  <section slot="pdf-content">
    <div v-for="item in selected" :key="item._id">
      <section class="pdf-item" v-if='payroal'>
        <PayroalVue :selected='item' v-if='payroal'/>
      </section>
      <div class="html2pdf__page-break"/>
    </div>

    <div v-for="item in selected" :key="item._id">
    <section class="pdf-item" v-if='staffInfo'>
      <StaffInfo :selected='item' />
    </section>
    <div class="html2pdf__page-break"/>
  </div>
  </section>
    </vue-html2pdf>


    <v-overlay
      absolute="absolute"
    :value="progressDialog"
    >
      <v-progress-circular
      :rotate="360"
      :size="100"
      :width="15"
      :value="progress"
      color="teal"
    >
      {{ progress }}
    </v-progress-circular>
    </v-overlay>
  </div>
</template>
<script>
import PayroalVue from '../Documents/Payslip.vue';
import StaffInfo from '../Documents/StaffInfo.vue';
  export default {
    components:{PayroalVue,StaffInfo},
    data () {
      return {
        dialogDelete: false,
        progressDialog:false,
        progress:0,
        baseurl:'http://localhost:5000',
        payroal:false,
        staffInfo:false,
        selected: [],
        search: '',
        fileNmae:'pdf',
        html2canvas: {
          dpi: 300,
          letterRendering: true,
          scale: 2,
          useCORS: true
        },
        links: [
            { title: 'Performance', to:'performance'},
            { title: 'Attendance', to:'attendance'},
          ],
        editedIndex: -1,
        editedItem: {
          
        },
        defaultItem: {
          
        },
      
      }
    },
    computed: {
      staffs(){
        return this.$store.getters['management/getStaff'];
      },
      headers () {
        return [
        {
            text: 'StaffID',
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
          {
            text: 'Phone',
            value: 'phone',
           
          },
          { text: 'Date Started', value: 'dateStarted' },
          { text: 'Actions', value: 'actions' },
        ]
      },
    },
    methods: {
      deleteItem (item) {
          this.editedIndex = this.staffs.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.dialogDelete = true
        },
      deleteItemConfirm () {
          this.$store.dispatch('management/deleteStaff',this.editedItem)
          //this.departments.splice(this.editedIndex, 1)
          this.closeDelete()
        },
      closeDelete () {
          this.dialogDelete = false
          this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex =-1
          })
        },
      generateReport () {
         this.payroal=true,
         this.staffInfo=false,
          this.fileNmae="Payroal"
          this.$refs.html2Pdf.generatePdf()
      },
      printStaffInfo () {
        console.log(this.selected)
         this.payroal=false,
         this.staffInfo=true,
         this.fileNmae="Staff info"
         this.$refs.html2Pdf.generatePdf()
      },
      paySlip () {
         this.payroal=true,
         this.staffInfo=false,
         this.fileNmae="Staff info"
         this.$refs.html2Pdf.generatePdf()
      },
      hasGenerated(){
      
      },
      onProgress(e){
        this.progressDialog=true;
        this.progress=e
        if(e == 100){
          this.progressDialog=false;
        this.progress=0
        }
      },
      hasStartedGeneration(e){
        console.log(e)
      }
    },
    watch: {
      dialogDelete (val) {
          val || this.closeDelete()
        },
    },
  }
</script>