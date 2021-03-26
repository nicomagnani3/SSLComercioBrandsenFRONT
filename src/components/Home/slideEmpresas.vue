<template>
  <div>
    <h3 class="m-5 titulo text-center">
      <strong>Los mejores negocios te esperan</strong>
    </h3>
    <b-container class="contenedorPubli mb-5">
      <b-row>
        <b-col class="itemCarrusel">
          <b-card
            img-src="https://i.pinimg.com/564x/cd/45/c6/cd45c6aaa70345daa0c619d38f7353af.jpg"
            img-alt="Image"
            img-top
            tag="article"
            img-height="150px"
            style="max-width: 20rem"
            class="itemCarrusel"
          >
            <hr />
            <b-card-text class="texto"> Malambo </b-card-text>
            <div slot="footer">
              <b-button href="#" variant="warning" block class="btnMas"
                >Ver más</b-button
              >
            </div>
          </b-card>
        </b-col>
        <b-col class="itemCarrusel">
          <b-card
            img-src="https://i.pinimg.com/564x/cd/45/c6/cd45c6aaa70345daa0c619d38f7353af.jpg"
            img-alt="Image"
            img-top
            tag="article"
            img-height="150"
            class="itemCarrusel"
          >
            <hr />
            <b-card-text class="texto"> Malambo </b-card-text>
            <div slot="footer">
              <b-button href="#" variant="warning" block class="btnMas"
                >Ver más</b-button
              >
            </div>
          </b-card>
        </b-col>
        <b-col class="itemCarrusel">
          <b-card
            img-src="https://i.pinimg.com/564x/cd/45/c6/cd45c6aaa70345daa0c619d38f7353af.jpg"
            img-alt="Image"
            img-top
            tag="article"
            img-height="150"
            class="itemCarrusel"
          >
            <hr />
            <b-card-text class="texto"> Malambo </b-card-text>
            <div slot="footer">
              <b-button href="#" variant="warning" block class="btnMas"
                >Ver más</b-button
              >
            </div>
          </b-card>
        </b-col>
        <b-col class="itemCarrusel">
          <b-card
            img-src="https://i.pinimg.com/564x/cd/45/c6/cd45c6aaa70345daa0c619d38f7353af.jpg"
            img-alt="Image"
            img-top
            tag="article"
            img-height="150"
            class="itemCarrusel"
          >
            <hr />
            <b-card-text class="texto"> Malambo </b-card-text>
            <div slot="footer">
              <b-button href="#" variant="warning" block class="btnMas"
                >Ver más</b-button
              >
            </div>
          </b-card>
        </b-col>
        <b-col class="itemCarrusel">
          <b-card
            img-src="https://i.pinimg.com/564x/cd/45/c6/cd45c6aaa70345daa0c619d38f7353af.jpg"
            img-alt="Image"
            img-top
            tag="article"
            img-height="150"
            class="itemCarrusel"
          >
            <hr />
            <b-card-text class="texto"> Malambo </b-card-text>
            <div slot="footer">
              <b-button href="#" variant="warning" block class="btnMas"
                >Ver más</b-button
              >
            </div>
          </b-card>
        </b-col>
        <b-col class="itemCarrusel">
          <b-card
            img-src="https://i.pinimg.com/564x/cd/45/c6/cd45c6aaa70345daa0c619d38f7353af.jpg"
            img-alt="Image"
            img-top
            tag="article"
            img-height="150"
            class="itemCarrusel"
          >
            <hr />
            <b-card-text class="texto"> Malambo </b-card-text>
            <div slot="footer">
              <b-button href="#" variant="warning" block class="btnMas"
                >Ver más</b-button
              >
            </div>
          </b-card>
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
.itemCarrusel {
  text-align: center;
  object-fit: cover;
  margin-right: 5px;
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

.btnMas {
  white-space: initial;
  background: #ffce4e;
  background: linear-gradient(45deg #00ddf5 0%, #00d9d7 32%, #ffce4e 100%);
  border-radius: 22px;
  /* margin: -3px 0 0 0; */
  padding: 7px 6px 14px 6px;
  /* width: 88%; */
  /* text-transform: none; */
  font-size: 12px;
  line-height: 11px;
  color: #fff;
}
.contenedorPubli {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>>



