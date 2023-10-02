import express from 'express';
import { exec } from 'child_process';

const app = express();
// const port = process.env.PORT || 3001;
const port = 3001;

app.use(express.json());

app.post('/run-python-script', (req, res) => {
  const question = "Give me a diagnosis based on the current symptoms I am exhibiting?";
  exec('python /GPT-Query-App/diagnosis/model.py ' + question, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing model script: ${error.message}`);
      res.status(500).send('Internal server error.');
      return;
    }
    console.log(`model script output: ${stdout}`);
    res.send('model script executed successfully.');
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default port;