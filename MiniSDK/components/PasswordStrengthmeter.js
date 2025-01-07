import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import {FormHeadline} from './FormHeadline';

export function PasswordStrengthmeter({
  title = 'Choose your password',
  style,
  minPasswordLength = 10,
  preferredPasswordLength = 18,
  onPasswordChange,
}) {
  const [passwordValue, setPasswordValue] = useState('');
  const [showExplanation, setShowExplanation] = useState(false);
  const toggleExplanation = () => {
    setShowExplanation(!showExplanation);
  };

  const getPasswordStrength = password => {
    var ruleCounter = 0;

    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) ruleCounter++; // has both lower and uppercase letters
    if (/\d/.test(password)) ruleCounter++; // contains at least one number
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) ruleCounter++; // contains at leas one special character
    if (password.length >= preferredPasswordLength) ruleCounter++; // check if password is long

    if (password.length < minPasswordLength) {
      return {hint: 'Too short', width: '0%', color: 'gray'};
    } else if (ruleCounter == 1) {
      return {hint: 'Very weak', width: '25%', color: 'red'};
    } else if (ruleCounter == 2) {
      return {hint: 'Weak', width: '50%', color: 'orange'};
    } else if (ruleCounter == 3) {
      return {hint: 'Good', width: '75%', color: 'yellowgreen'};
    } else if (ruleCounter >= 4) {
      return {hint: 'Strong', width: '100%', color: 'green'};
    } else {
      return {hint: 'Too weak', width: '0%', color: 'gray'};
    }
  };
  const passwordStrength = getPasswordStrength(passwordValue);

  return (
    <View style={[style, styles.container]}>
      <FormHeadline title={title} />
      <TextInput
        style={styles.textInput}
        placeholder="Enter your password"
        value={passwordValue}
        onChangeText={text => {
          setPasswordValue(text);
          if (onPasswordChange) {
            onPasswordChange(text);
          }
        }}
        autoComplete="new-password"
        secureTextEntry
      />
      <View style={styles.strengthmeterContainer}>
        <View style={styles.backgroundBar}></View>
        {passwordStrength.width !== '0%' && (
          <View
            style={[
              styles.progressBar,
              {
                width: passwordStrength.width,
                backgroundColor: passwordStrength.color,
              },
            ]}
          />
        )}
      </View>
      <View>
        <View style={styles.hintContainer}>
          <Text style={[styles.strengthText, {color: passwordStrength.color}]}>
            {passwordStrength.hint}
          </Text>
          <TouchableOpacity onPress={toggleExplanation}>
            <Image
              style={{width: 16, height: 16}}
              source={require('./../res/circle-question-regular.png')}
              testID="questionMarkButton"
            />
          </TouchableOpacity>
        </View>

        {showExplanation && ( // only show explanation if toggle is on
          <Text style={{marginTop: 8, marginBottom: 12}}>
            Your password needs at least {minPasswordLength} characters. A
            strong password should:
            {'\n\t'}• contain uppercase and lowercase letters
            {'\n\t'}• have at least one number
            {'\n\t'}• include a special character
            {'\n\t'}• be at least {preferredPasswordLength} characters long
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInput: {
    height: 50,
    width: '100%',
    borderRadius: 4,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  strengthmeterContainer: {
    height: 5,
    width: '100%',
    backgroundColor: '#CCCCCC',
    borderRadius: 4,
    overflow: 'hidden',
    marginVertical: 8,
    position: 'relative',
  },
  backgroundBar: {
    height: '100%',
    width: '100%',
    backgroundColor: '#EEEEEE',
  },
  progressBar: {
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
  },
  hintContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  strengthText: {
    fontWeight: '600',
    marginRight: 8,
  },
});
