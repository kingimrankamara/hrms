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
                                <li v-if="staff.department">{{staff.department.name}}</li>
                            </ul>
                        </v-col>

                        
                    </v-row>
                </v-col>
            </v-row>

            <div>
                <h2>Appraisal is based on timely attendance</h2>

                <div>
                    <v-row>
                        <v-col cols="6" md="3">
                            <ul class="u-list">
                                <li>Number of days Attended</li>
                                <li>Days Absent</li>
                                <li>Late days</li>
                                <li>Early Clock-out days</li>
                                <li>Extra hours days</li>
                            </ul>
                        </v-col>

                        <v-col cols="6" md="3">
                            <ul class="u-list">
                                <li>: {{times.length}}</li>
                                <li>{{absent}}</li>
                                <li>: {{late.length}}</li>
                                <li>: {{earlyOut.length}}</li>
                                <li>: {{extraHours.length}}</li>
                            </ul>
                        </v-col>
                        <v-col cols="12" md="6">
                            Employee has an attendance rating of {{attRating}}%
                        </v-col>
                    </v-row>
                </div>
                
            </div>
    </v-container>
</template>
<script>
export default {
    data() {
        return {
           signInTime:'8:45:59',
           signOutTime:'17:00:00'
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
        },
        times(){
            return this.$store.getters['management/times'];
        },
        late(){
          return   this.times.filter(time=>{
                return time.in>this.signInTime
            })
            //return '8:46:59'  >'8:45:59'
        },
        earlyOut(){
            return   this.times.filter(time=>{
                return time.out<this.signOutTime
            })
            //return '16:00:00'  >'17:00:00'
        },
        extraHours(){
            return   this.times.filter(time=>{
                return time.out >this.signOutTime
            })
            //return '16:00:00'  >'17:00:00'
        },
        absent(){
            return Math.floor(Math.random() * 4);
        },
        attRating(){
            let attend =this.times.length;
            let abs =this.absent
            let days = abs+ attend
            let absPercent =100/days;
            return 100 -absPercent
        }

    },
}
</script>