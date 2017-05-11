import React from 'react'
import { storiesOf } from '@kadira/storybook'

storiesOf('RangeInput', module)
  .add('with default label', () => (
    <div>
      <span className="range-slider">
        <input className="slider" type="range" value="50" min="-80000" max="80000" step="10000" />
        <div className="rangeslider rangeslider--horizontal" id="js-rangeslider-0">
          <div className="rangeslider__fill" style={{width:300}}></div>
          <div className="rangeslider__handle" style={{left:280}}></div>
          <output className="rangeslider__value-bubble" style={{left:300}}>0</output>
        </div>
      </span>
      <ul className="three-range">
        <li>- $<span>80,000</span></li>
        <li>$0</li>
        <li>$<span>80,000</span></li>
      </ul>
    </div>
  ))