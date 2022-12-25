<template>
    <div>
        <v-container>
            <Titlebar title="Departments"/>
            <Departments/>
        </v-container>
    </div>
</template>
<script>
    import Departments from "../../components/Departments.vue"
    import Titlebar from "../../components/default/Titlebar.vue";
export default {
    name:'StudentList',
    components:{Departments,Titlebar},
    data() {
        return {
            
        }
    },
}
</script>