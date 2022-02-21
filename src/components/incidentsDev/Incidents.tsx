import styles from './Incidents.module.css'
import severityButtonStyles from '../elements/RiskButton/RiskButton.module.scss'
import Loader from '@component/atoms/Loader'
import PageTitle from '@component/atoms/PageTitle'
import { IncidentCardProps } from '@component/incidentsDev/IncidentCard'
import IncidentDetails from '@component/incidentsDev/IncidentDetails'
import IncidentList from './IncidentListBox'
import { useAppSelector } from '@redux/hooks'
import { useQuery, uuid } from '@utils'
import React, { useCallback, useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { getOverallUserAccountStatus, getUserAccountStatus, getUserAccountTest } from 'services/incidentService'
import { useSeverityFilter, SeverityType } from './useSeverityFilter'
import { useSearchFilter } from './useSearchFilter'
import { useDropDownMenu } from './useDropDownMenu'
import { usePagination } from './usePagination'

const UserIncidents = () => {
  console.log('render UserIncidents')

  const queryProps = ['AccountId', 'Severity', 'VulnerabilityId', 'Category', 'VulnerabilityDescription'] as Array<
    keyof Omit<IncidentCardProps, 'onClick' | 'isActive'>
  >

  const [loading, setLoading] = useState(true)
  const [hasSeverityArr, setHasSeverityArr] = useState<number[]>([])
  const [motherList, setMotherList] = useState<IncidentCardProps[]>([])
  const [selectedIncident, setSelectedIncident] = useState<any>(null)
  const [severityList, severitySet, setSeveritySet] = useSeverityFilter(motherList)
  const [searchList, enteredSearchValue, setEnteredSearchValue] = useSearchFilter(severityList, queryProps)
  const [orderedList, sortOrder, setOrder] = useDropDownMenu(searchList)
  const [incidentList, lastBookElementRef, setPageNum] = usePagination(orderedList, 10)
  const { user } = useAppSelector((store) => store.auth)
  const { search } = useLocation()
  const { slug }: any = useParams()

  const vulnerability = useQuery(search).get('vulnerability')

  const loadData = useCallback(async () => {
    if (user?.user_id) {
      setLoading(true)
      let list: IncidentCardProps[] = []
      let severityArr: number[] = []
      try {
        if (slug) {
          const data = await getUserAccountStatus(user.user_id, slug)
          list = data?.Vulnerabilities
        } else {
          // const testdata = await getUserAccountTest(user.user_id)
          // if (testdata) {
          //   console.log('test:', testdata)
          // }
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
  }, [slug, user])

  const handleSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const query = event?.target?.value?.toLowerCase()
      setEnteredSearchValue(query)
      setPageNum(1)
    },
    [setEnteredSearchValue, setPageNum]
  )

  const handleIncidentCardClick = useCallback(
    (incident: IncidentCardProps) => () => {
      setSelectedIncident(incident)
    },
    [setSelectedIncident]
  )

  const onSeverityClickHandler = useCallback(
    (event: React.MouseEvent) => {
      const severity = event?.currentTarget?.getAttribute('data-risk')?.toUpperCase() as SeverityType
      event?.currentTarget?.classList.toggle(`${severityButtonStyles.asClicked}`)
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

  useEffect(() => {
    loadData()
  }, [loadData])

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
          enteredSearchValue={enteredSearchValue}
          handleSearch={handleSearch}
          selectedIncident={selectedIncident}
          setSelectedIncident={setSelectedIncident}
          lastBookElementRef={lastBookElementRef}
          handleIncidentCardClick={handleIncidentCardClick}
        />
        <IncidentDetails incident={selectedIncident} setIncidentList={setMotherList} />
      </div>
    </div>
  )
}

export default UserIncidents
