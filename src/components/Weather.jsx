import React from 'react';

const Weather = (props) => {

    return (

        <div>
            <div className="row">
                <div className="col s12 m6 push-m3">
                    <div className="weather card blue-grey">

                        <div className="card-content white-text">

                            <span className="card-title">{props.city} {props.country}</span>
                            <p>
                                <img src={props.weatherIcon} alt=""/>
                            </p>

                            <span className="temperature">{props.temp_celsius}</span>

                            {minmaxTemp(props.temp_min, props.temp_max)}

                            <div className="wind">

                                <span style={{textTransform: 'capitalize'}}>{props.description}</span>
                                
                                <br></br>

                                {props.wind_speed}

                            </div>
                        </div>

                        <div className="card-action">
                            <button className='btn-date' data-index='0' onClick={props.getWeather}>Today </button>
                            <button className='btn-date' data-index='7' onClick={props.getWeather}>Tomorrow </button>
                            <button className='btn-date' data-index='15' onClick={props.getWeather}>Overmorrow </button>
                            <button className='btn-date' data-index='22' onClick={props.getWeather}>In 3 days </button>
                            <button className='btn-date' data-index='30' onClick={props.getWeather}>In 4 days </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    );
};


function minmaxTemp(min, max){
    return(

        <h5>
            <span>{min}</span>
            <br></br>
            <span>{max}</span>
        </h5>

    );
}


export default Weather;