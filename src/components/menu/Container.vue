<template>
  <div>
      <div class="wrapper">        
      <Menu/>
        <router-view class="content"/>
      </div>
      <Footer class="footer" />
  </div>
</template>

<script>



import Footer from '@/components/menu/Footer.vue'
import Menu from '@/components/menu/Menu.vue'

export default {
  name: 'Dashboard',
  components: {
   Menu,      
    Footer 
  },
  computed: {
   
    
  },
  methods: {
   
      printAlltoast () {
          this.toast.forEach(data => {
              this.addToast(data)
              let index = this.toast.indexOf(data);
              if (index > -1) {
                  this.toast.splice(index, 1);
              }   
          });
      },

      addToast(data ) {
          this.$bvToast.toast( data.message , {
          title: data.title || '',
          toaster: data.toaster || 'b-toaster-top-center' ,
          solid: true,
          variant: data.variant || 'secondary',
          appendToast: data.append || false
          })
      }
  },
  mounted () {
  }
        
 





}
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap');
  body {
    font-family: 'Montserrat', sans-serif !important;
    background-color: white;
        line-height: 2.5;
  }

  html {
    position: relative;
    height: 100%;
    

  }
 
  .box-shadow {
      border-radius: 15px 15px 15px 15px;
      box-shadow: 2px 2px 6px 0px rgba(0,0,0,0.75);
      min-height: calc(100vh * 0.60 );
  }

  .box-shadow-min {
      border-radius: 15px 15px 15px 15px;
      box-shadow: 2px 2px 6px 0px rgba(0,0,0,0.75);
  }

  .wrapper {
    min-height: calc(100vh - 60px );

  }

  .label-padding-sm {
      display: inline-block;
      width: 80px;
  }

  .label-padding {
      display: inline-block;
      width: 160px;
  }

  .label-padding-tab {
      display: inline-block;
      width: 250px;
  }

  .footer {
      /*display: block;*/
      
      margin-top:10px;
      height: 50px;
      line-height: 50px;
      /*
      */
      color:white;
     background-color: #ececec;
  }

  .fade-enter-active, .fade-leave-active {
      transition: opacity .3s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0;
  }
  
</style>

