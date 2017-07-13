export { default as startCase } from 'lodash/startCase'
export { default as range } from 'lodash/range'
export { default as noop } from 'lodash/noop'
export { default as compose } from 'lodash/fp/compose'
export { default as omit } from 'lodash/fp/omit'
export { default as set } from 'lodash/fp/set'
export { default as get } from 'lodash/fp/get'

// Alias these to make them easier to understand in context
export { default as addToArray } from 'lodash/union'
export { default as removeFromArray } from 'lodash/xor'

// LP Utils
export { 
  toggle, 
  deprecateComponent, 
  getDisplayName,
  sortable,
  sortablePropTypes,
} from '@launchpadlab/lp-utils'

// Local
export { default as stripNamespace } from './strip-namespace'
export { default as objectify } from './objectify'