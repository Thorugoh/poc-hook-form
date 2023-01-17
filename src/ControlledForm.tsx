import React, {useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';
import {TextInput} from './components/TextInput';

type FormData = {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type FormErrors = Partial<FormData>;

const validEmailRegEx =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const ControlledForm = () => {
  const renderCounter = useRef(1);
  const [form, setForm] = useState<FormData>({
    name: '',
    username: '',
    password: '',
    email: '',
    confirmPassword: '',
  });
  const [showError, setShowError] = useState(false);

  function onChangeForm(value: Partial<FormData>) {
    validate(value);
    setForm(currentForm => ({...currentForm, ...value}));
  }

  function validatePassword(password: string) {
    if (!password) {
      return 'Não pode estar vazio';
    }
    if (password.length < 8 || password.length > 40) {
      return 'Deve ter entre 8 e 40 caracteres';
    }
    return '';
  }

  function validateEmail(email: string) {
    if (!email) {
      return 'Não pode estar vazio';
    }
    if (!email.match(validEmailRegEx)) {
      return 'Insira um e-mail válido';
    }
    return '';
  }

  function validateConfirmPassword(password: string, confirmPassword: string) {
    if (!confirmPassword) {
      return 'Não pode estar vazio';
    }
    if (confirmPassword !== password) {
      return 'As senhas devem ser iguais';
    }
    return '';
  }

  function validateName(name: string) {
    if (!name) {
      return 'Não pode estar vazio';
    }
    if (name.length < 2) {
      return 'Nome dever ter mais que dois caracteres';
    }
    return '';
  }

  function validate(formToValidate: Partial<FormData>): FormErrors {
    return {
      name: validateName(formToValidate.name || ''),
      email: validateEmail(formToValidate.email || ''),
      password: validatePassword(formToValidate.password || ''),
      confirmPassword: validateConfirmPassword(
        formToValidate.password || '',
        formToValidate.confirmPassword || '',
      ),
    };
  }

  const formErrors = validate(form);

  function onSubmit() {
    if (formErrors && Object.values(formErrors).some(value => value)) {
      setShowError(true);
    }

    console.log({form});
  }

  console.log('render counter: ', renderCounter.current);
  renderCounter.current += 1;

  return (
    <View>
      <TextInput
        label="Nome"
        value={form.name}
        onChangeText={value => {
          onChangeForm({name: value});
        }}
        errorMessage={showError ? formErrors.name : undefined}
      />
      <TextInput
        label="Email"
        value={form.email}
        onChangeText={value => {
          onChangeForm({email: value});
        }}
        errorMessage={showError ? formErrors.email : undefined}
      />
      <TextInput
        label="Senha"
        value={form.password}
        onChangeText={value => {
          onChangeForm({password: value});
        }}
        errorMessage={showError ? formErrors.password : undefined}
      />
      <TextInput
        label="Confirmar Senha"
        value={form.confirmPassword}
        onChangeText={value => {
          onChangeForm({confirmPassword: value});
        }}
        errorMessage={showError ? formErrors.confirmPassword : undefined}
      />
      <Button
        style={styles.button}
        labelStyle={styles.buttonLabel}
        onPress={onSubmit}>
        Submit
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 32,
    backgroundColor: 'blue',
  },
  buttonLabel: {
    color: '#fff',
  },
});
export {ControlledForm};
