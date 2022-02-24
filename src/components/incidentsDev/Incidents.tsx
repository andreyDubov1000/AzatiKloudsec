import styles from './Incidents.module.css'
import Loader from '@component/atoms/Loader'
import PageTitle from '@component/atoms/PageTitle'
import { IncidentCardTypes } from '@component/incidentsDev/IncidentCard'
import IncidentDetails from '@component/incidentsDev/IncidentDetails'
import IncidentList from './IncidentList'
import { useAppSelector } from '@redux/hooks'
import { uuid } from '@utils'
import React, { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useGetOverallUserAccountStatus } from 'services/incidentService'
import { useSeverityFilter } from './hooks/useSeverityFilter'
import { SeverityType } from '@data/types'
import { useSearchFilter } from './hooks/useSearchFilter'
import { usePagination } from './hooks/usePagination'
import { useSort } from './hooks/useSort'
import useSelectedAccCloud, { AccServiceType } from './hooks/useSelectedAccCloud'
import { useGetAllSecurityExceptions } from 'services/securityExceptionService'

const queryProps = [
  'AccountId',
  'Severity',
  'VulnerabilityId',
  'Category',
  'VulnerabilityDescription',
  'SecurityExceptionAuthor',
  'SecurityExceptionComment',
  'SecurityExceptionDate',
  'SecurityExceptionId',
] as Array<keyof IncidentCardTypes>

const UserIncidents = () => {
  console.log('render UserIncidents')

  const [loading, setLoading] = useState(true)
  const [hasSeverityArr, setHasSeverityArr] = useState<number[]>([])
  const [sourceStatusRef, getOverallUserAccountStatus] = useGetOverallUserAccountStatus()
  const [sourceExceptionsRef, getAllSecurityExceptions] = useGetAllSecurityExceptions()
  const [selectedIncident, setSelectedIncident] = useState<IncidentCardTypes | null>(null)
  const [motherList, setMotherList] = useState<IncidentCardTypes[]>([])
  const [severityList, severitySet, setSeveritySet] = useSeverityFilter(motherList)
  const [searchList, enteredSearchValue, setEnteredSearchValue] = useSearchFilter(severityList, queryProps)
  const [orderedList, sortOrder, setOrder] = useSort<IncidentCardTypes>(searchList, 'VulnerabilityDate')
  const [filteredList, accCloud, setAccCloud] = useSelectedAccCloud(orderedList)
  const [incidentList, lastBookElementRef, setPageNum] = usePagination(filteredList, 10)
  const { user } = useAppSelector((store) => store.auth)
  const { pathname } = useLocation()
  const isExceptionPage = pathname.includes('exceptions')

  //  const { slug }: any = useParams()
  // const { search } = useLocation()
  // const vulnerability = useQuery(search).get('vulnerability')

  const loadData = useCallback(async () => {
    if (user?.user_id) {
      setLoading(true)
      let list: IncidentCardTypes[] = []
      let severityArr: number[] = []
      try {
        if (isExceptionPage) {
          const data = await getAllSecurityExceptions(user.user_id)
          const dataList = data?.SecurityExceptions || []
          list = dataList.map(({ VulnerabilityDetails = {}, ...item }) => {
            return {
              id: uuid(),
              ...item,
              ...VulnerabilityDetails,
            }
          })
          severityArr = [1, 1, 1, 1]
        } else {
          const data = await getOverallUserAccountStatus(user.user_id)
          if (data && data.UserSecurityVulnerabilityStatus) {
            const { LOW = [], MEDIUM = [], HIGH = [], CRITICAL = [] } = data.UserSecurityVulnerabilityStatus
            severityArr = [LOW.length, MEDIUM.length, HIGH.length, CRITICAL.length]
            list = [...LOW, ...MEDIUM, ...HIGH, ...CRITICAL]
          }
          list = list.map((item) => ({
            id: uuid(),
            ...item,
          }))
        }
        setHasSeverityArr(severityArr)
        setMotherList(list)
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    }
  }, [user, isExceptionPage, getOverallUserAccountStatus, getAllSecurityExceptions])

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
      if (sourceStatusRef.current) sourceStatusRef.current.cancel('Incidents cancel getting AllAccountStatus')
      if (sourceExceptionsRef.current) sourceExceptionsRef.current.cancel('Incidents cancel getting AllAccountExceptions')
    }
  }, [loadData, sourceStatusRef, sourceExceptionsRef])

  useEffect(() => {
    setSelectedIncident(null)
  }, [motherList.length])

  return loading ? (
    <Loader />
  ) : (
    <>
      {isExceptionPage ? <h1>Exceptions</h1> : <h1>Incidents</h1>}
      <div className={styles.incidents_layout}>
        <PageTitle title={isExceptionPage ? 'Security Incidents' : 'Security Exceptions'} />
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
        <IncidentDetails selectedIncident={selectedIncident} setIncidentList={setMotherList} isExceptionPage={isExceptionPage} />
      </div>
    </>
  )
}

export default UserIncidents
