<template>
  <div class="ui container">
    <!-- Send header -->
    <div class="ui header left aligned">
      <i class="fa fa-thumbs-up"></i>
      <div class="content">
        Vote
      </div>
    </div>
    <div class="ui segment">
      <!-- Account has already delegate -->
      <div v-if="currentDelegate" class="ui warning message">
        You are already voting for <b>{{ currentDelegate.username }}</b> as delegate
      </div>
      <form class="ui form">
        <div v-if="delegates.length > 0" class="field">
          <label>Forging delegates</label>
          <div class="ui input">
            <select v-model="selectedDelegate">
              <option v-for="delegate in delegates" :value="delegate.username" :key="delegate.username">
                {{ delegate.username }} (Approval : {{ delegate.approval }}) - Productivity : ({{ delegate.productivity }})
              </option>
            </select>
          </div>
          <div class="field">
            <label>Delegate name</label>
            <div class="ui input">
              <input v-model="delegateName" class="input" type="text" placeholder="Enter delegate name">
            </div>
          </div>
        </div>
        <div class="field">
          <label>Passphrase</label>
            <div class="ui action input">
              <input v-model="passphrase" class="input" type="password" placeholder="Enter passphrase">
              <button @click.prevent="openCodeScanner()" class="ui basic button">
                <i class="fa fa-qrcode"></i>
              </button>
            </div>
        </div>
        <button @click.prevent="vote()" class="ui button green">
          <i class="fa fa-thumbs-up"></i>
          Vote
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import * as jark from 'jark'
import { errorNotification } from '../api/notification'

export default {
  name: 'delegateVote',
  data () {
    return {
      selectedDelegate: null,
      delegateName: '',
      passphrase: '',
      delegates: []
    }
  },
  watch: {
    selectedDelegate (delegate) {
      this.delegateName = delegate
    },
    qrScanner (scanner) {
      if (scanner.action === 'SignTransaction') {
        this.passphrase = scanner.payload
      }
      this.$store.dispatch('clearCodeScanned')
    }
  },
  computed: {
    wallet () {
      return this.$store.getters.wallet
    },
    qrScanner () {
      return this.$store.getters.qrScanner
    },
    currentDelegate () {
      return this.wallet.delegate
    }
  },
  methods: {
    vote () {
      if (this.delegateName === '') return errorNotification('Delegate not selected')
      if (this.passphrase === '') return errorNotification('Passphrase is not valid')
      jark.getDelegateByUsername(this.delegateName)
        .then((delegate) => {
          if (delegate) {
            this.createVoteTransaction(delegate.publicKey)
          } else {
            return errorNotification('Delegate not found')
          }
        })
    },
    createVoteTransaction (delegatePublicKey) {
      const tx = jark.createVoteTransaction({
        passphrase: this.passphrase,
        delegates: [`+${delegatePublicKey}`],
        secondPassphrase: null
      })
      console.log(tx)
      this.$modal.show('confirmSendModal', {
        transaction: tx
      })
    },
    openCodeScanner (action) {
      this.$modal.show('scanCodeModal', {
        action: 'SignTransaction'
      })
    }
  },
  mounted () {
    jark.getDelegates({
      'limit': 51,
      'orderBy': 'rate:asc'
    })
    .then((delegates) => {
      this.delegates = delegates
    })
  }
}
</script>

<style scoped>

</style>