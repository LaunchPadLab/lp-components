import { htmlElementAttributes } from 'html-element-attributes'
import htmlAttributes from 'html-attributes' // An object of all HTML attributes with the JSX prop (e.g., "className", "tabIndex") as keys and the JavaScript prop (e.g., "class", "tabindex") as values
import { difference, omitBy, compact, concat } from 'lodash'
import filterInvalidDOMProps from 'filter-invalid-dom-props'

// An array of basic HTML _global_ attributes (note: this does not include event handlers, "aria-", "role", and "data-")
const basicGlobalAttributes = htmlElementAttributes['*']
// An array of all existing HTML attributes (note: this does not include event handlers, "aria-" and "data-")
const allHtmlAttributes = Object.values(htmlAttributes)

/**
 *
 * A function that filters out props 1) that are not recognized as a valid HTML attribute
 * and 2) that are valid HTML attributes but not allowed for the provided element.
 *
 * @param {String} element - HTML element
 * @param {Object} props - React props that are set on the HTML element
 * @returns {Object} - React props that are valid for the HTML element
 *
 * @example
 *
 * const rest = { form: "planDetailsForm", type: "text", placeholder: "Enter plan name", showField: true }
 * <span id="planNameError" className="error-message" {...filterInvalidHtmlProps("span", rest)}>
 *   This field is required!
 * </span>
 *
 * // <span id="planNameError" class="error-message">
 * //   This field is required!
 * // </span>
 *
 */

function filterInvalidHtmlProps(element, props) {
  // This util (filterInvalidDOMProps) covers event handlers such as "onClick" and props that begin with "data-" and "aria-"
  // but it does not filter out HTML attributes that are not allowed for the element in question
  const validDOMProps = filterInvalidDOMProps(props)

  const notAllowedAttributes = generateNotAllowedAttributes(element)
  return omitBy(validDOMProps, (_, key) =>
    notAllowedAttributes.includes(htmlAttributes[key])
  )
}

// ----- PRIVATE ------
// Returns an array of all existing HTML attributes (in plain JavaScript) that are not allowed for the given element
function generateNotAllowedAttributes(element) {
  const additionalAllowedAttributes = htmlElementAttributes[element] // e.g., ul => ['compact', 'type']
  const allAllowedAttributes = compact(
    concat(basicGlobalAttributes, 'role', additionalAllowedAttributes)
  )
  return difference(allHtmlAttributes, allAllowedAttributes)
}

export default filterInvalidHtmlProps
