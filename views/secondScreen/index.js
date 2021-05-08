import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Cheerio from 'cheerio';
import Axios from 'axios';
import { styles } from './style';

const DOMAIN = 'https://www.ivi.az/collections/movies-hd';

const wait = (timeout) => {
	return new Promise(resolve => setTimeout(resolve, timeout));
};

export const MoviesScreen = () => {
	const [newsData, setNewsData] = useState([]);

	const getNewsFromSite = async () => {
		const { data } = await Axios.get(DOMAIN);
		const $ = Cheerio.load(data);

		const mainTitle = $("#root > section.headerBar.collections__headerBar > div > div > div.headerBar__titleWrapper > h1").text();
		const pageDescription = $("#root > section.headerBar.collections__headerBar > div > div > div.clause.collections__clause > div > div").text();

		$('#root > section.pageSection.pageSection_virtual.collections__pageSection.collections__pageSection_virtual > div > div > div > div > ul').each((_i, ul) => {
			const children = $(ul).children();
			children.each((i, li) => {
					const test = $(li).text()
					const title = $(li).find('div.nbl-slimPosterBlock__title').text();
					const poster = $(li).find('img.nbl-poster__image').attr('src');
					const label = $(li).find('div.nbl-textBadge__text').text();
					const link = $(li).find('a').attr('href');
					const id = $(li).find('a').attr('data-content-id');

                    console.log("children.each ~ rating", rating)
					// const test2 = $.parseHTML(rating)
					// console.log(`test`, test2)
     			// console.log("Data --->> ", {id, title, poster, label, link})
			})
		  });

	};

	getNewsFromSite()

	return (
		<View style={styles.container}>
			<Text>Site parser</Text>
		</View>
	)
}