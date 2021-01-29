import React, { ReactElement } from 'react'
import { Input } from '@material-ui/core'

/**
 * @typedef {Object} Props
 * @property {string}       name      The form name used for identification
 * @property {string}       label     The text used for the label
 * @property {string}       type      (optional) The input type
 * @property {ReactElement} children  (optional) Passes your own input elements
 * @property {string}       className (optional) Class name for the
 */

/**
 * LabelInput
 *
 * @param {Props} props
 */
export default function LabelInput(props: {
  name: string
  label: string
  type?: string
  required?: boolean
  className?: string
  children?: ReactElement
}) {
  return (
    <label
      className={`dg-form-input MuiFormControlLabel-label MuiTypography-body1 MuiFormControlLabel-root ${props.className}`}
    >
      {`${props.label}: `}
      {props.children ?? <Input required={props.required} type={props.type ?? 'text'} name={props.name} />}
    </label>
  )
}
