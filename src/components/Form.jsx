import React from 'react';

const Form = props =>{
    return(
        <div className="container h-100">
          
        <form onSubmit={props.loadweather}>
          <div>{props.error ? error() : ""}</div>
          
            <div>
              <input
                type="text"
                className="form-control"
                placeholder="City"
                name="city"
                autoComplete="on"
                style={{color: 'white'}}
              />
            </div>

            <div>
              <button>Get Weather !</button>
            </div>

        </form>
      </div>
    );
  };
  
  const error = props => {
    return (
      <div className="alert" role="alert" style={{color: 'white', fontSize:'large'}}>
        Please enter a city !
      </div>
    );
  };

export default Form;