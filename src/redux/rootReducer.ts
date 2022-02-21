import { incidentsReducer } from './incidents/incidentsReducer'
import { combineReducers } from 'redux'
import authReducer from './auth/authReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  incidents: incidentsReducer,
})

export default rootReducer
