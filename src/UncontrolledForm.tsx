import React, {useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';
import {TextInput} from './components/TextInput';
import {Controller, useForm} from 'react-hook-form';

type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const validEmailRegEx =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const UncontrolledForm = () => {
  const renderCounter = useRef(1);
  const {
    control,
    handleSubmit,
    getValues,
    formState: {errors},
  } = useForm<FormData>();

  function onSubmit() {
    console.log('values', getValues());
  }

  console.log('render counter: ', renderCounter.current);
  renderCounter.current += 1;

  return (
    <View>
      <Controller
        control={control}
        name="name"
        rules={{
          required: 'Não pode estar vazio',
          minLength: {
            value: 2,
            message: 'Nome deve ter mais que dois caracteres',
          },
        }}
        render={({field: {value, onChange}}) => (
          <TextInput
            label="Nome"
            value={value}
            onChangeText={onChange}
            errorMessage={errors.name?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="email"
        rules={{
          required: 'Não pode estar vazio',
          pattern: {
            value: validEmailRegEx,
            message: 'Insira um e-mail válido',
          },
        }}
        render={({field: {value, onChange}}) => (
          <TextInput
            label="E-mail"
            value={value}
            onChangeText={onChange}
            errorMessage={errors.email?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        rules={{
          required: 'Não pode estar vazio',
          minLength: {value: 8, message: 'Deve ter pelo menos 8 caracteres'},
          maxLength: {value: 40, message: 'Deve ter no máximo 40 caracteres'},
        }}
        render={({field: {value, onChange}}) => (
          <TextInput
            label="Senha"
            value={value}
            secureTextEntry
            onChangeText={onChange}
            errorMessage={errors.password?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="confirmPassword"
        rules={{
          required: 'Não pode estar vazio',
          validate: (value, formValues) => {
            if (value !== formValues.password) {
              return 'As senhas devem ser iguais';
            }
            return true;
          },
        }}
        render={({field: {value, onChange}}) => (
          <TextInput
            label="Confirmar Senha"
            value={value}
            onChangeText={onChange}
            secureTextEntry
            errorMessage={errors.confirmPassword?.message}
          />
        )}
      />

      <Button
        style={styles.button}
        labelStyle={styles.buttonLabel}
        onPress={handleSubmit(onSubmit)}>
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

export {UncontrolledForm};
