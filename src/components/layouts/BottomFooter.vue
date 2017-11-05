<template>
  <div class="ui segment fluid center aligned footer">
    <div class="ui grid equal width center aligned">
      <a target="_blank" href="https://github.com/willdn/AWW" class="column footer-link">
        <i class="fa fa-github fa-lg"></i> Github
      </a>
      <a target="_blank" href="https://ark.io" class="column footer-link">
        <img class="ui spaced image" :src="require('../../assets/img/ark-icon.png')">
        Ark
      </a>
      <a @click.prevent="donationModal()" class="column footer-link">
        <b>Donation</b>: {{ donationAddress }}
      </a>
    </div>
  </div>
</template>

<script>
import { truncateHash } from '../../api/utils'
import { donationAddress } from '../../api'

export default {
  name: 'bottomFooter',
  computed: {
    donationAddress () {
      return truncateHash(donationAddress, 5)
    }
  },
  methods: {
    donationModal () {
      this.$modal.show('donationModal')
    }
  }
}
</script>

<style scoped>
.footer {
  background: rgba(64, 64, 64, 0.33);
  border-radius: 0em;
  margin-top: 2.5em;
}
.footer-link {
  font-weight: bold;
  color: rgba(0,0,0,.87);
}
.footer-link:hover {
  background: rgba(64, 64, 64, 0.1);
}
</style>
