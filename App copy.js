import React, { useEffect, useState } from 'react'
import { View, Text, Image, ScrollView } from 'react-native'
import Cheerio from 'cheerio';
import Axios from 'axios';

export default function App() {
	const [arr, setText] = useState([])
	console.log(`text`, arr)
	const getUrl = async () => {
		const { data } = await Axios.get('https://oxu.az')
		const $ = Cheerio.load(data);
		const test = $('.news-list').each((i, e)=>{
			console.log(`i, e`, i, e)
		});
		console.log(`test`, test)
		let newArr = [];
		for(let i = 0; i < 20; i++) {
			const res = $('.news-i').eq(i).find('.title').text();
			const img = $('.news-i').eq(i).find('.news-i-img').attr('style')
			newArr.push({res, img: (img.replace('background-image: url(','').replace(')', ''))})
		}
		setText(newArr)
	}

	return (
		<ScrollView>
			{arr.map(({img, res}, index) => {
				return <View key={index} style={{justifyContent: 'center', alignItems: 'center',}}>
					<Image source={{uri: img}} style={{width: 150, height: 150}}/>
					<Text style={{marginTop: 20}}>{index != 19 ?  res : ''}</Text>
					<Text style={{marginTop: 20}}>{index === 19 ? res.replace('Yox','Hello') : ''}</Text>
				</View>
			})}
			<Text style={{marginTop: 20}} onPress={getUrl}>Hello</Text>
		</ScrollView>
	)
}
