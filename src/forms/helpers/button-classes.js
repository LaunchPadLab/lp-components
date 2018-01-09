import classnames from 'classnames'

export default function buttonClasses (style, pristine, invalid, submitting) {
  return classnames(
    `button-${style}`,
    {
      'is-disabled': pristine || invalid,
      'in-progress': submitting,
    }
  )
}