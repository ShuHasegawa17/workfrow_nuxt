<template>
  <div class="container">
    <h2>{{ article.title }}</h2>
    <div v-html="article.body"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ArticleData from '~/types/article'

export default Vue.extend({
  props: {
    article: Object as () => ArticleData,
  },
})
</script>

<style lang="scss" scoped>
$main-border-color: #000;
.container {
  padding: 20px;
  border: 2px solid $main-border-color;
  border-radius: 10px;

  h2 {
    margin-bottom: 12px;
    font-size: 24px;
  }
}
</style>
