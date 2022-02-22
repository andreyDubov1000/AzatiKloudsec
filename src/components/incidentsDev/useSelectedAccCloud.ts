import { useEffect } from 'react'
import { IncidentCardProps } from './IncidentCard'
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

const useSelectedAccCloud = (list: IncidentCardProps[]) => {
  const [savedSelectedAccCloud, setSavedSelectedAccCloud] = useLocalStorage<AccServiceType>('AWS', 'selectedAccCloud')
  const [filteredList, accCloud, setAccCloud] = useSearchFilter<IncidentCardProps>(
    list,
    ['VulnerabilityId'],
    savedSelectedAccCloud as string
  )

  useEffect(() => {
    setSavedSelectedAccCloud(accCloud as AccServiceType)
  }, [accCloud, setSavedSelectedAccCloud])

  return [filteredList, accCloud, setAccCloud] as const
}

export default useSelectedAccCloud
