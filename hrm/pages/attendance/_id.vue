<template>
    <v-container v-if="staff">
        <v-row justify-center class="pb-5">
                <v-col cols="12" sm="12" md="2">
                    <v-img
                    :src="baseUrl+'/'+staff.pp"
                    aspect-ratio="0.9"
                    ></v-img>
                </v-col>
                <v-col cols="12" sm="6" md="10">
                    <v-row>
                        <v-col sm="4" cols="12" class="d-none d-sm-block">
                            <ul class="u-list">
                                <li>ID:</li>
                                <li>Name:</li>
                                <li>Email:</li>
                                <li>Gender:</li>
                                <li>Departmetn:</li>
                            </ul>
                        </v-col>

                        <v-col sm="5" cols="12">
                            <ul class="u-list">
                                <li>{{staff.staffId}}</li>
                                <li>{{staff.firstName}} <span v-if="staff.middleName"> {{staff.middleName}}</span> {{staff.lastName}}</li>
                                <li>{{staff.email}}</li>
                                <li>{{staff.gender}}</li>
                                <li>{{staff.department.name}}</li>
                            </ul>
                        </v-col>

                        <v-col sm="3" cols="12">
                           <div class="d-flex">
                            <v-switch
                            v-model="ci"
                            :label="attendLabel"
                            @change="userAttendance">
                            </v-switch>
                           </div>

                           
                        </v-col>
                    </v-row>

                   
                </v-col>
        </v-row>

        <Attendance/>
    </v-container>
</template>
<script>
  import format from 'date-fns/format'
  import Attendance from"../../components/default/Attendance.vue"
export default {
    components:{Attendance},
    data() {
        return {
           ci:false,
           attendLabel:"Clock In",
           tday:"",
           attendance:[
            {day:'2022-11-30',act:{in:'time',out:'time'}}
        
            ],
        }
    },
    computed: {
        id(){
            return this.$route.params.id
        },
        staff(){
            return this.$store.getters['management/getStaffById'](this.id)
        },
        baseUrl(){
            return this.$store.getters['management/baseUrl']
        }
    },
    methods: {
        userAttendance(){
            let date =new Date();
           if(this.ci ==true){
            this.attendLabel="Clock Out"
            this.tday= date ? format(date, 'yyyy-MM-dd') : '';
            let tday= date ? format(date, 'yyyy-MM-dd') : '';
            let time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
            this.attendance.push(
                {day:tday,act:{in:time}}
            );
            this.$store.dispatch('management/setAttendance',{day:tday,act:{in:time}})
            console.log(this.attendance)
           }else{
            this.attendLabel="Clock In"
           }
        }
    },
}
</script>