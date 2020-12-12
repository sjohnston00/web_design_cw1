/*
file: build_chart.js
author: Ross McLean
desc: Build a chart using data from the LMI API
 */

export const generateChart = estimatedPayData => {
  const chartYears = []
  const chartWages = []

  estimatedPayData.forEach(object => {
    chartYears.push(object.year)
    chartWages.push(object.estpay * 52)  // multiply weekly earnings represent a year
    console.log(chartYears)
    console.log(chartWages)
  })

  const ctx = document.getElementById('myChart').getContext('2d')
  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: chartYears,  // loop data
      datasets: [{
        label: 'Estimated mean yearly pay',
        data: chartWages,
        backgroundColor: [
          'rgba(128, 200, 76, 0.2)'
        ],
        borderColor: [
          'rgba(128, 200, 76, 1.0)',
          'rgba(201, 51, 62, 1.0)',
          'rgba(32, 50, 139, 1.0)'
        ],
        borderWidth: 2
      }]
    },
    options: {
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Pay (£)'
          },
          ticks: {
            beginAtZero: true
          }
        }],
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Year'
          },
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  })
}