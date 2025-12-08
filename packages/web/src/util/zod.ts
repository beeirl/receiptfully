import { z } from 'zod/v4'

z.config({
  customError: (issue) => {
    switch (issue.code) {
      case 'invalid_format':
        if (issue.format === 'email') return 'Invalid email'
      case 'invalid_type':
        if (issue.expected) return 'Required'
      case 'too_small':
        if (typeof issue.input === 'number') {
          if (typeof issue.input === 'undefined') return 'Required'
          return `Must be greater than ${issue.minimum}`
        } else if (typeof issue.input === 'string') {
          if (!issue.input) return 'Required'
          return `Minimum ${issue.minimum} characters required`
        }
    }
  },
})

export { z }
