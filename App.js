import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import styles from './styles';
import axios from 'axios'

const App = () => {  
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [n1, setN1] = useState(0);
  const [n2, setN2] = useState(0);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getScans()
    postScan('post teste')
    getBarCodeScannerPermissions();
  }, []);

  const postScan = async ({ type, data }) => {
    await axios({
      method: 'post',
      url: `http://127.0.0.1:8000/api/scan`,
      data: {
        data: JSON.stringify({data})
      }
    })
    .then(response => alert('Data sent: ' + response.data))
    .catch(err => alert('Server error: ' + err))
    }

  function getScans() {
    axios({
      method: 'get',
      url: 'http://127.0.0.1:8000/api/scan',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(response => {
      console.table(response.data)
    })
    .catch(err => alert('Server error: ' + err))
  }


  const validateVariables = ({ data }) => {
    if (data === undefined) {
      alert('Please scan a valida QR code');
    } else {
        if (!n1) {
          alert('QR code scanned with success');
          console.log('n1 before: ' + n1);
          setN1(data)
          console.log('n1 after: ' + n1);
        } else {
          if (!n2) {
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
  

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    console.log(`Bar code with type ${type} and data ${data} has been scanned!`);
    
    getScans();
    // sendMysql({ type: type,  data: data });
    // validateVariables({ data: data });
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
