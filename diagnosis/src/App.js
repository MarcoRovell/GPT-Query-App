import React, { useState } from 'react';

const App = () => {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');

  const handleButtonClick = async (input) => {
    try {
      const response = await fetch('/run-python-script', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          input
        })
      });

      if (response.ok) {
        const result = await response.text();
        console.log('Python script execution result:', result);
      } else {
        console.error('Failed to execute Python script:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Input for Symptom 1"
        value={input1}
        onChange={(e) => setInput1(e.target.value)}
      />
      <button>Symptom 1</button>

      <input
        type="text"
        placeholder="Input for Symptom 2"
        value={input2}
        onChange={(e) => setInput2(e.target.value)}
      />
      <button>Symptom 2</button>

      <input
        type="text"
        placeholder="Input for Symptom 3"
        value={input3}
        onChange={(e) => setInput3(e.target.value)}
      />
      <button>Symptom 3</button>

      <body>
        <button>Submit</button>
      </body>
    </div>


  );
};

export default App;
