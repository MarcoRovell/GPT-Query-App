const express = require('express');
const { exec } = require('child_process');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/run-python-script', (req, res) => {
  exec('python ../model.py', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing Python script: ${error.message}`);
      return res.status(500).send('Internal server error.');
    }
    console.log(`Python script output: ${stdout}`);
    res.send('Python script executed successfully.');
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
