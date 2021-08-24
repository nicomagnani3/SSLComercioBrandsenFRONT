<template>
  <div class="contenedor1">
    <div class="wrapper1">
      <b-row class="h-100 justify-content-center align-items-center">
        <b-col sm="10" md="8" xl="4" class="base-box m-2">
          <router-view class="content1" />
        </b-col>
      </b-row>
    </div>
    <div class="footer">
      <b-row class="big">
        <b-col>
          <a href="">
            <img
              class="logoBig"
              src="@/assets/bigdatapng.png"
            
            />
          </a>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "BaseLogin",
  components: {},
  computed: {
    ...mapState("storeUser", ["toast"]),
  },
  methods: {
    printAlltoast() {
      this.toast.forEach((data) => {
        this.addToast(data);
        let index = this.toast.indexOf(data);
        if (index > -1) {
          this.toast.splice(index, 1);
        }
      });
    },

    addToast(data) {
      this.$bvToast.toast(data.message, {
        title: data.title || "",
        toaster: data.toaster || "b-toaster-top-center",
        solid: true,
        variant: data.variant || "secondary",
        appendToast: data.append || false,
      });
    },
  },
  mounted() {
    this.$nextTick(function () {
      this.printAlltoast();
      // Code that will run only after the
      // entire view has been re-rendered
    });
  },
};
</script>

<style scoped>
html,
body {
  width: auto !important;
  overflow-x: hidden ;
  font-family: 'Roboto';
}
.logoBig {
  width: 30%;
}
.big {
  background-color: #ffce4e;
  text-align: center;
}
@import url("https://fonts.googleapis.com/css?family=Montserrat&display=swap");
body {
  font-family: "Roboto", sans-serif !important;
}
p{
  font-family: "Roboto" !important
}
.contenedor1 {
  
  background-color: #ffce4e;
}

.box-shadow {
  border-radius: 15px 15px 15px 15px;
  box-shadow: 2px 2px 6px 0px rgba(0, 0, 0, 0.75);
}

.box-shadow-min {
  border-radius: 15px 15px 15px 15px;
  box-shadow: 2px 2px 6px 0px rgba(0, 0, 0, 0.75);
}

.wrapper1 {
  min-height: calc(100vh - 70px);

}


.footer {
  /*display: block;*/

  /*
      */
  color: black;
  font-weight: bold;
  background-color: #ffce4e;
}

/* <b-col sm="8" md="6" xl="5" class="base-box m-1"> para que se vea el cuadrado en el formulario */
</style>