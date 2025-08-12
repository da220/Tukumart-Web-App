import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { useAuth } from '../contexts/AuthContext'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../App'

export const RegisterScreen: React.FC<NativeStackScreenProps<RootStackParamList, 'Register'>> = ({ navigation }) => {
  const { register } = useAuth()
  const [name, setName] = useState('Demo Farmer')
  const [email, setEmail] = useState('farmer@example.com')
  const [password, setPassword] = useState('farmer123')

  const onSubmit = async () => {
    try {
      await register(name, email, password)
      navigation.replace('Home')
    } catch (e: any) {
      Alert.alert('Register failed', e?.response?.data?.error ?? e.message)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create account</Text>
      <TextInput value={name} onChangeText={setName} placeholder="Name" style={styles.input} />
      <TextInput value={email} onChangeText={setEmail} placeholder="Email" style={styles.input} autoCapitalize="none" />
      <TextInput value={password} onChangeText={setPassword} placeholder="Password" secureTextEntry style={styles.input} />
      <TouchableOpacity style={styles.btn} onPress={onSubmit}>
        <Text style={styles.btnText}>Register</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 12, borderRadius: 8 },
  btn: { backgroundColor: '#0aa04f', padding: 14, borderRadius: 8, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '700' },
})