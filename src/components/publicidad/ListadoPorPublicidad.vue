<template>
  <div>
    <div class="row">
      <div
        class="col-4 col-md-2 col-lg-2"
        v-for="(attachment, index) in publicidad"
        :key="index"
      >
        <attachment
          ref="attachments"
          :value="attachment"
          @input="attachmentInput($event, index)"
          :force-link="false"
          :key="attachment.id"
          @deleteAttachment="deleteAttachment(attachment.id)"
          :controls="!loading"
        ></attachment>
      </div>
    </div>
  </div>
</template>


<script>
import Attachment from "../attachments/Attachment.vue";
import PublicidadService from "@/services/PublicidadService";
import swal from 'sweetalert';

export default {
  components: { Attachment },
  props: {
    publicidad: {
      type: Array,
    },
    ubicacion: {
      type: Number,
    },
  },
  data() {
    return {
      loading: true,
    };
  },
  methods: {
    attachmentInput(attachment, index) {
      this.$set(this.publicidad, index, attachment);
    },
    async deleteAttachment(id) {
      try {
        const response = await PublicidadService.eliminarPublicidad({
          id: id,
        });
        if (response.data.error == false) {
            swal("Publicidad Eliminada!", "Se elimino la publicidad!", "success");
         location.reload()
        }
      } catch (error) {
        this.$bvToast.toast(`No se pudo eliminar la publicidad`, {
          title: error.response.data,
          toaster: "b-toaster-top-center",
          solid: true,
          variant: "danger",
        });
      }
    },
  },
  mounted() {},
};
</script>