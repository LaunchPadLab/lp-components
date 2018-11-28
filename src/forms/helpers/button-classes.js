import classnames from 'classnames'

export default function buttonClasses ({ className, style, pristine, invalid, submitting }) {
  return classnames(
    `button-${style}`,
    {
      'is-disabled': pristine || invalid,
      'in-progress': submitting,
    },
    className,
  )
}
