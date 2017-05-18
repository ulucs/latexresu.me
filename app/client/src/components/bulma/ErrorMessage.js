import React from 'react'

function ErrorMessage({ text }) {
  return (
    <article className='message is-danger'>
      <div className='message-header'>
        <p><strong>Error</strong>!</p>
        <button className='delete' />
      </div>
      <div className='message-body'>
        {text}
      </div>
    </article>
  )
}

export default ErrorMessage
