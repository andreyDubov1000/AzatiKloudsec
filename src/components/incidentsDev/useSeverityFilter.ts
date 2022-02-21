import { useCallback, useState } from 'react'
import { IncidentCardProps } from './IncidentCard'
import { useLocalStorage } from './useLocalStorage'

export type SeverityType = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
export const Vulnerability: SeverityType[] = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']

export const useSeverityFilter = (list: IncidentCardProps[]) => {
  const [savedSeveritySet, setSavedSeveritySet] = useLocalStorage<SeverityType[] | null>(null, 'severitySet')

  const [severitySet, setSeveritySet] = useState<Set<SeverityType>>(new Set(savedSeveritySet))
  const currentSet = severitySet.size ? severitySet : new Set(Vulnerability)

  const severityList = list.filter((listItem) => {
    if (listItem.Severity) return currentSet.has(listItem.Severity)
    return false
  })

  const setSeverity = useCallback(
    async (setFunc: (set: Set<SeverityType>) => Set<SeverityType>) => {
      setSeveritySet(setFunc)
      const SeverityArr = Array.from(severitySet)
      setSavedSeveritySet(SeverityArr)
      //debugger
    },
    [setSavedSeveritySet, setSeveritySet]
  )

  return [severityList, severitySet, setSeverity] as const
}
