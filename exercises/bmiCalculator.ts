interface BmiValues {
  height: number;
  mass: number;
}

export const calculateBmi = (h: number, m: number): string => {
  const bmi = m / ((h / 100) * (h / 100));
  if (bmi <= 15)
    return 'Very severely underweight';
  if (bmi <= 16)
    return 'Severely underweight';
  if (bmi <= 18.5)
    return 'Underweight';
  if (bmi <= 25)
    return 'Normal (healthy weight)';
  if (bmi <= 30)
    return 'Overweight';
  if (bmi <= 35)
    return 'Obese Class I (Moderately obese)';
  if (bmi <= 40)
    return 'Obese Class II (Severely obese)';
  return 'Obese Class III (Very severely obese)';
}

const parseArguments = (args: Array<string>): BmiValues => {
  if (args.length < 4) throw new Error('not enough arguments');
  if (args.length > 4) throw new Error('too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      mass: Number(args[3])
    }
  } else {
    throw new Error('provided values are not numbers');
  }
}

try {
  const { height, mass } = parseArguments(process.argv);  
  console.log(calculateBmi(height, mass));
} catch (e) {
  console.log('Error:', e.message);
}
