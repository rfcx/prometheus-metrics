A wrapper around [prom-client](https://github.com/siimon/prom-client) module to setup custom metrics for Prometheus scrapper.

## Histogram class

When creating a `Histogram` class item you can provide the following arguments:
- `registerName`: `string` - registry id. must be equal across one app or app department
- `historgramName`: `string` - historgram id which will be used in further data retrieval (don't use space or special symbols)
- `help`: `string` - description
- `buckets`: `number[]` counters which form a cumulative histogram (Optional, Default: [0.005, 0.05, 0.1, 0.25, 0.5, 1, 1.5, 2, 2.5, 5, 7.5, 10, 12.5, 15, 17.5, 20, 25, 30, 35, 40, 45, 50, 75, 100, 150, 200, 250, 375, 500])

## Gauge class

When creating a `Gauge` class item you can provide the following arguments:
registerName: string, gaugeName: string, help: string, func: Function
- `registerName`: `string` - registry id. must be equal across one app or app department
- `gaugeName`: `string` - gauge id which will be used in further data retrieval (don't use space or special symbols)
- `help`: `string` - description
- `func`: `Function` - a function which returns current data

## Usage example

```javascript
  const { Histogram, Gauge, getRegister } = require('@rfcx/prometheus-metrics')
  const registerName = 'your-app-id'
  new Gauge(registerName, 'uploads_failed', 'Number or failed uploads', () => { return db.getFailedUploads() })
  const histogram = new Histogram(registerName, 'opus', 'Processing time for opus file format', [0.005, 0.05, 0.1, 0.25, 0.5, 1, 1.5, 2, 2.5, 5,])

  // your app processed some data
  histogram.push(0.124)
  histogram.push(0.001)
  histogram.push(1.3341)
  // data for Gauge is returned from callback function

  // an endpoint which returns metrics
  const register = getRegister(registerName)
  router.route('/metrics').get((req, res) => {
    register.metrics()
      .then((metrics) => {
        res.setHeader('Content-Type', register.contentType)
        res.send(metrics)
        register.resetMetrics()
      })
  })
```

## Grafana representation
### Histogram
![Histogram](https://user-images.githubusercontent.com/2122991/166828753-10c978d3-b791-41bd-bda7-f3029f1c4218.png)
### Gauge
![Gauge](https://user-images.githubusercontent.com/2122991/166828751-baf6282e-126b-49d0-91fc-a0e2d08b8621.png)

## Publishing

Publishing to NPM registry is done automatically via GitHub Actions once new release is published in the GitHub repository.
You must have `NPM_PUBLISH_TOKEN` secret to be defined in your repository or organization. Reference [this](https://docs.github.com/en/actions/security-guides/encrypted-secrets) or [this](https://sergiodxa.com/articles/github-actions-npm-publish#configure-the-secret) for instructions.
