import express from 'express';
import { calculateBmi } from './bmiCalculator';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  if (!isNaN(Number(req.query.height)) && !isNaN(Number(req.query.weight))) {
    res.json({
      height: Number(req.query.height),
      weight: Number(req.query.weight),
      bmi: calculateBmi(Number(req.query.height), Number(req.query.weight))
    });
  } else
    res.json({ error: "malformatted parameters" });
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});