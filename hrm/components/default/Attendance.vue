<template>
  <v-row>

    <v-col
      cols="12"
      sm="6"
    >
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="dates"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-combobox
            v-model="attendance"
            multiple
            chips
            small-chips
            label="Days attended"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
          ></v-combobox>
        </template>
        <v-date-picker
          v-model="dates"
          multiple
          no-title
          scrollable
          disabled
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="menu = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.menu.save(dates)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
    </v-col>
  </v-row>
</template>
<script>
  import format from 'date-fns/format'
  export default {
    data: () => ({
      text:"2",
      dates: [],
      
      menu: false,
      date:'30-11-2022',
    }),
   
    computed: {
      datess(){
        let d= this.$store.getters['management/dates'];
        if(d){
          let text = d.length +" days attended"
        this.text=text;
        }
        return d
      },
      user(){
            return this.$store.getters['account/getUser']
        },
      attendance(){
        let a= this.$store.getters['account/getAttendance']
        if(a){
          let myA= a.filter(at=>{
            if(at.staffId._id == this.user._id){ 
              //let day= new Date(at.clockIn)

              this.dates.push(at.clockIn)
            }
            return at.staffId._id == this.user._id
          })
          console.log(myA)
          return this.dates
        }
      },
    },
   
    methods: {
      dateFormat () {
          return this.date ? format(date, 'dd MM yyyy') : ''
        },
      
    },
  }
</script>