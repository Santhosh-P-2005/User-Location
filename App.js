import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function App() {
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [co,setcount] = useState(0)

  useEffect(() => {
    const getloc = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      const loc = await Location.getCurrentPositionAsync();
      console.log(loc)
      const longitude = loc.coords.longitude;
      const latitude = loc.coords.latitude;

      try {
        setLongitude(longitude);
        setLatitude(latitude);
 
        const res = await axios.post('http://192.168.9.27:5500/api/location', { latitude: latitude, longitude: longitude});
        console.log(res.data.message);
      } catch (error) {
        console.log(error);
      }
    };

    getloc();
    setInterval(getloc, 60000);
    
  }, []);

  return (
    <View style={styles.container}>
      <Text>Nidharsan V</Text>
      <Text>Longitude: {longitude}</Text>
      <Text>Latitude: {latitude}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});
