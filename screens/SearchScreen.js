// Importation des hooks et composants nécessaires
import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function SearchScreen({ navigation }) {
  // État pour le texte de recherche et le type (artiste ou chanson)
  const [searchTerm, setSearchTerm] = useState('');
  const [searchOption, setSearchOption] = useState('Artist');
  
  // Fonction de recherche selon le filtre choisi
  const getSongs = async () => {
    if (searchOption === 'Artist') {
      try {
        const response = await fetch(`https://itunes.apple.com/search?term=${searchTerm}&entity=musicArtist`);
        const data = await response.json();
        navigation.navigate('Results', { results: data.results, searchOption });
      } catch (error) {
        console.error("Erreur lors de la recherche :", error);
      }
    } else {
      try {
        const response = await fetch(`https://itunes.apple.com/search?entity=song&term=${searchTerm}`);
        const data = await response.json();
        navigation.navigate('Results', { results: data.results, searchOption });
      } catch (error) {
        console.error("Erreur lors de la recherche :", error);
      }
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>
          Search for your favourite artist or song
        </Text>

        <TextInput
          style={styles.input}
          value={searchTerm}
          onChangeText={setSearchTerm}
          placeholder="Search..."
        />
        
        {/* Choix entre artiste ou chanson */}
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              searchOption === 'Artist' && styles.activeButton
            ]}
            onPress={() => setSearchOption('Artist')}
          >
            <Text style={styles.filterText}>Artist</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.filterButton,
              searchOption === 'Song' && styles.activeButton
            ]}
            onPress={() => setSearchOption('Song')}
          >
            <Text style={styles.filterText}>Song</Text>
          </TouchableOpacity>
        </View>

        {/* Bouton de lancement de la recherche */}
        <TouchableOpacity style={styles.searchButton} onPress={getSongs}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>

      </SafeAreaView>
    </SafeAreaProvider>
  );
}

// Styles de la page
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  filterButton: {
    padding: 8,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
    minWidth: 80,
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: 'black',
  },
  filterText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  searchButton: {
    backgroundColor: 'black',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 50,
    width: 200,
  },
  searchButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
