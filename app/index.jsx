import { View, Text, StyleSheet, Pressable, Button, ScrollView, RefreshControl } from 'react-native';
import React, { useEffect, useState } from 'react';
import services from '../utils/services';
import { Link, useRouter } from 'expo-router';
import { client } from '../utils/KindeConfig';
import { supabase } from '../utils/SupabaseConfig';
import Colors from '../utils/Colors';
import Header from '../components/Header';
import CircularChart from '../components/CircularChart';
import { Ionicons } from '@expo/vector-icons';
import CategoryList from '../components/CategoryList';

export default function Home() {

    const router = useRouter();
    const [categoryList, setCategoryList] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        checkuserAuth();
        getCategoryList();
    }, []);

    const checkuserAuth = async () => {
        const result = await services.getData('login');
        if (result !== 'true') {
            router.replace('/login');
        }
    }
    // const handleLogout = async () => {
    //     const loggedOut = await client.logout();
    //     if (loggedOut) {
    //         await services.storeData('login', 'false');
    //         router.replace('/login');
    //         // User was logged out
    //     }
    // };
    const getCategoryList = async () => {
        setLoading(true);
        const user = await client.getUserDetails();
        const { data, error } = await supabase.from('Category')
            .select('*,CategoryItems(*)')
            .eq('created_by', user.email);
        console.log("Data", data);
        setCategoryList(data);
        data && setLoading(false);
    };
    return (
        <View style={{
            marginTop: 20,
            flex: 1,
        }}>
            {/* <Button title="Logout" onPress={handleLogout}/> */}
            <ScrollView refreshControl={
                <RefreshControl
                    onRefresh={() => getCategoryList()}
                    refreshing={loading}
                />
            }>
                <View style={{
                    padding: 20,
                    backgroundColor: Colors.PRIMARY,
                    height: 150,
                }}>
                    <Header />
                </View>
                <View style={{ padding: 20, marginTop: -75 }}>
                    <CircularChart categoryList={categoryList} />
                    <CategoryList categoryList={categoryList} />
                </View>
            </ScrollView>
            <Link href={'/add-new-category'} style={styles.adBtnContainer}>
                <Ionicons name="add-circle" size={64} color={Colors.PRIMARY} />
            </Link>
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        marginTop: 20,
        fontSize: 20,
    },
    adBtnContainer: {
        position: 'absolute',
        bottom: 16,
        right: 16,
    }
});
