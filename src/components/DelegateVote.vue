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
      <form class="ui form">
        <div v-if="delegates.length > 0" class="field">
          <label>Delegate name</label>
          <div class="ui input">
            <select v-model="selectedDelegate">
              <option v-for="delegate in delegates" :value="delegate.username" :key="delegate.username">
                {{ delegate.username }} (Approval : {{ delegate.approval }}) - Productivity : {{ delegate.productivity }})
              </option>
            </select>
          </div>
        </div>

      </form>

    </div>
  </div>
</template>

<script>
import * as jark from 'jark'

export default {
  name: 'delegateVote',
  data () {
    return {
      selectedDelegate: null,
      delegates: []
    }
  },
  computed: {
    wallet () {
      return this.$store.getters.wallet
    }
  },
  methods: {

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