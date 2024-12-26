import {View, Text, StyleSheet, FlatList} from 'react-native';
import {LanguageListItem} from './LanguageListItem';

export function HomeScreen() {
  const languages = [
    {id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba', title: 'Swift'},
    {id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63', title: 'JavaScript'},
    {id: '58694a0f-3da1-471f-bd96-145571e29d72', title: 'TypeScript'},
    {id: 'e39b8af4-c7d3-4653-98fc-11b9c629c643', title: 'Java'},
    {id: '45ac66fb-0bac-4000-811e-70a546127e69', title: 'C'},
    {id: 'f06228fc-8591-4ecf-821c-42ef95cf3f91', title: 'C#'},
    {id: '8400a183-41cf-4ebf-8c47-d02880f03c2a', title: 'C++'},
    {id: '0e7f98ca-533f-46b6-be15-abbcf04f6d7e', title: 'Python'},
    {id: '8cdc0355-229b-4a6c-90fc-545f772fd1bd', title: 'Ruby'},
    {id: '2f1e178e-fc55-4ed8-851f-a94a06446aa4', title: 'Go'},
    {id: '59ac6b91-c3a6-4f2f-b689-11ce39ed5a89', title: 'PHP'},
    {id: 'c1de33f6-9c48-4c4f-95e5-60d29ab29ef1', title: 'CSS'},
  ];
  const sortedLanguages = languages.sort((a, b) =>
    a.title.localeCompare(b.title),
  );

  return (
    <View>
      <Text style={styles.headline}>Programming language</Text>
      <Text style={styles.description}>
        Please select the programming language for which you would like to see
        the current trending topics on GitHub
      </Text>

      <FlatList
        style={styles.languageList}
        data={sortedLanguages}
        renderItem={({item}) => <LanguageListItem title={item.title} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headline: {
    fontSize: 32,
    fontWeight: 'bold',
    margin: 16,
  },
  description: {
    fontSize: 18,
    fontWeight: '400',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  languageList: {
    paddingHorizontal: 16,
    marginBottom: 150,
  },
});
