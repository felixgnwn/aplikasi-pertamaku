import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import sqlite3 from 'sqlite3';
import cors from 'cors';

const app = express();
app.use(express.json())
app.use(cors({
  origin: '*',
  optionsSuccessStatus: 200,
}));

const connection = new sqlite3.Database('./db/aplikasi.db')

// app.get('/api/user/:id', (req, res) => {
//   const query = `SELECT * FROM users WHERE id = ${req.params.id}`;
//   console.log(query)
//   connection.all(query, (error, results) => {
//     if (error) throw error;
//     res.json(results);
//   });
// });

// app.post('/api/user/:id/change-email', (req, res) => {
//   const newEmail = req.body.email;
//   const query = `UPDATE users SET email = '${newEmail}' WHERE id = ${req.params.id}`;

//   connection.run(query, function (err) {
//     if (err) throw err;
//     if (this.changes === 0 ) res.status(404).send('User not found');
//     else res.status(200).send('Email updated successfully');
//   });

// });

app.get('/api/user/:id', (req, res) => {
  const query = `SELECT * FROM users WHERE id = ?`;
  connection.all(query, [req.params.id], (error, results) => {
    if (error) {
      res.status(500).send("Error fetching user data");
      return;
    }
    res.json(results);
  });
});

app.post('/api/user/:id/change-email', (req, res) => {
  const newEmail = req.body.email;
  const query = `UPDATE users SET email = ? WHERE id = ?`;
  connection.run(query, [newEmail, req.params.id], function (err) {
    if (err) {
      res.status(500).send("Error updating email");
      return;
    }
    res.status(200).send('Email updated successfully');
  });
});


// app.get('/api/file', (req, res) => {
//   const __filename = fileURLToPath(import.meta.url); 
//   const __dirname = path.dirname(__filename); 

//   const filePath = path.join(__dirname, 'files', req.query.name);
//   res.sendFile(filePath);
// });

// app.listen(3000, () => {
//   console.log('Server running on port 3000');
// });


app.get('/api/file', (req, res) => {
  const __dirname = path.dirname(__filename); 
  const safeFileName = path.basename(req.query.name); 

  const filePath = path.join(__dirname, 'files', safeFileName);
  res.sendFile(filePath, (err) => {
    if (err) {
       res.status(404).send('File not found');
    }
  }); 
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

