import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'
import styles from './Echarts.module.scss'
import ReactECharts from './React-ECharts'
import { cloudList, severityIcons } from '@data/constants'

export type StandartDataType = {
  value: [number, string]
  name: string
  groupId: string
}

export type EchartEventType = {
  data: StandartDataType
  color: string
  event: {
    offsetX: number
    offsetY: number
    event: MouseEvent
  }
}
export type EchartPieStateType = {
  coord: [number, number]
  data: {
    color: string
    standartName: string
    cloudName: string
  }
}
const initialState: EchartPieStateType = {
  coord: [0, 0],
  data: {
    color: '#ffff',
    standartName: '',
    cloudName: '',
  },
}
const EchartPie = () => {
  const [state, setState] = useState<EchartPieStateType>(initialState)
  const [clickCloud, setClickCloud] = useState<string | null>(null)
  const refTooltip = useRef<HTMLDivElement>(null)
  const standarts = {
    name: ['CIS Level 1', 'CIS Level 2', 'ISO 27001', 'PCI-DSS', 'HIPAA', 'GDPR', 'FFIEC', 'SOC2'],
    color: ['#9AA9AD', '#A7EAFF', '#78E0FF', '#8FCEE1', '#7399A4', '#D8F6FF', '#96E6FF', '#B3D1D9'],
  }
  const accountlist = (cloud: string | null) => [
    { title: `${cloud} account #1` },
    { title: `${cloud} account #2` },
    { title: `${cloud} account #3` },
  ]

  const onStandartHover = useCallback((obj: EchartEventType) => {
    const data = {
      color: obj.color,
      standartName: obj.data.name,
      cloudName: obj.data.value[1],
    }
    const coord: [number, number] = [obj.event.offsetX, obj.event.offsetY]
    setState((state) => ({ ...state, data, coord }))
  }, [])

  const onCloudClick = useCallback((obj: EchartEventType) => {
    setClickCloud(obj.data.name)
  }, [])

  const onBackClick = useCallback((obj: EchartEventType) => {
    setClickCloud(null)
  }, [])

  useEffect(() => {
    const container = document.getElementById('pie_chart')
    if (container && refTooltip.current) {
      const box = container.getBoundingClientRect()
      const tooltipBox = refTooltip.current.getBoundingClientRect()
      const x = state.coord[0] < box.width / 2 ? 0 : state.coord[1] < box.height / 2 ? 0 : box.width - tooltipBox.width - 20
      const y = state.coord[1] < box.height / 2 ? 0 : box.height - tooltipBox.height - 20

      refTooltip.current.style.transform = `translate3d(${x}px, ${y}px, 0px)`
    }
  }, [state.coord[0], state.coord[1], refTooltip.current])

  const accountCollors = useMemo(() => {
    const array = []
    const numCollors = accountlist(clickCloud).length
    for (let i = 0; i < numCollors; i++) {
      array.push(`#${Math.floor(Math.random() * 16777215).toString(16)}`)
    }
    return array
  }, [clickCloud])

  function cloudAccountData(cloud: string | null) {
    const array = cloud ? accountlist(clickCloud) : cloudList('security')
    const length = array.length
    const start = cloud ? 0 : 1
    const dataArray = []

    for (let i = start; i < length; i++) {
      const data = {
        value: [100],
        name: array[i].title,
      }
      dataArray.push(data)
    }
    return dataArray
  }

  function standartsData(cloud: string | null) {
    const array = cloud ? accountlist(cloud) : cloudList('security')
    const start = cloud ? 0 : 1
    const num = array.length
    const dataArray = []

    for (let j = start; j < num; j++) {
      for (let i = 0; i < standarts.name.length; i++) {
        const data = {
          value: [100, array[j].title],
          name: standarts.name[i],
          groupId: array[j].title,
        }
        dataArray.push(data)
      }
    }
    return dataArray
  }

  const getEchartAllOptions = () => {
    let option = {
      legend: {
        selectedMode: false,
        orient: 'vertical',
        left: 'right',
        data: standarts.name,
      },

      series: [
        {
          name: 'standart',
          type: 'pie',
          showEmptyCircle: true,
          legendHoverLink: false,
          radius: ['55%', '80%'],
          center: ['50%', '50%'],
          color: standarts.color,
          data: standartsData(clickCloud),
          label: { show: false },
          animationType: 'scale',
          animationEasing: 'elasticOut',
          animationDelay: (idx: number) => {
            return Math.random() * 200
          },
        },
        {
          name: 'cloud',
          type: 'pie',
          radius: ['18%', '50%'],
          center: ['50%', '50%'],
          color: ['#43B0FF', '#FFD43D', '#05DFD2', '#E8EB00', '#61BE17'],
          data: cloudAccountData(clickCloud),
          label: {
            show: true,
            position: 'inside',
            fontSize: 15,
            color: '#023AE0',
            fontFamily: 'Open Sans',
            fontWeight: 600,
            lineHeight: 19,
            backgroundColor: 'rgba(255, 255, 255, 1)',
            borderRadius: 9,
            padding: [2, 19, 2, 19],
          },
          labelLine: { show: false },
          animationType: 'scale',
          animationEasing: 'elasticOut',
          animationDelay: (idx: number) => {
            return Math.random() * 200
          },
        },
        {
          name: 'center',
          type: 'pie',
          radius: ['0%', '18%'],
          center: ['50%', '50%'],
          color: ['#FFF'],
          data: [{ value: 1 }],
          label: { show: false },
          labelLine: { show: false },
        },
      ],
    }
    return option
  }
  const getEchartCloudOptions = () => {
    let option = {
      legend: {
        selectedMode: false,
        orient: 'vertical',
        left: 'right',
        data: standarts.name,
      },

      series: [
        {
          name: 'standart',
          type: 'pie',
          showEmptyCircle: true,
          legendHoverLink: false,
          radius: ['55%', '80%'],
          center: ['50%', '50%'],
          color: standarts.color,
          data: standartsData(clickCloud),
          label: { show: false },
          animationType: 'scale',
          animationEasing: 'elasticOut',
          animationDelay: (idx: number) => {
            return Math.random() * 200
          },
        },
        {
          name: 'account',
          type: 'pie',
          radius: ['20%', '50%'],
          center: ['50%', '50%'],
          color: accountCollors,
          data: cloudAccountData(clickCloud),
          label: {
            show: true,
            position: 'inside',
            overflow: 'truncate',
            ellipsis: '...',
            rotate: false,
            fontSize: 12,
            color: '#023AE0',
            fontFamily: 'Open Sans',
            fontWeight: 600,
            lineHeight: 19,
            backgroundColor: 'rgba(255, 255, 255, 1)',
            borderRadius: 9,
            padding: [2, 19, 2, 19],
          },
          labelLine: { show: false },
          animationType: 'scale',
          animationEasing: 'elasticOut',
          animationDelay: (idx: number) => {
            return Math.random() * 200
          },
        },
        {
          name: 'back',
          type: 'pie',
          radius: ['0%', '15%'],
          center: ['50%', '50%'],
          color: ['#05DFD2'],
          data: [{ name: '< Go Back', value: 10 }],
          label: {
            show: true,
            position: 'center',
            rotate: false,
            fontSize: 12,
            color: '#0F2978',
            fontFamily: 'Open Sans',
            fontWeight: 700,
            lineHeight: 19,
            backgroundColor: 'transparent',
            borderRadius: 9,
            padding: [2, 19, 2, 19],
          },
          labelLine: { show: false },
          animationType: 'scale',
          animationEasing: 'elasticOut',
          animationDelay: (idx: number) => {
            return Math.random() * 200
          },
        },
      ],
    }
    return option
  }

  return (
    <div className={styles.chart} id={'pie_chart'}>
      <ReactECharts
        option={clickCloud ? getEchartCloudOptions() : getEchartAllOptions()}
        onStandartHover={onStandartHover}
        onCloudClick={onCloudClick}
        onBackClick={onBackClick}
      />

      <Tooltip ref={refTooltip} {...state.data} />
    </div>
  )
}
export default EchartPie

interface TooltipPropsType {
  color: string
  standartName: string
  cloudName: string
}
const Tooltip = React.forwardRef<HTMLDivElement, TooltipPropsType>(({ color, standartName, cloudName }, ref) => {
  return (
    <div ref={ref} className={styles.tooltip}>
      <h5>{`${cloudName} cloud:`}</h5>
      {/* {<p>{`Name of account`}</p>} */}
      <div className={styles.color}>
        <div style={{ backgroundColor: color }}></div>
        <span>{standartName} </span>
      </div>
      <ul>
        {Object.entries(severityIcons).map((item) => (
          <li key={item[0]}>
            <img src={item[1]} alt={'Severity icon'} />
            <span>{item[0].toLowerCase()} </span>
            <span className={styles.percent}>25%</span>
          </li>
        ))}
      </ul>
    </div>
  )
})
