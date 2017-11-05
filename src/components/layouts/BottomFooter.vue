<template>
  <div class="ui segment fluid center aligned footer">
    <div class="ui grid equal width center aligned">
      <div class="column">
        <a target="_blank" href="https://github.com/willdn/AWW" class="footer-link">
          <i class="fa fa-github fa-lg"></i> Github
        </a>
      </div>
      <div class="column">
        <a target="_blank" href="https://ark.io" class="footer-link">
          <img class="ui spaced image" :src="require('../../assets/img/ark-icon.png')">
          Ark
        </a>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'bottomFooter',
  data () {
    return {
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
</style>
