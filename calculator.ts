export type Operator = "multiply" | "divide" | "add";
type Result = string | number;

export function calculator(a: number, b: number, op: Operator): Result {
  switch (op) {
    case "multiply":
      return a * b;
    case "divide":
      if (b === 0) throw new Error("Can't divide by 0!");
      return a / b;
    case "add":
      return a + b;
    default:
      throw new Error("Operation is not multiply, divide or add!");
  }
}

try {
  console.log(calculator(2, 0, "add"));
} catch (e: unknown) {
  let errorMessage = "Something went wrong: ";
  if (e instanceof Error) {
    errorMessage += e.message;
  }
  console.log(errorMessage);
}
