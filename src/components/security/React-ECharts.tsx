import React, { useRef, useEffect, useImperativeHandle } from 'react'
import { init, getInstanceByDom } from 'echarts'
import type { CSSProperties } from 'react'
import type { ECharts, SetOptionOpts } from 'echarts'
import classNames from 'classnames'

export interface ReactEChartsProps {
  option: any
  style?: CSSProperties
  settings?: SetOptionOpts
  loading?: boolean
  className?: string
}

const ReactECharts = React.forwardRef<HTMLDivElement, ReactEChartsProps>(({ option, style, settings, loading, className }, ref) => {
  const chartRef = useRef<HTMLDivElement>(null)
  useImperativeHandle(ref, () => chartRef.current as HTMLDivElement, [])

  useEffect(() => {
    let chart: ECharts | undefined
    if (chartRef.current !== null) {
      chart = init(chartRef.current)
    }

    function resizeChart() {
      chart?.resize()
    }

    window.addEventListener('resize', resizeChart)

    return () => {
      chart?.dispose()
      window.removeEventListener('resize', resizeChart)
    }
  }, [])

  useEffect(() => {
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current)
      chart.setOption(option, settings)
    }
  }, [option, settings])

  useEffect(() => {
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current)
      loading === true ? chart.showLoading() : chart.hideLoading()
    }
  }, [loading])

  return <div className={classNames(className)} ref={chartRef} style={{ width: '100%', height: '100%', ...style }} />
})

export default ReactECharts
