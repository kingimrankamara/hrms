<template>
    <div v-if="selected">
    <v-container>
        <div class="page" >
            <div class="institution">
                <div class="logo">
                    <img
                    src='/pp.png'
                    class="responsive-img"
                    />
                </div>
                <div class="name mt-3" v-if="company">
                    {{company.name}}
                </div>
            </div>
            <br>
            <div class="center doc-title">Salary Payslip</div>

            <v-row class="mt-20 pa-20">
                <v-col cols="10">
                    Month:
                </v-col>
                <v-col cols="2">
                    December,2022
                </v-col>
                <v-col cols="12">
                   <v-divider></v-divider>
                </v-col>

                <v-col cols="12">
                    <h2>Personal Information</h2>
                    <p>Name : {{selected.firstName+ " " +selected.lastName}}</p>
                    <p>Position : {{selected.jobTitle}}</p>
                    <p>Grade : {{selected.grade}}</p>
                   <v-divider></v-divider>
                </v-col>
                <v-col cols="12">
                    <h2>Calculated Wages</h2>
                    <v-row>
                        <v-col cols="6">
                            Basic Salary:
                        </v-col>
                        <v-col cols="6" class="right-text">
                            {{selected.salary | currency()}}
                        </v-col>

                        <v-col cols="6">
                            Allowance:
                        </v-col>
                        <v-col cols="6" class="right-text">
                            {{selected.allowance | currency()}}
                        </v-col>
                        <v-col cols="6">
                            <h3>Gross Salary:</h3>
                        </v-col>
                        <v-col cols="6" class="right-text">
                            {{gross(selected) | currency()}}
                        </v-col>
                    </v-row>
                   <v-divider></v-divider>
                </v-col>

                <v-col cols="12">
                    <h2>Deductions</h2>
                    <v-row>
                        <v-col cols="6">
                            P.A.Y.E:
                        </v-col>
                        <v-col cols="6" class="right-text">
                            {{tax(selected) | currency()}}
                        </v-col>

                        <v-col cols="6">
                            Nassit Contribution
                        </v-col>
                        <v-col cols="6" class="right-text">
                            {{nasit(selected) | currency()}}
                        </v-col>
                        <v-col cols="6">
                            <h3>Total Deductions:</h3>
                        </v-col>
                        <v-col cols="6" class="right-text">
                            {{tax(selected) + nasit(selected) | currency()}}
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="12">
                    <v-row>
                        <v-col cols="6">
                            <h3>Net Salary:</h3>
                        </v-col>
                        <v-col cols="6" class="right-text">
                            <h3>{{net(selected) | currency()}}</h3>
                        </v-col>
                    </v-row>
                    <v-divider></v-divider>
                </v-col>

                <v-col cols="12" class="mt-10">
                    <v-row>
                        <v-col cols="6">
                            <h3>Signature of Employee....................</h3>
                        </v-col>
                        <v-col cols="6" class="right-text">
                            <h3>Date : {{today}}</h3>
                        </v-col>
                    </v-row>

                </v-col>
            </v-row>
          
           <div class="stamp-area"></div>
        <footerVue/>
        
        </div>
    </v-container>
</div>
</template>
<script>
import Schoollogo from "../schoollogo.vue"
import footerVue from './footer.vue';
export default {
    components:{footerVue,Schoollogo},
    props:['selected'],
    data() {
        return {
            basic:600,
        }
    },
    methods: {
       
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
    computed: {
        async loadImage(){
            console.log('async dd===== lsks')
            const response = await axios.get(this.baseUrl+'/'+this.selected.pp,  { responseType: 'arraybuffer' })
            const buffer = Buffer.from(response.data, "utf-8");
            console.log(buffer)
            return buffer
        },
        today(){
            return new Date();
        },
        company(){
            return this.$store.getters['management/getCompany'];
        },
        baseUrl(){
            return this.$store.getters['management/baseUrl'];
        }
    },
}
</script>