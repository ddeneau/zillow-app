import './App.css';
import { Button, TextInput, View } from 'react-native-web';
import {useState } from 'react'
import styles from './UI/customComponents'
import DateTimePicker from './UI/dateComponent';
import { differenceInDays } from 'date-fns'




function App() {
  // Set up the variables needed to change dates and results.
  const [start_date, set_start_date] = useState('')
  const [end_date, set_end_date] = useState('')
  const [results, set_results] = useState('')
  const [dateRange, set_date_range] = useState('')
  const [zip, set_zip] = useState('')


  // Use variables, Zillow API and keys to search for desired information.
  const handleSearch = () => {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '33c9780feamsh3d280eef95d1b52p1099efjsn95f1dc4b301d',
        'X-RapidAPI-Host': 'zillow-data-v2.p.rapidapi.com'
      }
    };
    
    fetch(`https://zillow-data-v2.p.rapidapi.com/search?location=${zip}&status=RecentlySold`, options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));

      document.getElementById("results").innerText = results
  }

  const practiceSearch = () => {
    set_results(require('./sample.json'))

    var page = results['data']
    var listingIsInDateRange = true
    var address = ''
    console.log(results['totalPages'])

    for (var i = 0; i < results['totalPages']; i++) {
      var zillowListing = page[`${i}`]
      address = zillowListing['address']

      if(listingIsInDateRange) {
        document.getElementById("results").innerHTML +=
        `<p> ${address} </p>`
      }
    }
  }

  const handleDateCalculation = (event) => {
    set_date_range(differenceInDays(new Date(start_date), new Date(end_date)))
    if(dateRange < 0) {
      set_date_range(0)
      alert("Check that the Start Date is before the End Date")
    }
  }

  const handleStartDateChange = (event) => {
    set_start_date(event.target.value);
  }

  const handleEndDateChange = (event) => {
    set_end_date(event.target.value);
    handleDateCalculation()
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
            <h4> Zip Code: </h4>
            <TextInput type="text" style={styles.text_input} value={zip} onChange={handleZipChange}></TextInput>
            <span></span>
            <View style={styles.activate_button}>
              <Button title='Send Request' onPress={practiceSearch} ></Button>
            </View>
            <div className="results">
              <h3> Results {start_date} to {end_date},  {dateRange} days  </h3>
              <div className='resultsText' id='results'></div>
            </div>
        </header>
      </div>
  );
}

export default App;
