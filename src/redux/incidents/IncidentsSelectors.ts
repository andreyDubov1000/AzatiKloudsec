import { IIncidentsStateCard } from './incidentsReducer'
import { RootState } from '../reduxStore'

type ListSelectorType = (s: RootState) => IIncidentsStateCard[]

export const listLow: ListSelectorType = (state) => {
  const { LOW } = state.incidents
  return LOW
}

export const listMedium: ListSelectorType = (state) => {
  const { MEDIUM } = state.incidents
  return MEDIUM
}

export const listHigh: ListSelectorType = (state) => {
  const { HIGH } = state.incidents
  return HIGH
}
export const listCritical: ListSelectorType = (state) => {
  const { CRITICAL } = state.incidents
  return CRITICAL
}
