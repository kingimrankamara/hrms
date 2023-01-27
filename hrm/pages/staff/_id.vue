<template>
    <div>
        <v-container v-if="staff">
            <v-row>
                <v-col cols="12" sm="3">
                    <v-img
                    :src='baseUrl+"/"+staff.pp'
                    aspect-ratio="0.9"
                    ></v-img>
                    <div class="mt-2 caps primary--text">
                        <h3>{{staff.jobTitle}}</h3>
                    </div>
                </v-col>
                <v-col cols="12" sm="8">
                    <v-row>
                        <v-col cols="5">
                            <ul class="u-list">
                                <li>Staff ID</li>
                                <li>Name</li>
                                <li>Email</li>
                                <li>Phone</li>
                                <li>DOB</li>
                                <li>Gender</li>
                                <li>Gade</li>
                                <li>Departmetn</li>
                            </ul>
                        </v-col>

                        <v-col cols="4">
                            <ul class="u-list">
                                <li>:{{staff.staffId}}</li>
                                <li>:{{staff.firstName}} <span v-if="staff.middleName">{{staff.middleName}}</span> {{staff.lastName}}</li>
                                <li>:{{staff.email}}</li>
                                <li>:{{staff.phone}}</li>
                                <li>:{{staff.dob }}</li>
                                <li>:{{staff.gender}}</li>
                                <li>:{{staff.grade}}</li>
                                <li>: <span v-if="staff.department">{{staff.department.name}}</span> </li>
                            </ul>
                        </v-col>
                        <v-col cols="12" sm="3" v-if="admin">
                            <v-combobox
                                    v-model="staff.role"
                                    :items="roles"
                                    label="Acess Level"
                                    dense
                                    outlined  
                                    @change="roleChange"
                                ></v-combobox>
                        </v-col>
                    </v-row>
                   
                </v-col>
            </v-row>

            <v-row justify-center >
                <v-col cols="12">
                    <v-card flat color="gray">
                        <v-card-text>
                            <v-icon large color="error">mdi-cash-100 </v-icon> Salary: {{staff.salary | currency}}
                             <v-icon large color="info" class="ml-5">mdi-cash</v-icon> Allowance: {{staff.allowance | currency}} 
                            <v-icon large color="success" class="ml-5">mdi-cash-multiple </v-icon> Gross Incom: {{staff.allowance +staff.salary | currency}} 
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="12" md="4" sm="6">
                    <v-card>
                        <v-toolbar class="primary" dark>
                            <v-card-title >
                            Profesional Details
                        </v-card-title>
                        </v-toolbar>
                        <v-card-text>
                            <p>Work as {{staff.employmentType}} {{staff.jobTitle}}</p>
                            <p>Has {{staff.experience}} years of experience</p>
                            <p>Started working here on {{staff.dateStarted | moment("dddd, MMMM Do YYYY")}}</p>
                            <p><span v-if="staff.gender =='Male'">He</span><span v-else>She</span> is a grade {{staff.grade}} employee</p>
                        </v-card-text>
                    </v-card>
                </v-col>

                <v-col cols="12" md="4" sm="6">
                    <v-card>
                        <v-toolbar class="secondary" dark>
                            <v-card-title >
                            Address & other details
                        </v-card-title>
                        </v-toolbar>
                        <v-card-text>
                            <p>Address: {{staff.address}}</p>
                            <p>Blod Group {{staff.bloodGroup}}</p>
                            <p> {{staff.phone}}</p>
                            <p>{{staff.email}}</p>
                        </v-card-text>
                    </v-card>
                </v-col>

                <v-col cols="12" md="4" sm="6">
                    <v-card>
                        <v-toolbar class="info" dark>
                            <v-card-title >
                          Emergency Contacts
                        </v-card-title>
                        </v-toolbar>
                        <v-card-text>
                            <h4>Primary</h4>
                            <p> Name :{{staff.emergencyContact[0].e1.name}}</p>
                            <p> Phone :{{staff.emergencyContact[0].e1.phone}}</p>
                            <p> Relationship :{{staff.emergencyContact[0].e1.relationship}}</p>
                            <p> Address :{{staff.emergencyContact[0].e1.address}}</p>

                            <h4>Secondary</h4>
                            <p> Name :{{staff.emergencyContact[0].e2.name}}</p>
                            <p> Phone :{{staff.emergencyContact[0].e2.phone}}</p>
                            <p> Relationship :{{staff.emergencyContact[0].e2.relationship}}</p>
                            <p> Address :{{staff.emergencyContact[0].e2.address}}</p>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
<script>
export default {
    data() {
        return {
            roles:['Staff','Admin']
        }
    },
    computed: {
        id(){
            return this.$route.params.id
        },
        staff(){
            let st= this.$store.getters['management/getStaffById'](this.id)
            if(st){
                let newStaff = Object.assign({}, st)
            return newStaff
            }
        },
        baseUrl(){
            return this.$store.getters['management/baseUrl']
        },
        admin(){
          let u = this.$store.getters['account/getUser'];
          if(u){
            if(u.role =='Admin'){
                return true
            }
            else return false
          }
        }
    },
    methods: {
        roleChange(){
            this.$store.dispatch('management/updateStaff', this.staff)
        }
    },
}
</script>