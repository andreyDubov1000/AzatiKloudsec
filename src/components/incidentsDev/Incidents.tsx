import styles from './Incidents.module.css'
import Loader from '@component/atoms/Loader'
import PageTitle from '@component/atoms/PageTitle'
import { IncidentCardTypes } from '@component/incidentsDev/IncidentCard'
import IncidentDetails from '@component/incidentsDev/IncidentDetails'
import RouteLeavingGuard from './RouteLeavingGuard'
import IncidentList from './IncidentList'
import { useAppSelector } from '@redux/hooks'
import { uuid } from '@utils'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation, useHistory, useParams } from 'react-router-dom'
import { useGetOverallUserAccountStatus } from 'services/incidentService'
import { useSeverityFilter } from './hooks/useSeverityFilter'
import { SeverityType } from '@data/types'
import { useSearchFilter } from './hooks/useSearchFilter'
import { useInfinityPagination } from './hooks/useInfinityPagination'
import { useSort } from './hooks/useSort'
import useSelectedAccCloud, { AccServiceType } from './hooks/useSelectedAccCloud'
import { useGetAllSecurityExceptions, useSearchQuery } from 'services/securityExceptionService'
import { queryProps } from '@data/constants'
import { debounce } from 'lodash'

const UserIncidents = () => {
  const { pathname } = useLocation()
  const matchPath = pathname.match('security-exceptions') || pathname.match('incidents') || pathname.match('scans')!
  const currentPage = matchPath[0] as 'security-exceptions' | 'incidents' | 'scans'
  const isExceptionPage = currentPage === 'security-exceptions'
  const isScanPage = currentPage === 'scans'
  const isIncidentPage = currentPage === 'incidents'

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
  const [filteredList, accCloud, setAccCloud] = useSelectedAccCloud(orderedList, currentPage)
  const [incidentList, lastBookElementRef, setPageNum] = useInfinityPagination(filteredList, 10)
  const { account_id } = useParams<any>()
  const history = useHistory()
  console.log('render UserIncidents')

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

  const pageData = useMemo(
    () => ({
      'security-exceptions': {
        load: async function (user_id: string, searchValue: string = '') {
          const data = await getSearch(user_id, searchValue)
          exceptionDataHandler(data)
        },
        title: 'Exceptions',
      },
      incidents: {
        load: async function (user_id: string) {
          const data = await getOverallUserAccountStatus(user_id)
          incidentDataHandler(data)
        },
        title: 'Incidents',
      },
      scans: {
        load: () => {},
        title: 'Scan',
      },
    }),
    [incidentDataHandler, exceptionDataHandler, getAllSecurityExceptions, getOverallUserAccountStatus]
  )

  const loadData = useCallback(async () => {
    if (user?.user_id) {
      try {
        setLoading(true)
        await pageData[currentPage].load(user.user_id)
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    }
  }, [user, pageData, currentPage])

  const setSearchValueDebounce = useCallback(debounce(setSearchValue, 500), [setSearchValue])

  const handleSearchExceptions = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const query = event?.target?.value
      setBlocked(!!query)
      setSearchValueDebounce(query)
    },
    [setSearchValueDebounce]
  )

  const handleSearchIncidents = useCallback(
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
    [setAccCloud, accCloud, currentPage]
  )

  const shouldBlockPath = useCallback(
    (location) => {
      const regExp = new RegExp(`${location.pathname}($|/)`)
      return !history.location.pathname.match(regExp)
    },
    [history.location.pathname]
  )
  const scanMessageReceiver = useCallback(
    (event: MessageEvent<any>) => {
      if (event.origin !== window.location.origin) return
      if (event.data[0] === account_id) {
        const list = event.data[1].map((item: any) => ({
          id: uuid(),
          ...item,
        }))
        setLoading(false)
        setMotherList(list)
      }
    },
    [account_id]
  )

  useEffect(() => {
    if (isScanPage) window.addEventListener('message', scanMessageReceiver, false)
    return () => {
      window.removeEventListener('message', scanMessageReceiver, false)
    }
  }, [scanMessageReceiver, isScanPage])

  useEffect(() => {
    if (!isScanPage) loadData()
    return () => {
      if (sourceStatusRef.current) sourceStatusRef.current.cancel('Incidents cancel getting AllAccountStatus')
      if (sourceExceptionsRef.current) sourceExceptionsRef.current.cancel('Incidents cancel getting AllAccountExceptions')
    }
  }, [isScanPage, loadData, sourceExceptionsRef, sourceStatusRef])

  useEffect(() => {
    async function search(searchValue: string) {
      if (user?.user_id) {
        history.push({
          search: searchValue ? `?p=${searchValue}` : '',
        })
        try {
          if (isExceptionPage) {
            setLoading(true)
            pageData[currentPage].load(user.user_id, searchValue)
            setLoading(false)
          }
        } catch (error) {
          setLoading(false)
        }
      }
    }
    search(searchValue)

    return () => {
      if (sourceRef.current) sourceRef.current.cancel('Incidents cancel search')
    }
  }, [searchValue, sourceRef, exceptionDataHandler, getSearch, isExceptionPage, user?.user_id])

  useEffect(() => {
    setSelectedIncident(null)
  }, [motherList.length])

  return (
    <>
      <RouteLeavingGuard isBlocked={blocked} shouldBlockPath={shouldBlockPath} />
      {loading ? <Loader /> : null}
      <h1>{pageData[currentPage].title}</h1>
      <div className={styles.incidents_layout}>
        <PageTitle title={pageData[currentPage].title} />
        <IncidentList
          incidentList={incidentList}
          dateOrder={sortOrder}
          handleDateSort={handleDateSort}
          hasSeverityArr={hasSeverityArr}
          onSeverityClickHandler={onSeverityClickHandler}
          severitySet={severitySet}
          handleSearch={isExceptionPage ? handleSearchExceptions : handleSearchIncidents}
          selectedIncident={selectedIncident}
          setSelectedIncident={setSelectedIncident}
          lastBookElementRef={lastBookElementRef}
          onIncidentCardClickHandler={onIncidentCardClickHandler}
          onAccCloudClick={onAccCloudClick}
          accCloud={accCloud}
        />
        <IncidentDetails selectedIncident={selectedIncident} setIncidentList={setMotherList} currentPage={currentPage} />
      </div>
    </>
  )
}

export default UserIncidents
