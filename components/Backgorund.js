import React from 'react'
import { Image, StyleSheet } from 'react-native'

const BG_IMAGE = "https://cdn-0.idownloadblog.com/wp-content/uploads/2020/07/iPhone-gradient-wallpaper-idownloadblog-V2ByArthur1992aS.png"

export default function Background() {
  return (
    <Image
    source={{ uri: BG_IMAGE }}
    style={StyleSheet.absoluteFillObject}
  />
  )
}
