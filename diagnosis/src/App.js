import React, { useState } from 'react';

const App = () => {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');

  const saveFile = async () => {
    console.log('worked!');
    // const gender = document.getElementById("selGender");
    // const age = document.getElementById("numAge");
    // const Symptom1 = input1;
    // const Symptom2 = input2;
    // const Symptom3 = input3;
    // const text = document.getElementById("msg");

    try {
      const response = await fetch('http://localhost:3001/run-python-script', { // need to be able to run on any port that server opens on
        method: 'POST' 
      });

      if (response.ok) {
        console.log('Python script executed successfully!');
      } else {
        console.error('Failed to execute Python script.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
    // let data = "\r"
  }

  // const modelPath = '../model.py';
  // exec('python ${modelPath}', (error, stdout, stderr) => {
  //   if (error) {
  //     console.error('Error executing model script: ${error.message}');
  //     return;
  //   }
  //   console.log('model script output:', stdout);
  // });


  // const handleButtonClick = async (input) => {
  //   try {
  //     const response = await fetch('/run-python-script', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({
  //         input
  //       })
  //     });

  //     if (response.ok) {
  //       const result = await response.text();
  //       console.log('Python script execution result:', result);
  //     } else {
  //       console.error('Failed to execute Python script:', response.statusText);
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };

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
          placeholder="Give us some more detail about your symtoms... 250 characters max!">
        </textarea>
      </div>
      <body>
        <input type="button" id="bt" value="Input Save Data" onClick={saveFile} />
      </body>
    </div>

  );
};

export default App;
