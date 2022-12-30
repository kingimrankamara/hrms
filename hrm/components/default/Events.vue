<template>
    <v-app>
      <v-container>
        {{start}} {{Date.now()}}
      <v-row class="fill-height">
        <v-col>
          <v-sheet height="64">
            <v-toolbar flat color="white">
              <v-btn outlined class="mr-4" @click="setToday">
                Today
              </v-btn>
              <v-btn @click="dialog=true" primary dark>
                add
              </v-btn>
              <v-btn fab text small @click="prev">
                <v-icon small>mdi-chevron-left</v-icon>
              </v-btn>
              <v-btn fab text small @click="next">
                <v-icon small>mdi-chevron-right</v-icon>
              </v-btn>
              <v-toolbar-title>{{ title }}</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-menu bottom right>
                <template v-slot:activator="{ on }">
                  <v-btn
                    outlined
                    v-on="on"
                  >
                    <span>{{ typeToLabel[type] }}</span>
                    <v-icon right>mdi-menu-down</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item @click="type = 'day'">
                    <v-list-item-title>Day</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="type = 'week'">
                    <v-list-item-title>Week</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="type = 'month'">
                    <v-list-item-title>Month</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="type = '4day'">
                    <v-list-item-title>4 days</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-toolbar>
          </v-sheet>
          <!----dialow gos here----->
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-container>
                 <v-alert v-model="alert"
                    border="top"
                    color="red lighten-2"
                    dark
                  >
                   {{message}}
                  </v-alert>
                <v-form @submit.prevent="addEvent()">
                  <v-text-field v-model="name" type="text" placeholder="Name"></v-text-field>
                  <v-text-field v-model="details" type="text" placeholder="Details"></v-text-field>
                   <v-menu
              v-model="menu3"
              :close-on-content-click="false"
              max-width="290"
            >
              <template v-slot:activator="tryg">
                <v-text-field
                  :value="color"
                  clearable
                  label="color"
                  readonly
                  v-on="tryg.on"
                ></v-text-field>
              </template>
             <v-color-picker class="ma-2" hide-inputs
                v-model="color"
                @change="menu3= false"
              ></v-color-picker>
              <v-select v-model="color" :items="modes" style="max-width: 300px"></v-select>
            </v-menu>
    
          <!--start  picker-------------------------------------  -----------------  ---------------------->
          <template>
            <v-container>
              <v-row>
                <v-col cols="12" lg="6">
                  <v-menu
                    v-model="menu1"
                    :close-on-content-click="false"
              max-width="290"
            >
              <template v-slot:activator="start">
                <v-text-field
                  :value="start"
                  clearable
                  label="start"
                  readonly
                  v-on.native="start.on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="start"
                @change="menu1 = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
    
          <v-col cols="12" lg="6">
            <v-menu
              v-model="menu2"
              :close-on-content-click="false"
              max-width="290"
            >
              <template v-slot:activator="end">
                <v-text-field
                  :value="end"
                  clearable
                  label="End"
                  readonly
                  v-on="end.on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="end"
                @change="menu2 = false"
              ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
           </v-container>
          </template>
          <!--end date picker------------------------------===========================================end=------------->
          <v-btn type="submit" color='s-info' class="mr-6" @click.stop="dialog=false">Add</v-btn>
        </v-form>
        </v-container>
        </v-card>
      </v-dialog>
          <v-sheet height="650">
            <v-calendar
              ref="calendar"
              v-model="focus"
              color="#BBDEF"
              :events="events"
              :event-color="getEventColor"
              :event-margin-bottom="3"
              :now="today"
              :type="type"
              @click:event="showEvent"
              @click:more="viewDay"
              @click:date="viewDay"
              @change="updateRange"
            ></v-calendar>
            <v-menu
              v-model="selectedOpen"
              :close-on-content-click="false"
              :activator="selectedElement"
              offset-x
            >
              <v-card
                color="grey lighten-4"
                min-width="350px"
                flat
              >
                <v-toolbar
                  :color="selectedEvent.color"
                  dark
                >
                  <v-btn icon @click.prevent="deleteEvent(selectedEvent)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                  <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                  <v-spacer></v-spacer>
    
                </v-toolbar>
                <v-card-text>
                  <form v-if="currentlyEditing !==selectedEvent.id">
                    {{selectedEvent.details}}
                  </form>
                  <form v-else>
                    <textarea-autosize
                      v-model="selectedEvent.details"
                      type="text"
                      style="width:100%"
                      :min-height="100"
                      placeholder="Add Note"
                    ></textarea-autosize>
                  </form>
                </v-card-text>
                <v-card-actions>
                  <v-btn
                    text
                    color="secondary"
                    @click="selectedOpen = false"
                  >
                    Cancel
                  </v-btn>
                  <v-btn v-if="currentlyEditing !==selectedEvent.id"
                   @click.prevent="editEvent(selectedEvent)">
                    Edit
                  </v-btn>
                  <v-btn v-else
                   @click.prevent="updateEvent(selectedEvent)">
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-menu>
          </v-sheet>
        </v-col>
    
      </v-row>
    
     </v-container>
     </v-app>
     </template>
    
    <script>
    import format from 'date-fns/format'
    export default {
      data: () => ({
        today: new Date().toISOString().substr(0, 10),
        focus: new Date().toISOString().substr(0, 10),
        date: new Date().toISOString().substr(0, 10),
        type: 'month',
        typeToLabel: {
          month: 'Month',
          week: 'Week',
          day: 'Day',
          '4day': '4 Days'
        },
        alert: false,
        menu1: false,
        menu2: false,
        menu3: false,
        name: null,
        details: null,
        start: '',
        end: '',
        color: '',
        selectedEvent: {},
        selectedElement: null,
        selectedEditing: null,
        currentlyEditing: null,
        selectedOpen: false,
        events: [],
        dialog: false,
        showDatePicker: false,
        mode: 'hsla',
        modes: ['hsla', 'rgba', 'hexa'],
        msg: '',
        user: null
      }),
      computed: {
        computedDateFormattedDatefns () {
          return this.date ? format(this.date, 'YYYY MMMM Do dd') : ''
        },
        // dat picke r function end
        title () {
          const { start, end } = this
          if (!start || !end) {
            return ''
          }
    
          const startMonth = this.monthFormatter(start)
          const endMonth = this.monthFormatter(end)
          const suffixMonth = startMonth === endMonth ? '' : endMonth
    
          const startYear = start.year
          const endYear = end.year
          const suffixYear = startYear === endYear ? '' : endYear
    
          const startDay = start.day + this.nth(start.day)
          const endDay = end.day + this.nth(end.day)
    
          switch (this.type) {
            case 'month':
              return `${startMonth} ${startYear}`
            case 'week':
            case '4day':
              return `${startMonth} ${startDay} ${startYear} - ${suffixMonth} ${endDay} ${suffixYear}`
            case 'day':
              return `${startMonth} ${startDay} ${startYear}`
          }
          return ''
        },
        message () {
          return this.msg
        },
        monthFormatter () {
          return this.$refs.calendar.getFormatter({
            timeZone: 'UTC', month: 'long'
          })
        }
      },
      mounted () {
        this.$refs.calendar.checkChange()
      },
      created () {
        this.displayEvents()
      },
      methods: {
        getEvents () {
          this.$store.dispatch('getEvents')
        },
        displayEvents () {
          const events = []//this.$store.getters.getEvents
          console.log(events)
          this.events = events
          events.forEach(eve => {
            console.log(eve)
          })
        },
        deleteEvent (ev) {
          this.$store.dispatch('deleteCalEvent', ev)
          this.selectedOpen = false
          this.getEvents()
        },
        updateEvent (ev) {
          this.$store.dispatch('updateCalEvent', ev)
          console.log(ev)
          this.selectedOpen = false
          this.currentlyEditing = null
        },
    
        addEvent () {
          if (this.name && this.start && this.end) {
            let today = new Date().toISOString().substr(0, 10)
            if (this.start >= today && this.end >= today) {
              this.alert = false
              const data = ({
                name: this.name,
                details: this.details,
                start: this.start,
                end: this.end,
                color: this.color
              })
              this.$store.dispatch('addCalEvent', data)
              this.displayEvents()
              this.name = ''
              this.details = ''
              this.start = ''
              this.end = ''
              this.color = '#BBDEF'
            } else {
              this.dialog = true
              this.alert = true
              this.msg = 'Event date cant be in the past'
            }
          } else {
            this.dialog = true
            this.alert = true
            this.msg = 'Please Enter event Name starting and Ending date'
          }
        },
        getEventColor (ev) {
          return ev.color
        },
        viewDay ({ date }) {
          this.focus = date
          this.type = 'day'
        },
        setToday () {
          this.focus = this.today
        },
        prev () {
          this.$refs.calendar.prev()
        },
        next () {
          this.$refs.calendar.next()
        },
        editEvent (ev) {
          this.currentlyEditing = ev.id
        },
        showEvent ({ nativeEvent, event }) {
          const open = () => {
            this.selectedEvent = event
            this.selectedElement = nativeEvent.target
            setTimeout(() => {
              this.selectedOpen = true
            }, 10)
          }
    
          if (this.selectedOpen) {
            this.selectedOpen = false
            setTimeout(open, 10)
          } else {
            open()
          }
          nativeEvent.stopPropagation()
        },
        updateRange ({ start, end }) {
        // You could load events from an outside source (like database) now that we have the start and end dates on the calenda
        },
        nth (d) {
          return d > 3 && d < 21
            ? 'th'
            : ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'][d % 10]
        }
      }
    }
    </script>
    