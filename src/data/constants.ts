import lowIcon from '../assets/icons/low mini.png'
import mediumIcon from '../assets/icons/medium mini.png'
import highIcon from '../assets/icons/high mini.png'
import criticalIcon from '../assets/icons/critical mini.png'

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
