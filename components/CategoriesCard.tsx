import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'

interface Props {
    categories: any,
    activeCategory: any,
    handleChangeCategory: (category: string) => void
}

const CategoriesCard: React.FC<Props> = ({ categories, activeCategory, handleChangeCategory }) => {
    return (
        <View>
            <FlatList horizontal showsHorizontalScrollIndicator={false} data={categories} renderItem={(({ item, index }) => {
                let data = item.name.charAt(0).toUpperCase() + item.name.slice(1);
                return (
                    <TouchableOpacity activeOpacity={0.6} onPress={() => handleChangeCategory(item.name)} style={[styles.categoryCard, { backgroundColor: activeCategory === `&category=${item.name}` ? Colors.PRIMARY : Colors.SLIGHTBG} ]} >
                        <Text style={[styles.activeCard, {color: activeCategory === `&category=${item.name}` ? Colors.WHITE : Colors.BLACK}]} key={index} >{data}</Text>
                    </TouchableOpacity>

                )
            })} />
        </View>
    )
}

export default React.memo(CategoriesCard)

const styles = StyleSheet.create({
    categoryCard:{
        paddingHorizontal: 30,
        paddingVertical: 10,
        backgroundColor: Colors.SLIGHTBG,
        margin: 5,
        borderRadius: 30
    },
    activeCard:{
        color: Colors.BLACK,
        fontFamily: 'poppinsRegular',
        paddingTop: 5,
    }
})