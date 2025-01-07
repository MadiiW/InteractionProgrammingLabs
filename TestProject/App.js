import React, {useState} from 'react';
import {ScrollView, Text, StyleSheet} from 'react-native';
import {PasswordStrengthmeter, AccountRegistration} from 'mini-sdk';

export default function App() {
  const [firstNameValue, setFirstNameValue] = useState('');
  const [lastNameValue, setLastNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [birthday, setBirthday] = useState({day: '', month: '', year: ''});

  const handlePasswordChange = password => {
    console.log('New password value:', password);
  };

  return (
    <ScrollView style={{padding: 16}}>
      <Text style={{fontSize: 26, fontWeight: 'bold', marginBottom: 8}}>
        Test program
      </Text>

      <Text style={styles.title}>First component: Account Registration</Text>
      <AccountRegistration
        title="Create new account"
        handleButtonTap={() => {
          console.log('First name: ' + firstNameValue);
          console.log('Last name: ' + lastNameValue);
          console.log('Email: ' + emailValue);
          console.log('Password: ' + passwordValue);
          console.log(
            'Birthday: ' +
              birthday.day +
              '.' +
              birthday.month +
              '.' +
              birthday.year,
          );
        }}
        firstNameValue={firstNameValue}
        setFirstNameValue={setFirstNameValue}
        lastNameValue={lastNameValue}
        setLastNameValue={setLastNameValue}
        emailValue={emailValue}
        setEmailValue={setEmailValue}
        passwordValue={passwordValue}
        setPasswordValue={setPasswordValue}
        birthday={birthday}
        setBirthday={setBirthday}
      />

      <Text style={[styles.title, {marginTop: 24}]}>
        Second component: Password Strengthmeter
      </Text>
      <PasswordStrengthmeter
        title={'Choose a strong password'}
        style={{marginBottom: 32}}
        onPasswordChange={handlePasswordChange}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: '500',
    marginVertical: 8,
  },
});
