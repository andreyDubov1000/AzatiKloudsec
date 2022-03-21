import Loader from '@component/atoms/Loader'
import PageTitle from '@component/atoms/PageTitle'
import { useStateSafe } from '@component/incidentsDev/hooks/useStateSafe'
import { useAppSelector } from '@redux/hooks'
import styles from './Security.module.scss'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import SecurityHeader from './SecurityHeader'
import { SingleSelectData } from '@component/elements/SingleSelect/SingleSelect'
import { useSeverityFilter } from '@component/incidentsDev/hooks/useSeverityFilter'
import { SeverityType } from '@data/types'
import ScrollBar from 'react-perfect-scrollbar'
import { SecurityTab } from '@component/elements'
import EchartPie from './EchartsPie'

interface SecurityPropsType {}

const Security: React.FC<SecurityPropsType> = () => {
  const [loading, setLoading] = useStateSafe(true)
  const { user } = useAppSelector((state) => state.auth)
  const [selectedCloud, setSelectedCloud] = useState<SingleSelectData>()
  const [date, setDate] = useState<Date | null>(new Date())
  const [severityList, severitySet, setSeveritySet] = useSeverityFilter([], 'severitySetSecurity')

  const onSelectCloud = useCallback((activeSelect: SingleSelectData) => {
    setSelectedCloud(activeSelect)
  }, [])

  const onSelectDate = useCallback((activeDate: Date | null) => {
    setDate(activeDate)
  }, [])
  console.log(severitySet)
  const onSelectSeverity = useCallback(
    (event: React.MouseEvent) => {
      const severity = event?.currentTarget?.getAttribute('data-risk')?.toUpperCase() as SeverityType
      setSeveritySet((set) => {
        const newSet = set.delete(severity) ? set : set.add(severity)
        return new Set(newSet)
      })
    },
    [setSeveritySet]
  )
  const array = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  return (
    <>
      {/* {loading && <Loader />} */}
      <PageTitle title={`Security standards`} />
      <h1 className={styles.title}>{`Security standards`}</h1>
      <div className={styles.layout}>
        <SecurityHeader
          onSelectCloud={onSelectCloud}
          onSelectDate={onSelectDate}
          initialDate={date}
          onSelectSeverity={onSelectSeverity}
          severitySet={severitySet}
        />
        <div className={styles.main}>
          <ScrollBar className={styles.scroll_container}>
            {array.map((item, i) => {
              const data = {
                title: 'TitleTitle',
                accountId: `TitleTitle-${item}`,
                server: `${item}-TitleTitle-${item}`,
              }
              return <SecurityTab className={styles.card} key={i} data={data} />
            })}
          </ScrollBar>
          <EchartPie />
        </div>
      </div>
    </>
  )
}

export default Security
