<template>
  <div class="ui container">
    <div id="box" class="ui middle aligned center aligned grid">
      <div class="column">
        <h2 class="ui header">
          <div class="content">
            Ark Web Wallet
          </div>
        </h2>
          <div class="ui segment">
            <div class="ui equal width grid">
              <div class="column">
                <router-link :to="{ name: 'NewWallet'}" class="ui button teal">
                  <i class="fa fa-rocket"></i>
                  New Wallet
                </router-link>
              </div>
              <div class="column">
                <router-link :to="{ name: 'OpenWallet'}" class="ui button green">
                  <i class="fa fa-unlock"></i>
                  Open Wallet
                </router-link>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'main'
}
</script>

<style scoped>

</style>