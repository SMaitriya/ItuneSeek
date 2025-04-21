import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DetailScreen({ route }) {
  const { item, searchOption } = route.params;
  const [selectedRating, setSelectedRating] = useState(0);
  
  // Clé unique pour chaque item basée sur son ID
  const storageKey = `rating_${searchOption === 'Artist' ? item.artistId : item.trackId}`;
  
  // Charger la note sauvegardée au chargement de l'écran
  useEffect(() => {
    const loadRating = async () => {
      try {
        const savedRating = await AsyncStorage.getItem(storageKey);
        if (savedRating !== null) {
          setSelectedRating(parseInt(savedRating));
        }
      } catch (error) {
        console.error('Erreur lors du chargement de la note:', error);
      }
    };
    
    loadRating();
  }, [storageKey]);
  
  // Fonction pour sauvegarder la note
  const saveRating = async (rating) => {
    try {
      await AsyncStorage.setItem(storageKey, rating.toString());
      setSelectedRating(rating);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de la note:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {searchOption === 'Artist' ? (
        <>
          <Text style={styles.title}>{item.artistName}</Text>
          <Text style={styles.genre}>Genre : {item.primaryGenreName}</Text>
        </>
      ) : (
        <>
          <Image
            source={{ uri: item.artworkUrl100 }}
            style={styles.mainImage}
            resizeMode="cover"
          />
          <Text style={styles.title}>{item.trackName}</Text>
          <Text style={styles.subtitle}>🎤 {item.artistName}</Text>
          <Text style={styles.album}>💿 Album : {item.collectionName}</Text>
          <Text style={styles.genre}>🎼 Genre : {item.primaryGenreName}</Text>
        </>
      )}
      
      {/* Système de notation  */}
      <View style={styles.ratingRow}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Text
            key={star}
            style={selectedRating >= star ? styles.starSelected : styles.star}
            onPress={() => saveRating(star)}
          >
            ⭐
          </Text>
        ))}
      </View>
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
    marginBottom: 30, 
  },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20, 
  },
  star: {
    fontSize: 24,
    marginHorizontal: 4,
    opacity: 0.3,
  },
  starSelected: {
    fontSize: 24,
    marginHorizontal: 4,
    opacity: 1,
  },
});