import './App.css';
import { Button, TextInput, View, Switch } from 'react-native-web';
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
  const [filterByDate, set_filter_by_date] = useState(false)
  const handleFilterChange = () => set_filter_by_date(filterByDate => !filterByDate)
  const [useTestFile, set_use_test_file] = useState(false)
  const handleTestChange = () => set_use_test_file(useTestFile => !useTestFile)


  // Use variables, Zillow API and keys to search for desired information.
  const handleSearch = () => {
    if(useTestFile) {
      set_results(require('./sample.json'))
    } else {
      if(zip === '') {
        alert("ZIP is empty. Please enter a zip code.")
        return
      }
        const options = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': '33c9780feamsh3d280eef95d1b52p1099efjsn95f1dc4b301d',
            'X-RapidAPI-Host': 'zillow-data-v2.p.rapidapi.com'
          }
        };
        
        const response = fetch(`https://zillow-data-v2.p.rapidapi.com/search?location=${zip}&status=RecentlySold`, options)
          .then(response => response.json())
          .then(response => console.log(response))
          .catch(err => console.error(err));
        
        set_results(response)

    }

      parseResults(results)
  }

  const parseResults = (results) => {
    if((start_date === '' || end_date === '') && filterByDate) {
      alert("Dates are empty, but you are filtering by date")
    } else {
      alert("click okay to return non-filtered results")
      var page = results['data']
      var listingIsInDateRange = true
      var address = ''
      var date = ''
      console.log(results['totalPages'])

      for (var i = 0; i < results['totalPages']; i++) {
        var zillowListing = page[`${i}`]
        address = zillowListing['address']
        date = zillowListing['variableData']['text']
        
        if(filterByDate) {
          listingIsInDateRange = checkIfDateIsInRange(date)
        }


        if(filterByDate && listingIsInDateRange) {
          document.getElementById("results").innerHTML +=
          `<p> ${address} </p>`
        } else {
          document.getElementById("results").innerHTML +=
          `<p> ${address} </p>`
        }
      }
    }
  }

  /* Takes in a date, and returns true if it is between the
     start and end dates defined in the outer scope.
  */
  const checkIfDateIsInRange = (date) => {
    var startDate = start_date.split('-') // yyyy/mm/dd
    var endDate = end_date.split('-') // yyyy/mm/dd
    var targetDate = date.split(' ')[1].split('/') // mm//dd//yyyy
    
    var targetYear = parseInt(targetDate[2]), targetMonth = parseInt(targetDate[0]), targetDay = parseInt(targetDate[1])
    var startYear = parseInt(startDate[0]), startMonth = parseInt(startDate[1]), startDay = parseInt(startDate[2])
    var endYear = parseInt(endDate[0]), endMonth = parseInt(endDate[1]), endDay = parseInt(endDate[2])


    if(startYear <= targetYear && targetYear <= endYear) {
      if(startMonth <= targetMonth && targetMonth <= endMonth) {
        if(startDay <= targetDay && targetDay <= endDay) {
          console.log(`Start: ${startDate} ->
          | ${targetDate} -> |
          End ${endDate} ->`  )
          console.log("DATE IN RANGE \n\n")
          return true
        }
      }
    }

    console.log(`Start: ${startDate} ->
                 | ${targetDate} -> |
                 End ${endDate} ->`  )
  }

  /* Handle state changes for start and end dates as well as checks for errors. */

  /* Make sure the user puts in the valid start and end dates 
     (i.e Start date is not after end date) */
  const handleDateCalculation = (event) => {
    set_date_range(differenceInDays(new Date(start_date), new Date(end_date)))
    if(dateRange < 0) {
      set_date_range(0)
      alert("Check that the Start Date is before the End Date")
    }
  }

  // Set starting date
  const handleStartDateChange = (event) => {
    set_start_date(event.target.value);
  }

  // Set ending date.
  const handleEndDateChange = (event) => {
    set_end_date(event.target.value);
    handleDateCalculation()
  }

  // Set zip code.0op----iuk
  const handleZipChange = (event) => {
    set_zip(event.target.value)
  }

  return (
      <div className="controls">
        <header className="App-header">
            <h2>Welcome to your Zillow Web App</h2>
            <p> Enter start/end date, zip, and click Send Request to return homes recently sold. </p>
            <div className="buttons">
              <p>Filter By Date
              <Switch
                  trackColor={{false: '#767577', true: '#81b0ff'}}
                  thumbColor={filterByDate ? '#f5dd4b' : '#f4f3f4'}
                  onValueChange={handleFilterChange}
                  value={filterByDate}
                /></p>
                <p> Use Test File
                  <Switch
                  trackColor={{false: '#767577', true: '#81b0ff'}}
                  thumbColor={useTestFile ? '#f5dd4b' : '#f4f3f4'}
                  onValueChange={handleTestChange}
                  value={useTestFile}
                /></p>
              </div>
            <div className="date">
              <span>
                <p>Start Date: </p>
                <DateTimePicker style={styles.text_input} onChange={handleStartDateChange}></DateTimePicker>
              </span>
            </div>
              <span></span>
            <div className="date">
              <span>
                <p>End Date: </p>
                <DateTimePicker style={styles.text_input} onChange={handleEndDateChange}></DateTimePicker>
              </span>
            </div>
            <h4> Zip Code: </h4>
              <TextInput type="text" style={styles.text_input} value={zip} onChange={handleZipChange}></TextInput>
              <View>
                <Button title='Send Request' onPress={handleSearch} style={styles.activate_button} ></Button>
              </View>
            <div className="results">
              <h3> Results {start_date} to {end_date} {` in ${zip}`} </h3>
              <div className='resultsText' id='results'></div>
            </div>
        </header>
      </div>
  );
}

export default App;
