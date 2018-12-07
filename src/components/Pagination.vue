<template>
  <a-pagination
    @change="onChangePage"
    :current="currentPage"
    :total="totalPage"
    :pageSize="pageSize"
    :showSizeChanger="true"
    @showSizeChange="onShowSizeChange"
  />
</template>
<script>
  export default {
    props: {
      pageSize: { type: Number, required: true, default: 10 },
      currentPage: { type: Number, required: true, default: 1 },
      totalPage: { type: Number, required: true, default: 0 },
    },
    methods:{
      onChangePage(goToPage){
        this.$emit("changePage", goToPage);
      },
      onShowSizeChange(current, pageSize){
        this.$emit("changePageSize", pageSize);
      }
    },
  };
</script>

