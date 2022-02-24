import { SeverityType } from '@data/types'
import { useEffect, useMemo, useState } from 'react'
import { IncidentCardTypes } from '../IncidentCard'
import { useLocalStorage } from './useLocalStorage'

export const Vulnerability: SeverityType[] = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']

export const useSeverityFilter = (list: IncidentCardTypes[]) => {
  const [savedSeveritySet, setSavedSeveritySet] = useLocalStorage<SeverityType[] | null>(null, 'severitySet')
  const [severitySet, setSeveritySet] = useState<Set<SeverityType>>(new Set(savedSeveritySet))
  const currentSet = severitySet.size ? severitySet : new Set(Vulnerability)

  const severityList = useMemo(() => list.filter((listItem) => listItem.Severity && currentSet.has(listItem.Severity)), [currentSet, list])

  useEffect(() => {
    const SeverityArr = Array.from(severitySet)
    setSavedSeveritySet(SeverityArr)
  }, [severitySet, setSavedSeveritySet])

  return [severityList, severitySet, setSeveritySet] as const
}
