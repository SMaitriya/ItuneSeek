import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function ResultScreen({ route , navigation}) {
  const { results, searchOption } = route.params;

  const handlePress = (item) => {
    navigation.navigate('Details', {item, searchOption});
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Résultats :</Text>

      <FlatList
        data={results}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {

          if (searchOption === 'Artist') {

            return (
              <TouchableOpacity onPress={() => handlePress(item)}>
              <View style={styles.itemContainer}>
                <Text style={styles.resultText}>
                  {item.artistName}
                  <Text style={styles.label}>{'\n'}Genre :</Text> {item.primaryGenreName}
                </Text>
              </View>
              </TouchableOpacity>
            );
          } else {
            return (
                <TouchableOpacity onPress={() => handlePress(item)}>
              <View style={styles.itemContainer}>
                <Image
                  source={{ uri: item.artworkUrl100 }}
                  style={styles.albumArt}
                />

                <Text style={styles.resultText}>
                  {item.trackName} - {item.artistName}
                  <Text style={styles.label}>{'\n'}Album :</Text> {item.collectionName}
                  <Text style={styles.label}>{'\n'}Genre :</Text> {item.primaryGenreName}
                </Text>
              </View>
              </TouchableOpacity>
            );
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  resultText: {
    fontSize: 16,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    maxWidth: '80%',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  albumArt: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  label: {
    fontWeight: 'bold',
  },
});
