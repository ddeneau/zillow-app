import './App.css';
import { Button, TextInput, View } from 'react-native-web';
import {useState } from 'react'
import styles from './UI/customComponents'
import DateTimePicker from './UI/dateComponent';



function App() {
  // Set up the variables needed to change dates and results.
  const [start_date, set_start_date] = useState('')
  const [end_date, set_end_date] = useState('')
  const [results, set_results] = useState('')
  const city = 'savannah'
  const state_code = 'ga'
  const [zip, set_zip] = useState('')

  // Use variables, Zillow API and keys to search for desired information.
  const handleSearch = () => {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '8b5742ff19msh24018e26d4b87c3p1979fdjsn8ce11750e43f',
        'X-RapidAPI-Host': 'zillow56.p.rapidapi.com'
      }
    };

    fetch(`https://zillow56.p.rapidapi.com/search?location=${city}%2C%20${state_code}&`, options)
      .then(response => response.json())
      .then(response => set_results(response.results))
      .catch(err => console.error(err));

      document.getElementById("results").innerText = results
  }

  const handleStartDateChange = (event) => {
    set_start_date(event.target.value);
  }

  const handleEndDateChange = (event) => {
    set_end_date(event.target.value);
  }

  const handleZipChange = (event) => {
    set_zip(event.target.value)
  }

  return (
      <div className="controls">
        <header className="App-header">
            <h2>Welcome to your Zillow Web App</h2>
            <h4> Enter Start and End Dates </h4>
            <div className="date">
              <p>Start Date: </p>
              <DateTimePicker style={styles.text_input} onChange={handleStartDateChange}></DateTimePicker>
              <span></span>
            </div>
              <span></span>
            <div className="date">
              <p>End Date: </p>
              <span></span>
              <DateTimePicker style={styles.text_input} onChange={handleEndDateChange}></DateTimePicker>
            </div>
            <span></span>
            <p> Zip Code: </p>
            <TextInput type="text" style={styles.text_input} value={zip} onChange={handleZipChange}></TextInput>
            <span></span>
            <View style={styles.activate_button}>
              <Button title='Send Request' onPress={handleSearch} ></Button>
            </View>
            <div className="results">
              <h3> Resuts ({start_date} {end_date}): </h3>
              <p id='results'></p>
            </div>
        </header>
      </div>
  );
}

export default App;
