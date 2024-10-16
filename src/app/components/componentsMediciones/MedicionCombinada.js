import React, { useEffect, useState } from 'react';

function MedicionCombinada({ formData, handleMedicionChange, calcularHorarioConsecutivo }) {
  const [mediciones, setMediciones] = useState(formData.mediciones || []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const numMediciones = formData.cci === 'SÍ' ? 4 : 3;

  useEffect(() => {
    setMediciones(formData.mediciones || []);
  }, [formData.mediciones]);

  // Manejar los cambios de los campos de medición específicos
  const handleFieldChange = (field, value, medIndex = null) => {
    const updatedMediciones = [...mediciones];
    if (medIndex === null) {
      // Actualizar los campos generales (puesto, identificación, etc.)
      if (!updatedMediciones[currentIndex]) {
        updatedMediciones[currentIndex] = { mediciones: [] };
      }
      updatedMediciones[currentIndex][field] = value;
    } else {
      // Actualizar los campos de mediciones específicas
      if (!updatedMediciones[currentIndex].mediciones) {
        updatedMediciones[currentIndex].mediciones = [];
      }
      if (!updatedMediciones[currentIndex].mediciones[medIndex]) {
        updatedMediciones[currentIndex].mediciones[medIndex] = {};
      }
      updatedMediciones[currentIndex].mediciones[medIndex][field] = value;
    }

    setMediciones(updatedMediciones);
    handleMedicionChange(updatedMediciones);
  };

  // Generar automáticamente los horarios para cada punto después del primero
  useEffect(() => {
    if (calcularHorarioConsecutivo && currentIndex > 0) {
      for (let medIndex = 0; medIndex < numMediciones; medIndex++) {
        const previousHorario = mediciones[currentIndex - 1]?.mediciones?.[medIndex]?.horario;
        if (previousHorario && !mediciones[currentIndex]?.mediciones?.[medIndex]?.horario) {
          const newHorario = calculateConsecutiveHorario(previousHorario);
          handleFieldChange('horario', newHorario, medIndex);
        }
      }
    }
  }, [currentIndex, calcularHorarioConsecutivo]);

  // Calcular el horario consecutivo sumando un minuto al horario anterior
  const calculateConsecutiveHorario = (previousHorario) => {
    const [hours, minutes] = previousHorario.split(':').map((timePart) => parseInt(timePart, 10));
    let newMinutes = minutes + 1;
    let newHours = hours;

    if (newMinutes >= 60) {
      newMinutes = 0;
      newHours = (newHours + 1) % 24;
    }

    const formattedHours = String(newHours).padStart(2, '0');
    const formattedMinutes = String(newMinutes).padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}`;
  };

  // Navegar al punto anterior
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Navegar al siguiente punto
  const handleNext = () => {
    if (currentIndex < mediciones.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Agregar un nuevo punto de medición
  const addMedicion = () => {
    const newMedicion = {
      puesto: '',
      identificacion: '',
      mediciones: Array.from({ length: numMediciones }).map(() => ({
        horario: '',
        e1: '',
        e2: '',
        existe_pared: '',
        e1_adicional: '',
        e2_adicional: '',
      })),
    };
    const updatedMediciones = [...mediciones, newMedicion];
    setMediciones(updatedMediciones);
    handleMedicionChange(updatedMediciones);
    setCurrentIndex(updatedMediciones.length - 1);
  };

  // Eliminar el punto actual de medición
  const eliminarPunto = () => {
    const updatedMediciones = [...mediciones];
    updatedMediciones.splice(currentIndex, 1);
    setMediciones(updatedMediciones);
    handleMedicionChange(updatedMediciones);
    setCurrentIndex(updatedMediciones.length > 0 ? Math.max(currentIndex - 1, 0) : 0);
  };

  // Guardar la medición actual
  const handleSaveMedicion = () => {
    const updatedFormData = { ...formData, mediciones };
    console.log('Datos guardados:', updatedFormData);
  };

  return (
    <div className="border rounded-lg shadow-sm mt-4 p-4 bg-gray-100 dark:bg-gray-800">
      <h2 className="font-semibold mb-2 text-center">
        {mediciones.length > 0 && mediciones[currentIndex]
          ? `Punto de Medición Combinada ${currentIndex + 1}`
          : 'No hay datos de medición'}
      </h2>

      {/* Mostrar el punto de medición actual */}
      {mediciones.length > 0 && mediciones[currentIndex] ? (
        <div className="border rounded-lg p-4 mb-4 bg-white dark:bg-gray-900">
          {/* Campo de Puesto, editable por el usuario */}
          <div className="mb-4">
            <label className="block mb-1">PUESTO:</label>
            <input
              type="text"
              name="puesto"
              value={mediciones[currentIndex].puesto || ''}
              onChange={(e) => handleFieldChange('puesto', e.target.value)}
              className="border p-2 w-full rounded bg-white"
            />
          </div>

          {/* Campo de Identificación, editable por el usuario */}
          <div className="mb-4">
            <label className="block mb-1">IDENTIFICACIÓN:</label>
            <input
              type="text"
              name="identificacion"
              value={mediciones[currentIndex].identificacion || ''}
              onChange={(e) => handleFieldChange('identificacion', e.target.value)}
              className="border p-2 w-full rounded bg-white"
              required
            />
          </div>

          {/* Mostrar los campos de horario, e1, e2 para cada medición */}
          {Array.from({ length: numMediciones }).map((_, medIndex) => (
            <div key={medIndex} className="mb-6">
              <h3 className="font-semibold mb-2">Horario {medIndex + 1} y sus Mediciones</h3>
              {/* Horario */}
              <div className="mb-4">
                <label className="block mb-1">HORARIO {medIndex + 1}:</label>
                <input
                  type="time"
                  name={`horario_${medIndex}`}
                  value={mediciones[currentIndex]?.mediciones?.[medIndex]?.horario || ''}
                  onChange={(e) => handleFieldChange('horario', e.target.value, medIndex)}
                  className="border p-2 w-full rounded bg-white"
                  required
                  readOnly={calcularHorarioConsecutivo && currentIndex > 0}
                />
              </div>
              {/* E2 */}
              <div className="mb-4">
                <label className="block mb-1">E2 (Medición {medIndex + 1}):</label>
                <input
                  type="number"
                  name={`e2_${medIndex}`}
                  value={mediciones[currentIndex]?.mediciones?.[medIndex]?.e2 || ''}
                  onChange={(e) => handleFieldChange('e2', e.target.value, medIndex)}
                  className="border p-2 w-full rounded bg-white"
                  required
                />
              </div>
              {/* E1 */}
              <div className="mb-4">
                <label className="block mb-1">E1 (Medición {medIndex + 1}):</label>
                <input
                  type="number"
                  name={`e1_${medIndex}`}
                  value={mediciones[currentIndex]?.mediciones?.[medIndex]?.e1 || ''}
                  onChange={(e) => handleFieldChange('e1', e.target.value, medIndex)}
                  className="border p-2 w-full rounded bg-white"
                  required
                />
              </div>

              {/* Nueva Pregunta: ¿Existe pared? */}
              <div className="mb-4">
                <label className="block mb-1">¿EXISTE PARED?</label>
                <select
                  name={`existe_pared_${medIndex}`}
                  value={mediciones[currentIndex]?.mediciones?.[medIndex]?.existe_pared || ''}
                  onChange={(e) => handleFieldChange('existe_pared', e.target.value, medIndex)}
                  className="border p-2 w-full rounded bg-white"
                  required
                >
                  <option value="">Selecciona una opción</option>
                  <option value="sí">Sí</option>
                  <option value="no">No</option>
                </select>
              </div>

              {/* Campos E1 y E2 adicionales solo si 'existe_pared' es 'sí' */}
              {mediciones[currentIndex]?.mediciones?.[medIndex]?.existe_pared === 'sí' && (
                <>
                  <div className="mb-4">
                    <label className="block mb-1">E2 (adicional) {medIndex + 1}:</label>
                    <input
                      type="number"
                      name={`e2_adicional_${medIndex}`}
                      value={mediciones[currentIndex]?.mediciones?.[medIndex]?.e2_adicional || ''}
                      onChange={(e) => handleFieldChange('e2_adicional', e.target.value, medIndex)}
                      className="border p-2 w-full rounded bg-white"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-1">E1 (adicional) {medIndex + 1}:</label>
                    <input
                      type="number"
                      name={`e1_adicional_${medIndex}`}
                      value={mediciones[currentIndex]?.mediciones?.[medIndex]?.e1_adicional || ''}
                      onChange={(e) => handleFieldChange('e1_adicional', e.target.value, medIndex)}
                      className="border p-2 w-full rounded bg-white"
                      required
                    />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No hay datos de medición</p>
      )}

      {/* Botones de navegación y guardar */}
      <div className="mt-4 text-center">
        <button
          type="button"
          className="bg-gray-500 text-white px-4 py-2 mr-2 rounded-lg hover:bg-gray-700 transition duration-300"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
        >
          Anterior
        </button>
        <button
          type="button"
          className="bg-blue-500 text-white px-4 py-2 mr-2 rounded-lg hover:bg-blue-700 transition duration-300"
          onClick={handleNext}
          disabled={currentIndex >= mediciones.length - 1}
        >
          Siguiente
        </button>
        <button
          type="button"
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300"
          onClick={handleSaveMedicion}
        >
          Guardar Medición
        </button>
        <button
          type="button"
          className="bg-blue-500 text-white px-4 py-2 ml-2 rounded-lg hover:bg-blue-700 transition duration-300"
          onClick={addMedicion}
        >
          Agregar Punto
        </button>
        <button
          type="button"
          className="bg-red-500 text-white px-4 py-2 ml-2 rounded-lg hover:bg-red-700 transition duration-300"
          onClick={eliminarPunto}
          disabled={mediciones.length === 0}
        >
          Eliminar Punto
        </button>
      </div>
    </div>
  );
}

export default MedicionCombinada;
