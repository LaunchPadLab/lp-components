// Required since lp-hoc > lp-requests uses async/await
import 'core-js/stable'
import 'regenerator-runtime/runtime.js'

import enzyme from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'

// Configure enzyme
enzyme.configure({ adapter: new Adapter() })

// Mock browser canvas
import 'jest-canvas-mock'

// Testing library
import '@testing-library/jest-dom'
