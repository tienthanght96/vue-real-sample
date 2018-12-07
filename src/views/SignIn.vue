<template>
  <div class="container">
    <a-row>
      <a-col :span="12" :offset="6">
        <h1>Sign in</h1>
        <ErrorMessages :errors="errors" />
        <router-link to="/user/signup">Need an account?</router-link>
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
          <a-button type="primary" size="large" :disabled="disabled" @click="onLogin" :loading="this.isSubmitting">
            Sign in
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
        email: '',
        passowrd: '',
      }
    },
    computed: {
      ...mapGetters(['errors', 'isSubmitting', 'errors']),
      disabled(){
        return (this.email.trim().length < 1 || this.passowrd.trim().length < 1);
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
        login: 'LOGIN'
      }),
      redirectToHome(){
        this.$router.push({ name: 'home' });
      },
      onLogin(){
        this.login({
          user: { email: this.email, password: this.passowrd },
          callback: this.redirectToHome
        });
      }
    }
  }
</script>

