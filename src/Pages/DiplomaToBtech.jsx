import React, { useState } from 'react';

export const DiplomaToBtech = () => {
  const [inputs, setInputs] = useState({
    diploma5: '',
    diploma6: '',
    sgpa: Array(6).fill('')
  });
  const [cgpa, setCgpa] = useState(null);
  const [error, setError] = useState('');

  const weights = [24, 24, 22, 20, 21, 21, 20, 8];

  const isValidPercentage = (value) => value >= 0 && value <= 100;
  const isValidSGPA = (value) => value >= 0 && value <= 10;

  const handleDiplomaChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSGPAChange = (index, value) => {
    const newSGPA = [...inputs.sgpa];
    newSGPA[index] = value;
    setInputs((prev) => ({ ...prev, sgpa: newSGPA }));
  };

  const calculateCGPA = () => {
    const { diploma5, diploma6, sgpa } = inputs;

    if (!diploma5 || !diploma6 || sgpa.some((v) => v === '')) {
      setError('All fields are required!');
      return;
    }

    if (
      !isValidPercentage(diploma5) ||
      !isValidPercentage(diploma6) ||
      sgpa.some((v) => !isValidSGPA(parseFloat(v)))
    ) {
      setError('Please enter valid values: Percentage (0–100), SGPA (0–10)');
      return;
    }

    setError('');

    const sem1 = parseFloat(diploma5) / 9.5;
    const sem2 = parseFloat(diploma6) / 9.5;
    const sgpaAll = [sem1, sem2, ...sgpa.map((val) => parseFloat(val))];

    let totalWeighted = 0;
    let totalCredits = 0;

    sgpaAll.forEach((sgpaVal, idx) => {
      totalWeighted += sgpaVal * weights[idx];
      totalCredits += weights[idx];
    });

    const result = (totalWeighted / totalCredits).toFixed(2);
    setCgpa(result);
  };

  return (
    <div className="max-w-md mx-auto p-6 shadow rounded bg-white dark:bg-gray-800">
      <h2 className="text-xl font-semibold mb-4 text-center text-gray-900 dark:text-gray-100">
        Diploma to B.Tech CGPA Calculator
      </h2>

      {error && <div className="mb-4 text-red-500 text-center">{error}</div>}

      <div className="mb-3">
        <label className="block text-sm text-gray-700 dark:text-gray-300">Diploma 5th Sem %:</label>
        <input
          name="diploma5"
          type="number"
          min="0"
          max="100"
          required
          value={inputs.diploma5}
          onChange={handleDiplomaChange}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div className="mb-3">
        <label className="block text-sm text-gray-700 dark:text-gray-300">Diploma 6th Sem %:</label>
        <input
          name="diploma6"
          type="number"
          min="0"
          max="100"
          required
          value={inputs.diploma6}
          onChange={handleDiplomaChange}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
        />
      </div>

      {inputs.sgpa.map((val, idx) => (
        <div key={idx} className="mb-2">
          <label className="block text-sm text-gray-700 dark:text-gray-300">Semester {idx + 3} SGPA:</label>
          <input
            type="number"
            step="0.01"
            min="0"
            max="10"
            required
            value={val}
            onChange={(e) => handleSGPAChange(idx, e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          />
        </div>
      ))}

      <button
        onClick={calculateCGPA}
        className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
      >
        Calculate CGPA
      </button>

      {cgpa !== null && (
        <div className="mt-4 text-center text-lg text-green-600 dark:text-green-400">
          CGPA: {cgpa}
        </div>
      )}
    </div>
  );
};
