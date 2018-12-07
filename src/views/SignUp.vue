<template>
  <div class="container">
    <a-row>
      <a-col :span="12" :offset="6">
        <h1>Sign up</h1>
        <ErrorMessages :errors="errors" />
        <router-link to="/user/signin">Have an account?</router-link>
        <br /><br />
         <a-input placeholder="Username" size="large" v-model="username">
          <a-icon slot="prefix" type='user' style="color:rgba(0,0,0,.25)"/>
        </a-input>
        <br /><br />
        <a-input placeholder="Email" size="large" v-model="email">
          <a-icon slot="prefix" type='mail' style="color:rgba(0,0,0,.25)"/>
        </a-input>
        <br /><br />
        <a-input type='password' placeholder='Password' size="large" v-model="passowrd">
          <a-icon slot="prefix" type='lock' style="color:rgba(0,0,0,.25)"/>
        </a-input>
        <br /><br />
        <div>
          <a-button type="primary" size="large" :disabled="disabled" @click="onSignUp" :loading="this.isSubmitting">
            Sign up
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
        username: '',
        email: '',
        passowrd: '',
      }
    },
    computed: {
      ...mapGetters(['errors', 'isSubmitting', 'errors']),
      disabled(){
        return (this.email.trim().length < 1 || this.passowrd.trim().length < 1 || this.username.trim().length < 1);
      }
    },
    beforeRouteEnter (to, from, next) {
      if(getToken()){
        next({ name: 'home' });
      } else {
        next();
      }
    },
    methods: {
      ...mapActions({
        signup: 'REGISTER'
      }),
       redirectToHome(){
        this.$router.push({ name: 'home' });
      },
      onSignUp(){
         this.signup({
          user: { email: this.email, password: this.passowrd, username: this.username },
          callback: this.redirectToHome
        });
      }
    }
  }
</script>
