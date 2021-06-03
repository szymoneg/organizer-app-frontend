import React from 'react'
import { Image, StyleSheet } from 'react-native'

const BG_IMAGE = "https://cdn-0.idownloadblog.com/ezoimgfmt/media.idownloadblog.com/wp-content/uploads/2020/07/iPad-gradient-wallpaper-idownloadblog-V2byArthur1992as-2048x2048.jpeg?ezimgfmt=ng:webp/ngcb28"

export default function Background() {
  return (
    <Image
    source={{ uri: BG_IMAGE }}
    style={StyleSheet.absoluteFillObject}
  />
  )
}
