import { useHistory } from 'react-router-dom'
import { useEffect } from 'react'
import { IncidentCardTypes } from '../IncidentCard'
import { useLocalStorage } from './useLocalStorage'
import { useSearchFilter } from './useSearchFilter'

export type AccServiceType = 'AWS' | 'AZU' | 'ALI' | 'GGL' | 'IBM'
export const dropDownAccounts = [
  {
    title: 'AWS',
    idAcc: 'AWS',
  },
  {
    title: 'Azure',
    idAcc: 'AZU',
  },
  {
    title: 'Alibaba cloud',
    idAcc: 'ALI',
  },
  {
    title: 'Google cloud',
    idAcc: 'GGL',
  },
  {
    title: 'IBM Cloud',
    idAcc: 'IBM',
  },
]

const filteredProps = ['VulnerabilityId'] as Array<keyof IncidentCardTypes>

const useSelectedAccCloud = (list: IncidentCardTypes[], page: string) => {
  const history = useHistory()
  const [savedSelectedAccCloud, setSavedSelectedAccCloud] = useLocalStorage<AccServiceType>('AWS', `selectedAccCloud_${page}`)
  const [filteredList, accCloud, setAccCloud] = useSearchFilter<IncidentCardTypes>(list, filteredProps, savedSelectedAccCloud as string)

  useEffect(() => {
    setSavedSelectedAccCloud(accCloud as AccServiceType)
  }, [accCloud, setSavedSelectedAccCloud])

  return [filteredList, accCloud, setAccCloud] as const
}

export default useSelectedAccCloud
