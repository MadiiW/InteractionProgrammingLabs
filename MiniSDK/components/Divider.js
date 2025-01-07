import React from 'react';
import {View} from 'react-native';

export function Divider({style, width = 250, height = 1, color = 'gray'}) {
  return (
    <View
      style={[
        style,
        {width: width, height: height, backgroundColor: color},
      ]}></View>
  );
}
