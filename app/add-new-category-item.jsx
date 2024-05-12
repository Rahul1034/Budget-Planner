import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, ToastAndroid, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import Colors from '../utils/Colors';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../utils/SupabaseConfig';
import { decode } from 'base64-arraybuffer';
import { useLocalSearchParams, useRouter } from 'expo-router';

const placeholder = 'https://www.shutterstock.com/image-vector/ui-image-placeholder-wireframes-apps-260nw-1037719204.jpg'

export default function AddNewCategoryItem() {
    const [previewImage, setPreviewImage] = useState(placeholder);
    const [image, setImage] = useState(placeholder);
    const [name, setName] = useState();
    const [cost, setCost] = useState();
    const [url, setUrl] = useState();
    const [note, setNote] = useState();
    const { categoryId } = useLocalSearchParams();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const onImagePick = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
            quality: 0.7,
            base64: true,
        });


        if (!result.canceled) {
            setPreviewImage(result.assets[0].uri);
            setImage(result.assets[0].base64);
        }
    }
    const onClickAdd = async () => {
        setLoading(true);
        const fileName = Date.now();
        const { data, error } = await supabase.storage
            .from('images')
            .upload(fileName + '.png', decode(image), { contentType: 'image/png' });
        if (data) {
            const fileUrl = "https://ljuqijutwkctxeradzgx.supabase.co/storage/v1/object/public/images/" + fileName + ".png";
            console.log(fileUrl);
            const { data, error } = await supabase.from('CategoryItems')
                .insert([{
                    name: name,
                    cost: cost,
                    url: url,
                    image: fileUrl,
                    note: note,
                    category_id: categoryId
                }]).select();
            ToastAndroid.show('New Item Added!!!', ToastAndroid.SHORT);
            console.log(data);
            setLoading(false);
            router.push(
                {
                    pathname: '/category-detail',
                    params: { categoryId: categoryId }
                }
            )
        }
    }
    return (
        <KeyboardAvoidingView>
            <ScrollView style={{ padding: 20, backgroundColor: Colors.WHITE }}>
                <TouchableOpacity onPress={() => onImagePick()}>
                    <Image source={{ uri: previewImage }}
                        style={styles.image}
                    />
                </TouchableOpacity>
                <View style={styles.textInputContainer}>
                    <Ionicons name="pricetag" size={24} color={Colors.GRAY} />
                    <TextInput placeholder='Item Name' style={styles.input}
                        onChangeText={(value) => setName(value)}
                    />
                </View>
                <View style={styles.textInputContainer}>
                    <FontAwesome name="rupee" size={24} color={Colors.GRAY} />
                    <TextInput placeholder='Cost' style={styles.input} keyboardType='number-pad'
                        onChangeText={(value) => setCost(value)} />
                </View>
                <View style={styles.textInputContainer}>
                    <Ionicons name="link" size={24} color={Colors.GRAY} />
                    <TextInput placeholder='Url' style={styles.input} onChangeText={(value) => setUrl(value)} />
                </View>
                <View style={styles.textInputContainer}>
                    <Ionicons name="pencil" size={24} color={Colors.GRAY} />
                    <TextInput placeholder='Note' style={styles.input} numberOfLines={3} onChangeText={(value) => setNote(value)} />
                </View>
                <TouchableOpacity style={styles.button} disabled={!name || !cost || loading} onPress={() => onClickAdd()}>
                    {loading ?
                        <ActivityIndicator color={Colors.WHITE}/> :
                        <Text style={{ textAlign: 'center', fontFamily: 'outfit-bold', fontSize: 25, color: Colors.WHITE }}>Add</Text>
                    }

                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    )

}




const styles = StyleSheet.create({
    image: {
        width: 150,
        height: 150,
        backgroundColor: Colors.GRAY,
        borderRadius: 15
    },
    textInputContainer: {
        padding: 10,
        borderWidth: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        borderRadius: 10,
        borderColor: Colors.GRAY,
        marginTop: 10,
    },
    input: {
        fontSize: 17,
        width: '100%'
    },
    button: {
        padding: 17,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 99,
        marginTop: 25,
    },
})