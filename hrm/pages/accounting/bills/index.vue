<template>
    <div>
        <v-container>
            <Titlebar title="Bills"/>
            <Bills/>
        </v-container>
    </div>
</template>
<script>
    import Bills from '../../../components/Bills.vue'
    import Titlebar from "../../../components/default/Titlebar.vue";
export default {
    name:'StudentList',
    components:{Bills,Titlebar},
    data() {
        return {
            
        }
    },
}
</script>