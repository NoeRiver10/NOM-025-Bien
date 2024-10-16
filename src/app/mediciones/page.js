"use client";
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import IdAreaMediciones from '../components/componentsMediciones/idareaMediciones';
import IluminacionMediciones from '../components/componentsMediciones/IluminacionMediciones';
import MedicionItem from '../components/componentsMediciones/MedicionItem';
import ResumenMediciones from '../components/componentsMediciones/ResumenMediciones';

export default function Mediciones() {
  const searchParams = useSearchParams();
  const [areas, setAreas] = useState([]);
  const [formData, setFormData] = useState({
    tipoIluminacion: 'ARTIFICIAL',
    cci: 'SÍ',
    area: '',
    departamento: '',
    mediciones: [],
  });

  const [visibleSections, setVisibleSections] = useState({
    iluminacion: false,
    areaIluminada: false,
    medicion: true,
  });

  const [currentMedicionIndex, setCurrentMedicionIndex] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [selectedAreaId, setSelectedAreaId] = useState('');

  useEffect(() => {
    const areaIluminada = searchParams.get('areaIluminada') || '';
    if (areaIluminada) {
      setFormData((prev) => ({ ...prev, area: areaIluminada }));
    }

    if (typeof window !== 'undefined') {
      const savedAreas = window.localStorage.getItem('areas');
      if (savedAreas) {
        setAreas(JSON.parse(savedAreas));
      }
    }
  }, [searchParams]);

  const toggleSection = (section) => {
    setVisibleSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAreaSelect = (selectedAreaId) => {
    const selectedArea = areas.find((area) => area.idArea === parseInt(selectedAreaId));
    if (selectedArea) {
      setFormData((prev) => ({
        ...prev,
        area: selectedArea.areaIluminada,
        departamento: selectedArea.departamento || '',
        tipoIluminacion: selectedArea.tipoIluminacion || 'ARTIFICIAL',
        cci: selectedArea.cci || 'SÍ',
        mediciones: selectedArea.mediciones || [],
      }));
    }
  };

  const handleMedicionChange = (updatedMediciones) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      mediciones: updatedMediciones,
    }));
  };

  const handleSaveMediciones = () => {
    const updatedAreas = areas.map((area) => {
      if (area.areaIluminada === formData.area) {
        return {
          ...area,
          mediciones: formData.mediciones,
          departamento: formData.departamento,
        };
      }
      return area;
    });

    setAreas(updatedAreas);
    if (typeof window !== 'undefined') {
      localStorage.setItem('areas', JSON.stringify(updatedAreas));
    }
    setShowSummary(true);
  };

  const handleSaveAndUpdateSummary = () => {
    handleSaveMediciones();
    setShowSummary(false);
    setTimeout(() => {
      setShowSummary(true);
    }, 0);
  };

  const handleSummaryAreaSelect = (e) => {
    setSelectedAreaId(e.target.value);
  };

  return (
    <div className="container mx-auto p-4 bg-white dark:bg-gray-900 max-w-3xl rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-black dark:text-white text-center">MEDICIONES</h1>
      {!showSummary ? (
        <form className="space-y-4">
          <IluminacionMediciones
            formData={formData}
            handleChange={handleChange}
            toggleSection={toggleSection}
            visibleSections={visibleSections}
            areas={areas}
            handleAreaSelect={handleAreaSelect}
          />

          <IdAreaMediciones
            formData={formData}
            handleChange={handleChange}
            toggleSection={toggleSection}
            visibleSections={visibleSections}
          />

          {formData.mediciones.length > 0 ? (
            <MedicionItem
              key={currentMedicionIndex}
              index={currentMedicionIndex}
              formData={formData}
              handleMedicionChange={handleMedicionChange}
            />
          ) : (
            <div className="text-center">
              <p className="text-gray-500 mb-4">No hay puntos de medición. Por favor, agrega un nuevo punto.</p>
              <button
                type="button"
                onClick={() => {
                  handleMedicionChange([...formData.mediciones, {}]);
                  setCurrentMedicionIndex(formData.mediciones.length);
                }}
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
              >
                Agregar Primer Punto
              </button>
            </div>
          )}

          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={handleSaveAndUpdateSummary}
              className="bg-purple-500 text-white px-4 py-2 rounded-lg"
            >
              Ver Resumen
            </button>
          </div>
        </form>
      ) : (
        <ResumenMediciones
          areas={areas}
          selectedAreaId={selectedAreaId}
          handleSummaryAreaSelect={handleSummaryAreaSelect}
          setShowSummary={setShowSummary}
        />
      )}
    </div>
  );
}
