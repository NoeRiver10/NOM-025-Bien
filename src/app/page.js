"use client"; // Esto marca el componente como un Client Component

import { useState, useEffect } from 'react';
import Link from 'next/link'; // Asegúrate de importar Link
import './globals.css'; // Asegúrate de que la ruta sea correcta

export default function Reconocimiento() {
  const [formData, setFormData] = useState({
    idArea: '',
    areaIluminada: '',
    numPuntosEvaluar: '',
    tipoIluminacion: 'ARTIFICIAL',
    color: '',
    tipoSuperficie: '',
    altura: '',
    largo: '',
    ancho: '',
    indiceArea: 0,
    tipoLuminaria: '',
    potencia: '',
    distribucion: 'LINEAL',
    iluminacionLocalizada: 'SÍ',
    cantidad: '',
    nombreTrabajador: '',
    descripcion: '',
    reportes: '',
    tieneNombreTrabajador: 'NO',
    puestoTrabajador: '',
    numTrabajadores: '',
    descripcionActividades: '',
    tareaVisual: '',
    nivelMinimoIluminacion: '1',
  });

  const [visibleSections, setVisibleSections] = useState({
    identificacion: false,
    descripcion: false,
    dimensiones: false,
    luminarias: false,
    percepcion: false,
    puesto: false,
  });

  const toggleSection = (section) => {
    setVisibleSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    const altura = parseFloat(formData.altura) || 0; 
    const largo = parseFloat(formData.largo) || 0; 
    const ancho = parseFloat(formData.ancho) || 0; 

    let indiceArea = 0; 
    if (altura > 0 && (largo + ancho) > 0) { 
      indiceArea = (largo * ancho) / (altura * (largo + ancho)); 
    }

    setFormData((prev) => ({
      ...prev,
      indiceArea 
    }));
  }, [formData.altura, formData.largo, formData.ancho]);

  const calculateMinAreas = (ic) => {
    if (ic < 1) return 4;
    if (ic < 2) return 9;
    if (ic < 3) return 16;
    return 25; // Para IC >= 3
  };

  const calculateMaxAreas = (ic) => {
    if (ic < 1) return 6;
    if (ic < 2) return 12;
    if (ic < 3) return 20;
    return 30; // Para IC >= 3
  };

  const handleSave = () => {
    console.log('Datos guardados:', formData);
    // Aquí podrías implementar lógica para guardar en localStorage o en un estado superior
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    console.log('Datos del formulario enviados:', formData);
  };

  const handleAddAnotherArea = () => {
    // Reset the formData state to clear the form for a new area
    setFormData({
      idArea: '',
      areaIluminada: '',
      numPuntosEvaluar: '',
      tipoIluminacion: 'ARTIFICIAL',
      color: '',
      tipoSuperficie: '',
      altura: '',
      largo: '',
      ancho: '',
      indiceArea: 0,
      tipoLuminaria: '',
      potencia: '',
      distribucion: 'LINEAL',
      iluminacionLocalizada: 'SÍ',
      cantidad: '',
      nombreTrabajador: '',
      descripcion: '',
      reportes: '',
      tieneNombreTrabajador: 'NO',
      puestoTrabajador: '',
      numTrabajadores: '',
      descripcionActividades: '',
      tareaVisual: '',
      nivelMinimoIluminacion: '1',
    });
  };

  // Nueva función para ir a mediciones sin cambiar de página
  const handleGoToMeasurements = () => {
    // Lógica para mostrar el formulario de mediciones, por ejemplo
    console.log("Ir a Mediciones");
    // Aquí puedes implementar lo que necesites hacer para mostrar el formulario de mediciones.
  };

  return (
    <div className="container mx-auto p-4 bg-white dark:bg-gray-900 max-w-3xl rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-black dark:text-white text-center">RECONOCIMIENTO</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div className="border rounded-lg shadow-sm">
          <button type="button" className="bg-red-500 text-white w-full px-4 py-2 rounded-t-lg" onClick={() => toggleSection('identificacion')}>
            Identificación del Área
          </button>
          {visibleSections.identificacion && (
            <div className="bg-gray-100 p-4 dark:bg-gray-800 rounded-b-lg">
              <h2 className="font-semibold mb-2">IDENTIFICACIÓN DEL ÁREA</h2>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label>ID DE ÁREA:</label>
                  <input
                    type="number"
                    name="idArea"
                    value={formData.idArea}
                    onChange={handleChange}
                    required
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div>
                  <label>ÁREA ILUMINADA:</label>
                  <input
                    type="text"
                    name="areaIluminada"
                    value={formData.areaIluminada}
                    onChange={handleChange}
                    required
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div>
                  <label>NÚMERO DE PUNTOS A EVALUAR:</label>
                  <input
                    type="number"
                    name="numPuntosEvaluar"
                    value={formData.numPuntosEvaluar}
                    onChange={handleChange}
                    required
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div>
                  <label>TIPO DE ILUMINACIÓN:</label>
                  <select
                    name="tipoIluminacion"
                    value={formData.tipoIluminacion}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                  >
                    <option value="ARTIFICIAL">ARTIFICIAL</option>
                    <option value="COMBINADA">COMBINADA</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="border rounded-lg shadow-sm">
          <button type="button" className="bg-red-500 text-white w-full px-4 py-2 rounded-t-lg" onClick={() => toggleSection('dimensiones')}>
            Dimensiones del Área
          </button>
          {visibleSections.dimensiones && (
            <div className="bg-gray-100 p-4 dark:bg-gray-800 rounded-b-lg">
              <h2 className="font-semibold mb-2">DIMENSIONES DEL ÁREA</h2>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label>ALTURA (mts):</label>
                  <input
                    type="number"
                    name="altura"
                    value={formData.altura}
                    onChange={handleChange}
                    required
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div>
                  <label>LARGO (mts):</label>
                  <input
                    type="number"
                    name="largo"
                    value={formData.largo}
                    onChange={handleChange}
                    required
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div>
                  <label>ANCHO (mts):</label>
                  <input
                    type="number"
                    name="ancho"
                    value={formData.ancho}
                    onChange={handleChange}
                    required
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div>
                  <label>ÍNDICE DE ÁREA (IC):</label>
                  <div className="border border-gray-300 rounded px-4 py-2 w-full bg-gray-200 text-gray-700">
                    {formData.indiceArea !== undefined ? formData.indiceArea.toFixed(2) : "0.00"}
                  </div>
                </div>
                {/* Cálculo de áreas mínimas y máximas */}
                <div>
                  <label>MÍNIMO DE ÁREAS:</label>
                  <div className="border border-gray-300 rounded px-4 py-2 w-full bg-gray-200 text-gray-700">
                    {calculateMinAreas(formData.indiceArea) !== undefined 
                    ? Math.floor(calculateMinAreas(formData.indiceArea)): "0"}
                 </div>                
                </div>
                <div>
                  <label>MÁXIMO DE ÁREAS:</label>
                  <div className="border border-gray-300 rounded px-4 py-2 w-full bg-gray-200 text-gray-700">
                    {calculateMaxAreas(formData.indiceArea) !== undefined 
                    ? Math.floor(calculateMaxAreas(formData.indiceArea)) : "0"}
                 </div>                
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="border rounded-lg shadow-sm">
          <button type="button" className="bg-red-500 text-white w-full px-4 py-2 rounded-t-lg" onClick={() => toggleSection('luminarias')}>
            Luminarias
          </button>
          {visibleSections.luminarias && (
            <div className="bg-gray-100 p-4 dark:bg-gray-800 rounded-b-lg">
              <h2 className="font-semibold mb-2">LUMINARIAS</h2>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label>TIPO DE LUMINARIA:</label>
                  <input
                    type="text"
                    name="tipoLuminaria"
                    value={formData.tipoLuminaria}
                    onChange={handleChange}
                    required
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div>
                  <label>POTENCIA (W):</label>
                  <input
                    type="number"
                    name="potencia"
                    value={formData.potencia}
                    onChange={handleChange}
                    required
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div>
                  <label>DISTRIBUCIÓN:</label>
                  <select
                    name="distribucion"
                    value={formData.distribucion}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                  >
                    <option value="LINEAL">LINEAL</option>
                    <option value="PUNTUAL">PUNTUAL</option>
                  </select>
                </div>
                <div>
                  <label>ILUMINACIÓN LOCALIZADA:</label>
                  <select
                    name="iluminacionLocalizada"
                    value={formData.iluminacionLocalizada}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                  >
                    <option value="SÍ">SÍ</option>
                    <option value="NO">NO</option>
                  </select>
                </div>
                {formData.iluminacionLocalizada === 'SÍ' && (
                  <div>
                    <label>CANTIDAD:</label>
                    <input
                      type="number"
                      name="cantidad"
                      value={formData.cantidad}
                      onChange={handleChange}
                      required
                      className="border p-2 rounded w-full"
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="border rounded-lg shadow-sm">
          <button type="button" className="bg-red-500 text-white w-full px-4 py-2 rounded-t-lg" onClick={() => toggleSection('percepcion')}>
            Percepción del Trabajo
          </button>
          {visibleSections.percepcion && (
            <div className="bg-gray-100 p-4 dark:bg-gray-800 rounded-b-lg">
              <h2 className="font-semibold mb-2">PERCEPCIÓN DEL TRABAJO</h2>
              <div className="grid grid-cols-1 gap-4">
                
              <div>
                  <label>¿SABES EL NOMBRE DEL TRABAJADOR?:</label>
                  <select
                    name="tieneNombreTrabajador"
                    value={formData.tieneNombreTrabajador}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                  >
                    <option value="NO">NO</option>
                    <option value="SÍ">SÍ</option>
                  </select>
                </div>
                {formData.tieneNombreTrabajador === 'SÍ' && (
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
                )}
                <div>
                  <label>DESCRIPCIÓN:</label>
                  <textarea
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                    required
                    className="border p-2 rounded w-full"
                  ></textarea>
                </div>
                <div>
                  <label>REPORTES:</label>
                  <textarea
                    name="reportes"
                    value={formData.reportes}
                    onChange={handleChange}
                    required
                    className="border p-2 rounded w-full"
                  ></textarea>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="border rounded-lg shadow-sm">
          <button type="button" className="bg-red-500 text-white w-full px-4 py-2 rounded-t-lg" onClick={() => toggleSection('puesto')}>
            Datos del Puesto
          </button>
          {visibleSections.puesto && (
            <div className="bg-gray-100 p-4 dark:bg-gray-800 rounded-b-lg">
              <h2 className="font-semibold mb-2">DATOS DEL PUESTO</h2>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label>PUESTO DEL TRABAJADOR:</label>
                  <input
                    type="text"
                    name="puestoTrabajador"
                    value={formData.puestoTrabajador}
                    onChange={handleChange}
                    required
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div>
                  <label>NÚMERO DE TRABAJADORES:</label>
                  <input
                    type="number"
                    name="numTrabajadores"
                    value={formData.numTrabajadores}
                    onChange={handleChange}
                    required
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div>
                  <label>DESCRIPCIÓN DE ACTIVIDADES:</label>
                  <textarea
                    name="descripcionActividades"
                    value={formData.descripcionActividades}
                    onChange={handleChange}
                    required
                    className="border p-2 rounded w-full"
                  ></textarea>
                </div>
                <div>
                  <label>TAREA VISUAL:</label>
                  <input
                    type="text"
                    name="tareaVisual"
                    value={formData.tareaVisual}
                    onChange={handleChange}
                    required
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div>
                  <label>NIVEL MÍNIMO DE ILUMINACIÓN (lux):</label>
                  <input
                    type="number"
                    name="nivelMinimoIluminacion"
                    value={formData.nivelMinimoIluminacion}
                    onChange={handleChange}
                    required
                    className="border p-2 rounded w-full"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
 {/* Otros botones de acción */}
<div className="flex justify-between mt-4">
  <button
    type="button"
    onClick={handleAddAnotherArea}
    className="bg-blue-500 text-white px-2 py-1 text-sm rounded">
    Agregar Área
  </button>
  <Link href="/mediciones">
  <button className="bg-orange-500 text-white px-4 py-2 rounded">Ir a Mediciones</button>
  </Link>
  <button
    type="submit"
    className="bg-green-500 text-white px-2 py-1 text-sm rounded">
    Guardar
  </button>
  <button
    type="button"
    onClick={handleSave}
    className="bg-purple-500 text-white px-2 py-1 text-sm rounded">
    Enviar
  </button>
</div>
      </form>
    </div>
  );
}
  