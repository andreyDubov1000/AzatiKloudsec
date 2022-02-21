import { useState } from 'react'
import { IncidentCardProps } from './IncidentCard'
import { useLocalStorage } from './useLocalStorage'
import { useSort } from './useSort'

export type AccServiceType = 'AWS' | 'AZU' | 'ALI' | 'GGL' | 'IBM' | null
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

export const useDropDownMenu = (list: IncidentCardProps[]) => {
  const [sortedList, sortOrder, setOrder] = useSort<IncidentCardProps>(list, 'VulnerabilityDate')

  return [sortedList, sortOrder, setOrder] as const
}

// const useSelectedAcc = () => {
//   const [savedSelectedAcc, setSavedSelectedAcc] = useLocalStorage<AccServiceType>(null, 'selectedAcc')
//   const [accService, setAccService] = useState(savedSelectedAcc)

//   const setService = (nameAcc: AccServiceType) => {
//     setAccService(nameAcc)
//     setSavedSelectedAcc(nameAcc)
//   }
// }
