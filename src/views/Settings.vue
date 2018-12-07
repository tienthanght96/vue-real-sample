<template>
  <div class="container">
    <a-row>
      <a-col :span="12" :offset="6">
        <h1>Your Setting</h1>
        <ErrorMessages :errors="errors" />
        <a-input placeholder="Image url" size="large" v-model="infoUser.image">
          <a-icon slot="prefix" type='picture' style="color:rgba(0,0,0,.25)"/>
        </a-input>
        <br /><br />
        <a-input placeholder="Username" size="large" v-model="infoUser.username">
          <a-icon slot="prefix" type='user' style="color:rgba(0,0,0,.25)"/>
        </a-input>
        <br /><br />
        <a-textarea placeholder="Bio about you" :rows="4" size="large" v-model="infoUser.bio">
        </a-textarea>
        <br /><br />
        <a-input placeholder="Email" size="large" v-model="infoUser.email">
          <a-icon slot="prefix" type='mail' style="color:rgba(0,0,0,.25)"/>
        </a-input>
        <br /><br />
        <div>
          <a-button type="primary" size="large"  @click="onUpdateUserInfo" :loading="this.isSubmitting">
            Update Settings
          </a-button>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script>
  import { mapActions, mapGetters } from 'vuex';
  import ErrorMessages from '@/components/ErrorMessages.vue';
  import { getToken } from '@/utils/localStorage';

  export default {
    components: {
      ErrorMessages
    },
    data(){
      return {
        infoUser: {}
      }
    },
    computed: {
      ...mapGetters(['errors', 'isSubmitting', 'user']),
    },
    methods: {
      ...mapActions({
        updateUserInfo: 'UPDATE_USER_INFO'
      }),
      updateUserInfoSuccess(){
        this.$message.success('Update info user success !');
      },
      onUpdateUserInfo(){
        const { email, username, password, image, bio } = this.infoUser;
        const user = { email, username, password, image, bio };
        this.updateUserInfo({
          user,
          callback: this.updateUserInfoSuccess
        });
      }
    },
    watch: {
      user(){
        this.infoUser = { ...this.user };
      }
    },
    mounted(){
      this.infoUser = { ...this.user };
    }
  }
</script>
