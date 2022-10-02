import React from 'react';
import { FlatList, Text, View, ActivityIndicator } from 'react-native';
import styles from '../styles';

export default function RestrictedPage() {
    const [data, setData] = React.useState([])
    const [loading, setLoading] = React.useState(true)

    const getAllScans = async () => {
        await fetch(
            'http://127.0.0.1:8000/api/scan', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            }
        )
        .then((response) => response.json())
        .then((json) => {
            setData(json)

            console.log('FETCHED DATA')
            console.table(json.scans)
        })
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }

    React.useEffect(() => {
        getAllScans()
    }, [])
    
    return (
        <View style={[ styles.container, { backgroundColor: '#fff' } ]}>
             {loading ? <ActivityIndicator/> : (
                <FlatList
                    data={data}
                    keyExtractor={({ ID }, index) => ID}
                    renderItem={({ item }) => (
                    <View style={[ styles.container ]}>
                        <Text>{item.ID} - {item.qrData}</Text>
                    </View>
                    )}
                />
                )}            
        </View>
    );
}