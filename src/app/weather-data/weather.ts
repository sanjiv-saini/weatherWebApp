export interface IWeather {
    city: string;
    country: string;
    forecastList: IForecast[];
}

export interface IForecast {
    index: number;
    temp: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    wind: number;
    day: string;
    weatherType: string;
    description: string;
}
