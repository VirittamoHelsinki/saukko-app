import { evaluationCompleted } from '../src/controllers/evaluationController/handleUserPerformanceEmails'

describe('evaluationCompleted', () => {
  test('should return true if all units in all evaluation are teacherReady', () => {
    const evaluation = {
      units: [{ teacherReady: true }, { teacherReady: true }],
    };
    expect(evaluationCompleted(evaluation)).toBe(true);
  });

  test('should return false if any unit in any evaluation is not teacherReady', () => {
    const evaluation = {
      units: [{ teacherReady: true }, { teacherReady: false }, { teacherReady: true }],
    };
    expect(evaluationCompleted(evaluation)).toBe(false);
  });

  test('should return false if there are no evaluation', () => {
    const evaluation: Object = {};
    expect(evaluationCompleted(evaluation)).toBe(false);
  });

});
