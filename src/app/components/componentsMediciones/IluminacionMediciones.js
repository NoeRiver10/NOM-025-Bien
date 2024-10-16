import React, { useState, useEffect } from 'react';

export default function IluminacionMediciones({ formData, handleChange, toggleSection, visibleSections, areas = [], handleAreaSelect }) {
  const [clientAreas, setClientAreas] = useState(areas);

  useEffect(() => {
    // Recuperar las áreas del localStorage solo cuando esté en el cliente
    if (typeof window !== 'undefined') {
      const savedAreas = window.localStorage.getItem('areas');
      if (savedAreas) {
        setClientAreas(JSON.parse(savedAreas));
      }
    }
  }, []);

  return (
    <div className="border rounded-lg shadow-sm">
      <button
        type="button"
        className="bg-red-500 text-white w-full px-4 py-2 rounded-t-lg"
        onClick={() => toggleSection('iluminacion')}
      >
        Iluminación
      </button>
      {visibleSections.iluminacion && (
        <div className="bg-gray-100 p-4 mt-2 dark:bg-gray-800">
          <h2 className="font-semibold mb-2 text-center">TIPO DE ILUMINACIÓN</h2>

          {/* Campo para seleccionar el área */}
          <div className="mb-4">
            <label className="block mb-1">Seleccionar Área:</label>
            <select
              name="selectedArea"
              value={formData.selectedArea}
              onChange={(e) => handleAreaSelect(e.target.value)}
              className="border p-2 w-full rounded"
            >
              <option value="">Selecciona un área</option>
              {Array.isArray(clientAreas) && clientAreas.length > 0 && clientAreas.map((area) => (
                <option key={area.idArea} value={area.idArea}>
                  Área {area.idArea} - {area.areaIluminada || 'Sin nombre'}
                </option>
              ))}
            </select>
          </div>

          {/* Campo para Tipo de Iluminación */}
          <div className="mb-4">
            <label className="block mb-1">TIPO DE ILUMINACIÓN:</label>
            <select
              name="tipoIluminacion"
              value={formData.tipoIluminacion}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            >
              <option value="ARTIFICIAL">ARTIFICIAL</option>
              <option value="COMBINADA">COMBINADA</option>
            </select>
          </div>

          {/* Campo para existencia de CCI */}
          <div className="mb-4">
            <label className="block mb-1">¿EXISTE CCI?:</label>
            <select
              name="cci"
              value={formData.cci}
              onChange={handleChange}
              className={`border p-2 w-full rounded ${
                formData.tipoIluminacion === 'ARTIFICIAL' ? 'bg-gray-200 cursor-not-allowed' : ''
              }`}
              disabled={formData.tipoIluminacion === 'ARTIFICIAL'}
            >
              <option value="SÍ">SÍ</option>
              <option value="NO">NO</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
