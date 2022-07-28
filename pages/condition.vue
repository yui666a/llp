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
        <v-btn depressed small @click="getData">更新</v-btn>
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
          labels: [],
          datasets: [
            {
              label: 'ココロ',
              data: [],
              borderColor: 'rgba(255, 99, 132, 1)',
              backgroundColor: 'rgba(255, 99, 132, 0.1)',
            },
            {
              label: 'カラダ',
              data: [],
              borderColor: 'rgba(132, 99, 255, 1)',
              backgroundColor: 'rgba(132, 99, 255, 0.1)',
            },
          ],
        },
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        scales: {
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
          yAxes: [
            {
              ticks: {
                min: 0, // 最小値
                beginAtZero: true,
                max: 25, // 最大値
                stepSize: 5, // 間隔
              },
            },
          ],
        },
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
      const url = `/gas/macros/s/AKfycbxPUw73VyxjmzRw96UVsIpuPUlDvI9qFYF4MzpwOecly-KTiQrBv9jwu0sUVZ49b09N/exec?type=conditions&lineId=${lineId}`
      const response = await this.$axios.$get(url)
      console.log(response)

      // labelの設定
      let labels = response.data.map(
        (d) =>
          d[0].substring(5, 10).replace('-', '/') + ' ' + d[1].substring(11, 16)
      )
      labels = Array.from(new Set(labels))

      // dataの設定
      const mentalData = response.data
        .filter((d) => {
          return d[4] === 'こころ'
        })
        .map((d) => d[5])
      const bodyData = response.data
        .filter((d) => {
          return d[4] === 'からだ'
        })
        .map((d) => d[5])

      this.chartdata.datacollection.labels = labels
      this.chartdata.datacollection.datasets[0].data = mentalData
      this.chartdata.datacollection.datasets[1].data = bodyData
    },
  },
}
</script>
