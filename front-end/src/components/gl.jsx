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
    if (
      key == "carbohydrate" ||
      key == "fat" ||
      key == "protein" ||
      key == "fiber"
    ) {
      // filter 로 개선하면 좋을 듯
      !value || value === 0
        ? (newInputs[key] = 0)
        : (newInputs[key] = calculator(value, proportion, "*"));
    }
  });
  console.log(inputs, newInputs);
  /* 계산식
    let result =
      3.2 + step1 -
      0.205486363 * newInputs.fat -
      0.006877061 * newInputs.protein * newInputs.protein -
      0.012675566 * newInputs.fiber * newInputs.fiber;
  */
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

  let gl_result = 3.2 + step1 - step2 - step3 - step4;

  // TODO: 섭취비율 반영 해야하는지?
  if (inputs.carbohydrate - inputs.fiber >= 10) {
    gl_result += 3.2;
  }

  let judges = gl_result >= 20 ? "HIGH" : gl_result > 10 ? "MIDDLE" : "LOW";
  console.log(gl_result);
  return [gl_result, judges];
};

/**
 * 소수의 곱셈이나 덧셈 수행
 * @param {*} num1
 * @param {*} num2
 * @param {*} type
 * @returns float
 */
export const calculator = (num1, num2, type) => {
  num1 = parseFloat(num1);
  num2 = parseFloat(num2);

  if (type === "*") {
    console.log("cal:", parseFloat(num1 * num2).toFixed(10));
    return parseFloat(parseFloat(num1 * num2).toFixed(10));
  } else if (type === "+") {
    console.log("cal:", parseFloat(num1 + num2).toFixed(10));
    return parseFloat(parseFloat(num1 + num2).toFixed(10));
  }
};
