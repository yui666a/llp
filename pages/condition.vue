<template>
  <v-row>
    <v-col class="text-center">
      <!-- <ConditionChart /> -->
      <!-- <ConditionChart :chart-data="datacollection"></ConditionChart> -->
      <LineConditionChart
        :chart-data="chartdata.datacollection"
        :chart-options="options"
      />
      <div class="text-center">
        <v-btn depressed small @click="fillData()">Randomize</v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'ConditionPage',
  data() {
    return {
      chartdata: {
        datacollection: {
          labels: ['January', 'February'],
          datasets: [
            {
              label: 'Data One',
              backgroundColor: '#f87979',
              data: [40, 20],
            },
          ],
        },
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    }
  },
  mounted() {
    this.fillData()
  },
  methods: {
    fillData() {
      this.datacollection = {
        labels: [this.getRandomInt(), this.getRandomInt()],
        datasets: [
          {
            label: 'Test Data1',
            backgroundColor: 'rgba(255, 100, 130, 0.2)',
            data: [this.getRandomInt(), this.getRandomInt()],
          },
          {
            label: 'Test Data2',
            backgroundColor: 'rgba(100, 130, 255, 0.2)',
            data: [this.getRandomInt(), this.getRandomInt()],
          },
          {
            label: 'Test Data3',
            backgroundColor: 'rgba(130, 255, 100, 0.2)',
            data: [this.getRandomInt(), this.getRandomInt()],
          },
        ],
      }
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    },
  },
}
</script>
