<template>
  <div>
    <b-carousel
      id="carousel-1"
        class="carrusel1"
      v-model="slide"
      :interval="15000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
    >
      <div>
        
        <b-carousel-slide
      
          img-src="https://i.pinimg.com/originals/70/d3/c7/70d3c7f76c3f8bd256f035b962c41bb9.jpg"
                      alt="image slot"
        ></b-carousel-slide>
        <b-carousel-slide
          img-src="https://i.pinimg.com/originals/58/ee/21/58ee21b3b162bd9efaddf385a70d2a79.jpg"
          fluid
          alt="Responsive image"
        ></b-carousel-slide>

        <b-carousel-slide
          img-src="  https://i.pinimg.com/originals/d8/48/fa/d848fa352826b4dd9cd1a2182ad11562.jpg"
          fluid
          alt="Responsive image"
        ></b-carousel-slide>
        <b-carousel-slide
          img-src="https://i.pinimg.com/originals/1c/42/7e/1c427ee01e792e3f3c614e0d447a479e.jpg"
          fluid
          alt="Responsive image"
        ></b-carousel-slide>
      </div>
    </b-carousel>
    <div>
      <br />
      <b-container deck class="contenedorPubli mb-5">
        <div class="card-deck-wrapper">
          <div class="card-deck">
            <b-row
              v-for="publicidad in publicidades"
              v-bind:key="publicidad.id"
              class="text-center"
            >
              <b-col class="itemCarrusel">
                <b-card
                  overlay
                  :img-src="publicidad.imagen"
                  img-alt="Responsive image"
                  img-top
                  tag="article"
                  class="img-fluid"
                  alt="Responsive image"
                >
                </b-card>
                <br />
              </b-col>
            </b-row>
          </div>
        </div>
      </b-container>
    </div>
  </div>
</template>



<script>
export default {
  name: "slider",
  props: {
    publicidades: {
      type: Array,
    },
  },
  data() {
    return {
      slide: 0,
      sliding: null,
    };
  },
  created() {
    console.log(this.publicidades);
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
@media (max-width: 1023px) {
  .exhibitor-holder img,
  .exhibitor .slick-list {
    height: 134px;
  }
}
.contenedorPubli {
  display: flex;
  align-items: center;
  justify-content: center;
}
.imagen {
  width: 100%;
}
.itemCarrusel img {
  object-fit: contain;
}
.card-deck {
  display: flex;
  justify-content: flex-start;
  flex-flow: row wrap;
  align-items: stretch;
}
.card-deck .card {
  display: block;
  flex-basis: 33.3%; /* change this value for each breakpoint*/
}

.publicidad {
  margin-bottom: 8px;
}
</style>

