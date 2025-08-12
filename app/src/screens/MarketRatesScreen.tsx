import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { api } from '../api/client'

type Rate = { id: number; location: string; pricePerKg: number; date: string; crop: { name: string } }

export const MarketRatesScreen: React.FC = () => {
  const [items, setItems] = useState<Rate[]>([])

  useEffect(() => {
    api.get('/market-rates').then((r) => setItems(r.data))
  }, [])

  return (
    <FlatList
      style={styles.list}
      data={items}
      keyExtractor={(i) => String(i.id)}
      renderItem={({ item }) => (
        <View style={styles.row}>
          <Text style={styles.crop}>{item.crop.name}</Text>
          <Text>{item.location}</Text>
          <Text style={styles.price}>${item.pricePerKg.toFixed(2)}/kg</Text>
        </View>
      )}
    />
  )
}

const styles = StyleSheet.create({
  list: { backgroundColor: '#fff' },
  row: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee', flexDirection: 'row', justifyContent: 'space-between' },
  crop: { fontWeight: '700' },
  price: { color: '#0aa04f', fontWeight: '700' },
})