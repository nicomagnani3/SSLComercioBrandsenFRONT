<template>
    <div class="Header text-left" >
        <img  class="logo" src="@/assets/locallogo.png"  alt="" height="auto" >
    </div>

</template>

<script>
export default {
    name: "Header",
    data () {
        return {
            imgHeader: 'locallogo.png'
        }
    }
}
</script>

<style >

    .logo {
        max-width: 200px;
}

    

</style>