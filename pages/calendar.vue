<template>
  <v-row>
    <v-col class="text-center">
      <v-calendar
        ref="calendar"
        :events="events"
        :event-color="getEventColor"
        @change="getEvents"
      />
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'CalendarPage',
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
