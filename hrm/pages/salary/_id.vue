<template>
    <div>
        <v-container>
            <v-row justify-center class="pb-5">
                <v-col cols="12" md="2" sm="12">
                    <v-img
                    src="/pp.png"
                    aspect-ratio="0.9"
                    ></v-img>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-row>
                        <v-col sm="6" cols="12" class="d-none d-sm-block">
                            <ul class="u-list">
                                <li>ID:</li>
                                <li>Name:</li>
                                <li>Email:</li>
                                <li>Gender:</li>
                                <li>Departmetn:</li>
                            </ul>
                        </v-col>

                        <v-col sm="6" cols="12" >
                            <ul class="u-list">
                                <li>{{id}}</li>
                                <li>Medvik</li>
                                <li>kabiam@goldentsoftware.com</li>
                                <li>Male</li>
                                <li>Pure Science</li>
                            </ul>
                        </v-col>
                    </v-row>

                   
                </v-col>
            </v-row>
            <Salary/>
        </v-container>
    </div>
</template>
<script>
    import Salary from "../../components/Salary.vue"
    import Titlebar from "../../components/default/Titlebar.vue";
export default {
    name:'StudentList',
    components:{Salary,Titlebar},
    data() {
        return {
            id:0,
        }
    },
}
</script>