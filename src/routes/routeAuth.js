import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { session } from 'api/helpers/storage/localStorage'

function RouteAuth (props) {
  const { location } = props
  const { token } = session()

  if (!token) {
    return <Redirect to={{ pathname: '/', state: { from: location } }} />
  }

  return (
    <Route {...props} />
  )
}

export default RouteAuth
