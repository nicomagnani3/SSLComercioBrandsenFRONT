<template>
  <b-container fluid class="base-user">
    <b-row class="h-100 justify-content-center align-items-center">
      <b-col sm="8" md="6" xl="3" >
        <router-view />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "BaseLogin",
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
@import url("https://fonts.googleapis.com/css?family=Montserrat&display=swap");

.base-user {
  font-family: "Montserrat", sans-serif;
  height: 100vh;
  /*background-color: #1a1a1a; */
  background-color: #FFCE4E;
}

.base-box {
  border-radius: 5px;
  background-color: white;
}

.base-box > .title {
  color: #1f1f1f;
}
/* <b-col sm="8" md="6" xl="5" class="base-box m-1"> para que se vea el cuadrado en el formulario */
</style>