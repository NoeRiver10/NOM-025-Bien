import React from 'react';

export default function IdAreaMediciones({ formData, handleChange, toggleSection, visibleSections }) {
  return (
    <div className="border rounded-lg shadow-sm mt-4">
      <button
        type="button"
        className="bg-red-500 text-white w-full px-4 py-2 rounded-t-lg"
        onClick={() => toggleSection('areaIluminada')}
      >
        Área Iluminada
      </button>
      {visibleSections.areaIluminada && (
        <div className="bg-gray-100 p-4 mt-2 dark:bg-gray-800 rounded-b-lg">
          <h2 className="font-semibold mb-2 text-center">ÁREA ILUMINADA</h2>
          <div className="mb-4">
            <label className="block mb-1">ÁREA:</label>
            <input
              type="text"
              name="area"
              value={formData.area || ''}
              onChange={handleChange}
              disabled
              className="border p-2 w-full rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">DEPARTAMENTO:</label>
            <input
              type="text"
              name="departamento"
              value={formData.departamento || ''}
              onChange={handleChange}
              required
              className="border p-2 w-full rounded"
            />
          </div>
        </div>
      )}
    </div>
  );
}
