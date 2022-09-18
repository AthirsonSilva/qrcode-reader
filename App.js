import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import styles from './styles';
import axios from 'axios'

const App = () => {
  const scans = Array();
  const json = require('./scans.json');
  
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [n1, setN1] = useState(0);
  const [n2, setN2] = useState(0);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const sendMysql = async ({ type, data }) => {
    const url = `http://192.168.18.7:6969/api/scans`;

    await axios({
      method: 'post',
      url: url,
      data: {
        qrType: JSON.stringify({type}),
        qrData: JSON.stringify({data})
      }
    })
    .then(res => alert('Data sent: ' + res.data))
    .catch(err => alert('Server error: ' + err))
    }
  
  const handleJsonPush = ({ type, data }) => {
    json.scans.push({
      scan_id: json.scans.length + 1,
      scan_type: type,
      scan_data: data,
      scanned_at: new Date().toLocaleString()
    });

    // console.table(json.scans, ['scan_id', 'type', 'data', 'scanned_at'])
    // console.table([['apple', 'banana', 'orange']])
    json.scans.forEach(scan => console.log(scan.scan_id, scan.scan_type, scan.scan_data, scan.scanned_at))
  };

  function asyncJson({data, type}) {
    axios({
      method: 'post',
      url: 'http://127.0.0.1:6969/api/scans/json',
      data: {
        type: type,
        data: data
      }
    })
    .then(res => alert('Data sent: ' + res.data))
    .catch(err => alert('Server error: ' + err))
  }

  const searchJson = (data) => {
    for (let i = 0; i < json.scans.length; i++) {
      if (json.scans[i].scan_data === data) {
        return true;
      } else {
        return false;
      }
    }
  };

  const validateVariables = ({ data }) => {
    if (data === undefined) {
      alert('Please scan a valida QR code');
    } else {
        if (n1 !== data) {
          alert('QR code scanned with success');
          console.log('n1 before: ' + n1);
          setN1(data)
          console.log('n1 after: ' + n1);
        } else {
          if (n2 !== data) {
            alert('QR code scanned with success');
            console.log('n2 before: ' + n2);
            setN2(data)
            console.log('n2 after: ' + n2);
          } else {
            alert('QR code already scanned');
          }
        }
      console.table({n1, n2});
    }
  }
  
  const arrayPush = ({ data }) => {
    for (let i = 0; i < 5; i++) {
      scans.push(data)
    }
    console.log(scans);
  };

  const validateData = ({ type, data }) => {    
    if (data !== ( null || undefined ) && type !== ( null || undefined )) {
      searchJson(data) ? alert('QR code already scanned') : handleJsonPush({ type, data });
    } else return false
  }

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    console.log(`Bar code with type ${type} and data ${data} has been scanned!`);
    
    // sendMysql({ type: type,  data: data });
    // validateVariables({ data: data });
    // arrayPush({ data: data });
    // handleJsonPush({ type: type, data: data });
    // validateData({ type: type, data: data });
    asyncJson({ type: type, data: data });
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
        />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  );
}

export default App
