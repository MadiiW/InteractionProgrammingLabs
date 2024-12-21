import React, {useState, useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Animated,
} from 'react-native';
import Section from './components/Section';
import {Picker} from '@react-native-picker/picker';
import backgroundImages from './res/pictures/backgroundImages';
import logos from './res/pictures/logos';

interface CardState {
  cardNumber: string;
  cardName: string;
  cardMonth: string;
  cardYear: string;
  cardCvv: string;
  currentCardBackground: number;
}

function App(): React.JSX.Element {
  const [cardNumberValue, setCardNumberValue] = useState('');
  const [cvvValue, setCvvValue] = useState('');

  const [isCardNumberFocused, setIsCardNumberFocused] = useState(false);
  const [isCardHolderFocused, setIsCardHolderFocused] = useState(false);
  const [isMonthFocused, setIsMonthFocused] = useState(false);
  const [isYearFocused, setIsYearFocused] = useState(false);
  const [isCvvFocused, setIsCvvFocused] = useState(false);

  const [cardState, setCardState] = useState<CardState>({
    cardNumber: '',
    cardName: '',
    cardMonth: '',
    cardYear: '',
    cardCvv: '',
    currentCardBackground: Math.floor(Math.random() * 24) + 1,
  });

  const monthsArray = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
  ];
  const currentYear = new Date().getFullYear();
  const yearsArray = Array.from({length: 12}, (_, idx) =>
    (currentYear + idx).toString(),
  );

  const getCardType = (number: string) => {
    if (number.match(/^4/)) return 'visa';
    if (number.match(/^(34|37)/)) return 'amex';
    if (number.match(/^5[1-5]/)) return 'mastercard';
    if (number.match(/^6011/)) return 'discover';
    if (number.match(/^9792/)) return 'troy';
    return 'visa';
  };

  function formatCardNumber(text: string): string {
    const cleanedText = text.replace(/[^0-9]/g, '');
    setCardNumberValue(cleanedText);

    if (getCardType(cleanedText) === 'amex') {
      const result = Array(15).fill('#');
      for (let i = 0; i < cleanedText.length && i < 15; i++) {
        result[i] = cleanedText[i];
      }

      // add whitespace between group of 4, 6 and 5 numbers
      const fullCardNumber = result.join('');
      return (
        fullCardNumber.slice(0, 4) +
        '  ' +
        fullCardNumber.slice(4, 10) +
        '  ' +
        fullCardNumber.slice(10)
      );
    } else {
      const result = Array(16).fill('#');
      for (let i = 0; i < cleanedText.length && i < 16; i++) {
        result[i] = cleanedText[i];
      }

      return result // add whitespace between groups of 4 numbers
        .join('')
        .match(/.{1,4}/g)!
        .join('  ');
    }
  }

  const handleCvvInput = (text: string) => {
    const numericText = text.replace(/[^0-9]/g, '');
    setCvvValue(numericText);

    let cvvOnCard = '';
    for (let i = 0; i < numericText.length; i++) {
      cvvOnCard = cvvOnCard + '*';
    }
    setCardState(prev => ({...prev, cardCvv: cvvOnCard}));
  };

  const handleCvvFocus = () => {
    setIsCvvFocused(true);
    flipCard();
  };
  const handleCvvBlur = () => {
    setIsCvvFocused(false);
    flipCard();
  };

  // Animation tutorial: https://www.youtube.com/watch?v=aYefU7QmrdA
  const [isFlipped, setIsFlipped] = useState(false);
  const flipAnimation = useRef(new Animated.Value(0)).current;

  const frontInterpolate = flipAnimation.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const flipToFrontStyle = {
    transform: [{rotateY: frontInterpolate}],
  };

  const backInterpolate = flipAnimation.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const flipToBackStyle = {
    transform: [{rotateY: backInterpolate}],
  };

  const flipCard = () => {
    if (isFlipped) {
      Animated.spring(flipAnimation, {
        toValue: 0,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(flipAnimation, {
        toValue: 180,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    }
    setIsFlipped(!isFlipped);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
        }}
        contentInsetAdjustmentBehavior="automatic">
        <Animated.View
          style={[
            flipToFrontStyle,
            {
              position: 'absolute',
              top: 40,
              height: 170,
              width: 270,
              zIndex: 2,
              borderRadius: 12,
              elevation: 15,
              backfaceVisibility: 'hidden',
              overflow: 'hidden', // otherwise borderRadius will not work
            },
          ]}>
          <ImageBackground
            source={backgroundImages[cardState.currentCardBackground]}>
            <View
              style={{
                backgroundColor: 'black',
                width: '100%',
                height: '100%',
                opacity: 0.3,
              }}
            />

            <Image
              style={{
                width: 40,
                height: undefined,
                aspectRatio: 101 / 82,
                position: 'absolute',
                top: 16,
                left: 16,
              }}
              source={logos['chip']}
            />

            <Image
              resizeMode="contain"
              style={{
                width: undefined,
                height: 32,
                aspectRatio: 200 / 106,
                position: 'absolute',
                top: 16,
                right: 16,
              }}
              source={logos[getCardType(cardState.cardNumber)]}
            />

            <Text
              style={[
                styles.cardNumber,
                isCardNumberFocused && {borderColor: 'white'},
              ]}>
              {cardState.cardNumber || '####  ####  ####  ####'}
            </Text>

            <View
              style={[
                styles.cardHolderContainer,
                isCardHolderFocused && {borderColor: 'white'},
              ]}>
              <Text style={styles.cardHolderLabel}>Card Holder</Text>
              <Text style={styles.cardHolder} numberOfLines={1}>
                {cardState.cardName || 'FULL NAME'}
              </Text>
            </View>

            <View
              style={[
                styles.expiryContainer,
                (isMonthFocused || isYearFocused) && {borderColor: 'white'},
              ]}>
              <Text style={styles.expiryLabel}>Expires</Text>
              <Text style={styles.expiry}>
                {cardState.cardMonth || 'MM'}/
                {cardState.cardYear?.slice(-2) || 'YY'}
              </Text>
            </View>
          </ImageBackground>
        </Animated.View>

        <Animated.View
          style={[
            flipToBackStyle,
            {
              position: 'absolute',
              top: 40,
              height: 170,
              width: 270,
              borderRadius: 12,
              zIndex: 1,
              elevation: 15,
              backfaceVisibility: 'hidden',
              overflow: 'hidden', // otherwise borderRadius will not work
            },
          ]}>
          <ImageBackground
            source={backgroundImages[cardState.currentCardBackground]}>
            <View
              style={{
                backgroundColor: 'black',
                width: '100%',
                height: '100%',
                opacity: 0.3,
              }}
            />

            <View
              style={{
                backgroundColor: 'black',
                width: '100%',
                height: 32,
                opacity: 0.9,
                position: 'absolute',
                top: 16,
              }}
            />

            <Text
              style={{
                color: 'white',
                position: 'absolute',
                top: 60,
                fontWeight: 'bold',
                fontSize: 10,
                right: 10,
              }}>
              CVV
            </Text>

            <View
              style={{
                backgroundColor: 'white',
                height: 32,
                position: 'absolute',
                top: 76,
                right: 8,
                left: 8,
                borderRadius: 4,
              }}
            />

            <Text
              style={{
                color: 'black',
                position: 'absolute',
                top: 82,
                fontWeight: 'bold',
                fontSize: 14,
                right: 16,
              }}>
              {cardState.cardCvv}
            </Text>

            <Image
              resizeMode="contain"
              style={{
                width: undefined,
                height: 24,
                aspectRatio: 200 / 106,
                position: 'absolute',
                bottom: 16,
                right: 16,
              }}
              source={logos[getCardType(cardState.cardNumber)]}
            />
          </ImageBackground>
        </Animated.View>

        <View style={styles.innerContainer}>
          <View style={{height: 90}}></View>
          <Section title="Card Number">
            <TextInput
              style={[
                styles.textInput,
                isCardNumberFocused && {borderColor: '#3d9cff'},
              ]}
              keyboardType="numeric"
              value={cardNumberValue}
              maxLength={getCardType(cardNumberValue) === 'amex' ? 15 : 16}
              onFocus={() => setIsCardNumberFocused(true)}
              onBlur={() => setIsCardNumberFocused(false)}
              onChangeText={text => {
                setCardState(prev => ({
                  ...prev,
                  cardNumber: formatCardNumber(text),
                }));
              }}
            />
          </Section>

          <Section title="Card Holder">
            <TextInput
              style={[
                styles.textInput,
                isCardHolderFocused && {borderColor: '#3d9cff'},
              ]}
              maxLength={40}
              onFocus={() => setIsCardHolderFocused(true)}
              onBlur={() => setIsCardHolderFocused(false)}
              onChangeText={text =>
                setCardState(prev => ({...prev, cardName: text.toUpperCase()}))
              }
            />
          </Section>

          <View style={styles.row}>
            <View style={styles.expirationContainer}>
              <Section title="Expiration Date">
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    width: '100%',
                  }}>
                  <View
                    style={[
                      styles.picker,
                      isMonthFocused && {borderColor: '#3d9cff'},
                    ]}>
                    <Picker
                      mode="dropdown"
                      onFocus={() => setIsMonthFocused(true)}
                      onBlur={() => setIsMonthFocused(false)}
                      selectedValue={cardState.cardMonth}
                      onValueChange={itemValue =>
                        setCardState(prev => ({...prev, cardMonth: itemValue}))
                      }>
                      <Picker.Item label="Month" value="" />
                      {monthsArray.map(month => (
                        <Picker.Item key={month} label={month} value={month} />
                      ))}
                    </Picker>
                  </View>
                  <View
                    style={[
                      styles.picker,
                      isYearFocused && {borderColor: '#3d9cff'},
                    ]}>
                    <Picker
                      mode="dropdown"
                      onFocus={() => setIsYearFocused(true)}
                      onBlur={() => setIsYearFocused(false)}
                      selectedValue={cardState.cardYear}
                      onValueChange={itemValue =>
                        setCardState(prev => ({...prev, cardYear: itemValue}))
                      }>
                      <Picker.Item label="Year" value="" />
                      {yearsArray.map(year => (
                        <Picker.Item key={year} label={year} value={year} />
                      ))}
                    </Picker>
                  </View>
                </View>
              </Section>
            </View>
            <View style={styles.cvvContainer}>
              <Section title="CVV">
                <TextInput
                  style={[
                    styles.textInput,
                    isCvvFocused && {borderColor: '#3d9cff'},
                  ]}
                  value={cvvValue}
                  onChangeText={handleCvvInput}
                  onFocus={handleCvvFocus}
                  onBlur={handleCvvBlur}
                  keyboardType="numeric"
                  maxLength={4}
                />
              </Section>
            </View>
          </View>
          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDEEFC',
  },
  innerContainer: {
    marginTop: 130,
    borderRadius: 10,
    margin: 16,
    backgroundColor: 'white',
  },
  textInput: {
    height: 50,
    width: '100%',
    borderRadius: 4,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    marginVertical: 12,
    paddingHorizontal: 8,
    fontSize: 16,
  },
  picker: {
    height: 50,
    width: '58%',
    borderRadius: 4,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    marginRight: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 16,
  },
  expirationContainer: {
    flex: 0.7,
  },
  cvvContainer: {
    flex: 0.3,
    paddingLeft: 8,
  },
  cardNumber: {
    color: 'white',
    fontSize: 18,
    marginBottom: 20,
    fontWeight: 'bold',
    position: 'absolute',
    top: 64,
    left: 16,
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0)',
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  cardHolderContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    width: '60%',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0)',
  },
  cardHolderLabel: {
    color: '#CCCCCC',
    fontSize: 12,
  },
  cardHolder: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  expiryContainer: {
    maxWidth: 80,
    position: 'absolute',
    bottom: 16,
    right: 16,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0)',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  expiryLabel: {
    color: '#CCCCCC',
    fontSize: 12,
  },
  expiry: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  submitButton: {
    backgroundColor: '#2364D2',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    margin: 16,
    elevation: 8,
    marginTop: 28,
  },
  submitText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
});

export default App;
