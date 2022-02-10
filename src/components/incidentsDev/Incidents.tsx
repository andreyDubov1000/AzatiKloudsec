import CustomFlexBox from '@component/atoms/CustomFlexBox'
import styles from './incidents.module.css'
import Loader from '@component/atoms/Loader'
import PageTitle from '@component/atoms/PageTitle'
import { IncidentCardProps } from '@component/incidents/IncidentCard'
import IncidentDetails from '@component/incidents/IncidentDetails'
import IncidentList from './IncidentListBox'
import { useAppSelector } from '@redux/hooks'
import { useQuery, uuid } from '@utils'
import { debounce } from 'lodash'
import React, { useCallback, useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { getOverallUserAccountStatus, getUserAccountStatus } from 'services/incidentService'

const UserIncidents = () => {
  const [loading, setLoading] = useState(true)
  const [motherList, setMotherList] = useState<IncidentCardProps[]>([])
  const [incidentList, setIncidentList] = useState<IncidentCardProps[]>([])
  const [selectedIncident, setSelectedIncident] = useState<any>(null)
  const { user } = useAppSelector((store) => store.auth)
  const { search } = useLocation()
  const { slug }: any = useParams()

  const vulnerability = useQuery(search).get('vulnerability')

  const loadData = useCallback(async () => {
    if (user?.user_id) {
      setLoading(true)
      let list: IncidentCardProps[] = []

      try {
        if (slug) {
          const data = await getUserAccountStatus(user.user_id, slug)
          if (data) {
            list = data.Vulnerabilities
          }
        } else {
          const data = await getOverallUserAccountStatus(user.user_id)
          if (data) {
            const { LOW, MEDIUM, HIGH, CRITICAL } = data.UserSecurityVulnerabilityStatus

            list = [...LOW, ...MEDIUM, ...HIGH, ...CRITICAL]
          }
        }

        list = list.map((item) => ({
          id: uuid(),
          ...item,
        }))

        if (!!vulnerability) {
          list = list.filter((item) => item.Severity?.toLocaleLowerCase()?.match(vulnerability))
        }

        setIncidentList(list)
        setMotherList(list)
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    }
  }, [slug, user, vulnerability])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSearch = useCallback(
    debounce(async (e: any) => {
      const query = e?.target?.value?.toLowerCase()
      if (!!query) {
        const filteredList = motherList.filter(
          (item) =>
            item.AccountId?.toLocaleLowerCase()?.match(query) ||
            item.Severity?.toLocaleLowerCase()?.match(query) ||
            item.VulnerabilityId?.toLocaleLowerCase()?.match(query) ||
            item.Category?.toLocaleLowerCase()?.match(query)
        )
        setIncidentList(filteredList)
      } else {
        setIncidentList(motherList)
      }
    }, 20),
    [motherList]
  )

  const sortList = useCallback(
    (sortField: keyof IncidentCardProps, sortOrder?: 'asc' | 'desc') => {
      const list = incidentList.sort((a: any, b: any) => {
        if (sortField === 'VulnerabilityDate') {
          try {
            if (new Date(a[sortField]) < new Date(b[sortField])) {
              return sortOrder === 'asc' ? 1 : -1
            } else if (new Date(a[sortField]) > new Date(b[sortField])) {
              return sortOrder === 'asc' ? -1 : 1
            } else return 0
          } catch (error) {
            return 0
          }
        } else {
          if (a[sortField] < b[sortField]) {
            return sortOrder === 'asc' ? 1 : -1
          } else if (a[sortField] > b[sortField]) {
            return sortOrder === 'asc' ? -1 : 1
          } else return 0
        }
      })

      setIncidentList([...list])
    },
    [incidentList]
  )

  useEffect(() => {
    loadData()
  }, [loadData])

  useEffect(() => {
    setSelectedIncident(null)
  }, [incidentList.length])

  return loading ? (
    <Loader />
  ) : (
    <div>
      <h1>Incidents</h1>
      <div className={styles.incidents_layout}>
        <PageTitle title='Current Security Incidents' />

        <IncidentList
          incidentList={incidentList}
          selectedIncident={selectedIncident}
          setSelectedIncident={setSelectedIncident}
          sortList={sortList}
          handleSearch={handleSearch}
        />
        {/* <IncidentDetails incident={selectedIncident} setIncidentList={setIncidentList} /> */}
      </div>
    </div>
  )
}

export default UserIncidents
