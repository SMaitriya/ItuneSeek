import {useState} from 'react';
import {View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function SearchScreen( {navigation} ) {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [searchOption, setSearchOption] = useState('Artiste')
    
    const getSongs = async () => {
        if (searchOption === 'Artist') {

        
        try {
            const response = await
            fetch(`https://itunes.apple.com/search?term=${searchTerm}&entity=musicArtist`);
            const data = await response.json();
            navigation.navigate('Results', {results: data.results, searchOption});
        } catch (errors) {
            console.error("Erreur lors de la recherche :",  error);
        }
        } 
        else {

            try {
                const response = await fetch(`https://itunes.apple.com/search?entity=song&term=${searchTerm}`);

                const data = await response.json();
                navigation.navigate('Results', {results: data.results, searchOption});
            } catch (errors) {
                console.error("Erreur lors de la recherche :",  error);
            }

        }
    };
    
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>
                    Seach for your favourite artist or song
                </Text>
                <TextInput
                    style={styles.input}
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                    placeholder="Search..."
                />
                
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
                            searchOption === 'Music' && styles.activeButton
                        ]}
                        onPress={() => setSearchOption('Music')}
                    >
                        <Text style={styles.filterText}>Song</Text>
                    </TouchableOpacity>
                </View>
                
                <Button title='Search' onPress={getSongs} />
                
          
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
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
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#ccc',
        marginHorizontal: 5,
    },
    activeButton: {
        backgroundColor: '#007bff',
    },
    filterText: {
        color: '#fff',
        fontWeight: 'bold',
    },
 
});