import React from 'react';
import { FlatList, Text, View, ActivityIndicator, TouchableOpacity } from 'react-native';


import styles from '../styles';

export default function RestrictedPage({ navigation }: any) {
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
            json.scans.forEach((scan: any) => {
                data.push(scan)
            })

            console.table(data)
        })
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }

    const renderItem = ({ item }: {item: any}) : JSX.Element => {
        return (
            <View style={[styles.item, styles.row, {
                backgroundColor: item.ID === 'ID' ? '#f9c2ff' : '#f6f6f6',
            }]}>
                <View style={[styles.item, {
                    backgroundColor: item.ID === 'ID' ? '#f9c2ff' : '#f6f6f6',
                }]}>
                    <Text style={[styles.listTitle, {
                        fontSize: item.ID === 'ID' ? 28 : 24,
                        fontWeight: item.ID === 'ID' ? 'bold' : 'normal',
                        color: item.ID === 'ID' ? '#000' : '#000',
                    }]}>{item.ID}</Text>
                </View>
                <View style={[styles.item, {
                    backgroundColor: item.ID === 'ID' ? '#f9c2ff' : '#f6f6f6',
                }]}>
                    <Text style={[styles.listTitle, {
                        fontSize: item.qrData === 'QR DATA' ? 28 : 24,
                        fontWeight: item.qrData === 'QR DATA' ? 'bold' : 'normal',
                        color: item.qrData === 'QR DATA' ? '#000' : '#000',
                    }]}>{item.qrData}</Text>
                </View>
            </View>
        );
    }

    React.useEffect(() => {
        getAllScans()
        const headers = {
            ID: 'ID',
            qrData: 'QR DATA',
            qrType: 'QR TYPE',
            created_at: 'CREATED AT',
            updated_at: 'UPDATED AT',
        }

        data.push(headers)
    }, [])
    
    return (
        <View style={[ styles.container, { backgroundColor: '#fff' } ]}>
             {loading ? <ActivityIndicator/> : (
                <View style={styles.container}>
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.ID}
                    />
        
                    <View style={[ styles.row, { marginBottom: 15 } ]}>
                        <TouchableOpacity style={[styles.button]} onPress={() => navigation.navigate('Home')}>
                            <Text style={[styles.listTitle]}>    Home    </Text>
                        </TouchableOpacity> 
                        <TouchableOpacity style={[styles.button]} onPress={() => navigation.navigate('Scan')}>
                            <Text style={[styles.listTitle]}>    Scan    </Text>
                        </TouchableOpacity>
                    </View>

                </View>
                )}   
        </View>
    );
}