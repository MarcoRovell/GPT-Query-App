import express from 'express';
import { exec } from 'child_process';
import bodyParser from 'body-parser';
import { appendFile, writeFileSync } from 'fs'; 

const app = express();
const port = 3001;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});


app.use(bodyParser.text());
app.post('/update-txt', (req, res) => {
    const data = req.body;
    appendFile('data.txt', data, (err) => {
      if(err) {
        return res.status(500).send('Error writing to file.');
      }
      res.status(200).send('Data added to file successfully.');
    })
});

app.post('/run-python-script', (req, res) => {
  const question = 'give a numbered list of possible illnesses or health-issues I may be experiencing according to the information provided';
  exec('python model.py ' + question, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing model script: ${error.message}`);
      res.status(500).send('Internal server error.');
      return;
    }
    res.send({stdout: stdout});
    try {
      writeFileSync('data.txt', '', {
        flag: "w"
      });
    } catch (err){
      console.error('Error rewriting file: ', err);
    }

  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default port;