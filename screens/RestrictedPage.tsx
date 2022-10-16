import React from 'react';
import {
	FlatList,
	Text,
	View,
	ActivityIndicator,
	TouchableOpacity,
} from 'react-native';
import { SearchBar } from 'react-native-elements';

import styles from '../styles';

export default function RestrictedPage({ navigation }: any) {
	const [data, setData] = React.useState<never[]>([]);
	const [filtered, setFiltered] = React.useState<never[]>([]);
	const [search, setSearch] = React.useState<string>('');
	const [loading, setLoading] = React.useState<boolean>(true);

	const searchFilterFunction = (text: string) => {
		// Check if searched text is not blank
		if (text) {
			// Inserted text is not blank
			// Filter the masterDataSource and update FilteredDataSource
			const newData = data.filter((item) => {
				// Applying filter for the inserted text in search bar
				const itemData = item.data
					? item.data.toUpperCase()
					: ''.toUpperCase();

				const textData = text.toUpperCase();

				return itemData.indexOf(textData) > -1;
			});
			setFiltered(newData);
			setSearch(text);
		} else {
			// Inserted text is blank
			// Update FilteredDataSource with masterDataSource
			setFiltered(data);
			setSearch(text);
		}
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
				json.scans.forEach((scan: any) => {
					data.push(scan);
				});

				console.table(data);
			})
			.catch((error) => console.error(error))
			.finally(() => setLoading(false));
	};

	const renderItem = ({ item }: { item: any }): JSX.Element => {
		return (
			<View
				style={[
					styles.item,
					styles.row,
					{
						backgroundColor:
							item.id === 'ID' ? '#f9c2ff' : '#f6f6f6',
					},
				]}
			>
				<View
					style={[
						styles.item,
						{
							backgroundColor:
								item.id === 'ID' ? '#f9c2ff' : '#f6f6f6',
						},
					]}
				>
					<Text
						style={[
							styles.listTitle,
							{
								fontSize: item.id === 'ID' ? 28 : 24,
								fontWeight:
									item.id === 'ID' ? 'bold' : 'normal',
								color: item.id === 'ID' ? '#000' : '#000',
							},
						]}
					>
						{item.id}
					</Text>
				</View>
				<View
					style={[
						styles.item,
						{
							backgroundColor:
								item.id === 'ID' ? '#f9c2ff' : '#f6f6f6',
						},
					]}
				>
					<Text
						style={[
							styles.listTitle,
							{
								fontSize: item.data === 'DATA' ? 28 : 24,
								fontWeight:
									item.data === 'DATA' ? 'bold' : 'normal',
								color: item.data === 'DATA' ? '#000' : '#000',
							},
						]}
					>
						{item.data}
					</Text>
				</View>
			</View>
		);
	};

	React.useEffect(() => {
		getAllScans();
		const headers = {
			id: 'ID',
			data: 'DATA',
			qrType: 'TYPE',
			created_at: 'CREATED AT',
			updated_at: 'UPDATED AT',
		};

		data.push(headers);
	}, []);

	return (
		<View style={[styles.container, { backgroundColor: '#fff' }]}>
			{loading ? (
				<ActivityIndicator />
			) : (
				<View style={styles.container}>
					<SearchBar
						placeholder="Pesquisar QRCodes..."
						lightTheme
						platform="android"
						round
						value={search}
						onChangeText={(text) => searchFilterFunction(text)}
						autoCorrect={false}
						blurOnSubmit={true}
						autoFocus={true}
						style={{
							width: '72%',
						}}
					/>

					<View style={[styles.row, { marginBottom: 15 }]}>
						<TouchableOpacity
							style={[styles.button]}
							onPress={() => navigation.navigate('Home')}
						>
							<Text style={[styles.listTitle]}> Home </Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={[styles.button]}
							onPress={() => navigation.navigate('Scan')}
						>
							<Text style={[styles.listTitle]}> Scan </Text>
						</TouchableOpacity>
					</View>

					<FlatList
						data={filtered}
						renderItem={renderItem}
						keyExtractor={(item) => item.id}
						scrollEnabled={true}
						bounces={true}
					/>
				</View>
			)}
		</View>
	);
}
