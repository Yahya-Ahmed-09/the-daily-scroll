import { View, Text } from 'react-native'
import React, { useContext, useEffect } from 'react'
import Main from './Main'
import { AuthContext, AuthProvider } from '@/context/AuthContext'
import { ApiProvider } from '@/context/ApiContext'

const index = () => {

  return (
    <ApiProvider>
      <Main/>
      </ApiProvider>
  )
}

export default React.memo(index)