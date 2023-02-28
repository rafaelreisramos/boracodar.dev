import {
  createGradient,
  createNewBarChart,
  createNewRadialProgressChart,
} from './js/custom-charts.js'

const root = document.documentElement
const darkPlum = getComputedStyle(root).getPropertyValue('--dark-plum')
const lavenderPink = getComputedStyle(root).getPropertyValue('--lavender-pink')
const darkIndigo = getComputedStyle(root).getPropertyValue('--dark-indigo')
const dustyPeach = getComputedStyle(root).getPropertyValue('--dusty-peach')
const brightIndigo = getComputedStyle(root).getPropertyValue('--bright-indigo')
const greenishBlue = getComputedStyle(root).getPropertyValue('--greenish-blue')
const eletricGreen = getComputedStyle(root).getPropertyValue('--eletric-green')

const salesDoughnut = document.getElementById('sales-kpi').getContext('2d')
const salesGradient = createGradient(
  salesDoughnut,
  120,
  lavenderPink,
  darkIndigo
)
const salesData = {
  datasets: [
    {
      data: [70, 30],
      backgroundColor: [salesGradient, 'transparent'],
    },
  ],
}

const revenue = document.getElementById('revenue-kpi').getContext('2d')
const revenueGradient = createGradient(revenue, 120, dustyPeach, brightIndigo)
const revenueData = {
  datasets: [
    {
      data: [90, 10],
      backgroundColor: [revenueGradient, 'transparent'],
    },
  ],
}

const doughnutPlugins = {
  doughnutBackground: {
    color: darkPlum,
  },
}

const salesHistogram = document
  .getElementById('week-sales-histogram')
  .getContext('2d')
const weekSalesGradient = createGradient(
  salesHistogram,
  90,
  greenishBlue,
  eletricGreen
)
const weekSalesData = {
  labels: ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'],
  datasets: [
    {
      data: [39, 115, 76, 159, 129, 120, 69],
      backgroundColor: weekSalesGradient,
    },
  ],
}

const baselinePlugin = {
  baseline: {
    position: 69,
    width: 3,
    color: darkPlum,
  },
}

createNewRadialProgressChart(salesDoughnut, salesData, doughnutPlugins)
createNewRadialProgressChart(revenue, revenueData, doughnutPlugins)
createNewBarChart(salesHistogram, weekSalesData, baselinePlugin)
