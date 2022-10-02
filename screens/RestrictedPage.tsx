import React from 'react';
import { FlatList, Text, View, ActivityIndicator } from 'react-native';
import { Table, TableWrapper, Row, Rows } from 'react-native-table-component';


import styles from '../styles';

export default function RestrictedPage() {
    const [data, setData] = React.useState([])
    const [headers, setHeaders] = React.useState([])
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
            setData(json.scans)

            console.log('FETCHED DATA')
            console.table(data)
        })
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }

    React.useEffect(() => {
        getAllScans()
        setHeaders(['ID', 'Data', 'Data de criação', 'Data de atualização'])
    }, [])
    
    return (
        <View style={[ styles.container, { backgroundColor: '#fff' } ]}>
             {loading ? <ActivityIndicator/> : (
                <View style={styles.container}>
                    <TableWrapper style={styles.container}>
                        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                            <Row data={headers} style={styles.headStyle} textStyle={styles.headerText}/>
                            <Rows data={[
                                ['1', '2', '3', 'a'],
                                ['a', 'b', 'c', '1'],
                                ['1', '2', '3', 'a'],
                            ]} 
                            textStyle={styles.rowText}/>
                        </Table>
                    </TableWrapper>
                </View>
                )}   
        </View>
    );
}