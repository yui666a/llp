<template>
  <LineChart
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  />
</template>

<script>
import { Line as LineChart } from 'vue-chartjs/legacy'
import {
  Chart as ChartJS,
  registerables,
  // LineController,
  // LineElement,
  // PointElement,
  // LinearScale,
  // Title,
  //
  // ChartConfiguration,
  // Tooltip,
  // Legend,
  // CategoryScale,
} from 'chart.js'

ChartJS.register(...registerables)

export default {
  name: 'LineConditionChart',
  components: { LineChart },
  props: {
    chartId: {
      type: String,
      default: 'bar-chart',
    },
    datasetIdKey: {
      type: String,
      default: 'label',
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 400,
    },
    cssClasses: {
      default: '',
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Array,
      default: () => [],
    },
    chartData: {
      type: Object,
      default: () => {},
    },
    chartOptions: {
      type: Object,
      default: () => {
        // eslint-disable-next-line no-labels, no-unused-expressions
        responsive: true
      },
    },
  },
  data() {
    return {}
  },
}
</script>
