<template>
  <modal
    name="confirmSendModal"
    height="auto"
    :adaptive="true"
    @before-open="beforeOpen"
    @closed="closed">
      <div class="ui container center aligned confirm-send-modal"
           v-if="transaction">
        <div class="ui header">
          Confirm transaction ?
          <div v-if="transaction.type === 3" class="sub header">
            Vote transaction
          </div>
        </div>
        <div class="ui column grid container left aligned">
          <div class="two column row">
            <div class="column six wide">To</div>
            <div class="column ten wide">
              <div class="ui small header">{{ transaction.recipientId }}</div>
            </div>
          </div>
          <div class="two column row">
            <div class="column six wide">Amount</div>
            <div class="column ten wide">
              <div class="ui small header">{{ amount }} {{ networkType.symbol }}</div>
            </div>
          </div>
          <div class="two column row">
            <div class="column six wide">Fee</div>
            <div class="column ten wide">
              <div class="ui small header">{{ fee }} {{ networkType.symbol }}</div>
            </div>
          </div>
        </div>

        <div class="ui segment basic">
          <button class="ui button green compact"
            @click.prevent="confirm()">
            <i class="fa fa-check"></i>
            Yes
          </button>
          <button class="ui button red compact basic"
            @click.prevent="cancel()">
            <i class="fa fa-remove"></i>
            No
          </button>
        </div>
      </div>
  </modal>
</template>

<script>
import { sendTransaction } from '../../api/transaction'

export default {
  name: 'confirmSendModal',
  data () {
    return {
      transaction: null
    }
  },
  computed: {
    amount () {
      return this.transaction.amount / Math.pow(10, 8)
    },
    fee () {
      return this.transaction.fee / Math.pow(10, 8)
    },
    networkType () {
      return this.$store.getters.networkType
    }
  },
  mounted () {
  },
  methods: {
    confirm () {
      this.$modal.hide('confirmSendModal')
      this.$store.dispatch('setTransactionSending', true)
      sendTransaction(this.transaction)
    },
    cancel () {
      this.$modal.hide('confirmSendModal')
    },
    beforeOpen (event) {
      this.transaction = event.params.transaction
    },
    closed (event) {
    }
  }
}
</script>
<style scoped>
.confirm-send-modal {
  padding: 1.5em;
}
</style>
