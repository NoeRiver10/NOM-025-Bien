import React from 'react';

const PercepcionTrabajo = ({ formData, handleChange, visible, toggleSection }) => {
  return (
    <div className="border rounded-lg shadow-sm">
      <button 
        type="button" 
        className="bg-red-500 text-white w-full px-4 py-2 rounded-t-lg" 
        onClick={() => toggleSection('percepcion')}
      >
        Percepción del Trabajo
      </button>
      {visible && (
        <div className="bg-gray-100 p-4 dark:bg-gray-800 rounded-b-lg">
          <h2 className="font-semibold mb-2 text-center">PERCEPCIÓN DEL TRABAJO</h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label>NOMBRE DEL TRABAJADOR:</label>
              <input
                type="text"
                name="nombreTrabajador"
                value={formData.nombreTrabajador}
                onChange={handleChange}
                required
                className="border p-2 rounded w-full"
              />
            </div>
            <div>
              <label>DESCRIPCIÓN:</label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                required
                className="border p-2 rounded w-full"
              />
            </div>
            <div>
              <label>PUESTO DEL TRABAJADOR:</label>
              <textarea
                name="reportes"
                value={formData.reportes}
                onChange={handleChange}
                required
                className="border p-2 rounded w-full"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PercepcionTrabajo;
