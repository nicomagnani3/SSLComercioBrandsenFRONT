<template>
  <div>
    <br />
    <b-row class="text-center">
      <b-col class="publicidad"
        ><img class="img-fluid" alt="Responsive image" src="@/assets/ecomunicacion1.png" />
      </b-col>
      <br />
      <b-col class="publicidad"
        ><img  src="@/assets/ecomunicacion2.png" class="img-fluid" alt="Responsive image"
      /></b-col>
      <br />
      <b-col class="publicidad"
        ><img src="@/assets/Malambo-footer3.png" class="img-fluid" alt="Responsive image"
      /></b-col>
    </b-row>
    <br />
  </div>
</template>




<script>
export default {
  name: "Publicidad",
  data() {
    return {
      img: "publi.jpg",
    };
  },
};
</script>

<style  scoped>
.imagen {
  width: 100%;
}

.publicidad {
  margin-bottom: 5px;
}
</style>