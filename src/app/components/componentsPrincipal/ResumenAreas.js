import React from 'react';

function ResumenAreas({ areas, setShowSummary }) {
  return (
    <div className="bg-gray-100 p-4 mt-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-black dark:text-white text-center">Resumen de Todas las Áreas</h2>
      <div className="overflow-x-auto w-full">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Área</th>
              <th className="py-2 px-4 border-b">Área Iluminada</th>
              <th className="py-2 px-4 border-b">Núm. Puntos a Evaluar</th>
              <th className="py-2 px-4 border-b">Tipo de Iluminación</th>
              <th className="py-2 px-4 border-b">Altura</th>
              <th className="py-2 px-4 border-b">Largo</th>
              <th className="py-2 px-4 border-b">Ancho</th>
              <th className="py-2 px-4 border-b">Tipo de Luminaria</th>
              <th className="py-2 px-4 border-b">Potencia</th>
              <th className="py-2 px-4 border-b">Cantidad</th>
            </tr>
          </thead>
          <tbody>
            {areas.map((area, index) => (
              <React.Fragment key={index}>
                <tr className="bg-gray-100">
                  <td className="py-2 px-4 border-b">Área {area.idArea}</td>
                  <td className="py-2 px-4 border-b">{area.areaIluminada}</td>
                  <td className="py-2 px-4 border-b">{area.numPuntosEvaluar}</td>
                  <td className="py-2 px-4 border-b">{area.tipoIluminacion}</td>
                  <td className="py-2 px-4 border-b">{area.altura}</td>
                  <td className="py-2 px-4 border-b">{area.largo}</td>
                  <td className="py-2 px-4 border-b">{area.ancho}</td>
                  <td className="py-2 px-4 border-b">{area.tipoLuminaria}</td>
                  <td className="py-2 px-4 border-b">{area.potencia}</td>
                  <td className="py-2 px-4 border-b">{area.cantidad}</td>
                </tr>
                {area.puestos.length > 0 && (
                  <tr className="bg-white">
                    <td colSpan="10" className="py-2 px-4 border-b">
                      <h4 className="text-lg font-bold mt-4">Datos del Puesto - Área {area.idArea}:</h4>
                      <div className="overflow-x-auto w-full">
                        <table className="min-w-full bg-gray-100">
                          <thead>
                            <tr>
                              <th className="py-2 px-4 border-b">Puesto del Trabajador</th>
                              <th className="py-2 px-4 border-b">Número de Trabajadores</th>
                              <th className="py-2 px-4 border-b">Descripción de Actividades</th>
                            </tr>
                          </thead>
                          <tbody>
                            {area.puestos.map((puesto, puestoIndex) => (
                              <tr key={puestoIndex} className="bg-white">
                                <td className="py-2 px-4 border-b">{puesto.puestoTrabajador || 'No disponible'}</td>
                                <td className="py-2 px-4 border-b">{puesto.numTrabajadores || 'No disponible'}</td>
                                <td className="py-2 px-4 border-b">{puesto.descripcionActividades || 'No disponible'}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 text-center">
        <button
          type="button"
          onClick={() => setShowSummary(false)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Volver a Editar
        </button>
      </div>
    </div>
  );
}

export default ResumenAreas;
