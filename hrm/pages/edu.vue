<template>
    <div>
        <v-container>
            <Titlebar title="Education & Training"/>
            <Departments/>
        </v-container>
    </div>
</template>
<script>
    import Departments from "../components/edu.vue"
    import Titlebar from "../components/default/Titlebar.vue";
export default {
    name:'StudentList',
    components:{Departments,Titlebar},
    data() {
        return {
            
        }
    },
}
</script>