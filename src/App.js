import './App.css';
import { Button, TextInput, View } from 'react-native-web';
import {useState} from 'react'
import styles from './UI/customComponents'



function App() {
  // Set up the variables needed to change dates and results.
  const [start_date, set_start_date] = useState('')
  const [end_date, set_end_date] = useState('')
  const [results, set_results] = useState('')

  // Use variables, Zillow API and keys to search for desired information.
  const handleSearch = () => {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '8b5742ff19msh24018e26d4b87c3p1979fdjsn8ce11750e43f',
        'X-RapidAPI-Host': 'zillow56.p.rapidapi.com'
      }
    };

    fetch(`https://zillow56.p.rapidapi.com/search?location=houston%2C%20tx&`, options)
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

  return (
      <div className="controls">
        <header className="App-header">
            <h3> Enter Start and End Dates </h3>
            <p>Start Date</p>
            <TextInput type="date" style={styles.text_input} value={start_date} onChange={handleStartDateChange}></TextInput>
            <span></span>
            <p>End Date</p>
            <TextInput type="date" style={styles.text_input} value={end_date} onChange={handleEndDateChange}></TextInput>
            <View style={styles.activate_button}>
              <Button title='Send Request' onPress={handleSearch} ></Button>
            </View>
            <div className="results">
              <h3> Resuts: </h3>
              <p id='results'></p>
            </div>
        </header>
      </div>
  );
}

export default App;
