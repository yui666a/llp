<template>
  <v-row>
    <v-col class="text-center input-area">
      <div>カラダ</div>
      <span v-for="n of 5" :key="`body ${n}`">
        <font-awesome
          :icon="['fas', 'star']"
          :style="{ color: n <= bodyConditionNumber ? '#ffc107' : '#e4e5e9' }"
          @click="onClickBodyCondition(n)"
        />
      </span>
      <div>ココロ</div>
      <span v-for="n of 5" :key="`mental ${n}`">
        <font-awesome
          :icon="['fas', 'star']"
          :style="{ color: n <= mentalConditionNumber ? '#ffc107' : '#e4e5e9' }"
          @click="onClickMentalCondition(n)"
        />
      </span>
      <div class="hitokoto">
        <div>ひとこと</div>
        <v-col cols="12" md="6">
          <v-textarea
            outlined
            name="input-7-4"
            label="ちょっとしたひとこと"
            value=""
          ></v-textarea>
        </v-col>
      </div>
      <div>
        <v-btn color="success" @click="confirmCondition"> 完了 </v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script>
const jsonpAdapter = require('axios-jsonp')
export default {
  name: 'InspirePage',
  data() {
    return {
      mentalConditionNumber: 0,
      bodyConditionNumber: 0,
    }
  },
  methods: {
    onClickBodyCondition(event) {
      this.bodyConditionNumber = event === this.bodyConditionNumber ? 0 : event
    },
    onClickMentalCondition(event) {
      this.mentalConditionNumber =
        event === this.mentalConditionNumber ? 0 : event
    },
    async confirmCondition() {
      // TODO: ここにDB登録処理を書く
      const data = {
        type: 'input',
        lineId: localStorage.lineId,
        mental: this.mentalConditionNumber,
        body: this.bodyConditionNumber,
      }
      const response = await this.$axios.$get(this.$GAS_API, {
        adapter: jsonpAdapter,
        params: data,
      })

      console.log(response)
      this.$router.push('/')
    },
  },
}
</script>
<style lang="scss" scoped>
.input-area {
  font-size: 1.5rem;
}
.hitokoto {
  margin-top: 3rem;
}
</style>
