import React, { useEffect, useState } from 'react'
import { View, Text, Image, ScrollView, Button } from 'react-native'
import Cheerio from 'cheerio';
import Axios from 'axios';

const DOMAIN = 'https://oxu.az';

export default function App() {
	const [newsData, setNewsData] = useState([]);
	console.log('news array', newsData)

	const getNewsFromSite = async () => {
		const { data } = await Axios.get(DOMAIN)
		const $ = Cheerio.load(data);

		const findView = (index, element) => {
			return $('.news-i').eq(index).find(element).text();
		};

		const newsCountOnPage = $('.news-list').find('.news-i').length;
		for(let i = 0; i < newsCountOnPage; i++) {
			const postTitle = findView(i, '.title');
			const postImageLink = $('.news-i').eq(i).find('.news-i-img').attr('style').replace('background-image: url(','').replace(')', '');
			const postLink = $('.news-i').eq(i).find('.news-i-inner').attr('href');
			const postDay = findView(i, '.date-day');
			const postMonth = findView(i, '.date-month');
			const postYear = findView(i, '.date-year');
			const postTime = findView(i, '.when-time');
			const likes = findView(i, '.stats_likes');
			const dislikes = findView(i, '.stats_dislikes');
			const postViews = findView(i, '.stats_views');
			setNewsData({postTitle, postImageLink, postLink, postDay, postMonth, postYear, postTime, likes, dislikes, postViews});
		}
	}

	return (
		<ScrollView>
			{/* {arr.map(({img, res}, index) => {
				return <View key={index} style={{justifyContent: 'center', alignItems: 'center',}}>
					<Image source={{uri: img}} style={{width: 150, height: 150}}/>
					<Text style={{marginTop: 20}}>{index != 19 ?  res : ''}</Text>
					<Text style={{marginTop: 20}}>{index === 19 ? res.replace('Yox','Hello') : ''}</Text>
				</View>
			})} */}
			<Button onPress={getNewsFromSite} title="Fetch news"/>
		</ScrollView>
	)
}
