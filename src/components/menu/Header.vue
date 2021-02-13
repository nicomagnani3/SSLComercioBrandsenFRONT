<template>
    <div class="Header text-left" >
        <img  class="logo" src="@/assets/MalamboLogo.png"  alt="" height="auto" >
    </div>

</template>

<script>
export default {
    name: "Header",
    data () {
        return {
            imgHeader: 'MalamboLogo.png'
        }
    }
}
</script>

<style >

    .logo {
        max-width: 300px;
}

    

</style>