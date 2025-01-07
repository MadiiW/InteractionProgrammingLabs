import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Pressable} from 'react-native';
import {Divider} from './Divider';
import {FormHeadline} from './FormHeadline';
import {PasswordStrengthmeter} from './PasswordStrengthmeter';

export function AccountRegistration({
  title = 'Creating new account',
  hasFirstNameField = true,
  hasLastNameField = true,
  hasBirthdayField = true,
  submitButtonText = 'Register',
  submitButtonColor = '#2560D0',
  handleButtonTap,
  firstNameValue,
  setFirstNameValue,
  lastNameValue,
  setLastNameValue,
  emailValue,
  setEmailValue,
  passwordValue,
  setPasswordValue,
  birthday,
  setBirthday,
}) {
  const [isEmailValid, setIsEmailValid] = useState(false);

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const validateNumberInput = text => {
    return text.replace(/[^0-9]/g, '');
  };

  return (
    <View style={styles.container}>
      <Divider style={{marginTop: 16}}></Divider>
      <Text style={styles.title}>{title}</Text>
      <Divider style={{marginBottom: 24}}></Divider>

      <View style={styles.formContainer}>
        {hasFirstNameField && (
          <>
            <FormHeadline title={'First Name'} />
            <TextInput
              style={styles.textInput}
              placeholder="Enter your first name"
              value={firstNameValue}
              onChangeText={setFirstNameValue}
              maxLength={32}
              autoCapitalize="words"
              autoComplete="given-name"
            />
          </>
        )}

        {hasLastNameField && (
          <>
            <FormHeadline title={'Last Name'} />
            <TextInput
              style={styles.textInput}
              placeholder="Enter your last name"
              value={lastNameValue}
              onChangeText={setLastNameValue}
              maxLength={32}
              autoCapitalize="words"
              autoComplete="family-name"
            />
          </>
        )}

        <FormHeadline title={'Email'} />
        <TextInput
          style={[
            styles.textInput,
            {
              borderColor:
                emailValue === '' ? '#CCCCCC' : isEmailValid ? 'green' : 'red',
            },
          ]}
          placeholder="your@email.com"
          value={emailValue}
          onChangeText={text => {
            setEmailValue(text);
            setIsEmailValid(validateEmail(emailValue));
          }}
          autoComplete="email"
          keyboardType="email-address"
        />

        <PasswordStrengthmeter
          title="Password"
          onPasswordChange={setPasswordValue}
        />

        {hasBirthdayField && (
          <>
            <FormHeadline title={'Date of birth'} />
            <View style={styles.birthdayContainer}>
              <TextInput
                style={[styles.textInput, {width: '32%', marginRight: '2%'}]}
                placeholder="DD"
                maxLength={2}
                keyboardType="numeric"
                autoComplete="birthdate-day"
                value={birthday.day}
                onChangeText={day => {
                  const cleanDay = validateNumberInput(day);
                  setBirthday({...birthday, day: cleanDay});
                }}
              />
              <TextInput
                style={[styles.textInput, {width: '32%', marginRight: '2%'}]}
                placeholder="MM"
                maxLength={2}
                keyboardType="numeric"
                autoComplete="birthdate-month"
                value={birthday.month}
                onChangeText={month => {
                  const cleanMonth = validateNumberInput(month);
                  setBirthday({...birthday, month: cleanMonth});
                }}
              />
              <TextInput
                style={[styles.textInput, {width: '32%'}]}
                placeholder="YYYY"
                maxLength={4}
                keyboardType="numeric"
                autoComplete="birthdate-year"
                value={birthday.year}
                onChangeText={year => {
                  const cleanYear = validateNumberInput(year);
                  setBirthday({...birthday, year: cleanYear});
                }}
              />
            </View>
          </>
        )}

        <Pressable
          style={[styles.submitButton, {backgroundColor: submitButtonColor}]}
          onPress={() => {
            if (handleButtonTap) {
              handleButtonTap();
            }
          }}>
          <Text style={styles.submitButtonText}>{submitButtonText}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  formContainer: {
    width: '100%',
  },
  birthdayContainer: {
    flexDirection: 'row',
  },
  title: {
    fontWeight: '700',
    fontSize: 40,
    color: 'black',
    textAlign: 'center',
    textTransform: 'uppercase',
    marginVertical: 32,
    marginHorizontal: 24,
  },
  textInput: {
    height: 50,
    width: '100%',
    borderRadius: 4,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  submitButton: {
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    elevation: 8,
    marginTop: 16,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
});
