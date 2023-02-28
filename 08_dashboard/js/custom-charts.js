import { reduceToFirstQuadrant } from './utils.js'

Chart.defaults.color = '#ffffff'
Chart.defaults.font.size = 14
Chart.defaults.font.family = "'Inter', 'sans-serif'"
Chart.defaults.font.lineHeight = '160%'

export function createNewRadialProgressChart(ctx, data, plugins) {
  return new Chart(ctx, {
    type: 'doughnut',
    data,
    options: {
      borderColor: 'transparent',
      borderRadius: 50,
      maintainAspectRatio: false,
      cutout: '70%',
      legend: {
        display: false,
      },
      plugins: {
        tooltip: {
          enabled: false,
        },
        ...plugins,
      },
    },
  })
}

export function createNewBarChart(ctx, data, plugins) {
  return new Chart(ctx, {
    type: 'bar',
    data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      borderRadius: 50,
      borderSkipped: false,
      barPercentage: 0.25,
      plugins: {
        legend: {
          display: false,
        },
        ...plugins,
      },
      scales: {
        x: {
          border: {
            display: false,
          },
          grid: {
            display: false,
          },
        },
        y: {
          display: false,
          border: {
            display: false,
          },
          grid: {
            display: false,
          },
        },
      },
    },
  })
}

export function createGradient(ctx, startAngle, startColor, stopColor) {
  const angle = (reduceToFirstQuadrant(startAngle) * Math.PI) / 180
  const x2 = ctx.canvas.width * Math.cos(angle)
  const y2 = ctx.canvas.height * Math.sin(angle)
  const gradient = ctx.createLinearGradient(0, 0, x2, y2)
  gradient.addColorStop(0, startColor)
  gradient.addColorStop(1, stopColor)
  ctx.fillStyle = gradient
  return gradient
}

const baseline = {
  id: 'baseline',
  afterDatasetsDraw: function (chart, args, options) {
    if (chart.config.type !== 'bar') {
      return
    }

    const {
      ctx,
      chartArea: { right },
      scales: { y },
    } = chart

    const { color, position, width: lineWidth } = options

    const yValue = y.getPixelForValue(position)
    ctx.beginPath()
    ctx.strokeStyle = color
    ctx.lineWidth = lineWidth

    ctx.moveTo(0, yValue)
    ctx.lineTo(right, yValue)
    ctx.stroke()
  },
}

const doughnutBackground = {
  id: 'doughnutBackground',
  beforeDatasetsDraw: function (chart, args, options) {
    if (chart.config.type !== 'doughnut') {
      return
    }
    const {
      ctx,
      chartArea: { top, left, width, height },
    } = chart

    const x = left + width / 2
    const y = top + height / 2
    const outerRadius = chart._metasets[0].data[0].outerRadius
    const innerRadius =
      chart._metasets[chart._metasets.length - 1].data[0].innerRadius

    const lineWidth = outerRadius - innerRadius

    ctx.beginPath()
    ctx.arc(x, y, innerRadius + lineWidth / 2, 0, Math.PI * 2, false)

    ctx.lineWidth = lineWidth
    ctx.strokeStyle = options.color
    ctx.stroke()
  },
}

Chart.register(baseline, doughnutBackground)
