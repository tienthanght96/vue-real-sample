<template>
  <ul v-if="errors && errors.length > 0" class="errors__list">
    <li v-for="(error, index) in errors" :key="index" class="errors__list__item">{{ error }}</li>
  </ul>
</template>
<script>
export default {
  props: {
    errors: { type: Array, required: true }
  }
}
</script>

<style lang="scss" scoped>
  .errors__list {
    margin: 0;
    padding: 0;
    &__item {
      color: #f5222d;
      font-weight: bold;
    }
  }
</style>

