import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

export default function DetailScreen({ route }) {
  const { item, searchOption } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{ uri: item.artworkUrl100 }}
        style={styles.mainImage}
        resizeMode="cover"
      />

      {searchOption === 'Artist' ? (
        <>
          <Text style={styles.title}>{item.artistName}</Text>
          <Text style={styles.genre}>Genre : {item.primaryGenreName}</Text>
        </>
      ) : (
        <>
          <Text style={styles.title}>{item.trackName}</Text>
          <Text style={styles.subtitle}>🎤 {item.artistName}</Text>
          <Text style={styles.album}>💿 Album : {item.collectionName}</Text>
          <Text style={styles.genre}>🎼 Genre : {item.primaryGenreName}</Text>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
    flexGrow: 1,
  },
  mainImage: {
    width: 220,
    height: 220,
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
    color: '#222',
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 8,
    color: '#444',
  },
  album: {
    fontSize: 18,
    marginBottom: 8,
    color: '#555',
  },
  genre: {
    fontSize: 16,
    color: '#777',
    marginTop: 6,
  },
});
