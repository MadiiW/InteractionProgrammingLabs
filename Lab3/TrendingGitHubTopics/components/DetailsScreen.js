import React from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import {gql, useQuery} from '@apollo/client';

const GET_DETAILS = gql`
  query GetDetails($id: ID!) {
    node(id: $id) {
      ... on Repository {
        createdAt
        updatedAt
        licenseInfo {
          name
        }
        watchers {
          totalCount
        }
        languages(first: 10) {
          edges {
            node {
              name
            }
          }
        }
      }
    }
  }
`;

export function DetailsScreen({route}) {
  const {id} = route.params;
  const {title} = route.params;
  const {description} = route.params;
  const {owner} = route.params;
  const {starsCount} = route.params;
  const {forkCount} = route.params;

  const {loading, error, data} = useQuery(GET_DETAILS, {
    variables: {id: id},
  });

  if (loading)
    return (
      <View style={styles.container}>
        <Text style={styles.headline}>{title}</Text>
        <Text>Loading...</Text>
      </View>
    );

  if (error) {
    console.log('Error details:', error);
    return (
      <View style={styles.container}>
        <Text style={styles.headline}>Error</Text>
        <Text>
          There was an issue retrieving the details of this repository.{' '}
        </Text>
      </View>
    );
  }

  const repository = data?.node;
  const createdAt = formatDate(repository?.createdAt);
  const updatedAt = formatDate(repository?.updatedAt);
  var languages = repository?.languages?.edges || [];
  languages = languages.map(edge => edge.node.name).join(', ');
  const license = repository?.licenseInfo?.name || 'No license info';
  const watcherCount = repository?.watchers.totalCount;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headline}>{title}</Text>
      <Text style={styles.created}>
        Created by <Text style={{fontWeight: 'bold'}}>{owner}</Text> on{' '}
        {createdAt}
      </Text>
      <Text>Last updated on {updatedAt}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.title}>Used languages</Text>
      <Text>{languages}</Text>
      <Text style={styles.title}>License</Text>
      <Text>{license}</Text>
      <View style={styles.numbersContainer}>
        <View style={styles.numbersRowContainer}>
          <Image
            resizeMode="contain"
            style={[styles.icon, {width: undefined, aspectRatio: 448 / 512}]}
            source={require('./../res/code-fork-solid.png')}></Image>
          <Text>Forks: {forkCount}</Text>
        </View>
        <View style={styles.numbersRowContainer}>
          <Image
            style={[styles.icon, {width: 18}]}
            source={require('./../res/star-regular.png')}></Image>
          <Text>Stargazers: {starsCount}</Text>
        </View>
        <View style={styles.numbersRowContainer}>
          <Image
            resizeMode="contain"
            style={[styles.icon, {width: undefined, aspectRatio: 576 / 512}]}
            source={require('./../res/eye-regular.png')}></Image>
          <Text>Watchers: {watcherCount}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headline: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  title: {
    marginTop: 4,
    fontSize: 16,
    fontWeight: '500',
  },
  created: {
    paddingTop: 4,
  },
  description: {
    marginTop: 16,
    marginBottom: 8,
  },
  numbersContainer: {
    marginVertical: 16,
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'flex-end',
  },
  numbersRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  icon: {
    height: 18,
    marginRight: 10,
  },
});

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}
