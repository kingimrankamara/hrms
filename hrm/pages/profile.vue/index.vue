<template>
    <div>
        <v-container>
            <Profile/>
        </v-container>
    </div>
</template>
<script>
    import Profile from '../../components/Profile.vue'
export default {
    name:'StudentList',
    components:{Profile},
    data() {
        return {
            
        }
    },
}
</script>