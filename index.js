const client = require('prom-client')
const registries = {}

function getRegister (app) {
  if (registries[app] === undefined) {
    const register = new client.Registry()
    register.setDefaultLabels({ app })
    client.collectDefaultMetrics({ register })
    registries[app] = register
  }
  return registries[app]
}

class Histogram {
  constructor (registerName, histogramName, help, buckets) {
    this.histogram = new client.Histogram({
      name: histogramName,
      help,
      buckets: buckets || [
        0.005, 0.05, 0.1, 0.25, 0.5,
        1, 1.5, 2, 2.5, 5, 7.5,
        10, 12.5, 15, 17.5, 20, 25, 30, 35, 40, 45, 50, 75,
        100, 150, 200, 250, 375, 500
      ]
    })
    getRegister(registerName).registerMetric(this.histogram)
  }

  push (value) {
    this.histogram.observe(value)
  }
}

class Gauge {
  constructor (registerName, gaugeName, help, func) {
    this.gauge = new client.Gauge({
      name: gaugeName,
      help,
      async collect () {
        const currentValue = await func()
        this.set(currentValue)
      }
    })
    getRegister(registerName).registerMetric(this.gauge)
  }
}

module.exports = {
  getRegister,
  Histogram,
  Gauge
}
