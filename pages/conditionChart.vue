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
    confirmCondition() {
      // TODO: ここにDB登録処理を書く
      console.log(`mentalConditionNumber: ${this.mentalConditionNumber}`)
      console.log(`bodyConditionNumber: ${this.bodyConditionNumber}`)
      this.$router.push('/')
    },
  },
}
</script>
