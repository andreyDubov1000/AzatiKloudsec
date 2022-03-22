import React, { useRef, useEffect, useCallback } from 'react'
import { init, getInstanceByDom } from 'echarts'
import type { CSSProperties } from 'react'
import type { ECharts, SetOptionOpts } from 'echarts'
import classNames from 'classnames'
import { EchartPieStateType, EchartEventType } from './EchartsPie'

export interface ReactEChartsProps {
  option: any
  style?: CSSProperties
  settings?: SetOptionOpts
  loading?: boolean
  className?: string
  onStandartHover: (obj: EchartEventType) => any
  onCloudClick: (obj: EchartEventType) => any
  onBackClick: (obj: EchartEventType) => any
}

const ReactECharts: React.FC<ReactEChartsProps> = ({
  option,
  style,
  settings,
  loading,
  className,
  onStandartHover,
  onCloudClick,
  onBackClick,
}) => {
  const chartRef = useRef<HTMLDivElement | null>(null)

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
    let chart: ECharts | undefined
    if (chartRef.current !== null) {
      chart = getInstanceByDom(chartRef.current)
      chart.on('mouseover', { seriesName: 'standart' }, onStandartHover)
      chart.on('click', { seriesName: 'cloud' }, onCloudClick)
      chart.on('click', { seriesName: 'back' }, onBackClick)
    }
    return () => {
      chart?.off('mouseover', onStandartHover)
      chart?.off('click', onCloudClick)
      chart?.off('click', onBackClick)
    }
  }, [])

  return <div className={classNames(className)} ref={chartRef} style={{ width: '100%', height: '100%', ...style }} />
}

export default ReactECharts
