<template>
    <div class="Header text-left" >
        <img  class="logo" src="@/assets/locallogo.jpg"  alt="" height="auto" >
    </div>

</template>

<script>
export default {
    name: "Header",
    data () {
        return {
            imgHeader: 'locallogo.jpg'
        }
    }
}
</script>

<style >

    .logo {
        max-width: 200px;
}

    

</style>