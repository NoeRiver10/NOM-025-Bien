import React from 'react';
import ResumenMedicionArtificial from './ResumenMedicionArtificial';
import ResumenMedicionCombinada from './ResumenMedicionCombinada';

function ResumenMediciones({ areas, selectedAreaId, handleSummaryAreaSelect, setShowSummary }) {
  const selectedArea = areas.find((area) => area.idArea === parseInt(selectedAreaId));

  return (
    <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800">
      <h2 className="text-2xl font-bold mb-4 text-center">Resumen Completo</h2>
      <div className="mb-4">
        <label className="block mb-1 text-center">Seleccionar Área para Ver Detalles:</label>
        <select
          value={selectedAreaId}
          onChange={handleSummaryAreaSelect}
          className="border p-2 w-full rounded"
        >
          <option value="">Selecciona un área</option>
          {areas.map((area) => (
            <option key={area.idArea} value={area.idArea}>
              Área {area.idArea} - {area.areaIluminada || 'Sin nombre'}
            </option>
          ))}
        </select>
      </div>
      {selectedArea && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-700">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Campo</th>
                <th className="py-2 px-4 border-b">Valor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-b">Área Iluminada</td>
                <td className="py-2 px-4 border-b">{selectedArea.areaIluminada}</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">Tipo de Iluminación</td>
                <td className="py-2 px-4 border-b">{selectedArea.tipoIluminacion}</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">Departamento</td>
                <td className="py-2 px-4 border-b">{selectedArea.departamento}</td>
              </tr>
              {/* Más campos del área según sea necesario */}
              {Array.isArray(selectedArea.mediciones) && selectedArea.mediciones.length > 0 && (
                <tr>
                  <td colSpan="2" className="py-2 px-4 border-b">
                    <h4 className="font-semibold text-lg mt-4">Mediciones:</h4>
                    {selectedArea.tipoIluminacion === 'ARTIFICIAL' ? (
                      <ResumenMedicionArtificial area={selectedArea} />
                    ) : (
                      <ResumenMedicionCombinada area={selectedArea} />
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      <div className="mt-4 text-center">
        <button
          type="button"
          onClick={() => setShowSummary(false)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Volver a la Edición
        </button>
      </div>
    </div>
  );
}

export default ResumenMediciones;
