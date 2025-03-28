import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../utils/Colors'
import { useRouter } from 'expo-router';

export default function CategoryList({ categoryList }) {
    if (!categoryList || !Array.isArray(categoryList)) {
        return null; // or render a default message
    }

    const router = useRouter();
    const onCategoryClick=(category)=>{
        router.push(
            {
                pathname: '/category-detail',
                params: { categoryId: category.id}
            }
        )
    };

    const calculateTotalCost=(categoryItems)=>{
        let totalCost=0;
        categoryItems.forEach(item=>{
            totalCost=totalCost+item.cost;
        })
        return totalCost;
    }

    return (
        <View style={{
            marginTop: 20
        }}>
            <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 25,
                marginBottom:10,
            }}>Latest Budget</Text>
            <View>
                {categoryList.map((category, index) => (
                    <TouchableOpacity key={index} style={styles.container}
                    onPress={()=>onCategoryClick(category)}
                    >
                        <View style={styles.iconContainer}>
                            <Text style={[styles.iconText, { backgroundColor: category?.color }]}>{category.icon}</Text>
                        </View>
                        <View style={styles.subContainer}>
                            <View>
                                <Text style={styles.categoryText}>{category.name}</Text>
                                <Text atyle={styles.itemCount}>{category?.CategoryItems?.length} Items</Text>
                            </View>
                            <Text style={styles.totalAmountText}>₹{calculateTotalCost(category?.CategoryItems)}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
        display:'flex',
        gap:10,
        flexDirection:'row',
        alignItems:'center',
        padding:10,
        borderRadius:15,
        backgroundColor: Colors.WHITE,
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'baseline',
    },
    iconText: {
        fontSize: 35,
        padding: 16,
        borderRadius: 15
    },
    categoryText:{
        fontSize:20,
        fontFamily:'outfit-bold',
    },
    itemCount:{
        fontFamily:'outfit',
    },
    subContainer:{
        display: 'flex',
        flexDirection:'row',
        alignItems: 'center',
        justifyContent:'space-between',
        width:'70%',
    },
    totalAmountText:{
        fontFamily:'outfit-bold',
        fontSize:17,
    }
})