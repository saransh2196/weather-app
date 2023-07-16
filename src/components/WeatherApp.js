import React, { useEffect, useState } from "react";
import "./css/weather.css";
import { API_KEY } from "../utils/Constants";
import axios from "axios";

export const WeatherApp = () => {
  const [data, setData] = useState("");
  const [location, setLocation] = useState("");

  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(URL).then((res) => {
        setData(res.data);
        console.log(res.data);
      }).catch((err)=>{
        console.log("err",err)
      });
      setLocation("");
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => {
            setLocation(event.target.value);
          }}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        ></input>
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temperature">
            {data.main ? (
              <h1>{(data?.main?.temp - 273.15).toFixed(2)} °C </h1>
            ) : null}
          </div>
          <div className="description">
            {data?.weather ? <p>{data?.weather[0]?.main}</p> : null}
          </div>
        </div>

        {data.name != undefined && (
          <div className="bottom">
            <div className="feels">
              {data?.main ? (
                <p className="bold">
                  {(data?.main?.feels_like - 273.15).toFixed(2)} °C{" "}
                </p>
              ) : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data?.main ? (
                <p className="bold">{data?.main?.humidity}%</p>
              ) : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data?.wind ? (
                <p className="bold">{data?.wind?.speed}MPH</p>
              ) : null}
              <p>Wind Speeed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
