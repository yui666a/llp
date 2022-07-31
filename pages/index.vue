<template>
  <div>
    <video
      :src="`${base}holo.mp4`"
      loop
      autoplay
      muted
      playsinline
      preload
      class="holo"
    ></video>
    <div class="text-center">
      おはようございます。<br />
      今日はスイカの日だそうです。<br />
      最近は調子が良さそうですね！<br />
      色々なことに挑戦してみませんか？
    </div>
    <div class="text-center">
      <div>
        <v-btn color="success" nuxt to="/suggest"> 今日の予定は？ </v-btn>
      </div>
    </div>

    <!-- <Artwork /> -->
    <!-- <div id="container"></div> -->
  </div>
  <!-- <v-form class="">
    <v-card color="green lighten-3" class="py-5 my-5">
      <v-container>
        <v-row>
          おはようございます。今日は調子が良さそうですね！色々なことに挑戦しましょう！
        </v-row>
      </v-container>
    </v-card>
    <v-container>
      <v-row>
        <v-col cols="12" class="orange lighten-3 py-5 my-5">
          <v-btn nuxt to="/calendar" color="amber" elevation="6" x-large>
            <v-icon x-large>mdi-table-large</v-icon>
            <div>カレンダー</div>
          </v-btn>
        </v-col>
        <v-col cols="12" class="red lighten-3 py-5 my-5">
          <v-btn nuxt to="/input" color="red" elevation="6" x-large>
            <v-icon x-large>mdi-account-heart</v-icon>
            <div>カラダ・ココロチェック</div>
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="blue lighten-3 py-5 my-5">
          <v-btn nuxt to="/condition" color="blue" elevation="6" x-large>
            <v-icon x-large>mdi-chart-bar</v-icon>
            <div>コンディショングラフ</div>
          </v-btn>
        </v-col>
        <v-col cols="12" class="yellow lighten-3 py-5 my-5">
          <v-btn color="yellow" elevation="6" x-large>
            <v-icon x-large>mdi-head-snowflake-outline</v-icon>
            <div>オートレコメンド</div>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form> -->
</template>

<script>
// import Artwork from '~/components/Artwork'

export default {
  name: 'IndexPage',
  // components: {
  //   Artwork,
  // },
  // head() {
  //   return {
  //     title: 'Payment Page - My awesome project', // Other meta information
  //     // script: [
  //     //   { hid: 'stripe', src: '', defer: true }
  //     // ]
  //   }
  // },
  // watch: {
  //   // routeが変わるときにシーンを変えるなどなにか処理する
  //   // eslint-disable-next-line object-shorthand
  //   '$route.name': function (_new, _old) {},
  // },

  data() {
    return {
      base: '',
    }
  },

  mounted() {
    // this.init()
    const environment = process.env.NODE_ENV || 'local'
    const env = require(`../env/${environment}.ts`)
    this.base = env.BASE_URL
  },
  methods: {},
}
</script>

<style scoped>
video {
  /* iPhone safariの枠線を消す */
  filter: drop-shadow(0 0 #000);

  /* PCのChromeの枠線を消す */
  outline: none;
  border: none;
}

.holo {
  width: 100vw;
  height: 100vw;
}
</style>
