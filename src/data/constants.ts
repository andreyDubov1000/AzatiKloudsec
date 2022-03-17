import lowIcon from '../assets/icons/low mini.png'
import mediumIcon from '../assets/icons/medium mini.png'
import highIcon from '../assets/icons/high mini.png'
import criticalIcon from '../assets/icons/critical mini.png'
import { IncidentCardTypes } from '@component/incidentsDev/IncidentCard'

export const layoutConstants = {}

export const landingConstants = {
  fixedTopbarHeight: 64,
  normalTopbarHeight: 128,
  sidenavWidth: 260,
}

export const docConstants = {
  fixedTopbarHeight: 64,
  normalTopbarHeight: 128,
  sidenavWidth: 260,
}

export const vulnerabilityColor = {
  CRITICAL: {
    bgColor: 'secondary.main',
    color: 'secondary.contrastText',
  },
  HIGH: {
    bgColor: 'error.main',
    color: 'error.contrastText',
  },
  MEDIUM: {
    bgColor: 'warning.main',
    color: 'warning.contrastText',
  },
  LOW: {
    bgColor: 'yellow',
    color: 'inherit',
  },
}

export const severityIcons = {
  CRITICAL: criticalIcon,
  HIGH: highIcon,
  MEDIUM: mediumIcon,
  LOW: lowIcon,
}
export const queryProps = [
  'AccountId',
  'Severity',
  'VulnerabilityId',
  'Category',
  'CloudService',
  'Region',
  'VulnerabilityDate',
  'VulnerabilityDescription',
  'ResourceVulnerabilityId',
  'SecurityExceptionAuthor',
  'SecurityExceptionComment',
  'SecurityExceptionDate',
  'SecurityExceptionId',
] as Array<keyof IncidentCardTypes>

export const cloudList = (currentPage: string) => [
  {
    id: 1,
    title: 'All accounts',
    value: 'all',
    url: `/${currentPage}`,
  },
  {
    id: 2,
    title: 'AWS',
    value: 'aws',
    url: `/${currentPage}/aws`,
  },
  {
    id: 3,
    title: 'Azure',
    value: 'azure',
    url: `/${currentPage}/aws`,
  },
  {
    id: 4,
    title: 'IBM cloud',
    value: 'ibm',
    url: `/${currentPage}/aws`,
  },
  {
    id: 5,
    title: 'Google cloud',
    value: 'google',
    url: `/${currentPage}/aws`,
  },
  {
    id: 6,
    title: 'Alibaba cloud',
    value: 'alibaba',
    url: `/${currentPage}/aws`,
  },
]
