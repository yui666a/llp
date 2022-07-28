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
          labels: [
            '2021-08-02 09:30',
            '2021-08-02 11:10',
            '2021-08-02 13:00',
            '2021-08-02 15:00',
            '2021-08-02 18:30',
            '2021-08-02 19:50',
          ],
          datasets: [
            {
              label: 'ココロ',
              data: [3, 3, 4, 3, 2, 4],
              borderColor: 'rgba(255, 99, 132, 1)',
              backgroundColor: 'rgba(255, 99, 132, 0.1)',
            },
            {
              label: 'カラダ',
              data: [4, 4, 3, 3, 2, 4],
              borderColor: 'rgba(132, 99, 255, 1)',
              backgroundColor: 'rgba(132, 99, 255, 0.1)',
            },
          ],

          // labels: ['data1', 'data2', 'data3', 'data4', 'data5', 'data6'],
          // datasets: [
          //   {
          //     label: 'ココロ',
          //     data: [4, 2, 4, 3, 2, 5],
          //     borderColor: 'rgba(255, 99, 132, 1)',
          //     backgroundColor: 'rgba(255, 99, 132, 0.1)',
          //   },
          //   {
          //     label: 'カラダ',
          //     fill: true,
          //     backgroundColor: 'blue',
          //     data: [3, 5, 1, 2, 3, 5],
          //   },
          // ],
        },
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        // scales: {
        //   xAxes: [
        //     {
        //       type: 'time',
        //       time: {
        //         parser: 'mm:ss',
        //         unit: 'minute',
        //         unitStepSize: 1,
        //         displayFormats: {
        //           minute: 'mm',
        //         },
        //       },
        //     },
        //   ],
        //   yAxes: [
        //     {
        //       ticks: {
        //         beginAtZero: true,
        //       },
        //     },
        //   ],
        // },
      },
    }
  },
  mounted() {
    console.log('mounted!')
    this.getData()
    // this.fillData()
  },
  methods: {
    async getData() {
      const lineId = localStorage.lineId
      const url = `/gas/exec?type=conditions&lineId=${lineId}`
      const response = await this.$axios.$get(url)
      console.log(response)
    },
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
