import { BarCodeScanner } from 'expo-barcode-scanner'
import React, { useEffect, useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import styles from '../styles'

const App = (): JSX.Element => {
	const [hasPermission, setHasPermission] = useState<any>(null)
	const [scanned, setScanned] = useState<boolean>(false)
	const [data, setData] = useState<string>('')
	const [type, setType] = useState<number>(0)

	useEffect((): void => {
		const getBarCodeScannerPermissions = async () => {
			const { status } = await BarCodeScanner.requestPermissionsAsync()
			setHasPermission(status === 'granted')
		}

		getBarCodeScannerPermissions()
	}, [])

	const sendMysql = async ({
		type,
		data,
	}: {
		type: number
		data: string
	}): Promise<void> => {
		const url = `http://localhost/api/scans`

		await fetch(url, {
			method: 'post',
			body: JSON.stringify({ type, data }),
		})
			.then((response) => response.json())
			.then((response) => alert(`Response: ${response}`))
			.catch((error) =>
				alert(
					`Server erroror: ${error}\nData scanner: ${data} - ${type}`
				)
			)
			.finally(() => {
				afterScan({
					type: 0,
					data: '',
				})
			})
	}

	const afterScan = async ({
		type,
		data,
	}: {
		type: number
		data: string
	}): Promise<void> => {
		setScanned(true)
		setData(data)
		setType(type)
	}

	const handleBarCodeScanned = ({
		type,
		data,
	}: {
		type: number
		data: string
	}): void => {
		setScanned(true)
		console.log(
			`Bar code with type ${type} and data ${data} has been scanned!`
		)

		sendMysql({ type: type, data: data })
	}

	if (hasPermission === null) {
		return <Text>Requesting for camera permission</Text>
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>
	}

	return (
		<View style={styles.container}>
			<BarCodeScanner
				onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
				style={StyleSheet.absoluteFillObject}
			/>
			{scanned && (
				<Button
					title={'Tap to Scan Again'}
					onPress={() => setScanned(false)}
				/>
			)}
		</View>
	)
}

export default App
