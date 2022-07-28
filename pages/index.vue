<template>
  <v-form class="">
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
  </v-form>
</template>

<script>
export default {
  name: 'IndexPage',
}
</script>
