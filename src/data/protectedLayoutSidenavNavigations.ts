import { ReactComponent as Home } from '../assets/Home normal.svg'
import { ReactComponent as Security } from '../assets/Schedule normal.svg'
import { ReactComponent as Incidents } from '../assets/Incidents normal.svg'
import { ReactComponent as Exceptions } from '../assets/Exceptions normal.svg'
import { ReactComponent as Integrations } from '../assets/Integration normal.svg'
import { ReactComponent as Scans } from '../assets/Scan normal.svg'
import { ReactComponent as User } from '../assets/User normal.svg'
import { ReactComponent as Support } from '../assets/Support normal.svg'
import { ReactComponent as Documentation } from '../assets/Documentation normal.svg'
import HomeActive from '../assets/Home click.png'
import SecurityActive from '../assets/Schedule click.png'
import IncidentsActive from '../assets/Incidents click.png'
import ExceptionsActive from '../assets/Exceptions click.png'
import IntegrationsActive from '../assets/Integration click.png'
import ScansActive from '../assets/Scan click.png'
import UserActive from '../assets/User click.png'
import SupportActive from '../assets/Support click.png'
import DocumentationActive from '../assets/Documentation click.png'

const protectedLayoutSidenavNavigations = [
  {
    title: 'Home',
    path: '/dashboard/risk-management',
    icon: Home,
    iconActive: HomeActive,
  },
  {
    title: 'Security standart',
    path: '/security',
    icon: Security,
    iconActive: SecurityActive,
  },
  {
    title: 'Incidents',
    path: '/incidents',
    icon: Incidents,
    iconActive: IncidentsActive,
  },
  {
    title: 'Exceptions',
    path: '/security-exceptions',
    icon: Exceptions,
    iconActive: ExceptionsActive,
  },
  {
    title: 'Scans',
    path: '/scans/aws',
    icon: Scans,
    iconActive: ScansActive,
  },
  {
    title: 'Integrations',
    path: '/integrations/aws',
    icon: Integrations,
    iconActive: IntegrationsActive,
  },
  {
    title: 'User accounts',
    path: '/accounts',
    icon: User,
    iconActive: UserActive,
  },
  {
    title: 'Support',
    path: '/support',
    icon: Support,
    iconActive: SupportActive,
  },
  {
    title: 'Documentation',
    path: '/docs',
    icon: Documentation,
    iconActive: DocumentationActive,
  },
]

export default protectedLayoutSidenavNavigations
