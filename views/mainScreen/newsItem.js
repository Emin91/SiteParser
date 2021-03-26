import React from 'react'
import { View, Text, Image, Modal, TouchableOpacity } from 'react-native';
import { styles } from './style';
import { WebView } from 'react-native-webview';

export const NewsItem = ({ item: { postTitles, postImageLink, postLink, postDay, postMonth, postYear, postTime, likes, dislikes, postViews }, setWebViewLink, setIsVisible }) => {
    const onItemPress = () => {
        setWebViewLink(postLink);
        setIsVisible(true)
    };
    return (
        postTitles
            ? <TouchableOpacity style={styles.newsContainer} activeOpacity={0.5} onPress={onItemPress}>
                <View style={styles.imageContainer}>
                    <Image style={{ width: '100%', height: '100%', borderRadius: 5 }} source={{ uri: postImageLink }} resizeMode="stretch" />
                    <View style={{ position: 'absolute', zIndex: 100, borderBottomEndRadius: 12, borderTopLeftRadius: 5, top: 0, left: 0, backgroundColor: 'rgba(26, 32, 38, 0.8)', paddingHorizontal: 10, paddingVertical: 10 }}>
                        <Text style={{ color: 'white' }}>{postDay + postMonth + ' ' + postTime}</Text>
                        <Text style={{ color: 'white' }}>{postYear}</Text>
                    </View>
                </View>
                <View style={styles.descriptionContainer}>
                    <View style={styles.description}>
                        <Text style={{ fontWeight: 'bold', marginVertical: 5, marginHorizontal: 5, textAlign: 'justify' }}>{postTitles}</Text>
                    </View>
                    <View style={styles.postState}>
                        <Text>Like: {likes}</Text>
                        <Text>Dislike: {dislikes}</Text>
                        <Text>Views: {postViews}</Text>
                    </View>
                </View>
            </TouchableOpacity>
            : null
    )
}