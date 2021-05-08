import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		flex: 1, 
	},
	indicator: {
		flex: 1, 
		justifyContent: 'center', 
		alignItems: 'center', 
		backgroundColor: '#1a1f24',
	},
	loadingText: {
		color: 'white', 
		fontWeight: 'bold', 
		fontSize: 18,
	},
	scrollContainer: {
		flex: 1, backgroundColor: '#1a1f24', paddingHorizontal: 10,
	},
	newsContainer: {
		width: '100%',
        marginTop: 20,
		borderRadius: 12,
	},
	imageContainer: {
		width: '100%',
		height: 250,
		borderRadius: 12,
	},
	descriptionContainer: {
		flex: 1,
		width: '100%',
		paddingHorizontal: 10,
		backgroundColor: '#1a1f24',
	},
	description: {
		flex: 1,
		width: '100%',
		justifyContent: 'center',
		backgroundColor: 'white',
	},
	postState: {
		flex: 1,
		paddingHorizontal: 10,
		flexDirection: 'row',
		backgroundColor: 'white',
		borderBottomLeftRadius: 12,
		borderBottomRightRadius: 12,
		justifyContent: 'space-between',
	}
})