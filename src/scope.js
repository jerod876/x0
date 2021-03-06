import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import rebassMarkdown from '@rebass/markdown'
import { Pre } from 'rebass'

import LiveEditor from './LiveEditor'
import LivePreview from './LivePreview'

const cleanHREF = href => href
  .replace(/\.mdx?$/, '')
  .replace(/\.jsx?$/, '')

export const link = withRouter(({
  href = '',
  match,
  location,
  children,
  className,
  ...props
}) => {
  if (/^https?:\/\//.test(href) || /^#/.test(href)) {
    return (
      <a
        href={href}
        className={className}
        children={children}
      />
    )
  }
  const to = cleanHREF(href, location.pathname)
  return (
    <Link
      to={to}
      className={className}
      children={children}
    />
  )
})

export const code = ({
  children,
  className,
  scope,
  ...props
}) => {
  const lang = className.replace(/^language\-/, '')
  const type = lang.charAt(0)
  const code = React.Children.toArray(children).join('\n')

  switch (type) {
    case '.':
      return <LiveEditor code={code} scope={scope} mdx={lang.includes('.mdx')} />
    case '!':
      return <LivePreview code={code} scope={scope} />
    default:
      return (
        <Pre
          p={3}
          mt={4}
          mb={4}
          bg='gray'
          children={children}
        />
      )
  }
}

const pre = props => props.children

const scope = rebassMarkdown({
  a: {
    is: link
  },
  code: {
    is: code
  },
  pre: {
    is: pre,
  }
})

export default scope
