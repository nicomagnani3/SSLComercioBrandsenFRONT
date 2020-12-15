<template>
    <footer style=" background-color: #ffc107;" id="sticky-footer" class="footer text-center">
       
        <span class="footer-text">Powered by </span>
<!--
        <span><a href="http://frontiniyasoc.com.ar/">
            <img class="logo" src="@/assets/frontini-blanco.png" alt="" height="auto" > 
            </a>
        </span>
         <div class="my-3 text-center">
            <small>Copyright &copy; Frontini & Asoc</small>
        </div>  -->
    </footer>
</template>


<script>
export default {
    name: "Footer",
    data () {
        return {
            imgFooter : 'od_footer.png'
        }
    }
}
</script>


<style>

.footer-text {
    font-size: 80%;
    
}

.footer {

  bottom: 0;
  width: 100%;
 
  height: 160px;
  line-height: 160px; 
  background-color: #ffc107;
}

</style>

