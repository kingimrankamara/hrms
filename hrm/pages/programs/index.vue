<template>
    <div>
        <v-container>
            <Titlebar title="Programs"/>
            <Programs/>
        </v-container>
    </div>
</template>
<script>
    import Programs from '../../components/Programs.vue'
    import Titlebar from "../../components/default/Titlebar.vue";
export default {
    name:'StudentList',
    components:{Programs,Titlebar},
    data() {
        return {
            
        }
    },
}
</script>