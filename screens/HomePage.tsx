import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from '../styles';

export default function HomePage({navigation}: {navigation: any}) {
    return (
        <View style={[ styles.container, { backgroundColor: '#fff' } ]}>
            <Text style={[ styles.listTitle, { fontWeight: 'bold', marginBottom: '5vh' } ]}>Bem vindo ao Scanner 2000!</Text>

            <TouchableOpacity style={ styles.button } onPress={ () => navigation.navigate('Scan') }>
                <Text style={ styles.listTitle }>Scan</Text>
            </TouchableOpacity>

            <TouchableOpacity style={ styles.button } onPress={ () => navigation.navigate('Restrict') }>
                <Text style={ styles.listTitle }>Área restrita</Text>
            </TouchableOpacity>
        </View>
    );
}