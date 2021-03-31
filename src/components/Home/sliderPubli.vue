<template>
  <div>
    <br />
    <b-container deck class="contenedorPubli mb-5">
      <b-row>
        <b-col class="itemCarrusel">
          <img
            src="@/assets/Logo.jpg"
            class="img-fluid"
            alt="Responsive image"
          />
        </b-col>
        <b-col class="itemCarrusel">
          <b-img
            src="https://res.cloudinary.com/malambo/image/upload/v1617138779/Malambo/publicidad1.jpg"
            class="img-fluid"
            alt="Responsive image"
          >
          </b-img>
        </b-col>
        <b-col class="itemCarrusel">
          <b-img
            src="https://res.cloudinary.com/malambo/image/upload/v1617139861/Malambo/publicidad3.png"
            class="img-fluid"
            alt="Responsive image"
          >
          </b-img>
        </b-col>
        <b-col class="itemCarrusel">
          <b-img
            src="https://i.pinimg.com/564x/cd/45/c6/cd45c6aaa70345daa0c619d38f7353af.jpg"
            class="img-fluid"
            alt="Responsive image"
          >
          </b-img>
        </b-col>
        <b-col class="itemCarrusel">
          <b-img
            src="https://i.pinimg.com/564x/cd/45/c6/cd45c6aaa70345daa0c619d38f7353af.jpg"
            class="img-fluid"
            alt="Responsive image"
          >
          </b-img>
        </b-col>
        <b-col class="itemCarrusel">
          <b-img
            src="https://i.pinimg.com/564x/cd/45/c6/cd45c6aaa70345daa0c619d38f7353af.jpg"
            class="img-fluid"
            alt="Responsive image"
          >
          </b-img>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>



<script>
export default {
  name: "slider",
  data() {
    return {
      slide: 0,
      sliding: null,
    };
  },
  methods: {
    onSlideStart() {
      this.sliding = true;
    },
    onSlideEnd() {
      this.sliding = false;
    },
  },
};
</script>


<style scoped>
.publicidad {
  margin-bottom: 5px;
}
.itemCarrusel img {
  object-fit: contain;
}

.titulo {
  color: rgb(109, 108, 108);
}

.texto {
  color: gray;
  font-family: "Poppins", sans-serif;
}

.contenedorPubli {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>>



