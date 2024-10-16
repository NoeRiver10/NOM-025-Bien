import React from 'react';

function ResumenMedicionCombinada({ area }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white dark:bg-gray-700">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Punto</th>
            <th className="py-2 px-4 border-b">Puesto</th>
            <th className="py-2 px-4 border-b">Identificación</th>
            <th className="py-2 px-4 border-b">Horario</th>
            <th className="py-2 px-4 border-b">E2</th>
            <th className="py-2 px-4 border-b">E1</th>
            <th className="py-2 px-4 border-b">¿Existe Pared?</th>
            <th className="py-2 px-4 border-b">E2 (Adicional)</th>
            <th className="py-2 px-4 border-b">E1 (Adicional)</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(area.mediciones) && area.mediciones.length > 0 ? (
            area.mediciones.map((medicion, idx) => (
              <React.Fragment key={idx}>
                <tr className="border-b-4 border-gray-900">
                  <td className="py-2 px-4 border-b" rowSpan={(medicion.mediciones?.length || 0) + 1}>
                    Punto {idx + 1}
                  </td>
                  <td className="py-2 px-4 border-b" rowSpan={(medicion.mediciones?.length || 0) + 1}>
                    {medicion.puesto || 'N/A'}
                  </td>
                  <td className="py-2 px-4 border-b" rowSpan={(medicion.mediciones?.length || 0) + 1}>
                    {medicion.identificacion || 'N/A'}
                  </td>
                </tr>
                {medicion.mediciones && medicion.mediciones.length > 0 ? (
                  medicion.mediciones.map((detalle, detalleIdx) => (
                    <tr key={`${idx}-${detalleIdx}`}>
                      <td className="py-2 px-4 border-b">{detalle.horario || 'N/A'}</td>
                      <td className="py-2 px-4 border-b">{detalle.e2 || 'N/A'}</td>
                      <td className="py-2 px-4 border-b">{detalle.e1 || 'N/A'}</td>
                      <td className="py-2 px-4 border-b">{detalle.existe_pared || 'N/A'}</td>
                      <td className="py-2 px-4 border-b">
                        {detalle.existe_pared === 'sí' ? detalle.e2_adicional : 'N/A'}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {detalle.existe_pared === 'sí' ? detalle.e1_adicional : 'N/A'}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-2 px-4 border-b text-center">No hay detalles de medición</td>
                  </tr>
                )}
              </React.Fragment>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="py-2 px-4 border-b text-center">No hay mediciones disponibles</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ResumenMedicionCombinada;
