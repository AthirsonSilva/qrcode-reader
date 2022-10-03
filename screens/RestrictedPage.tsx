import React from 'react';
import { FlatList, Text, View, ActivityIndicator } from 'react-native';
import { Table, TableWrapper, Row, Rows } from 'react-native-table-component';


import styles from '../styles';

export default function RestrictedPage() {
    const [data, setData] = React.useState([])
    const [headers, setHeaders] = React.useState([])
    const [loading, setLoading] = React.useState(true)

    const rows = Object.values(data).map((item) => {
        console.table(item)
        return Object.values(item)
    })

    const values = Array()

    for (let i = 0; i < rows.length; i++) {
        rows[i].splice(0, 1)

        for (let j = 0; j < rows[i].length; j++) {
            values.push(rows[i][j])
        }
    }

    console.table(values)
    console.table([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
    ])

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

    React.useEffect(() => {
        getAllScans()
        setHeaders(['ID', 'Data', 'Tipo', 'Criação', 'Atualização'])
    }, [])
    
    return (
        <View style={[ styles.container, { backgroundColor: '#fff' } ]}>
             {loading ? <ActivityIndicator/> : (
                <View style={styles.container}>
                    <TableWrapper style={styles.container}>
                        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                            <Row data={headers} style={styles.headStyle} textStyle={styles.headerText}/>
                            <Rows data={[
                                ['1', '2', '3', '4', '5'],
                            ]} 
                            textStyle={styles.rowText}/>
                        </Table>
                    </TableWrapper>
                </View>
                )}   
        </View>
    );
}