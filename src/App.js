import './App.css';
import { Button, TextInput } from 'react-native-web';



function App() {
  var start_date = '1'
  var end_date = '1'

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '8b5742ff19msh24018e26d4b87c3p1979fdjsn8ce11750e43f',
      'X-RapidAPI-Host': 'zillow56.p.rapidapi.com'
    } 
  };

  var resp = fetch('https://zillow56.p.rapidapi.com/search?location=houston%2C%20tx', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));

   
  var results = resp['results']

  for (let index in results) {
    console.log(index['city'])
  }


  return (
    <div className="App">
      <header className="App-header">
       
          <h3> Enter Start and End Dates </h3>
          <TextInput></TextInput>
          <p>Start</p> {start_date}
          <span></span>
          <p>End</p>
          <TextInput></TextInput>
          {end_date} 
          <Button></Button>
      </header>
    </div>
  );
}

export default App;
