import { parseArguments } from "./utils";

export function calculateBMI(weight: number, height: number): string {
  // Convert height to meters
  height = height / 100;

  // Calculate BMI
  const bmi: number = weight / (height * height);

  // Determine BMI category
  let category: string;
  if (bmi < 18.5) {
    category = "Underweight";
  } else if (bmi < 25) {
    category = "Normal (healthy weight)";
  } else if (bmi < 30) {
    category = "Overweight";
  } else {
    category = "Obese";
  }

  // Return BMI category and value rounded to 2 decimal places
  return `${category}: ${bmi.toFixed(2)}`;
}

if (require.main === module) {
  try {
    const { value1, value2 } = parseArguments(process.argv);
    console.log(calculateBMI(value1, value2));
  } catch (error: unknown) {
    let errorMessage = "Something bad happened.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
  }
}
