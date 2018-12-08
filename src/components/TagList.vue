<template>
  <div>
    <h4>Popular Tags</h4>
    <div class="example" v-if="isLoading && tags.length < 1">
      <a-spin />
    </div>
    <ul class="tags__list" v-else-if="tags.length > 0">
      <li v-for="(tag, index) in tags" :key="index" @click="onClickTag(tag)">
        <a-badge :count="tag" :numberStyle= "{backgroundColor: '#5cb85c'} " />
      </li>
    </ul>
    <!-- <p v-else>No tags !</p> -->
  </div>
</template>
<script>
  
  export default {
    name: "TagList",
    props: {
      tags: { type: Array, required: true },
      isLoading: { type: Boolean, required: true },
    },
    methods:{
      onClickTag(tag){
        this.$emit("clickTag", tag);
      }
    }
  }
</script>
<style lang="scss">
  .example {
    text-align: center;
    margin-bottom: 20px;
    padding: 30px;
  }
  .tags__list{
    list-style: none;
    padding: 0;
    margin: 0;
    li {
      display: inline-block;
      margin: 3px;
      cursor: pointer;
    }
  }
</style>
