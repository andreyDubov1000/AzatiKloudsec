import { getAllAccStatusThunkCreators } from '../../redux/incidents/incidentsReducer'
import { RootState } from '../../redux/reduxStore'
import { listLow, listMedium, listHigh, listCritical } from '../../redux/incidents/IncidentsSelectors'
import { connect } from 'react-redux'
//import UserIncidents from './Incidents'

function mapStateToProps(state: RootState) {
  return {
    low: listLow(state),
    medium: listMedium(state),
    high: listHigh(state),
    critical: listCritical(state),
  }
}

const mapDispatchToProps = {
  getAllAccStatus: getAllAccStatusThunkCreators,
}

//export default connect(mapStateToProps, mapDispatchToProps)(UserIncidents)
