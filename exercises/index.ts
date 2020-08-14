import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();

app.use(express.json());

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

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { target, daily_exercises}: { target: number, daily_exercises: Array<number> } = req.body;

  if (!target || !daily_exercises)
    res.status(400).json({ error: "parameters missing" });
  
  if (isNaN(Number(target)) || daily_exercises.length < 2 || daily_exercises.find(x => isNaN(Number(x))))
    res.status(400).json({ error: "malformatted parameters" });

  res.json(calculateExercises(daily_exercises, target));
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});