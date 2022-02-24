//import { getOverallUserAccountStatus } from './../../services/securityExceptionService'
import { SeverityType } from '@data/types'
import { Dispatch } from 'react'

export interface IIncidentsStateCard {
  AccountId: string
  Category: string
  CloudService: string
  HasMfa: boolean
  IamUser: string
  Region: string
  Severity: SeverityType
  VulnerabilityDate: string
  VulnerabilityDescription: string
  VulnerabilityDoc: string
  VulnerabilityId: string
  SecurityGroupId: string
}

export interface IIncidentsState {
  LOW: IIncidentsStateCard[]
  MEDIUM: IIncidentsStateCard[]
  HIGH: IIncidentsStateCard[]
  CRITICAL: IIncidentsStateCard[]
}

// Action
const GET_USER_ACCOUNT_STATUS = 'GET_USER_ACCOUNT_STATUS'

//Action Creators
type Action<K, V = void> = V extends void ? { type: K } : { type: K } & V
type SetAccountStatusActionType = {
  type: typeof GET_USER_ACCOUNT_STATUS
  accStatus: IIncidentsState
}

type IncidentActionType = SetAccountStatusActionType

const setAccountStatusActionCreator = (accStatus: IIncidentsState): SetAccountStatusActionType => ({
  type: GET_USER_ACCOUNT_STATUS,
  accStatus,
})

const initialState: IIncidentsState = {
  LOW: [],
  MEDIUM: [],
  HIGH: [],
  CRITICAL: [],
}

//Reducer
export const incidentsReducer = (state = initialState, action: IncidentActionType) => {
  switch (action.type) {
    case GET_USER_ACCOUNT_STATUS:
      let { LOW, MEDIUM, HIGH, CRITICAL } = action.accStatus

      LOW = LOW || []
      MEDIUM = MEDIUM || []
      HIGH = HIGH || []
      CRITICAL = CRITICAL || []
      return {
        LOW: [...LOW],
        MEDIUM: [...MEDIUM],
        HIGH: [...HIGH],
        CRITICAL: [...CRITICAL],
      }
    default: {
      return { ...state }
    }
  }
}

// ThunkCreators
export const getAllAccStatusThunkCreators = (user_id: string) => async (dispath: Dispatch<IncidentActionType>) => {
  // const data = await getOverallUserAccountStatus(user_id)
  // if (data) {
  //   dispath(setAccountStatusActionCreator(data.UserSecurityVulnerabilityStatus))
  // }
}
