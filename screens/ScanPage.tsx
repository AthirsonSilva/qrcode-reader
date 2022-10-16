import React from 'react';
import {
	Text,
	View,
	StyleSheet,
	Button,
	ActivityIndicator,
	TouchableOpacity,
} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import styles from '../styles';
import axios from 'axios';

const Scans = ({ navigation }: any) => {
	const [hasPermission, setHasPermission] = React.useState<null>(null);
	const [scanned, setScanned] = React.useState<boolean>(false);
	const [loading, setLoading] = React.useState<boolean>(false);
	const [n1, setN1] = React.useState<string>('');
	const [n2, setN2] = React.useState<string>('');

	React.useEffect(() => {
		const getBarCodeScannerPermissions = async () => {
			const { status } = await BarCodeScanner.requestPermissionsAsync();
			setHasPermission(status === 'granted');
		};

		getAllScans();
		getBarCodeScannerPermissions();
	}, []);

	const postScan = async (type: string, data: string) => {
		await axios({
			method: 'post',
			url: `http://127.0.0.1:8000/api/scan`,
			data: {
				data: JSON.stringify({
					type: type,
					data: data,
					name: null,
				}),
			},
		})
			.then((response) => alert('Data sent: ' + response.data))
			.catch((err) => alert('Server error: ' + err.message));
	};

	const getAllScans = async () => {
		await fetch('http://127.0.0.1:8000/api/scan', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		})
			.then((response) => response.json())
			.then((json) => {
				console.table(json.scans);
			})
			.catch((error) => console.error(error))
			.finally(() => setLoading(false));
	};

	const validateVariables = (data: string) => {
		if (data === undefined) {
			alert('Please scan a valida QR code');
		} else {
			if (!n1) {
				alert('QR code scanned with success');
				console.log('n1 before: ' + n1);
				setN1(data);
				console.log('n1 after: ' + n1);
			} else {
				if (!n2) {
					alert('QR code scanned with success');
					console.log('n2 before: ' + n2);
					setN2(data);
					console.log('n2 after: ' + n2);
				} else {
					alert('QR code already scanned');
				}
			}
			console.table({ n1, n2 });
		}
	};

	const handleBarCodeScanned = (type: string, data: string) => {
		setScanned(true);
		console.log(
			`Bar code with type ${type} and data ${data} has been scanned!`
		);

		getAllScans();
		postScan(type, data);
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
			{scanned && (
				<View style={styles.row}>
					<TouchableOpacity
						onPress={() => setScanned(false)}
						style={styles.button}
					>
						<Text style={styles.listTitle}>Scan Again</Text>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => navigation.navigate('Home')}
						style={styles.button}
					>
						<Text style={styles.listTitle}>Go home</Text>
					</TouchableOpacity>
				</View>
			)}
		</View>
	);
};

export default Scans;
