<template>
    <div>
        <v-container>
            <Titlebar title="Salary"/>
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
            
        }
    },
}
</script>