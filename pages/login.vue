<template>
  <v-row>
    <v-col class="text-center">
      Login
      <div>
        ID {{ id }}
        <input v-model="idText" type="text" />
      </div>
      <div>
        パスワード {{ password }}
        <input v-model="passwordText" type="text" />
      </div>
      <v-btn color="primary" @click="submit"> ログイン </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      id: '',
      password: '',
    }
  },
  computed: {
    idText: {
      get() {
        return this.id
      },
      set(value) {
        this.id = value
      },
    },
    passwordText: {
      get() {
        return this.password
      },
      set(value) {
        this.password = value
      },
    },
  },
  methods: {
    submit() {
      this.name = localStorage.name
      localStorage.id = this.id
      localStorage.password = this.password
      this.$router.push('/')
    },
  },
}
</script>
