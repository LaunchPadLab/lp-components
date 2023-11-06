# v10.0.0 Migration Guide

This version contains the following breaking changes:

1. All inputs, except for CheckboxGroup and RadioGroup, are now wrapped in a `div`
2. The `LabeledField` component is now rendered as a `div` by default and accepts an optional prop `as` that can overwrite the HTML element
3. The `DropdownCheckboxGroup` component is now `CheckboxGroup` with prop `dropdown`=`true`
4. The `CheckboxGroup` and `RadioGroup` legends now rely on `visually-hidden` class styles to hide the label from the view

Further explanation of each item is detailed below.

---
## 1. All inputs, except for CheckboxGroup and RadioGroup, are now wrapped in a 'div'
`fieldset` no longer wraps each input unless when grouping related form controls (i.e., `CheckboxGroup` and `RadioGroup`). This affects base styles in _forms.scss and any custom rules your code might have that rely on the outdated structure. 

```html
<!-- Input HTML Before -->
<fieldset class="custom-class-name">
    <span>
        <label for="person.firstName" class="">First Name</label>
    </span>
    <div class="input-wrapper">
        <input id="person.firstName" name="person.firstName" type="text" value="">
    </div>
</fieldset>

<!-- Input HTML After -->
<div class="field-wrapper custom-class-name">
    <span>
        <label for="person.firstName" class="">First Name</label>
    </span>
    <div class="input-wrapper">
        <input id="person.firstName" name="person.firstName" type="text" value="">
    </div>
</div>
```

## 2. The `LabeledField` component is now rendered as a `div` by default and accepts an optional prop `as` that can overwrite the HTML element
If you are using `LabeledField` with a non-grouping input, do not overwrite the wrapper's element, as it should not be `fieldset`. You may need to update your code that relies on the outdated structure. If you are using `LabeledField` with grouped related fields, pass in "fieldset" for the prop `as` and make sure the custom label component has `legend` as its first child ([source](https://www.w3.org/TR/WCAG20-TECHS/H71.html#:~:text=The%20first%20element%20inside%20the,related%20radio%20buttons%20and%20checkboxes))- you can reference the `CheckboxGroup` or `RadioGroup` component as an example.

## 3. The `DropdownCheckboxGroup` component is now `CheckboxGroup` with prop `dropdown`=`true`
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

## 4. The `CheckboxGroup` and `RadioGroup` legends now rely on `visually-hidden` class styles to hide the label from the view
To follow the accessibility guideline of `fieldset` having one `legend` as its direct child, changes have been made in `CheckboxGroup` and `RadioGroup` to always render the `legend` and if `label=false` is passed into the components, the class name "visually-hidden" is added to the legend in order to visually hide it. Please make sure the following class styles are included in your project's root stylesheet:

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