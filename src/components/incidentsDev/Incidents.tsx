import styles from './Incidents.module.css'
import Loader from '@component/atoms/Loader'
import PageTitle from '@component/atoms/PageTitle'
import { IncidentCardTypes } from '@component/incidentsDev/IncidentCard'
import IncidentDetails from '@component/incidentsDev/IncidentDetails'
import IncidentList from './IncidentList'
import { useAppSelector } from '@redux/hooks'
import { useQuery, uuid } from '@utils'
import React, { useCallback, useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { getUserAccountStatus, useGetOverallUserAccountStatus } from 'services/incidentService'
import { useSeverityFilter, SeverityType } from './useSeverityFilter'
import { useSearchFilter } from './useSearchFilter'
import { usePagination } from './usePagination'
import { useSort } from './useSort'
import useSelectedAccCloud, { AccServiceType } from './useSelectedAccCloud'

const UserIncidents = () => {
  console.log('render UserIncidents')

  const queryProps = ['AccountId', 'Severity', 'VulnerabilityId', 'Category', 'VulnerabilityDescription'] as Array<keyof IncidentCardTypes>
  const [sourceOverallRef, getOverallUserAccountStatus] = useGetOverallUserAccountStatus()
  const [loading, setLoading] = useState(true)
  const [hasSeverityArr, setHasSeverityArr] = useState<number[]>([])
  const [selectedIncident, setSelectedIncident] = useState<IncidentCardTypes | null>(null)
  const [motherList, setMotherList] = useState<IncidentCardTypes[]>([])
  const [severityList, severitySet, setSeveritySet] = useSeverityFilter(motherList)
  const [searchList, enteredSearchValue, setEnteredSearchValue] = useSearchFilter(severityList, queryProps)
  const [orderedList, sortOrder, setOrder] = useSort<IncidentCardTypes>(searchList, 'VulnerabilityDate')
  const [filteredList, accCloud, setAccCloud] = useSelectedAccCloud(orderedList)
  const [incidentList, lastBookElementRef, setPageNum] = usePagination(filteredList, 10)
  const { user } = useAppSelector((store) => store.auth)
  const { search } = useLocation()
  const { slug }: any = useParams()

  const vulnerability = useQuery(search).get('vulnerability')

  const loadData = useCallback(async () => {
    if (user?.user_id) {
      setLoading(true)
      let list: IncidentCardTypes[] = []
      let severityArr: number[] = []
      try {
        if (slug) {
          const data = await getUserAccountStatus(user.user_id, slug)
          list = data?.Vulnerabilities
        } else {
          const data = await getOverallUserAccountStatus(user.user_id)
          if (data && data.UserSecurityVulnerabilityStatus) {
            const { LOW = [], MEDIUM = [], HIGH = [], CRITICAL = [] } = data.UserSecurityVulnerabilityStatus
            severityArr = [LOW.length, MEDIUM.length, HIGH.length, CRITICAL.length]
            list = [...LOW, ...MEDIUM, ...HIGH, ...CRITICAL]
          }
        }
        list = list.map((item) => ({
          id: uuid(),
          ...item,
        }))
        setHasSeverityArr(severityArr)
        setMotherList(list)
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    }
  }, [slug, user, getOverallUserAccountStatus])

  const handleSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const query = event?.target?.value?.toLowerCase()
      setEnteredSearchValue(query)
      setPageNum(1)
    },
    [setEnteredSearchValue, setPageNum]
  )

  const onIncidentCardClickhandler = useCallback(
    (incident: IncidentCardTypes) => () => {
      setSelectedIncident(incident)
    },
    [setSelectedIncident]
  )

  const onSeverityClickHandler = useCallback(
    (event: React.MouseEvent) => {
      const severity = event?.currentTarget?.getAttribute('data-risk')?.toUpperCase() as SeverityType
      setSeveritySet((set) => {
        const newSet = set.delete(severity) ? set : set.add(severity)
        return new Set(newSet)
      })
      setPageNum(1)
    },
    [setSeveritySet, setPageNum]
  )

  const handleDateSort = useCallback(() => {
    const newDateOrder = sortOrder === 'desc' ? 'asc' : 'desc'
    setOrder(newDateOrder)
    setPageNum(1)
  }, [setOrder, setPageNum, sortOrder])

  const onAccCloudClick = useCallback(
    (event: React.MouseEvent) => {
      const item: Element = event.currentTarget
      let nameAcc = item?.getAttribute('data-account') as AccServiceType
      if (nameAcc === accCloud) nameAcc = 'AWS'
      setAccCloud(nameAcc)
    },
    [setAccCloud, accCloud]
  )

  useEffect(() => {
    loadData()
    return () => {
      if (sourceOverallRef.current) sourceOverallRef.current.cancel('Incidents cancel getting AllAccountStatus')
    }
  }, [loadData, sourceOverallRef])

  useEffect(() => {
    setSelectedIncident(null)
  }, [motherList.length])

  return loading ? (
    <Loader />
  ) : (
    <div>
      <h1>Incidents</h1>
      <div className={styles.incidents_layout}>
        <PageTitle title='Current Security Incidents' />
        <IncidentList
          incidentList={incidentList}
          dateOrder={sortOrder}
          handleDateSort={handleDateSort}
          hasSeverityArr={hasSeverityArr}
          onSeverityClickHandler={onSeverityClickHandler}
          severitySet={severitySet}
          enteredSearchValue={enteredSearchValue}
          handleSearch={handleSearch}
          selectedIncident={selectedIncident}
          setSelectedIncident={setSelectedIncident}
          lastBookElementRef={lastBookElementRef}
          onIncidentCardClickhandler={onIncidentCardClickhandler}
          onAccCloudClick={onAccCloudClick}
          accCloud={accCloud}
        />
        <IncidentDetails selectedIncident={selectedIncident} setIncidentList={setMotherList} />
      </div>
    </div>
  )
}

export default UserIncidents
