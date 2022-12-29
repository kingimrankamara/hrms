<template>
  <v-row>
    <v-col
      cols="12"
      sm="6"
    >
      <v-date-picker
        v-model="dates"
        multiple
        readonly
        :selected-items-text="text"
      ></v-date-picker>
    </v-col>


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
            v-model="dates"
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
      datess: ['2022-11-30', '2022-11-29'],
      attendance:[
        {day:'2022-11-30',act:{in:'time',out:'time'}}
        
      ],
      menu: false,
      date:'30-11-2022',
    }),
   
    computed: {
      dates(){
        let d= this.$store.getters['management/dates'];
        if(d){
          let text = d.length +" days attended"
        this.text=text;
        }
        return d
      }
    },
   
    methods: {
      dateFormat () {
          return this.date ? format(date, 'dd MM yyyy') : ''
        },
      
    },
  }
</script>