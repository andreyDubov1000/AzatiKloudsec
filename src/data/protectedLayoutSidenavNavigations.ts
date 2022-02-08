import { Assignment, Extension, FindInPage, GppBad, GppMaybe } from '@material-ui/icons'

import { ReactComponent as Home } from '../assets/Home normal.svg'
import { ReactComponent as Security } from '../assets/Schedule normal.svg'
import { ReactComponent as Incidents } from '../assets/Incident normal.svg'
import { ReactComponent as Exceptions } from '../assets/Exceptions normal.svg'
import { ReactComponent as Integrations } from '../assets/Integration normal.svg'
import { ReactComponent as Scans } from '../assets/Scan normal.svg'
import { ReactComponent as User } from '../assets/User normal.svg'
import { ReactComponent as Support } from '../assets/Support normal.svg'
import { ReactComponent as Documentation } from '../assets/Documtntation normal.svg'

const protectedLayoutSidenavNavigations = [
  {
    title: 'Home',
    path: '/dashboard/risk-management',
    icon: Home,
  },
  {
    title: 'Security standart',
    path: '/security',
    icon: Security,
  },
  {
    title: 'Incidents',
    path: '/incidents',
    icon: Incidents,
  },
  {
    title: 'Exceptions',
    path: '/security-exceptions',
    icon: Exceptions,
  },
  {
    title: 'Scans',
    path: '/scans/aws',
    icon: Scans,
  },
  {
    title: 'Integrations',
    path: '/integrations/aws',
    icon: Integrations,
  },
  {
    title: 'User accounts',
    path: '/accounts',
    icon: User,
  },
  {
    title: 'Support',
    path: '/support',
    icon: Support,
  },
  {
    title: 'Documentation',
    path: '/docs',
    icon: Documentation,
  },
]

export default protectedLayoutSidenavNavigations
