import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function MyCollectionScreen() {
  const [tracks, setTracks] = useState([]);     // Stocke les chansons sauvegardées
  const [artists, setArtists] = useState([]);   // Stocke les artistes sauvegardés

  // Fonction pour charger les éléments sauvegardés depuis AsyncStorage
  const loadCollection = async () => {
    try {
      const data = await AsyncStorage.getItem('myCollection');
      const parsed = data ? JSON.parse(data) : [];

      // Sépare les chansons et les artistes dans deux listes différentes
      const musicList = parsed.filter(item => item.trackId);
      const artistList = parsed.filter(item => item.artistId && !item.trackId);

      setTracks(musicList);
      setArtists(artistList);
    } catch (e) {
      console.error('Erreur de chargement de la base :', e);
    }
  };

  // Recharge les données quand l'utilisateur revient sur l'écran
  useFocusEffect(
    useCallback(() => {
      loadCollection();
    }, [])
  );

  // Supprime un élément de la collection, selon son type (track ou artist)
  const handleDelete = async (id, type) => {
    try {
      const data = await AsyncStorage.getItem('myCollection');
      const parsed = data ? JSON.parse(data) : [];

      // Si c’est une chanson, on compare par trackId. Sinon, on enlève les artistes.
      const updated = parsed.filter((item) => {
        if (type === 'track') {
          return item.trackId !== id;
        } else {
          return item.artistId !== id || item.trackId;
        }
      });

      await AsyncStorage.setItem('myCollection', JSON.stringify(updated));
      loadCollection(); // Recharge après suppression
    } catch (e) {
      console.error('Erreur lors de la suppression :', e);
    }
  };

  return (
    <View style={styles.container}>
      {/* Section des chansons sauvegardées */}
      <Text style={styles.title}>🎵 Saved Songs</Text>
      {tracks.length === 0 ? (
        <Text style={styles.emptyText}>No saved songs yet.</Text>
      ) : (
        <FlatList
          data={tracks}
          keyExtractor={(item) => item.trackId.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemRow}>
              <Text style={styles.itemText}>{item.trackName} - {item.artistName}</Text>
              <TouchableOpacity onPress={() => handleDelete(item.trackId, 'track')}>
                <Text style={styles.deleteButton}>🗑</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      {/* Section des artistes sauvegardés */}
      <Text style={styles.title}>🎤 Saved Artists</Text>
      {artists.length === 0 ? (
        <Text style={styles.emptyText}>No saved artists yet.</Text>
      ) : (
        <FlatList
          data={artists}
          keyExtractor={(item) => item.artistId.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemRow}>
              <Text style={styles.itemText}>{item.artistName}</Text>
              <Text style={styles.itemText}>{item.primaryGenreName}</Text>
              <TouchableOpacity onPress={() => handleDelete(item.artistId, 'artist')}>
                <Text style={styles.deleteButton}>🗑</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

// Style de l'écran "My Collection"
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 12,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#aaa',
    fontStyle: 'italic',
    textAlign: 'center',
    marginVertical: 10,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
  },
  itemText: {
    fontSize: 16,
    flexShrink: 1,
    marginRight: 10,
  },
  deleteButton: {
    fontSize: 18,
    color: 'red',
  },
});
