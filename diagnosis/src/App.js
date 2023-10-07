import React, { useState } from 'react';

const App = () => {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');

  const saveFile = async () => {
    const gender = document.getElementById("selGender").value;
    const age = document.getElementById("numAge").value;
    const Symptom1 = input1;
    const Symptom2 = input2;
    const Symptom3 = input3;
    const text = document.getElementById("msg").value;

    const inputData = "Input form data of user\n\nAge: " + age + "\nGender: " + gender + 
    "\nSymptom 1: " + Symptom1 + "\nSymptom 2: " + Symptom2 + 
    "\nSymptom 3: " + Symptom3 + "\n\nBrief description: " + text


    try {
      const response = await fetch('http://localhost:3001/update-txt', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain'
        },
        body: inputData
      });

      if (response.ok) {
        console.log('Data added to file successfully. ');
      } else {
        console.error('Error adding data to file: ', response.statusText);
      }
    } catch (error) {
      console.error('Error: ', error);
    }

    try {
      const response = await fetch('http://localhost:3001/run-python-script', { // need to be able to run on any port that server opens on
        method: 'POST' 
      });

      if (!response.ok) {
        console.error('Failed to execute Python script.');
        throw new Error('Failed to fetch stdout data.');
      }

      const data = await response.json();
      const answer = data.stdout;
      console.log(answer); // display to users


    } catch (error) {
      console.error('Error:', error);
    }
  }


  return (
    <div>
      <input
        type="text" placeholder="Symptom 1" value={input1}
        onChange={(e) => setInput1(e.target.value)} />
      <input
        type="text" placeholder="Symptom 2" value={input2}
        onChange={(e) => setInput2(e.target.value)} />
      <input
        type="text" placeholder="Symptom 3" value={input3}
        onChange={(e) => setInput3(e.target.value)} />
      <input type="number" id="numAge" placeholder="Enter your age" />
      <select id = "selGender">
        <option selected value="">-- Choose Gender --</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
        <option value="N/A">Prefer Not To Disclose</option>
      </select>

      <div>
        <textarea id="msg" 
          name="msg" 
          maxLength={250} 
          style={{ height: '200px', width: '500px'}} 
          placeholder="Give us some more detail about your symptoms...&#10;Be as descriptive as possible for maximum results...&#10;250 characters max!">
        </textarea>
      </div>
      <body>
        <input type="button" id="bt" value="Input Save Data" onClick={saveFile} />
      </body>
    </div>

  );
};

export default App;
