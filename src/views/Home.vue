<template>
  <div class="home">
    <Banner />
    <a-row>
      <a-col :span="16">
        <ul class="home__tab">
          <li v-if="user.id">
            <router-link
              :to="{ name: 'my-feed' }"
              exact
              class="home__tab__item"
              active-class="active"
            >
              Your Feed
            </router-link>
          </li>
          <li>
            <router-link
              :to="{ name: 'home' }"
              exact
              class="home__tab__item"
              active-class="active"
            >
              Global Feed
            </router-link>
          </li>
          <li v-if="$route.params.tag || selectedTag.tag">
            <router-link
              :to="{ name: 'home-tag', params: { tag: $route.params.tag || selectedTag.tag }}"
              class="home__tab__item"
              active-class="active"
            >
              #{{ $route.params.tag || selectedTag.tag }}
            </router-link>
          </li>
        </ul>
        <router-view></router-view>
      </a-col>
      <a-col :span="8">
        <div class="home__tags">
          <a-card>
            <TagList :tags="tags" :isLoading="isLoading" @clickTag="selectedTag = { tag: $event, selected: true } "/>
          </a-card>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
// @ is an alias to /src
import TagList from "@/components/TagList.vue";
import Banner from "@/components/Banner.vue";
import { mapActions, mapGetters } from 'vuex';

export default {
  name: "home",
  components: {
    TagList,
    Banner
  },
  data(){
    return {
      selectedTag: {
        selected: false,
        tag: null
      },
    }
  },
  watch: {
    selectedTag(){
      if(this.selectedTag.tag && this.selectedTag.selected){
        this.$router.push({ name: 'home-tag', params: { tag: this.selectedTag.tag } })
      }
    },
    $route (to, from){
      if(this.selectedTag.selected && Object.keys(to.params).length < 1){
        this.selectedTag = {
          selected: false,
          tag: this.selectedTag.tag
        };
      }
      if(Object.keys(from.params).length > 0 && from.params.tag){
        this.selectedTag = {
          tag: from.params.tag,
          selected: false
        };
      }
    },
  },
  methods: {
    ...mapActions({
      getTags: 'FETCH_TAGS'
    })
  },
  computed: {
    ...mapGetters(['tags', 'isLoading', 'user'])
  },
  mounted(){
    this.getTags();
  },
};
</script>

<style lang="scss" scoped>
  .home__tab {
    display: flex;
    align-items: center;
    list-style: none;
    border-bottom: 1px solid #e8e8e8;
    margin: 0;
    padding: 0;
    margin-bottom: -1px;
    &__item {
      border-bottom: 2px solid transparent;
      font-weight: 500;
      transition: color .3s cubic-bezier(.645,.045,.355,1);
      margin: 0 32px 0 0;
      padding: 12px 16px;
      display: inline-block;
      text-decoration: none;
      min-width: 100px;
      text-align: center;
      &.active, &:hover, &:active {
        color: #1890ff;
        border-color: #1890ff;
      }
    }
  }
  .home__tags {
    padding: 0 20px;
    h4 {
      font-size: 16px;
    }
  }
</style>

