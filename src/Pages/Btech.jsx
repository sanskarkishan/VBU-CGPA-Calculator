import React, { useState } from 'react';

export const Btech = () => {
  const [sgpa, setSgpa] = useState(Array(8).fill(''));
  const [cgpa, setCgpa] = useState(null);
  const [error, setError] = useState('');

  const weights = [24, 24, 22, 20, 21, 21, 20, 8];

  const isValidSGPA = (value) => value >= 0 && value <= 10;

  const handleChange = (index, value) => {
    const updated = [...sgpa];
    updated[index] = value;
    setSgpa(updated);
  };

  const calculateCGPA = () => {
    if (sgpa.some(v => v === '')) {
      setError('All SGPA fields are required!');
      return;
    }

    if (sgpa.some(v => !isValidSGPA(parseFloat(v)))) {
      setError('Please enter SGPA between 0 and 10 only!');
      return;
    }

    setError('');
    let totalWeighted = 0;
    let totalCredits = 0;

    sgpa.forEach((val, idx) => {
      const sgpaVal = parseFloat(val);
      totalWeighted += sgpaVal * weights[idx];
      totalCredits += weights[idx];
    });

    const result = (totalWeighted / totalCredits).toFixed(2);
    setCgpa(result);
  };

  return (
    <div className="max-w-md mx-auto p-6 shadow rounded bg-white dark:bg-gray-800">
      <h2 className="text-xl font-semibold mb-4 text-center text-gray-900 dark:text-gray-100">
        B.Tech CGPA Calculator
      </h2>

      {error && <div className="mb-4 text-red-500 text-center">{error}</div>}

      {sgpa.map((val, idx) => (
        <div key={idx} className="mb-2">
          <label className="block text-sm text-gray-700 dark:text-gray-300">Semester {idx + 1} SGPA:</label>
          <input
            type="number"
            step="0.01"
            min="0"
            max="10"
            value={val}
            required
            onChange={(e) => handleChange(idx, e.target.value)}
            className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white"
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
