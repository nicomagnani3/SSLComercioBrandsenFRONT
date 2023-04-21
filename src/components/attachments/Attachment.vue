<template>
  <div class="card" :title="attachment.id" >
    <div
      class="card-img-top position-relative bg-secondary"
      :style="
        'padding-bottom: 80%; background-size: cover; background-position: center center; -webkit-print-color-adjust: exact !important; color-adjust: exact !important; background-image: url(\'' +
        previewUrl +
        '\')'
      "
    ></div>
    <div
      @click.stop="$emit('deleteAttachment', attachment)"
      class="position-absolute text-muted"
      style="right: 5px; cursor: pointer"
    >
      <div class="card-body p-1 pr-6 position-relative">
        <div class="row no-gutters">
          <b-icon icon="x-circle-fill" variant="danger"></b-icon>
        </div>
      </div>
    </div>
    <!-- 	<div class="card-body p-2 pr-4 position-relative">
			<div class="row no-gutters">
				<div class="col position-relative">
					<div v-if="(forceLink || !isImg) && attachment.url" class="text-truncate">
						<a :href="attachment.url" class="text-truncate">{{attachment.name}}</a>
					</div>
					<div v-else class="text-truncate">{{attachment.name}}</div>
				</div>
				<div v-if="controls && attachment.state!='uploading'" @click.stop="$emit('deleteAttachment', attachment)" class="position-absolute text-muted" style="right:5px; cursor: pointer;">
					<i class="material-icons-outlined">close</i>
				</div>
			</div>
		</div>
		<div v-if="attachment.state=='uploading'" :style="{ width: attachment.progress+'%', height: '5px', backgroundColor: '#0F0' }"></div> -->
  </div>
</template>

<script>
export default {
  props: {
    value: Object,
    controls: {
      type: Boolean,
      default: true,
    },
    forceLink: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      attachment: this.value,
    };
  },
  mounted() {
   
  },
  created() {
    
  },
  computed: {
 

    previewUrl() {
      if (this.attachment.imagen && this.attachment.imagen[65536])
        return this.attachment.imagen[65536];
      else return this.attachment.imagen;
    },
  },
  watch: {
   
  },
  methods: {
   
  },
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>