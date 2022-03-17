import { SeverityType } from '@data/types'
import { useEffect, useMemo, useState } from 'react'
import { IncidentCardTypes } from '../IncidentCard'
import { useLocalStorage } from './useLocalStorage'

export const Vulnerability: SeverityType[] = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']

export const useSeverityFilter = <T extends { Severity: SeverityType }>(list: T[], saveKey?:string) => {
  const [savedSeveritySet, setSavedSeveritySet] = useLocalStorage<SeverityType[] | null>(null, saveKey)
  const [severitySet, setSeveritySet] = useState<Set<SeverityType>>(new Set(savedSeveritySet))

  const severityList = useMemo(() => {
    const currentSet = severitySet.size ? severitySet : new Set(Vulnerability)
    return list.filter((listItem) => listItem.Severity && currentSet.has(listItem.Severity))
  }, [severitySet, list])

  useEffect(() => {
    const SeverityArr = Array.from(severitySet)
    setSavedSeveritySet(SeverityArr)
  }, [severitySet, setSavedSeveritySet])

  return [severityList, severitySet, setSeveritySet] as const
}
