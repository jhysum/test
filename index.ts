import express from "express";
import { calculateBMI } from "./calculateBmi";
import { calculator, Operator } from "./calculator";
import { calculateExercise, ExerciseResult } from "./calculateExercises";

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Hello World!");
});

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/ping", (_req, res) => {
  res.send("pong");
});

//sample code to get query string parameters
app.get("/query", (req, res) => {
  const { name, age } = req.query;
  res.send(`Welcome ${name}! You are ${age} years old.`);
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;
  if (isNaN(Number(height)) || isNaN(Number(weight))) {
    res.json({
      error: "malformatted parameters",
    });
  }

  //respond in a json to the response
  res.json({
    weight: weight,
    height: height,
    bmi: calculateBMI(Number(height), Number(weight)),
  });
});

app.post("/calculate", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { value1, value2, op } = req.body;

  const operation = op as Operator;

  if (!value1 || isNaN(Number(value1))) {
    return res.status(400).send({ error: "value1 is missing or invalid" });
  }

  if (!value2 || isNaN(Number(value2))) {
    return res.status(400).send({ error: "value2 is missing or invalid" });
  }

  if (!op) {
    return res.status(400).send({ error: "op is missing" });
  }

  const result = calculator(Number(value1), Number(value2), operation);
  return res.send({ result });
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    return res.status(400).send({ error: "parameters missing" });
  }

  if (isNaN(Number(target))) {
    return res.status(400).send({ error: "malformatted parameters" });
  }
  const de = daily_exercises as Array<number>;

  if (de.length === 0) {
    return res.status(400).send({ error: "malformatted parameters" });
  }

  const result: ExerciseResult = calculateExercise(de, Number(target));
  return res.send(JSON.stringify(result));
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
