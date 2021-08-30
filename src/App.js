import React from 'react';
import './App.css';
import Weather from './components/Weather';
import cloudy from './icons/cloudy.svg';
import rainy from './icons/rainy.svg';
import snowy from './icons/snowy.svg';
import storm from './icons/storm.svg';
import sun from './icons/sun.svg';
import cloudySun from './icons/cloudySun.svg';
import thunder from './icons/thunder.svg';
import windy from './icons/windy.svg';
import Header from './components/Header.jsx';
import Form from './components/Form.jsx'


const API_key = "bdb277763de63517b868dd84efd5ee99";

class App extends React.Component{

  constructor(){
    super();
    this.state = {
      city : undefined,
      country : undefined,
      icon : undefined,
      main : undefined,
      celsius : undefined,
      temp_max : undefined,
      temp_min : undefined,
      wind_speed : undefined,
      description : '',
      some: '',
      error : false
    };

    this.weatherIcon = {
      OvercastClouds : cloudy,
      Rain : rainy,
      Snow : snowy,
      Clear : sun,
      Storm : storm,
      CloudySun : cloudySun,
      Thunder : thunder,
      Wind : windy
    }
  }

  calCelsius(temp){
    let celcius = Math.floor(temp - 273.15)
    return celcius;
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        console.log(position);
      }
    );
  }

  getWeatherIcon(icon, rangeId){
    switch(true){
      case rangeId >= 200 && rangeId <= 232:
        this.setState({icon:this.weatherIcon.Thunder})
        break;
      case rangeId >= 300 && rangeId <= 531:
        this.setState({icon:this.weatherIcon.Rain})
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({icon:this.weatherIcon.Snow})
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({icon:this.weatherIcon.CloudySun})
        break;
      case rangeId === 800:
        this.setState({icon:this.weatherIcon.Clear})
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({icon:this.weatherIcon.OvercastClouds})
        break;
      default: 
        this.setState({icon:this.weatherIcon.Clear})
    }
  }

  getWeather = async (e) =>{
    
    e.preventDefault();
      
    let city;
    if (e.type === 'submit') {
      city = e.target.elements.city.value;
    }
    
    if(city || this.state.city){
      let i;
      if (e.target.getAttribute('data-index')) {
        i = e.target.getAttribute('data-index');
      }else{
        i = 0;
      }
      
      const api_call = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city ? city : this.state.city}&appid=${API_key}`);
      
      const response = await api_call.json();
      console.log(response);
      if (response.cod === '404') {
        
        alert('Invalid city name !');
        
      }else{
        
        this.setState({  
          city : `${response.city.name}, `,
          country : response.city.country,
          celsius : `${this.calCelsius(response.list[i].main.temp)}°`,
          temp_min : `Min : ${this.calCelsius(response.list[i].main.temp_min)}°`,
          temp_max : `Max : ${this.calCelsius(response.list[i].main.temp_max)}°`,
          description : response.list[i].weather[0].description,
          wind_speed: `Wind : ${response.list[i].wind.speed} m/s`
      });
      
      this.getWeatherIcon(this.weatherIcon, response.list[i].weather[0].id);
    }
    
    }else{
     this.setState({error: true})
    }
  
  };

  render(){

    return(

      <div id="root">

      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"></link>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
        
        <div className="App">

          <Header />

          <Form 
            loadweather={this.getWeather} 
            error={this.state.error}
          />

          <Weather
            city={this.state.city} 
            country={this.state.country} 
            temp_celsius={this.state.celsius}
            temp_max={this.state.temp_max}
            temp_min={this.state.temp_min}
            description={this.state.description}
            weatherIcon={this.state.icon}
            wind_speed={this.state.wind_speed}
            getWeather={this.getWeather}
          />
          
        </div>
    </div>

    );
  }
}

export default App;