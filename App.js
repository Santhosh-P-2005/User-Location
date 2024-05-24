import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';



export default function App() {

  const [longitude, setLongitude] = useState(null);

  const [latitude, setLatitude] = useState(null);

  useEffect(() => {

    const getLocation = async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {

        console.log('Permission not granted');

        return;
      }

      const intervalId = setInterval(async () => {

        const loc = await Location.getCurrentPositionAsync();

        const lati = "Latitude : " + loc.coords.latitude;

        const longi = "Longitude : " + loc.coords.longitude;

        setLongitude(longi);

        setLatitude(lati);

      }, 1000);

      return () => clearInterval(intervalId);
    };

    getLocation();

  }, []);



  return (

    <View style={styles.container}>

      <Text>Open up App.js to start working on your app!</Text>

      <Text>{longitude}</Text>

      <Text>{latitude}</Text>

      <StatusBar style="auto" />

    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
