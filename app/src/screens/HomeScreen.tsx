import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../App'
import { useAuth } from '../contexts/AuthContext'

export const HomeScreen: React.FC<NativeStackScreenProps<RootStackParamList, 'Home'>> = ({ navigation }) => {
  const { user } = useAuth()
  const [query, setQuery] = useState('')

  useEffect(() => {
    // Could prefetch data here
  }, [])

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerBar}>
        <Text style={styles.time}>SOCAA</Text>
        <View style={{ flexDirection: 'row', gap: 8 }} />
      </View>

      <View style={styles.hero}>
        <Text style={styles.logo}>SOCAA</Text>
        <Text style={styles.subtitle}>Driving Professionalism in Agriculture</Text>
      </View>

      <View style={styles.searchCard}>
        <TextInput
          placeholder="Find Agronomist/ Extension Officer"
          value={query}
          onChangeText={setQuery}
          style={styles.searchInput}
          onSubmitEditing={() => navigation.navigate('Officers')}
        />
      </View>

      <Text style={styles.sectionTitle}>QUICK OPTIONS</Text>

      <View style={styles.grid}>
        <TouchableOpacity style={styles.cta} onPress={() => navigation.navigate(user ? 'Notifications' : 'Login')}>
          <Text style={styles.ctaText}>{user ? 'Profile / Notifications' : 'Register / Login'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cta} onPress={() => navigation.navigate('Advisories')}>
          <Text style={styles.ctaText}>Crops Advisory</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cta} onPress={() => navigation.navigate('MarketRates')}>
          <Text style={styles.ctaText}>Market Rates</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cta} onPress={() => navigation.navigate('Notifications')}>
          <Text style={styles.ctaText}>Notifications</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#f9d300', gap: 12 },
  headerBar: { height: 44, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  time: { color: '#fff', fontWeight: 'bold' },
  hero: { backgroundColor: '#fff', padding: 16, borderRadius: 8, alignItems: 'center' },
  logo: { fontSize: 28, fontWeight: 'bold', color: '#087c3e' },
  subtitle: { color: '#555', marginTop: 4 },
  searchCard: { backgroundColor: '#fff', borderRadius: 8, padding: 12 },
  searchInput: { backgroundColor: '#f2f2f2', borderRadius: 6, paddingHorizontal: 12, paddingVertical: 10 },
  sectionTitle: { marginTop: 8, fontWeight: '700', color: '#444' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'space-between' },
  cta: { backgroundColor: '#0aa04f', borderRadius: 10, padding: 16, width: '48%' },
  ctaText: { color: '#fff', fontWeight: '700' },
})