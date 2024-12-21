import React from 'react';
import type {PropsWithChildren} from 'react';
import {View,StyleSheet,Text} from 'react-native';

type SectionProps = PropsWithChildren<{
    title: string;
  }>;
  
  function Section({children, title}: SectionProps): React.JSX.Element {
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Text style={[styles.sectionDescription]}>
          {children}
        </Text>
      </View>
    );
  }

  const styles = StyleSheet.create({
    sectionContainer: {
      marginTop: 16,
      paddingHorizontal: 24,
    },
    sectionTitle: {
      fontSize: 12,
      fontWeight: '400',
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
    }
  });
  
  export default Section;