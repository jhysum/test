interface ExerciseValue {
  value1: number;
  value2: Array<number>;
}

export interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseArguments = (args: Array<string>): ExerciseValue => {
  if (args.length < 4) throw new Error("Not enough arguments");

  //for all the args, check if they are all numbers
  for (let i = 2; i < args.length; i++) {
    if (isNaN(Number(args[i]))) {
      throw new Error("Provided values were not numbers!");
    }
  }

  return {
    value1: Number(args[2]),
    value2: args.slice(3).map((a) => Number(a)),
  };
};

export const calculateExercise = (
  hours: Array<number>,
  target: number
): ExerciseResult => {
  const periodLength = hours.length;
  const trainingDays = hours.filter((h) => h > 0).length;
  const totalHours = hours.reduce((a, b) => a + b, 0);
  const average = totalHours / periodLength;
  const success = average >= target;
  const rating = success ? 3 : average >= target - 0.5 ? 2 : 1;
  const ratingDescription =
    rating === 3
      ? "excellent"
      : rating === 2
      ? "not too bad but could be better"
      : "poor";
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

if (require.main === module) {
  try {
    const { value1, value2 } = parseArguments(process.argv);
    console.log(calculateExercise(value2, value1));
  } catch (error: unknown) {
    let errorMessage = "Something bad happened.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
  }
}
