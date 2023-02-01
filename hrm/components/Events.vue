<template>
    <v-data-table
      :headers="headers"
      :items="events"
      sort-by="startDate"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>Events</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-dialog
            v-model="dialog"
            max-width="700px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >
                New Item
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
                        label="Event name"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      
                      <DatePicker dateTitle="Starting Date"  @update:option="setStartDate"/>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <DatePicker dateTitle="Ending Date"  @update:option="setEndDate"/>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.location"
                        label="Location"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      
                    >
                    <v-row justify="space-around">
                        <v-time-picker
                        v-model="editedItem.startTime"
                        class="mt-4"
                        format="24hr"
                        scrollable
                        min="9:30"
                        max="22:15"
                        ></v-time-picker>
                        <v-time-picker
                        v-model="editedItem.endTime"
                        :allowed-minutes="allowedStep"
                        class="mt-4"
                        format="24hr"
                        ></v-time-picker>
                    </v-row>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
  
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
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
              <v-card-title class="text-h5">Are you sure you want to Cancle this Event?</v-card-title>
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

      <template v-slot:item.startDate="{ item }">
       <v-chip color="info">
        {{ item.startDate+'t'+item.startTime |  moment("dddd, MMMM Do YYYY, h:mm:ss a") }}
       </v-chip>
     </template>
     <template v-slot:item.endDate="{ item }">
       <v-chip color="primary">
        {{ item.endDate+'t'+item.endTime |  moment("dddd, MMMM Do YYYY, h:mm:ss a") }}
       </v-chip>
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
      import DatePicker from "./default/DatePicker.vue"
  export default {
    components:{DatePicker},
    data: () => ({
        time: '11:15',
        timeStep: '10:10',


      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Event Name',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Starting Date', value: 'startDate' },
        { text: 'Ending Date', value: 'endDate' },
        { text: 'Location', value: 'location' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      events: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        startDate: 0,
        endDate: 0,
        location: 0,
        startTime:null,
        endTime:null
      },
      defaultItem: {
        name: '',
        startDate: 0,
        endDate: 0,
        location: 0,
        startTime:null,
        endTime:null
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
      allowedHours: v => v % 2,
      allowedMinutes: v => v >= 10 && v <= 50,
      allowedStep: m => m % 10 === 0,
      initialize () {
        this.events = [
          {
            name: 'Critic Alalisis',
            startDate: "2022-11-30",
            endDate: "2022-11-30",
            startTime: "13:54:00",
            endTime: "14:43:00",
            location: "Office Conference room 1",
          },
          {
            name: 'Cyber Security',
            startDate: "2023-02-30",
            endDate: "2023-03-30",
            startTime: "15:00:00",
            endTime: "15:00:00",
            location: "Room 2",
          },
          {
            name: 'Social Awareness',
            startDate: "2023-03-29",
            endDate: "2023-03-29",
            startTime: "15:00:00",
            endTime: "15:00:00",
            location: "Room 2",
          },
          
        ]

      },
      setStartDate(val){
        this.editedItem.startDate=val
      },
      setEndDate(val){
        this.editedItem.endDate=val
      },
      editItem (item) {
        this.editedIndex = this.events.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.events.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.events.splice(this.editedIndex, 1)
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
          Object.assign(this.events[this.editedIndex], this.editedItem)
        } else {
          this.events.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>