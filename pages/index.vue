<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="logo py-4 d-flex justify-center">
        <NuxtLogo />
      </v-card>
      <v-card>
        <v-card-title class="headline"> Welcome </v-card-title>
        <v-card-text> </v-card-text>
        <v-card-actions>
          <!-- <v-spacer /> -->
          <v-btn color="primary" nuxt to="/inspire"> Continue </v-btn>
          <v-btn color="primary" nuxt to="/input"> 入力画面へ </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'IndexPage',
}
</script>
