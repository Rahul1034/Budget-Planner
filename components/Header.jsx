import { View, Text, Image, Font } from 'react-native'
import React, {useEffect, useState} from 'react'
import { client } from '../utils/KindeConfig'
import Colors from '../utils/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import services from '../utils/services';

export default function Header() {
  const router = useRouter();
    const [user,setUser] = useState();
    const [fontsLoaded] = useFonts({
      'outfit': require('../assets/fonts/Outfit-Regular.ttf'),
      'outfit-bold': require('../assets/fonts/Outfit-Bold.ttf'),
      'outfit-medium':require('../assets/fonts/Outfit-Medium.ttf'),
  });

    useEffect(() => {
        getUserData();
    },[]);

    //used to get user data

    const getUserData=async() =>{
        const user = await client.getUserDetails();
        setUser(user);
    }

    const handleLogout = async () => {
      const loggedOut = await client.logout();
      if (loggedOut) {
          await services.storeData('login', 'false');
          router.replace('/login');
          // User was logged out
      }
  };

  return (
    <View style={{
        dsiplay:'flex',
        flexDirection:'row',
        gap:8,
        alignItems: 'center',
    }}>
      <Image source={{uri:user?.picture}}
      style={{
        width:50,
        height:50,
        borderRadius:99,
      }}/>
      <View style={{
        display: 'flex',
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width:'85%',
      }}>
        <View>
            <Text style={{color:Colors.WHITE, fontFamily:'outfit', fontSize:16}}>Welcome,</Text>
            <Text style={{color:Colors.WHITE, fontSize:20, fontFamily:'outfit-bold'}}>{user?.given_name}</Text>
        </View>
        <AntDesign name="logout" size={24} color="white" onPress={handleLogout} />
      </View>
    </View>
  )
}