<template>
  <v-row>
    <v-col class="text-center">
      Login
      <div>
        ID
        <input type="text" />
      </div>
      <div>
        パスワード
        <input type="text" />
      </div>
      <v-btn color="primary"> ログイン </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      mentalConditionNumber: 0,
      bodyConditionNumber: 0,
    }
  },
  methods: {},
}
</script>
