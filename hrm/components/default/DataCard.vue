<template>
    <div class="data-card" :class="data.color">
        <div class="d-flex">
            <div>
                <div class="d-flex justify-center card-icon">
                    <v-icon>{{data.icon}}</v-icon>
                </div>
            </div>

            <div class="title-container pl-3">
                <div class="d-flex justify-center">
                    <div>
                        <h2>{{data.title}}</h2>
                        <h5>{{data.subtitle}}</h5>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:["data"]
}
</script>