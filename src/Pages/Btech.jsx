import React, { useState } from 'react';

export const Btech = () => {
  const [sgpa, setSgpa] = useState(Array(8).fill(''));
  const [cgpa, setCgpa] = useState(null);

  // Corresponding weights for each semester based on the formula
  const weights = [24, 24, 22, 20, 21, 21, 20, 8];

  const handleChange = (index, value) => {
    const newSgpa = [...sgpa];
    newSgpa[index] = value;
    setSgpa(newSgpa);
  };

  const calculateCGPA = () => {
    let totalWeighted = 0;
    let totalCredits = 0;

    sgpa.forEach((val, idx) => {
      if (val !== '') {
        totalWeighted += parseFloat(val) * weights[idx];
        totalCredits += weights[idx];
      }
    });
        console.log(totalCredits, totalWeighted);
        
    const result = totalCredits > 0 ? (totalWeighted / totalCredits).toFixed(2) : 0;
    setCgpa(result);
  };

  return (
    <div className="max-w-md mx-auto p-6 shadow rounded bg-white dark:bg-gray-800">
      <h2 className="text-xl font-semibold mb-4 text-center text-gray-900 dark:text-gray-100">B.Tech CGPA Calculator</h2>
      {sgpa.map((val, idx) => (
        <div key={idx} className="mb-2">
          <label className="block text-sm text-gray-700 dark:text-gray-300">Semester {idx + 1} SGPA:</label>
          <input
            type="number"
            step="0.01"
            min="0"
            max="10"
            value={val}
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
