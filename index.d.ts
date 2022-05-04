import client from 'prom-client'

declare module '@rfcx/prometheus-metrics' {
  class Histogram {
    constructor(registerName: string, historgramName: string, help: string, buckets?: number[])
    histogram: client.Histogram
    push(value: number): void
  }
  class Gauge {
    constructor(registerName: string, gaugeName: string, help: string, func: Function)
    gauge: client.Gauge
    validate(): any
  }
  function getRegister (app: string): client.Registry
}
