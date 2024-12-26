import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {gql, useQuery} from '@apollo/client';
import {TrendingListItem} from './TrendingListItem';

const GET_TRENDING = gql`
  query GetTrending($query: String!) {
    search(query: $query, type: REPOSITORY, first: 20) {
      nodes {
        # make sure that the results are of type repository
        ... on Repository {
          name
          id
          description
          url
          primaryLanguage {
            name
          }
          forkCount
          stargazerCount
          owner {
            login
          }
        }
      }
    }
  }
`;

export function TrendingScreen({route}) {
  const {language} = route.params;

  // get only repos that were created in the last 60 days (then sort by star count)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 60);
  const dateString = thirtyDaysAgo.toISOString().split('T')[0];
  const searchQuery = `language:${language} created:>${dateString} sort:stars`;

  const {loading, error, data} = useQuery(GET_TRENDING, {
    variables: {
      query: searchQuery,
    },
  });

  if (loading)
    return (
      <View style={styles.container}>
        <Text style={styles.headline}>Trending for {language}</Text>
        <Text style={{paddingHorizontal: 16}}>Loading...</Text>
      </View>
    );

  if (error) {
    console.log('Error details:', error);
    return (
      <View style={styles.container}>
        <Text style={styles.headline}>Error</Text>
        <Text style={{paddingHorizontal: 16}}>
          There was an issue trying to find trending topics for {language}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headline}>Trending for {language}</Text>
      <FlatList
        data={data?.search?.nodes}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TrendingListItem
            title={item.name}
            id={item.id}
            owner={item.owner.login}
            description={item.description}
            starsCount={item.stargazerCount}
            forkCount={item.forkCount}
          />
        )}
        contentContainerStyle={styles.trendingContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headline: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingBottom: 8,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  trendingContainer: {
    paddingHorizontal: 16,
  },
});
