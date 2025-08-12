import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, StyleSheet, TextInput } from 'react-native'
import { api } from '../api/client'

type Officer = { id: number; specialization: string; region: string; user: { id: number; name: string; email: string } }

export const OfficersScreen: React.FC = () => {
  const [items, setItems] = useState<Officer[]>([])
  const [q, setQ] = useState('')

  const load = async (query?: string) => {
    const r = await api.get('/officers', { params: query ? { q: query } : {} })
    setItems(r.data)
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <View style={{ padding: 12, backgroundColor: '#fff' }}>
        <TextInput value={q} onChangeText={setQ} placeholder="Search officer or specialization" style={styles.input} onSubmitEditing={() => load(q)} />
      </View>
      <FlatList
        style={styles.list}
        data={items}
        keyExtractor={(i) => String(i.id)}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.user.name}</Text>
            <Text>{item.specialization} • {item.region}</Text>
            <Text style={styles.email}>{item.user.email}</Text>
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  list: { backgroundColor: '#fff' },
  card: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee' },
  name: { fontWeight: '700' },
  email: { color: '#087c3e' },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 10, borderRadius: 8 },
})