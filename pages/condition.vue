<template>
  <v-row>
    <v-col class="text-center">
      <!-- <ConditionChart /> -->
      <!-- <ConditionChart :chart-data="datacollection"></ConditionChart> -->
      <LineConditionChart
        :chart-data="chartdata.datacollection"
        :chart-options="options"
      />
      <!-- <div class="text-center">
        <v-btn depressed small @click="getData">更新</v-btn>
      </div> -->
    </v-col>
    <v-col>
      <div>7/29 18:27 人の研究で自分のできてない</div>
      <div>7/27 05:08 外がもう明るい</div>
      <div>7/26 23:51 今日も学校宿泊コースだ</div>
      <div>7/25 18:36 LLP MTG中</div>
      <div>7/25 12:50 おなかすいた</div>
      <div>7/25 12:42 てすと</div>
    </v-col>
  </v-row>
</template>

<script>
const jsonpAdapter = require('axios-jsonp')

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
              fillColor: 'rgb(220 220 220 /0.2)',
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
    if (localStorage.getItem('conditions')) {
      try {
        const data = JSON.parse(localStorage.getItem(''))
        this.chartdata.datacollection.labels = data[0]
        this.chartdata.datacollection.datasets[0].data = data[1]
        this.chartdata.datacollection.datasets[1].data = data[2]
      } catch (error) {
        console.error(error)
        // expected output: ReferenceError: nonExistentFunction is not defined
        // Note - error messages will vary depending on browser
      }
    }
    this.getData()
  },
  methods: {
    async getData() {
      const data = {
        type: 'conditions',
        lineId: localStorage.lineId,
      }
      const response = await this.$axios.$get(this.$GAS_API, {
        adapter: jsonpAdapter,
        params: data,
      })
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
      localStorage.setItem(
        'conditions',
        JSON.stringify([labels, mentalData, bodyData])
      )
    },
  },
}
</script>
