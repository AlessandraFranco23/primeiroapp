import { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';


export default function App() {
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState({
    logradouro: "",
    uf: "",
    localidade: "",
  });
  function buscaCep(){
    console.log(cep);
    fetch(`https://viacep.com.br/ws/${cep}/json/`, {
      method: 'GET',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  )
      .then(res => res.json())
      .then((data) => {
        console.log(data);
        setEndereco({
            logradouro: data.logradouro,
            uf: data.uf,
            localidade: data.localidade,
        }
        );
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  return (
    <View style={style.container}>
      <Text style={style.h1}>Busca CEP</Text>
      <Text style={style.h2}>Encontrar endereço pelo CEP</Text>
      <TextInput 
      value={cep}
      onChangeText={setCep} 
      maxLength={8} 
      inputMode="numeric"
      placeholder='Digite seu CEP'
      style={style.inputText} 
      onBlur={buscaCep}
       />
       <TextInput
        style={style.inputText}
        value={endereco.logradouro}
        placeholder="Rua / Logradouro"

      />
      <TextInput
        style={style.inputText}
        value={endereco.uf}
        placeholder="uf"

      />
      <TextInput
        style={style.inputText}
        value={endereco.localidade}
        placeholder="localidade"

      />
    </View>
  );
}

const style = StyleSheet.create(
  {
    h1:{
      fontSize:20,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    h2:{
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    container: {
      flex: 1,
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    },
    containerPadding: {
     padding: 20,
     alignSelf: 'stretch',
     backgroundColor: '#fff', 
    },
    inputText:{
      borderWidth: 1,
      borderColor: "#000",
      borderRadius: 5,
      padding: 10,
      alignSelf: 'stretch',
    }
  }
);
