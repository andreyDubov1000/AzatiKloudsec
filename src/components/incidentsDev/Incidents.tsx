import styles from './Incidents.module.css'
import Loader from '@component/atoms/Loader'
import PageTitle from '@component/atoms/PageTitle'
import { IncidentCardTypes } from '@component/incidentsDev/IncidentCard'
import IncidentDetails from '@component/incidentsDev/IncidentDetails'
import RouteLeavingGuard from './RouteLeavingGuard'
import IncidentList from './IncidentList'
import { useAppSelector } from '@redux/hooks'
import { uuid } from '@utils'
import React, { useCallback, useEffect, useState } from 'react'
import { useLocation, useHistory, Prompt } from 'react-router-dom'
import { useGetOverallUserAccountStatus } from 'services/incidentService'
import { useSeverityFilter } from './hooks/useSeverityFilter'
import { SeverityType } from '@data/types'
import { useSearchFilter } from './hooks/useSearchFilter'
import { usePagination } from './hooks/usePagination'
import { useSort } from './hooks/useSort'
import useSelectedAccCloud, { AccServiceType } from './hooks/useSelectedAccCloud'
import { useGetAllSecurityExceptions, useSearchQuery } from 'services/securityExceptionService'
import { queryProps } from '@data/constants'
import { debounce } from 'lodash'

const UserIncidents = () => {
  console.log('render UserIncidents')
  const { user } = useAppSelector((store) => store.auth)
  const [sourceRef, searchValue, setSearchValue, getSearch] = useSearchQuery()
  const [loading, setLoading] = useState(true)
  const [blocked, setBlocked] = useState(false)
  const [hasSeverityArr, setHasSeverityArr] = useState<number[]>([1, 1, 1, 1])
  const [sourceStatusRef, getOverallUserAccountStatus] = useGetOverallUserAccountStatus()
  const [sourceExceptionsRef, getAllSecurityExceptions] = useGetAllSecurityExceptions()
  const [selectedIncident, setSelectedIncident] = useState<IncidentCardTypes | null>(null)
  const [motherList, setMotherList] = useState<IncidentCardTypes[]>([])
  const [severityList, severitySet, setSeveritySet] = useSeverityFilter(motherList)
  const [searchList, enteredSearchValue, setEnteredSearchValue] = useSearchFilter(severityList, queryProps)
  const [orderedList, sortOrder, setOrder] = useSort<IncidentCardTypes>(searchList, 'VulnerabilityDate')
  const [filteredList, accCloud, setAccCloud] = useSelectedAccCloud(orderedList)
  const [incidentList, lastBookElementRef, setPageNum] = usePagination(filteredList, 10)
  const { pathname } = useLocation()
  const isExceptionPage = pathname.includes('exceptions')
  const history = useHistory()
  //  const { slug }: any = useParams()
  // const { search } = useLocation()
  // const vulnerability = useQuery(search).get('vulnerability')

  const exceptionDataHandler = useCallback((data: any) => {
    const dataList = data?.SecurityExceptions || []
    const list: IncidentCardTypes[] = dataList.map(({ VulnerabilityDetails = {}, ...item }) => {
      return {
        id: uuid(),
        ...item,
        ...VulnerabilityDetails,
      }
    })
    setMotherList(list)
  }, [])

  const incidentDataHandler = useCallback((data: any) => {
    const dataObject = data?.UserSecurityVulnerabilityStatus || {}
    const { LOW = [], MEDIUM = [], HIGH = [], CRITICAL = [] } = dataObject
    const severityArr: number[] = [LOW.length, MEDIUM.length, HIGH.length, CRITICAL.length]
    const list: IncidentCardTypes[] = [...LOW, ...MEDIUM, ...HIGH, ...CRITICAL].map((item) => ({
      id: uuid(),
      ...item,
    }))
    setHasSeverityArr(severityArr)
    setMotherList(list)
  }, [])

  const loadData = useCallback(async () => {
    if (user?.user_id) {
      try {
        setLoading(true)
        if (isExceptionPage) {
          const data = await getAllSecurityExceptions(user.user_id)
          exceptionDataHandler(data)
        } else {
          const data = await getOverallUserAccountStatus(user.user_id)
          incidentDataHandler(data)
        }
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    }
  }, [user, isExceptionPage, exceptionDataHandler, incidentDataHandler, getOverallUserAccountStatus, getAllSecurityExceptions, getSearch])

  const setSearchValueDebounce = useCallback(debounce(setSearchValue, 500), [])

  const handleSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const query = event?.target?.value
      setBlocked(!!query)
      setSearchValueDebounce(query)
    },
    [setSearchValue]
  )

  const handleIncidentSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const query = event?.target?.value?.toLowerCase()
      setBlocked(!!query)
      setEnteredSearchValue(query)
      setPageNum(1)
    },
    [setEnteredSearchValue, setPageNum]
  )

  const onIncidentCardClickHandler = useCallback(
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
    setOrder((state) => !state)
    setPageNum(1)
  }, [setOrder, setPageNum])

  const onAccCloudClick = useCallback(
    (event: React.MouseEvent) => {
      const item: Element = event.currentTarget
      let nameAcc = item?.getAttribute('data-account') as AccServiceType
      if (nameAcc === accCloud) nameAcc = 'AWS'
      setAccCloud(nameAcc)
    },
    [setAccCloud, accCloud]
  )

  const shouldBlockPath = useCallback(
    (location) => {
      const regExp = new RegExp(`${location.pathname}($|/)`)
      return !history.location.pathname.match(regExp)
    },
    [history.location.pathname]
  )

  useEffect(() => {
    if (!searchValue) {
      loadData()
    } else {
      if (user?.user_id) {
        const getSearchDebounce = async (searchValue: string) => {
          history.push({
            search: searchValue ? `?p=${searchValue}` : '',
          })
          try {
            setLoading(true)
            if (isExceptionPage) {
              const data = await getSearch(user.user_id, searchValue)
              console.log(data, searchValue)
              if (data) exceptionDataHandler(data)
            }
            setLoading(false)
          } catch (error) {
            setLoading(false)
          }
        }

        getSearchDebounce(searchValue)
      }
    }
    return () => {
      if (sourceStatusRef.current) sourceStatusRef.current.cancel('Incidents cancel getting AllAccountStatus')
      if (sourceExceptionsRef.current) sourceExceptionsRef.current.cancel('Incidents cancel getting AllAccountExceptions')
      if (sourceRef.current) sourceRef.current.cancel('Cancel search')
    }
  }, [loadData, searchValue, sourceStatusRef, sourceExceptionsRef, sourceRef])

  useEffect(() => {
    setSelectedIncident(null)
  }, [motherList.length])

  return (
    //   <Loader />
    // ) : (
    <>
      <RouteLeavingGuard isBlocked={blocked} shouldBlockPath={shouldBlockPath} />
      {loading ? <Loader /> : null}
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
          handleSearch={isExceptionPage ? handleSearch : handleIncidentSearch}
          selectedIncident={selectedIncident}
          setSelectedIncident={setSelectedIncident}
          lastBookElementRef={lastBookElementRef}
          onIncidentCardClickHandler={onIncidentCardClickHandler}
          onAccCloudClick={onAccCloudClick}
          accCloud={accCloud}
        />
        <IncidentDetails selectedIncident={selectedIncident} setIncidentList={setMotherList} isExceptionPage={isExceptionPage} />
      </div>
    </>
  )
}

export default UserIncidents
