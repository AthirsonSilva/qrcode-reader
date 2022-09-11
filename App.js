import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import styles from './styles';
// import mssqlConnection from './server/server';

const App = () => {
  const scans = Array();
  const json = require('./scans.json');
  
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);
  
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

  const arrayPush = ({ type, data }) => {
    scans.push(data);
    json.push(data);
    alert('QR Code scanned');
    console.log(scans);
    console.log(json); 
  };

  const sendData = ({ type, data }) => {    
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
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    
    sendData({ type: type, data: data });
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
