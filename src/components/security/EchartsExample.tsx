import React, { useEffect, useRef, useState } from 'react'
import 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'
import styles from './Echarts.module.scss'
import ReactECharts from './React-ECharts'
import { cloudList, severityIcons } from '@data/constants'

interface TooltipPropsType {
  mouseY: number
  mouseX: number
}
const Tooltip = React.forwardRef<HTMLDivElement, TooltipPropsType>(({ mouseY, mouseX }, ref) => {
  return (
    <div
      ref={ref}
      className={styles.tooltip}
      style={{
        top: `${mouseY}px`,
        left: `${mouseX}px`,
      }}
    >
      <h5>AWS cloud:</h5>
      <p>name of account</p>
      <div className={styles.color}>
        <div style={{ backgroundColor: '#05DFD2' }}></div>
        <span>standart </span>
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

const EchartAge = () => {
  const [state, setState] = useState<number[]>([])
  const refTooltip = useRef<HTMLDivElement>(null)
  const standarts = {
    name: ['CIS Level 1', 'CIS Level 2', 'ISO 27001', 'PCI-DSS', 'HIPAA', 'GDPR', 'FFIEC', 'SOC2'],
    color: ['#9AA9AD', '#A7EAFF', '#78E0FF', '#8FCEE1', '#7399A4', '#D8F6FF', '#96E6FF', '#B3D1D9'],
  }

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

  const onStandartHover = (obj: EventdataType) => {
    console.log(obj.event.offsetX, obj.event.offsetY)
    console.log(obj.event.event.screenX, obj.event.event.screenY)
    console.log(obj.event.event.clientX, obj.event.event.clientY)
    console.log(obj.event.event.clientX - obj.event.offsetX, obj.event.event.clientY - obj.event.offsetY)
    console.log(obj)
    setState([obj.event.offsetX, obj.event.offsetY])
  }
  useEffect(() => {
    document.getElementById('chart')
  }, [])

  function accountData() {
    const cloudsArray = cloudList('security')
    const numClouds = cloudsArray.length
    const dataArray = []

    for (let i = 1; i < numClouds; i++) {
      const data = {
        value: [100],
        name: cloudsArray[i].title,
      }
      dataArray.push(data)
    }
    return dataArray
  }

  function standartsData() {
    const cloudsArray = cloudList('security')
    const numClouds = cloudsArray.length
    const dataArray = []

    for (let j = 1; j < numClouds; j++) {
      for (let i = 0; i < standarts.name.length; i++) {
        const data = {
          value: [100, cloudsArray[j].title],
          name: standarts.name[i],
          groupId: cloudsArray[j].title,
        }
        dataArray.push(data)
      }
    }
    return dataArray
  }

  const getEchartOptions = () => {
    let option = {
      legend: {
        selectedMode: false,
        orient: 'vertical',
        left: 'right',
        data: standarts.name,
      },

      tooltip: {
        trigger: 'item',
        renderMode: 'html',
        enterable: true,
        appendToBody: true,
        formatter: '{a} <br/>{b} : {c} ({d}%)',
        // formatter: (params: Object | Array<any>) => {
        //   return ` <div className=${styles.tooltip}>
        //   <span>asdad</span>

        // </div>`
        // },
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
          data: standartsData(),
          label: { show: false },
          animationType: 'scale',
          animationEasing: 'elasticOut',
          animationDelay: function (idx: number) {
            return Math.random() * 200
          },
        },
        {
          name: 'account',
          type: 'pie',
          radius: ['18%', '50%'],
          center: ['50%', '50%'],
          color: ['#43B0FF', '#FFD43D', '#05DFD2', '#E8EB00', '#61BE17'],
          data: accountData(),
          label: {
            show: true,
            position: 'inside',
            fontSize: 15,
            color: '#000000',
            fontFamily: 'Open Sans',
            fontWeight: 600,
            lineHeight: 19,
            backgroundColor: 'rgba(255, 255, 255, 1)',
            borderRadius: 9,
            padding: [2, 19, 2, 19],
          },

          labelLine: {
            show: false,
          },

          animationType: 'scale',
          animationEasing: 'elasticOut',
          animationDelay: function (idx: number) {
            return Math.random() * 200
          },
        },
      ],
    }
    return option
  }

  return (
    <div className={styles.chart} id={'chart'}>
      <ReactECharts option={getEchartOptions()} setState={setState} onStandartHover={onStandartHover} />

      <Tooltip ref={refTooltip} mouseX={state[0]} mouseY={state[1]} />
    </div>
    // <div className={styles.echart_age_page}>
    //   <ReactEcharts className={styles.echart_public_pie_form} option={getEchartAge()} />
    // </div>
  )
}
export default EchartAge
