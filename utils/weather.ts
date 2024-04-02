import Clear from '../assets/img/clear.png';
import Clouds from '../assets/img/clouds.png';
import Drizzle from '../assets/img/drizzle.png';
import Humidity from '../assets/img/humidity.png';
import Mist from '../assets/img/mist.png';
import Rain from '../assets/img/rain.png';
import Snow from '../assets/img/snow.png';
import Wind from '../assets/img/wind.png';

export default function Weather(weather: string) {
  switch (weather.toLowerCase()) {
    case 'clear':
      return Clear;
    case 'clouds':
      return Clouds;
    case 'drizzle':
      return Drizzle;
    case 'humidity':
      return Humidity;
    case 'mist':
      return Mist;
    case 'rain':
      return Rain;
    case 'snow':
      return Snow;
    case 'wind':
      return Wind;
    default:
      return Clear;
  }
}
