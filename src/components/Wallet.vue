<template>
  <div class="ui container center aligned">

      <div v-if="wallet && balance" class="ui segment center aligned">
        <div class="ui equal width stackable grid">
          <div class="ui column center aligned">
            <img class="ui centered image" :src="QRAddress" />
            {{ wallet.address }}
            <a
              v-clipboard="this.wallet.address"
              @success="copySuccess()">
              <i class="icon copy"></i>
            </a>
          </div>
          <div class="ui column middle aligned">
            <div class="ui equal width grid center aligned">
              <div class="ui column">
                <div class="ui button teal compact"
                    :class="{ 'basic': !sendFormVisible }"
                    @click.prevent="toggleSendForm()">
                  <i class="ui icon send outline"></i>
                  Send
                </div>
              </div>
              <div class="ui column">
                <div class="ui button blue compact basic"
                    :class="{ 'disabled': refreshing }"
                    @click.prevent="refresh()">
                  <i class="ui icon refresh" :class="{ 'loading': refreshing }"></i>
                  Refresh
                </div>
              </div>
              <div class="ui column">
                <div class="ui button green compact basic"
                  @click.prevent="claim()">
                  <i class="ui icon announcement"></i>
                  Claim GAS
                </div>
              </div>
            </div>
            <div class="ui equal width grid center aligned">
              <div class="ui column">
                <div class="ui header" v-if="!refreshing">0</div>
                <i v-if="refreshing" class="ui icon refresh loading"></i>
                NEO
              </div>
              <div class="ui column">
                <div class="ui header">0</div>
                GAS
              </div>
            </div>
          </div>
        </div>
      </div>
      <send v-if="sendFormVisible"></send>
      <!-- Transaction header -->
      <div class="ui header left aligned">
        <i class="ui icon exchange"></i>
        <div class="content">
          Transactions
        </div>
      </div>
      <!--
      <div
        class="ui cards"
        v-for="transaction in transactions"
        :key="transaction.txid">
        <transaction :tx="transaction"></transaction>
      </div>
      <i v-if="refreshing" class="ui icon refresh loading"></i>
      <div v-if="transactions && transactions.length === 0" class="ui segment center aligned">
        No transactions
      </div>
      -->
  </div>
</template>

<script>
import { clipboardNotification } from '../api/notification'
// import Transaction from './Transaction'
import Send from './Send'
import QRCode from 'qrcode'

export default {
  name: 'wallet',
  components: {
    // Transaction,
    Send
  },
  data () {
    return {
      refreshing: false,
      transactions: null,
      balance: null,
      claimAmounts: null,
      QRAddress: null
    }
  },
  computed: {
    wallet () {
      return this.$store.getters.wallet
    },
    networkType () {
      return this.$store.getters.networkType
    },
    sendFormVisible () {
      return this.$store.getters.app.sendFormVisible
    }
  },
  watch: {
    networkType (val) {
      this.getTransactions()
      this.getBalance()
      this.getClaimAmounts()
    }
  },
  methods: {
    toggleSendForm () {
      this.$store.dispatch('toggleSendForm')
    },
    refresh () {

    },
    copySuccess () {
      clipboardNotification()
    }
  },
  mounted () {
    if (!this.$store.getters.wallet.open) {
      this.$router.push({ name: 'OpenWallet' })
      return null
    }
    setInterval(() => {
      this.getTransactions()
      this.getBalance()
      this.getClaimAmounts()
    }, 15000)
    this.$nextTick(() => {
      QRCode.toDataURL(this.$store.getters.wallet.address, (err, url) => {
        if (err) console.log(err)
        this.QRAddress = url
      })
    })
  }
}
</script>

<style scoped>

</style>