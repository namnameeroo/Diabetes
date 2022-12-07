export const getGl = inputs => {
  /*
   * {entireWeight, calories, carbohydrate, protein, fat, fiber, intake, remains}
   */
  const proportion = parseFloat(inputs.intake / 100).toFixed(3); // 연산 확인 필요
  console.log(proportion, ": 섭취 비율");
  const newInputs = {};

  /*
  Object.entries(inputs).forEach(([key, value]) => {
    !!value || value === 0 ? (newInputs[key] = 0) : (newInputs[key] = value * proportion);
  });
  */

  Object.entries(inputs).forEach(([key, value]) => {
    console.info(value);
    if (key != "foodName" && key != "provider" && key != "userId") {
      // filter 로 개선하면 좋을 듯
      !value || value === 0
        ? (newInputs[key] = 0)
        : (newInputs[key] = calculator(value, proportion, "*"));
    }
  });
  console.log(inputs, newInputs)

  // let result =
  //   3.2 + step1 -
  //   0.205486363 * newInputs.fat -
  //   0.006877061 * newInputs.protein * newInputs.protein -
  //   0.012675566 * newInputs.fiber * newInputs.fiber;

  const step1 = calculator(
    0.393566429,
    parseFloat(newInputs.carbohydrate) - parseFloat(newInputs.fiber),
    "*"
  );
  const step2 = calculator(0.205486363, newInputs.fat, "*");
  const step3 = calculator(
    0.006877061,
    calculator(newInputs.protein, newInputs.protein, "*"),
    "*"
  );
  const step4 = calculator(
    0.012675566,
    calculator(newInputs.fiber, newInputs.fiber, "*"),
    "*"
  );

  let result = 3.2 + step1 - step2 - step3 - step4;

  if (inputs.carbohydrate - inputs.fiber >= 10) {
    result += 3.2;
  }

  let judges = result >= 20 ? "HIGH" : result > 10 ? "MIDDLE" : "LOW";
  console.log(result);
  return [result, judges];
};

export const calculator = (num1, num2, type) => {
  num1 = parseFloat(num1);
  num2 = parseFloat(num2);
  console.log(num1, num2);
  if (type === "*") {
    console.log("cal:", parseFloat(num1 * num2).toFixed(10));
    return parseFloat(parseFloat(num1 * num2).toFixed(10));
  } else if (type === "+") {
    console.log("cal:", parseFloat(num1 + num2).toFixed(10));
    return parseFloat(parseFloat(num1 + num2).toFixed(10));
  }
};
