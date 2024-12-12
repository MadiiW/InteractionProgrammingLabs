import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Image,
  Button,
  TextInput,
} from 'react-native';

function App(): React.JSX.Element {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{
          backgroundColor: '#2D8577',
          justifyContent: 'center',
          }}>
          <Text style={{ 
            color: 'white', 
            fontSize: 26,
            fontWeight: '600',
            marginHorizontal: 20,
            marginVertical: 16
            }}>
              Example 4: React Native
            </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center', 
          }}>
          <Image
            style={{
              width: 150,
              height: 150,
              marginVertical: 20
            }}
            source={require('./res/image.png')}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center', 
            gap: 16,
          }}>
          {Array.from({ length: 4 }, (_, index) => (
            <View
              key={index}
              style={{
                width: 100, 
                marginHorizontal: 20
              }}>
              <Button
                color="#BBBBBB"
                title="Button"
                onPress={() => {}}
              />
          </View>
          ))}
        </View>
        <View
        style={{
          margin: 30,
          flexDirection: 'row',
          alignItems: 'center'
        }}>
          <Text style={{ marginRight: 30 }}>Email</Text>
          <TextInput
          style={{
            height: 40,
            flex: 1, 
            borderBottomColor: 'red',
            borderBottomWidth: 1,
          }}
          placeholder="Enter your email"
          />        
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
