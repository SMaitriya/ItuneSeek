import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DetailScreen({ route }) {
  const { item, searchOption } = route.params;
  const [selectedRating, setSelectedRating] = useState(0);

  // Crée une clé unique pour sauvegarder la note en fonction du type (artiste ou chanson)
  const storageKey = `rating_${searchOption === 'Artist' ? item.artistId : item.trackId}`;

  // Chargement automatique de la note si elle existe déjà
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

  // Sauvegarde la note dans AsyncStorage
  const saveRating = async (rating) => {
    try {
      await AsyncStorage.setItem(storageKey, rating.toString());
      setSelectedRating(rating);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de la note:', error);
    }
  };

  // Ajoute le contenu (musique ou artiste) dans la collection de l’utilisateur
  const handleSaving = async () => {
    const key = 'myCollection';
    try {
      const existing = await AsyncStorage.getItem(key);
      const parsed = existing ? JSON.parse(existing) : [];

      // Vérifie si l’élément existe déjà dans la collection
      const alreadyExists = parsed.some((el) => {
        if (searchOption === 'Artist') {
          return el.artistId === item.artistId && !el.trackId;
        } else {
          return el.trackId === item.trackId;
        }
      });

      // Si non présent, on l’ajoute
      if (!alreadyExists) {
        const updated = [...parsed, item];
        await AsyncStorage.setItem(key, JSON.stringify(updated));
        alert('Added ✅');
      } else {
        alert('Already added 😉');
      }
    } catch (e) {
      console.error('Erreur ajout :', e);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Vue spécifique pour artiste */}
      {searchOption === 'Artist' ? (
        <>
          <Text style={styles.title}>{item.artistName}</Text>
          <Text style={styles.genre}>Genre : {item.primaryGenreName}</Text>
        </>
      ) : (
        // Vue spécifique pour une chanson
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

      {/* Bouton d’ajout à la collection */}
      <TouchableOpacity style={styles.button} onPress={handleSaving}>
        <Text style={styles.buttonText}>Add to library</Text>
      </TouchableOpacity>

      {/* Système de notation avec étoiles */}
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

// Styles pour l’interface
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
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    marginVertical: 16,
    elevation: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 200,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
