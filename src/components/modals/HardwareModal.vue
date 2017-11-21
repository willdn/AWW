<template>
  <modal
    name="hardwareModal"
    height="auto">
      <div class="ui container center aligned hardware-modal">
        <span>Waiting for Ledger <i class="fa fa-spinner fa-spin"></i></span>
      </div>
  </modal>
</template>

<script>

export default {
  name: 'hardwareModal',
  data () {
    return {
    }
  },
  methods: {
    setCurrency (curr) {
      this.$modal.hide('hardwareModal')
    },
    closeModal () {
      this.$modal.hide('hardwareModal')
    }
  },
  mounted () {
  }
}
</script>
<style scoped>
.hardware-modal {
  padding: 1.5em;
}
</style>
