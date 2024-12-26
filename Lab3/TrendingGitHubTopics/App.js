import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GITHUB_ACCESS_TOKEN} from '@env';
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import {HomeScreen} from './components/HomeScreen';
import {TrendingScreen} from './components/TrendingScreen';
import {DetailsScreen} from './components/DetailsScreen';

const Stack = createNativeStackNavigator();

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  cache: new InMemoryCache(),
  headers: {
    authorization: `Bearer ${GITHUB_ACCESS_TOKEN}`,
  },
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Trending" component={TrendingScreen} />
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
