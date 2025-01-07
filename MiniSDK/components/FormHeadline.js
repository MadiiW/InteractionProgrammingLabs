import React from 'react';
import {Text} from 'react-native';

export function FormHeadline({title, style}) {
  return (
    <Text
      style={[
        style,
        {
          textTransform: 'uppercase',
          fontSize: 16,
          color: 'gray',
          marginBottom: 2,
        },
      ]}>
      {title}
    </Text>
  );
}
