import React, { useRef, useEffect } from 'react'
import { init, getInstanceByDom } from 'echarts'
import type { CSSProperties } from 'react'
import type { ECharts, SetOptionOpts } from 'echarts'
import classNames from 'classnames'

type StandartDataType = {
  value: [number, string]
  name: string
  groupId: string
}

type EventdataType = {
  data: StandartDataType
  event: {
    offsetX: number
    offsetY: number
    event: MouseEvent
  }
}

export interface ReactEChartsProps {
  option: any
  style?: CSSProperties
  settings?: SetOptionOpts
  loading?: boolean
  setState: React.Dispatch<number[]>
  className?: string
  onStandartHover: (obj: EventdataType) => any
}

const ReactECharts: React.FC<ReactEChartsProps> = ({ option, style, settings, loading, setState, className, onStandartHover }) => {
  const chartRef = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current)
      chart.on('mouseover', { seriesName: 'standart' }, onStandartHover)
      chart.on('mouseout', { seriesName: 'standart' }, (obj: any) => {
        setState([])
      })
    }
  }, [])

  return <div className={classNames(className)} ref={chartRef} style={{ width: '100%', height: '100%', ...style }} />
}
export default ReactECharts
