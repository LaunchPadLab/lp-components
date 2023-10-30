# v10.0.0 Migration Guide

This version contains the following breaking changes:

1. The `DropdownCheckboxGroup` component is now `CheckboxGroup` with prop `dropdown`=`true`
2. The `CheckboxGroup` and `RadioGroup` legends now rely on `visually-hidden` class styles to hide the label from the view

Further explanation of each item is detailed below.

---

## 1. The `DropdownCheckboxGroup` component is now `CheckboxGroup` with prop `dropdown`=`true`
Due to high functionality overlap between the two components, `DropdownCheckboxGroup` has been removed and instead `CheckboxGroup` now accepts the optional `dropdown` prop that defaults to `false`. When the prop's value is set to `true`, the checkbox options appear in a dropdown container, just like it did in `DropdownCheckboxGroup`.

```jsx
const inputProps = {
  name: 'person.checkboxOptions',
  value: '',
  onChange: action('field changed'),
}
const options = [
  { key: 'First Option', value: '1' },
  { key: 'Second Option', value: '2' },
  { key: 'Third Option', value: '3' },
]

// Before:
import { DropdownCheckboxGroup } from 'lp-components'

<DropdownCheckboxGroup input={inputProps} meta={{}} options={options} />

// After:
import { CheckboxGroup } from 'lp-components'

<CheckboxGroup input={inputProps} meta={{}} options={options} dropdown={true} />
```

## 2. The `CheckboxGroup` and `RadioGroup` legends now rely on `visually-hidden` class styles to hide the label from the view. 
To follow the accessibility guideline of `fieldset` having one, unique `legend` as its direct child, changes have been made in `CheckboxGroupLegend` and `RadioGroupLegend` to always render the legend in HTML and if `label=false` is passed into the `CheckboxGroup` and `RadioGroup` components, the class name "visually-hidden" is added to the legend in order to visually hide it. Please make sure the following class styles are included in your project's root stylesheet:

```css
.visually-hidden:not(:focus):not(:active) {
  clip: rect(0 0 0 0) !important;
  clip-path: inset(50%) !important;
  height: 1px !important;
  width: 1px !important;
  overflow: hidden !important;
  position: absolute !important;
  white-space: nowrap !important;
  border: 0 !important;
  padding: 0 !important;
}
```