import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { api } from '../api/client'
import { useAuth } from '../contexts/AuthContext'

type Notification = { id: number; title: string; body: string; isRead: boolean; createdAt: string }

export const NotificationsScreen: React.FC = () => {
  const { user } = useAuth()
  const [items, setItems] = useState<Notification[]>([])

  useEffect(() => {
    if (!user) return
    api.get('/notifications').then((r) => setItems(r.data))
  }, [user])

  if (!user) {
    return (
      <View style={styles.center}> 
        <Text>Login required</Text>
      </View>
    )
  }

  return (
    <FlatList
      style={styles.list}
      data={items}
      keyExtractor={(i) => String(i.id)}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.title}>{item.title}</Text>
          <Text>{item.body}</Text>
        </View>
      )}
    />
  )
}

const styles = StyleSheet.create({
  list: { backgroundColor: '#fff' },
  card: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee' },
  title: { fontWeight: '700', marginBottom: 4 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
})