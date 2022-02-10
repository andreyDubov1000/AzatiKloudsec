import styles from './incidents.module.css'
import { useSearchFilter } from './searchFilter'
import CustomMenu from '@component/atoms/CustomMenu'
import { IconButton, MenuItem, TextField } from '@material-ui/core'
import { ArrowDownward, ArrowUpward, Search, Tune } from '@material-ui/icons'
import React, { useCallback, useState } from 'react'
import ScrollBar from 'react-perfect-scrollbar'
import IncidentCard, { IncidentCardProps } from './IncidentCard'
import InputSearch from '../../elements/InputSearch'

export interface IncidentListProps {
  incidentList: IncidentCardProps[]
  selectedIncident: IncidentCardProps
  handleSearch: any
  setSelectedIncident: (incident: IncidentCardProps) => void
  sortList: (sortField: keyof IncidentCardProps, sortOrder?: 'asc' | 'desc') => void
}

const IncidentList: React.FC<IncidentListProps> = ({
  incidentList = [],
  selectedIncident,
  handleSearch,
  sortList,
  setSelectedIncident,
}) => {
  const [dateOrder, setDateOrder] = useState<'asc' | 'desc' | null>(null)
  const queryProps = ['AccountId', 'Severity', 'VulnerabilityId', 'Category']
  const [availableItems, enteredSearchValue, setEnteredSearchValue] = useSearchFilter<any>(incidentList, queryProps)

  const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event?.target?.value?.toLowerCase()
    if (!!query) {
      const filteredList = incidentList.filter(
        (item) =>
          item.AccountId?.toLocaleLowerCase()?.match(query) ||
          item.Severity?.toLocaleLowerCase()?.match(query) ||
          item.VulnerabilityId?.toLocaleLowerCase()?.match(query) ||
          item.Category?.toLocaleLowerCase()?.match(query)
      )
      // setIncidentList(filteredList)
    } else {
      // setIncidentList(motherList)
    }
  }
  const handleIncidentClick = useCallback(
    (incident: IncidentCardProps) => () => {
      setSelectedIncident(incident)
    },
    [setSelectedIncident]
  )

  const handleMenuClick = () => {
    if (dateOrder) setDateOrder(dateOrder === 'desc' ? 'asc' : 'desc')
    else setDateOrder('desc')

    sortList('VulnerabilityDate', dateOrder || 'asc')
  }

  return (
    <div className={styles.incident_list}>
      <div className={styles.filters_panel}>
        <InputSearch />
        <CustomMenu
          handler={
            <IconButton sx={{ ml: '0.75rem' }}>
              <Tune fontSize='small' />
            </IconButton>
          }
        >
          <MenuItem onClick={handleMenuClick}>
            Sort by Date
            {dateOrder && dateOrder === 'asc' ? (
              <ArrowUpward fontSize='small' sx={{ fontSize: 12, color: 'grey.600', ml: '0.5rem' }} />
            ) : (
              <ArrowDownward fontSize='small' sx={{ fontSize: 12, color: 'grey.600', ml: '0.5rem' }} />
            )}
          </MenuItem>
        </CustomMenu>
      </div>
      <ScrollBar className='scrollbar'>
        {incidentList.map((item) => (
          <IncidentCard
            {...item}
            onClick={handleIncidentClick(item)}
            key={item.id}
            sx={{
              borderColor: item.id === selectedIncident?.id ? 'secondary.main' : 'transparent',
            }}
          />
        ))}
      </ScrollBar>
    </div>
  )
}

export default IncidentList
