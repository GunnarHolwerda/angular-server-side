import * as express from 'express';

// Express server
const app = express();

const PORT = process.env.PORT || 4202;

app.get('/course/:courseId/detail', (req, res) => {
  const courseId = req.params['courseId'];
  res.json({ title: `course ${courseId}`});
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node server listening on http://localhost:${PORT}`);
});
