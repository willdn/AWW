<template>
  <modal
    name="donationModal"
    height="auto"
    :adaptive="true">
      <div class="ui container center aligned donation-modal">
        <img class="ui centered image" width="148" :src="QRDonationAddress" />
        <div class="ui small header">{{ donationAddress }}</div>
      </div>
  </modal>
</template>

<script>
import { donationAddress } from '../../api'
import QRCode from 'qrcode'

export default {
  name: 'donationModal',
  data () {
    return {
      QRDonationAddress: null,
      donationAddress: donationAddress
    }
  },
  mounted () {
    this.$nextTick(() => {
      QRCode.toDataURL(donationAddress, (err, url) => {
        if (err) console.log(err)
        this.QRDonationAddress = url
      })
    })
  }
}
</script>
<style scoped>
.donation-modal {
  padding: 1.5em;
}
</style>
