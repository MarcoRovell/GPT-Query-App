import express from 'express';
import { exec } from 'child_process';

const app = express();
// const port = process.env.PORT;
const port = 3001;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.post('/run-python-script', (req, res) => {
  const question = 'list possible illnesses or health-issues I may be experiencing according to the information provided';
  exec('python model.py ' + question, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing model script: ${error.message}`);
      res.status(500).send('Internal server error.');
      return;
    }
    // console.log(`${stdout}`); 
    res.send({stdout: stdout});
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default port;