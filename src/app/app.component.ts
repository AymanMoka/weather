import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'weather';
  WeatherData!: any;
  city!: string;
  error = "";
  showCity: boolean = false;

  constructor() { }

  ngOnInit() {
    this.WeatherData = {
      main: {},
      isDay: null,
    };

    // console.log(this.WeatherData);
  }

  onClick() {
    this.getWeatherData();
  }

  getWeatherData() {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      this.city +
      "&appid=737913f87eff6434d5b4fdf46704bb98"
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log(data)
        if (data.message) {
          this.error = data.message;
        } else {
          this.setWeatherData(data);
          this.error = "";
        }
      });
  }

  setWeatherData(data: any) {
    this.showCity = true;
    this.WeatherData = data;
    console.log(data);
    let sunsetTime = new Date(this.WeatherData.sys.sunset * 1000);
    this.WeatherData.sunset_time = sunsetTime.toLocaleTimeString();
    let currentDate = new Date();
    this.WeatherData.sky = this.WeatherData.weather[0].description;
    this.WeatherData.isDay = currentDate.getTime() < sunsetTime.getTime();
    console.log(this.WeatherData.isDay);
    this.WeatherData.temp_celcius = (
      this.WeatherData.main.temp - 273.15
    ).toFixed(0);
    this.WeatherData.temp_min = (
      this.WeatherData.main.temp_min - 273.15
    ).toFixed(0);
    this.WeatherData.temp_max = (
      this.WeatherData.main.temp_max - 273.15
    ).toFixed(0);
    this.WeatherData.temp_feels_like = (
      this.WeatherData.main.feels_like - 273.15
    ).toFixed(0);
  }
}
