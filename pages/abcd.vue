<template>
  <v-row>
    <v-col class="text-center">
      <img :src="`${base}v.png`" alt="Vuetify.js" class="mb-5" />
      <blockquote class="blockquote">
        &#8220;First, solve the problem. Then, write the code.&#8221;
        <footer>
          <small>
            <em>&mdash;John Johnson</em>
          </small>
        </footer>
      </blockquote>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'InspirePage',
  data() {
    return {
      base: '',
    }
  },
  mounted() {
    const environment = process.env.NODE_ENV || 'local'
    const env = require(`../env/${environment}.ts`)
    this.base = env.BASE_URL
  },
}
</script>
