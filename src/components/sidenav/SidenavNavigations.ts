import { ReactComponent as Home } from 'assets/icons/Home normal.svg'
import { ReactComponent as Security } from 'assets/icons/Schedule normal.svg'
import { ReactComponent as Incidents } from 'assets/icons/Incidents normal.svg'
import { ReactComponent as Exceptions } from 'assets/icons/Exceptions normal.svg'
import { ReactComponent as Integrations } from 'assets/icons/Integration normal.svg'
import { ReactComponent as Scans } from 'assets/icons/Scan normal.svg'
import { ReactComponent as User } from 'assets/icons/User normal.svg'
import { ReactComponent as Support } from 'assets/icons/Support normal.svg'
import { ReactComponent as Documentation } from 'assets/icons/Documentation normal.svg'
import HomeActive from 'assets/icons/Home click.png'
import SecurityActive from 'assets/icons/Schedule click.png'
import IncidentsActive from 'assets/icons/Incidents click.png'
import ExceptionsActive from 'assets/icons/Exceptions click.png'
import IntegrationsActive from 'assets/icons/Integration click.png'
import ScansActive from 'assets/icons/Scan click.png'
import UserActive from 'assets/icons/User click.png'
import SupportActive from 'assets/icons/Support click.png'
import DocumentationActive from 'assets/icons/Documentation click.png'

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
