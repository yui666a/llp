<template>
  <v-row>
    <v-col class="text-center">
      <div>カラダ{{ bodyConditionNumber }}</div>
      <span v-for="n of 5" :key="`body ${n}`">
        <font-awesome
          :icon="['fas', 'star']"
          :style="{ color: n <= bodyConditionNumber ? '#ffc107' : '#e4e5e9' }"
          @click="onClickBodyCondition(n)"
        />
      </span>
      <div>ココロ{{ mentalConditionNumber }}</div>
      <span v-for="n of 5" :key="`mental ${n}`">
        <font-awesome
          :icon="['fas', 'star']"
          :style="{ color: n <= mentalConditionNumber ? '#ffc107' : '#e4e5e9' }"
          @click="onClickMentalCondition(n)"
        />
      </span>
      <div>
        <v-btn color="success" @click="confirmCondition"> 完了 </v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script>
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
      const lineId = localStorage.lineId
      const getUrl = `https://script.google.com/macros/s/AKfycbxPUw73VyxjmzRw96UVsIpuPUlDvI9qFYF4MzpwOecly-KTiQrBv9jwu0sUVZ49b09N/exec?type=input&lineId=${lineId}&mental=${this.mentalConditionNumber}&body=${this.bodyConditionNumber}`
      const response = await this.$axios.$get(getUrl, {
        adapter: jsonpAdapter,
      })
      console.log(response)
      this.$router.push('/')
    },
  },
}
</script>
