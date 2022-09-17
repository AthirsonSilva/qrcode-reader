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

    /* await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        qrType: JSON.stringify({type}),
        qrData: JSON.stringify({data})
      }),
      headers: {
        'Content-Type': 'application/json'
      }
      .then(res => alert('Data sent: ' + res.data))
      .catch(err => alert('Server error: ' + err))
      }) */
    }
  
  const handleJsonPush = ({ type, data }) => {
    json.scans.push({
      scan_id: json.scans.length + 1,
      type: type,
      data: data,
      scanned_at: new Date().toLocaleString()
    });
  };

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
          console.log('n1 already scanned: ' + n1);
          alert('QR code already scanned, please scan another one');
        }
    }
  }
  

  const arrayPush = ({ type, data }) => {
    scans.push(data);
    json.push(data);
    alert('QR Code scanned');
    console.log(scans);
    console.log(json); 
  };

  const validateData = ({ type, data }) => {    
    if (data !== ( null || undefined ) && type !== ( null || undefined )) {
      if (!searchJson(data)) {
        alert('QR Code already scanned');

        return
      } else {
        handleJsonPush({ type: type, data: data });

        return
      }
    } else return false
  }

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    console.log(`Bar code with type ${type} and data ${data} has been scanned!`);
    
    sendMysql({ type: type,  data: data });
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
