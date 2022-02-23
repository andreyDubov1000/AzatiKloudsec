import { useEffect, useState } from 'react'
import { IncidentCardTypes } from './IncidentCard'
import { useLocalStorage } from './useLocalStorage'

export type SeverityType = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
export const Vulnerability: SeverityType[] = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']

export const useSeverityFilter = (list: IncidentCardTypes[]) => {
  const [savedSeveritySet, setSavedSeveritySet] = useLocalStorage<SeverityType[] | null>(null, 'severitySet')
  const [severitySet, setSeveritySet] = useState<Set<SeverityType>>(new Set(savedSeveritySet))
  const currentSet = severitySet.size ? severitySet : new Set(Vulnerability)

  const severityList = list.filter((listItem) => {
    if (listItem.Severity) return currentSet.has(listItem.Severity)
    return false
  })

  useEffect(() => {
    const SeverityArr = Array.from(severitySet)
    setSavedSeveritySet(SeverityArr)
  }, [severitySet, setSavedSeveritySet])

  return [severityList, severitySet, setSeveritySet] as const
}
