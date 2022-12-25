<template>
    <div>
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="students"
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
                  @click="printStudentInfo"
                >
                  <v-list-item-title>Print Info</v-list-item-title>
                </v-list-item>

                <v-list-item
                  @click="generateReport"
                >
                  <v-list-item-title>Assign to department</v-list-item-title>
                </v-list-item>

                <v-list-item
                  @click="paySlip"
                >
                  <v-list-item-title>Print Pay slip</v-list-item-title>
                </v-list-item>

                <v-list-item
                  @click="generateReport"
                >
                  <v-list-item-title><span class="error--text">Delete</span></v-list-item-title>
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
                to="/students/admitstudent"
                v-on="on"
              >
                Add New Student
              </v-btn>
            </v-toolbar>
          </template>

        <template v-slot:item.firstName="{item}">
            <div class="primary--text">
              <nuxt-link :to='"/students/"+item._id'>
                <v-avatar
                  size="36px"
                >
                  <img
                    alt="Avatar"
                    src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                  >
                  
                </v-avatar>
                <span v-if="item">{{item.firstName +" "+ item.lastName}}</span>
                </nuxt-link>
            </div>
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
           <v-btn icon color="success" :to='"/students/edit/"+item._id'>
            <v-icon>mdi-pencil</v-icon>
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
      :html2canvas="html2canvas"

      @progress="onProgress($event)"
      @hasStartedGeneration="hasStartedGeneration()"
      @hasDownloaded="hasGenerated($event)"
      ref="html2Pdf"
      >
        <section slot="pdf-content">

          <div v-for="item in selected" :key="item._id">
          <section class="pdf-item" v-if='studentInfo'>
            <StudentInfo :selected='item' />
          </section>
          <div class="html2pdf__page-break"/>
        </div>
        </section>
    </vue-html2pdf>
    </div>
  </template>
  <script>
  import StudentInfo from '../Documents/StudentInfo.vue';
    export default {
      components:{StudentInfo},
      data () {
        return {
          selected: [],
          search: '',
          fileNmae:'pdf',
          html2canvas: {
            scale: 1,
            useCORS: true
          },
          links: [
            { title: 'Bills and Fees', to:'studentbill'},
            { title: 'Grades and Performance', to:'grade'},
            { title: 'attendance', to:'studentattendance'},
            { title: 'Click Me 2', to:''},
          ],
          studentInfo:false,
         
        }
      },
      computed: {
        students(){
          return this.$store.getters['management/getStudents'];
        },
        headers () {
          return [
          {
              text: 'StudentID',
              align: 'start',
              sortable: true,
              value: 'studentId',
            },
            {
              text: 'First Name',
              align: 'start',
              sortable: false,
              value: 'firstName',
            },
            {
              text: 'Class',
              value: 'class',
              filter: value => {
                if (!this.class) return true
  
                return value < parseInt(this.class)
              },
            },
            { text: 'DOB', value: 'dob' },
            { text: 'Grade/Form', value: 'grade' },
            { text: 'Actions', value: 'actions' },
          ]
        },
      },
      methods: {
        printStudentInfo () {
           this.payroal=false,
           this.studentInfo=true,
           this.fileNmae="Staff info"
           this.$refs.html2Pdf.generatePdf()
        },
        generateReport () {
           this.payroal=true,
           this.studentInfo=false,
            this.fileNmae="Payroal"
            this.$refs.html2Pdf.generatePdf()
        },
        paySlip () {
           this.payroal=false,
           this.studentInfo=true,
           this.fileNmae="Staff info"
           this.$refs.html2Pdf.generatePdf()
        },
        hasGenerated(){
        
        },
        onProgress(e){
          console.log(e)
        },
        hasStartedGeneration(e){
          console.log(e)
        }
      },
    }
  </script>