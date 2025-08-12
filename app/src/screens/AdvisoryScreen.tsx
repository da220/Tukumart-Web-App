import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { api } from '../api/client'

type Advisory = { id: number; title: string; content: string; createdAt: string; crop?: { name: string } }

export const AdvisoryScreen: React.FC = () => {
  const [items, setItems] = useState<Advisory[]>([])

  useEffect(() => {
    api.get('/advisories').then((r) => setItems(r.data))
  }, [])

  return (
    <FlatList
      style={styles.list}
      data={items}
      keyExtractor={(i) => String(i.id)}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.meta}>{item.crop?.name ?? 'General'}</Text>
          <Text>{item.content}</Text>
        </View>
      )}
    />
  )
}

const styles = StyleSheet.create({
  list: { backgroundColor: '#fff' },
  card: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee' },
  title: { fontWeight: '700' },
  meta: { color: '#888', marginBottom: 6 },
})