import React from 'react';
import { Text, View, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import styles from '../styles';

export default function HomePage({navigation}: {navigation: any}) {
    return (
        <SafeAreaView style={[ styles.container, { backgroundColor: '#fff' } ]}>
            <Image 
                style={[styles.image, { marginBottom: '15vh' }]}
                source={require('../assets/qr-code.png')}
            />
            
            <Text style={[ styles.listTitle, { fontWeight: 'bold', marginBottom: '5vh' } ]}>Bem vindo ao Scanner 2000!</Text>

            <View style={[ styles.row, { marginBottom: '5vh' } ]}>
                <TouchableOpacity style={ styles.button } onPress={ () => navigation.navigate('Scan') }>
                    <Text style={ styles.listTitle }>   Scan    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={ styles.button } onPress={ () => navigation.navigate('Restrict') }>
                    <Text style={ styles.listTitle }>Área restrita</Text>
                </TouchableOpacity>
            </View>

            <Text style={[ styles.lilText, { fontWeight: 'normal' } ]}>Copyrights @ 2022 - Etec de Guaianazes</Text>
        </SafeAreaView>
    );
}