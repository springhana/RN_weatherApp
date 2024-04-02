/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import Geolocation from '@react-native-community/geolocation';
import {useState, useEffect} from 'react';
import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import Weather from './utils/weather';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

function App(): React.JSX.Element {
  const [city, setCity] = useState('loading...');
  const [days, setDays] = useState([]);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission granted');
        getLocation();
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      async position => {
        const latitude = JSON.stringify(position.coords.latitude);
        const longitude = JSON.stringify(position.coords.longitude);

        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_WEATHER_API_KIY}&units=metric`,
        );
        const json = await response.json();
        setCity(json.city.name);
        setDays(
          json.list.filter((weather: any) => {
            if (weather.dt_txt.includes('00:00:00')) {
              return weather;
            }
          }),
        );
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>

      <ScrollView
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}>
        {days.length === 0 ? (
          <View style={{...styles.day, alignItems: 'center'}}>
            <ActivityIndicator color="white" style={{marginTop: 10}} />
          </View>
        ) : (
          days.map(
            (
              item: {
                main: {temp: string};
                weather: {main: string; description: string}[];
                dt_txt: string;
              },
              index,
            ) => (
              <View key={index} style={styles.day}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '100%',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.temp}>
                    {parseFloat(item.main.temp).toFixed(1)}
                  </Text>
                  <View style={styles.icon}>
                    <Image source={Weather(item.weather[0].main)} />
                  </View>
                </View>
                <Text style={styles.description}>{item.weather[0].main}</Text>
                <Text style={styles.tinyText}>
                  {item.weather[0].description}
                </Text>
                <Text style={styles.tinyText}>
                  {`${item.dt_txt.split('-')[1]}월 ${
                    item.dt_txt.split('-')[2].split(' ')[0]
                  }일`}
                </Text>
              </View>
            ),
          )
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'tomato',
  },
  city: {
    flex: 1.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cityName: {
    fontSize: 50,
    fontWeight: '500',
    color: 'white',
  },
  weather: {
    // backgroundColor: 'teal',
  },
  day: {
    width: SCREEN_WIDTH,
    alignItems: 'flex-start',
    paddingLeft: 20,
  },
  temp: {
    marginTop: 50,
    fontWeight: '600',
    fontSize: 70,
    color: 'white',
  },
  description: {
    marginTop: -30,
    fontSize: 30,
    color: 'white',
  },
  tinyText: {
    fontSize: 20,
    color: 'white',
  },
  icon: {
    // backgroundColor: 'red',
  },
});

export default App;
