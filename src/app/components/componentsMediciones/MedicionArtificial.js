import React, { useEffect, useState } from 'react';

function MedicionArtificial({ formData, handleMedicionChange, calcularHorarioConsecutivo }) {
  const [mediciones, setMediciones] = useState(formData.mediciones || []);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setMediciones(formData.mediciones || []);
  }, [formData.mediciones]);

  // Manejar los cambios de los campos de medición específicos
  const handleFieldChange = (field, value) => {
    const updatedMediciones = [...mediciones];
    if (!updatedMediciones[currentIndex]) {
      updatedMediciones[currentIndex] = {};
    }
    updatedMediciones[currentIndex][field] = value;

    setMediciones(updatedMediciones);
    handleMedicionChange(updatedMediciones);
  };

  // Generar automáticamente los horarios para cada punto después del primero
  useEffect(() => {
    if (calcularHorarioConsecutivo && currentIndex > 0) {
      const previousHorario = mediciones[currentIndex - 1]?.horario_0;
      if (previousHorario && !mediciones[currentIndex]?.horario_0) {
        const newHorario = calculateConsecutiveHorario(previousHorario);
        handleFieldChange('horario_0', newHorario);
      }
    }
  }, [currentIndex, calcularHorarioConsecutivo]);

  // Calcular el horario consecutivo sumando un minuto al horario anterior
  const calculateConsecutiveHorario = (previousHorario) => {
    if (!previousHorario || previousHorario === '') {
      return '00:00'; // Valor por defecto si no hay horario previo
    }

    // Extraer horas y minutos del horario anterior
    const [hours, minutes] = previousHorario.split(':').map((timePart) => parseInt(timePart, 10));

    // Calcular el nuevo horario sumando un minuto al anterior
    let newMinutes = minutes + 1;
    let newHours = hours;

    if (newMinutes >= 60) {
      newMinutes = 0;
      newHours = (newHours + 1) % 24;
    }

    // Formatear el nuevo horario con dos dígitos para las horas y minutos
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
    const newHorario = calculateConsecutiveHorario(
      mediciones.length > 0 ? mediciones[mediciones.length - 1].horario_0 : '00:00'
    );
    const newMedicion = {
      puesto: '',
      identificacion: '',
      horario_0: newHorario,
      e2: '',
      e1: '',
      existe_pared: '',
      e2_adicional: '',
      e1_adicional: '',
    };
    const updatedMediciones = [...mediciones, newMedicion];
    setMediciones(updatedMediciones);
    handleMedicionChange(updatedMediciones);
    setCurrentIndex(updatedMediciones.length - 1);
  };

  // Eliminar el punto de medición actual
  const deleteMedicion = () => {
    const updatedMediciones = [...mediciones];
    if (updatedMediciones.length > 0) {
      updatedMediciones.splice(currentIndex, 1);
      setMediciones(updatedMediciones);
      handleMedicionChange(updatedMediciones);
      setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
    }
  };

  // Guardar la medición actual
  const handleSaveMedicion = () => {
    const updatedFormData = { ...formData, mediciones };
    console.log('Medición guardada:', updatedFormData);
  };

  return (
    <div className="border rounded-lg shadow-sm mt-4 p-4 bg-gray-100 dark:bg-gray-800">
      <h2 className="font-semibold mb-2 text-center">
        {mediciones[currentIndex] ? `Punto de Medición Artificial ${currentIndex + 1}` : 'No hay datos de medición'}
      </h2>

      {/* Mostrar el punto de medición actual */}
      {mediciones[currentIndex] ? (
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
            <label className="block mb-1">IDENTIFICACION:</label>
            <input
              type="text"
              name="identificacion"
              value={mediciones[currentIndex].identificacion || ''}
              onChange={(e) => handleFieldChange('identificacion', e.target.value)}
              className="border p-2 w-full rounded bg-white"
              required
            />
          </div>

          {/* Horario */}
          <div className="mb-4">
            <label className="block mb-1">HORARIO:</label>
            <input
              type="time"
              name="horario_0"
              value={mediciones[currentIndex]['horario_0'] || ''}
              onChange={(e) => handleFieldChange('horario_0', e.target.value)}
              className="border p-2 w-full rounded bg-white"
              required
              readOnly={currentIndex > 0}
            />
          </div>

          {/* Campo E2 */}
          <div className="mb-4">
            <label className="block mb-1">E2:</label>
            <input
              type="number"
              name="e2"
              value={mediciones[currentIndex].e2 || ''}
              onChange={(e) => handleFieldChange('e2', e.target.value)}
              className="border p-2 w-full rounded bg-white"
              required
            />
          </div>

          {/* Campo E1 */}
          <div className="mb-4">
            <label className="block mb-1">E1:</label>
            <input
              type="number"
              name="e1"
              value={mediciones[currentIndex].e1 || ''}
              onChange={(e) => handleFieldChange('e1', e.target.value)}
              className="border p-2 w-full rounded bg-white"
              required
            />
          </div>

          {/* Nueva Pregunta: ¿Existe pared? */}
          <div className="mb-4">
            <label className="block mb-1">¿EXISTE PARED?</label>
            <select
              name="existe_pared"
              value={mediciones[currentIndex].existe_pared || ''}
              onChange={(e) => handleFieldChange('existe_pared', e.target.value)}
              className="border p-2 w-full rounded bg-white"
              required
            >
              <option value="">Selecciona una opción</option>
              <option value="sí">Sí</option>
              <option value="no">No</option>
            </select>
          </div>

          {/* Campos E1 y E2 adicionales solo si 'existe_pared' es 'sí' */}
          {mediciones[currentIndex].existe_pared === 'sí' && (
            <>
              <div className="mb-4">
                <label className="block mb-1">E2 (adicional):</label>
                <input
                  type="number"
                  name="e2_adicional"
                  value={mediciones[currentIndex].e2_adicional || ''}
                  onChange={(e) => handleFieldChange('e2_adicional', e.target.value)}
                  className="border p-2 w-full rounded bg-white"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1">E1 (adicional):</label>
                <input
                  type="number"
                  name="e1_adicional"
                  value={mediciones[currentIndex].e1_adicional || ''}
                  onChange={(e) => handleFieldChange('e1_adicional', e.target.value)}
                  className="border p-2 w-full rounded bg-white"
                  required
                />
              </div>
            </>
          )}
        </div>
      ) : (
        <p>No hay datos de medición</p>
      )}

      {/* Botones de Navegación y Guardado */}
      <div className="mt-4 flex flex-wrap justify-center gap-4">
        <button
          type="button"
          className="bg-gray-500 text-white px-4 py-2 rounded sm:w-auto hover:bg-gray-700 transition duration-300"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
        >
          Anterior
        </button>
        <button
          type="button"
          className="bg-blue-500 text-white px-4 py-2 rounded sm:w-auto hover:bg-blue-700 transition duration-300"
          onClick={handleNext}
          disabled={currentIndex === mediciones.length - 1}
        >
          Siguiente
        </button>
        <button
          type="button"
          className="bg-green-500 text-white px-4 py-2 rounded sm:w-auto hover:bg-green-700 transition duration-300"
          onClick={handleSaveMedicion}
        >
          Guardar Medición
        </button>
        <button
          type="button"
          className="bg-blue-500 text-white px-4 py-2 rounded sm:w-auto hover:bg-blue-700 transition duration-300"
          onClick={addMedicion}
        >
          Agregar Punto
        </button>
        <button
          type="button"
          className="bg-red-500 text-white px-4 py-2 rounded sm:w-auto hover:bg-red-700 transition duration-300"
          onClick={deleteMedicion}
          disabled={mediciones.length === 0}
        >
          Eliminar Punto
        </button>
      </div>
    </div>
  );
}

export default MedicionArtificial;
