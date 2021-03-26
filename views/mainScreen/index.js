import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, Modal, TouchableOpacity, RefreshControl } from 'react-native';
import Cheerio from 'cheerio';
import Axios from 'axios';
import { NewsItem } from './newsItem';
import { styles } from './style';

import { WebView } from 'react-native-webview';
const DOMAIN = 'https://oxu.az';
const imageLink = "https://cdn.oxu.az/assets/oxu/logo_share-207c13a53fbe8209638ea3819fee198f4a33628f4516c37f0e671b92c6a97394.png";

const wait = (timeout) => {
	return new Promise(resolve => setTimeout(resolve, timeout));
};

export const MainScreen = () => {
	const [newsData, setNewsData] = useState([]);
	const [webViewLink, setWebViewLink] = useState('');
	const [isVisible, setIsVisible] = useState(false);
	const [refreshing, setRefreshing] = useState(false);
	console.log(`newsData`, newsData)
	console.log(`webViewLink`, DOMAIN + webViewLink)

	const getNewsFromSite = async () => {
		const { data } = await Axios.get(DOMAIN);
		const $ = Cheerio.load(data);

		const findView = (index, element) => {
			return $('.news-i').eq(index).find(element).text();
		};

		let newArray = [];
		$('.news-list').map((i, e) => {
			e.children.map((_index, _elem) => {
				const postTitles = findView(_elem, '.title');
				const postImageLink = $('.news-i').eq(_elem).find('.news-i-img').attr('style') || imageLink;
				const formated = postImageLink.replace('background-image: url(', '').replace(')', '');
				const postLink = $('.news-i').eq(_elem).find('.news-i-inner').attr('href');
				const postDay = findView(_elem, '.date-day');
				const postMonth = findView(_elem, '.date-month');
				const postYear = findView(_elem, '.date-year');
				const postTime = findView(_elem, '.when-time');
				const likes = findView(_elem, '.stats_likes');
				const dislikes = findView(_elem, '.stats_dislikes');
				const postViews = findView(_elem, '.stats_views');
				newArray.push({ postTitles, postImageLink: formated || imageLink, postLink, postDay, postMonth, postYear, postTime, likes, dislikes, postViews });
			});
			return newArray;
		});
		setNewsData(newArray);
	};

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		getNewsFromSite();
		wait(1000).then(() => setRefreshing(false));
	  }, []);

	useEffect(() => {
		getNewsFromSite();
	}, []);

	return (
		<View style={styles.container}>
			{ !newsData.length
				? <View style={styles.indicator}>
					<ActivityIndicator size='large' color='white' />
					<Text style={styles.loadingText}>Xəbərlər yüklənilir...</Text>
				</View>
				: <ScrollView refreshControl={
					<RefreshControl
					  refreshing={refreshing}
					  onRefresh={onRefresh}
					/>
				  } style={styles.scrollContainer} contentContainerStyle={{ paddingBottom: 20 }}>
					{newsData?.map((item, index) => {
						return <NewsItem key={index + item.postTitles} {...{ item, setWebViewLink, setIsVisible }} />
					})}
				</ScrollView>}
				<Modal
                    visible={isVisible}
                    animationType='slide'>
                    <View style={{flex: 1, backgroundColor: 'white',}}>
						<TouchableOpacity onPress={()=>setIsVisible(false)} style={{width: '100%', height: 30, justifyContent: 'center', paddingLeft: 15}}>
							<Text>Back</Text>
						</TouchableOpacity>
					<WebView source={{ uri: DOMAIN + webViewLink }}/>
					</View>
                </Modal>
		</View>
	)
}