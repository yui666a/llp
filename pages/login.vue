<template>
  <v-row>
    <v-col class="text-center">
      Login
      <div>
        ID
        <input v-model="idText" type="text" />
      </div>
      <div>
        パスワード
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
    async submit() {
      const url = `/gas/exec?type=login&name=${this.id}&pw=${this.password}`
      const response = await this.$axios.$get(url)
      localStorage.displayName = response.data.displayName
      localStorage.id = response.data.id
      localStorage.lineId = response.data.lineId
      this.$router.push('/')
    },
  },
}
</script>
