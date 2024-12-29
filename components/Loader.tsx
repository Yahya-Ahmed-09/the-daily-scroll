import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'

import { ReactNativeModal } from "react-native-modal";
interface Props{
  loader: boolean
}
const Loader: React.FC<Props> = ({loader}) => {
  return (
    <View>
      <ReactNativeModal animationIn={'bounce'} isVisible={loader}>
            <ActivityIndicator size={100} color="#00ff00" />
            </ReactNativeModal>
    </View>
  )
}

export default React.memo(Loader)