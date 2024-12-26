import {Pressable, View, Text, StyleSheet, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export function TrendingListItem({
  title,
  id,
  owner,
  description,
  starsCount,
  forkCount,
}) {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() =>
        navigation.navigate('Details', {
          id: id,
          title: title,
          owner: owner,
          description: description,
          starsCount: starsCount,
          forkCount: forkCount,
        })
      }>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.owner}>
          Created by <Text style={{fontWeight: 'bold'}}>{owner}</Text>
        </Text>
        <Text style={styles.description} numberOfLines={4}>
          {description}
        </Text>
        <View style={styles.forkStarsContainer}>
          <Image
            style={[styles.icon, {width: 14}]}
            source={require('./../res/code-fork-solid.png')}></Image>
          <Text style={{marginRight: 8}}>{forkCount}</Text>
          <Image
            style={[styles.icon, {width: 16}]}
            source={require('./../res/star-regular.png')}></Image>
          <Text>{starsCount}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 16,
    marginVertical: 8,
    elevation: 1,
  },
  title: {
    fontWeight: '600',
    fontSize: 22,
    color: 'black',
  },
  owner: {
    paddingTop: 2,
    paddingBottom: 4,
  },
  description: {
    paddingVertical: 4,
    marginBottom: 8,
  },
  forkStarsContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-end',
  },
  icon: {
    height: 16,
    marginRight: 4,
  },
});
