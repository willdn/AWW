<template>
  <modal
    name="confirmPassModal"
    height="auto"
    :adaptive="true"
    @before-open="beforeOpen"
    @closed="closed">
      <div class="ui container center aligned confirm-pass-modal">
        <div class="ui header">
          Confirm passphrase
        </div>
        <div class="ui segment basic">
          Please enter the 3rd, 6th and 9th word of your passphrase
        </div>
        <form class="ui form">
          <div class="three fields">
            <div class="field">
              <input v-model="word1" class="input" type="text" placeholder="3rd word">
            </div>
            <div class="field">
              <input v-model="word2" class="input" type="text" placeholder="6th word">
            </div>
            <div class="field">
              <input v-model="word3" class="input" type="text" placeholder="9th word">
            </div>
          </div>
          <div class="ui segment basic">
            <button @click.prevent="confirm()" class="ui button compact green">
              <i class="fa fa-unlock"></i>
              Open
            </button>
            <button class="ui button compact basic"
              @click.prevent="close()">
              <i class="fa fa-remove"></i>
              Close
            </button>
          </div>
        </form>
      </div>
  </modal>
</template>

<script>
import { errorNotification } from '../../api/notification'

export default {
  name: 'confirmPassModal',
  data () {
    return {
      wallet: null,
      word1: null,
      word2: null,
      word3: null
    }
  },
  computed: {
    passArray () {
      return this.wallet.passphrase.split(' ')
    }
  },
  methods: {
    confirm () {
      if (this.word1 === this.passArray[2] &&
          this.word2 === this.passArray[5] &&
          this.word3 === this.passArray[8]) {
        this.$store.dispatch('openWallet', {
          address: this.wallet.address,
          publicKey: this.wallet.publicKey
        })
        this.$router.push({ name: 'Wallet' })
        this.wallet = null
      } else {
        errorNotification('Words does not match passphrase')
      }
    },
    close () {
      this.$modal.hide('confirmPassModal')
    },
    beforeOpen (event) {
      this.wallet = event.params.wallet
    },
    closed (event) {
      this.wallet = null
      this.word1 = this.word2 = this.word3 = null
    }
  }
}
</script>
<style scoped>
.confirm-pass-modal {
  padding: 1.5em;
}
</style>
