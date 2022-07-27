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
            '2021-08-02T09:30:22.710731+09:00',
            '2021-08-02T11:10:22.710731+09:00',
            '2021-08-02T13:00:22.710731+09:00',
            '2021-08-02T15:00:22.710731+09:00',
            '2021-08-02T18:30:22.710731+09:00',
            '2021-08-02T19:50:22.710731+09:00',
          ],
          datasets: [
            {
              label: '気温',
              data: [24.6, 26.8, 22.1, 28.5, 32.8, 29.0],
              borderColor: 'rgba(255, 99, 132, 1)',
              backgroundColor: 'rgba(255, 99, 132, 0.1)',
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
      console.log('000')
      const lineId = localStorage.lineId
      console.log('001')
      const baseUrl =
        'https://script.google.com/macros/s/AKfycbxPUw73VyxjmzRw96UVsIpuPUlDvI9qFYF4MzpwOecly-KTiQrBv9jwu0sUVZ49b09N/exec'
      console.log('002')
      const url = `${baseUrl}?type=conditions&lineId=${lineId}`
      console.log('003')
      const response = await this.$axios.$get(url)
      console.log('004')
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
