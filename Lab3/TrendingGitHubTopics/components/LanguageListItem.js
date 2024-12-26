import {View, Text, StyleSheet, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export function LanguageListItem({title}) {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => navigation.navigate('Trending', {language: title})}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 16,
    marginVertical: 8,
    elevation: 1,
  },
  title: {
    fontWeight: '600',
    fontSize: 22,
    color: 'black',
    padding: 12,
  },
});
