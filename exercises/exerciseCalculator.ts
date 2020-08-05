interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: 1 | 2 | 3;
  ratingDescription: 'this is not enough' | 'good job' | 'excellent' | 'error';
  target: number;
  average: number;  
}

interface Input {
  target: number;
  hours: Array<number>;
}

const calculateExercises = (hours: Array<number>, target: number): ExerciseResult => {
  const trainingDays = (): number => {
    return hours.reduce((total, h) => h > 0 ? total + 1 : total, 0);
  }

  const average = (): number => {
    return hours.reduce((total, h) => total + h, 0) / hours.length;
  }

  const rating = (avg: number) => {
    if (avg >= target)
      return 3;
    if (avg >= target / 2)
      return 2;
    return 1;
  }

  const ratingDescription = (r: number) => {
    switch (r) {
      case 3:
        return 'excellent';
      case 2:
        return 'good job';
      case 1:
        return 'this is not enough';
      default:
        return 'error';
    }
  }
  
  if (hours.length > 0)
    return { periodLength: hours.length,
      trainingDays: trainingDays(),
      success: target <= average(),
      rating: rating(average()),
      ratingDescription: ratingDescription(rating(average())),
      target: target,
      average: average()
    }
  else
    throw new Error('array was empty');
}

const parseArgs = (args: Array<string>): Input => {
  const h = [];

  if (args.length < 4) throw new Error('not enough arguments');

  for (let i = 2; i < args.length; i++) {
    if (isNaN(Number(args[i])))
      throw new Error('provided values are not numbers')
    else if (i > 2)
      h.push(Number(args[i]))
  }
  return {
    target: Number(args[2]),
    hours: h
  }
}

try {
  const { target, hours } = parseArgs(process.argv);  
  console.log(calculateExercises(hours, target));
} catch (e) {
  console.log('Error:', e.message);
}
