"use client";
import { useEffect, useCallback, Suspense, lazy, useReducer } from 'react';
import Link from 'next/link';
import localforage from 'localforage';

const IdentificacionArea = lazy(() => import('../components/componentsPrincipal/IdentificacionArea'));
const DimensionesArea = lazy(() => import('../components/componentsPrincipal/DimensionesArea'));
const Luminaria = lazy(() => import('../components/componentsPrincipal/Luminaria'));
const PercepcionTrabajo = lazy(() => import('../components/componentsPrincipal/PercepcionTrabajo'));
const FormularioPuestos = lazy(() => import('../components/componentsPrincipal/FormularioPuestos'));
import ResumenAreas from '../components/componentsPrincipal/ResumenAreas';

const initialState = {
  areas: [],
  currentAreaIndex: 0,
  activeSection: null,
  successMessage: '',
  showSummary: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_AREAS':
      return { ...state, areas: action.payload };
    case 'ADD_AREA':
      return {
        ...state,
        areas: [...state.areas, getNewArea(state.areas.length + 1)],
        currentAreaIndex: state.areas.length,
        activeSection: null,
        successMessage: '',
      };
    case 'DELETE_AREA':
      return {
        ...state,
        areas: state.areas.filter((area) => area.idArea !== action.payload),
        currentAreaIndex: state.currentAreaIndex > 0 ? state.currentAreaIndex - 1 : 0,
        successMessage: 'Área eliminada con éxito',
      };
    case 'UPDATE_AREA':
      return {
        ...state,
        areas: state.areas.map((area, index) =>
          index === state.currentAreaIndex ? { ...area, ...action.payload } : area
        ),
      };
    case 'SET_SUCCESS_MESSAGE':
      return { ...state, successMessage: action.payload };
    case 'TOGGLE_SECTION':
      return { ...state, activeSection: state.activeSection === action.payload ? null : action.payload };
    case 'SET_SHOW_SUMMARY':
      return { ...state, showSummary: action.payload };
    case 'SET_CURRENT_AREA_INDEX':
      return { ...state, currentAreaIndex: action.payload };
    default:
      return state;
  }
}

const getNewArea = (id) => ({
  idArea: id,
  areaIluminada: '',
  numPuntosEvaluar: '',
  tipoIluminacion: 'ARTIFICIAL',
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
  puestos: [
    {
      id: 1,
      puestoTrabajador: '',
      numTrabajadores: '',
      descripcionActividades: '',
      nivelMinimoIluminacion: '',
      tareaVisual: '',
    },
  ],
  descripcionSuperficie: '',
  mediciones: [],
});

export default function Reconocimiento() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localforage.getItem('areas').then((savedAreas) => {
        if (savedAreas) {
          dispatch({ type: 'SET_AREAS', payload: savedAreas });
        } else {
          dispatch({ type: 'SET_AREAS', payload: [getNewArea(1)] });
        }
      });
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined' && state.areas.length > 0) {
        localforage.setItem('areas', state.areas).then(() => {
          console.log('Datos guardados en localforage:', state.areas);
        });
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [state.areas]);

  const validateForm = useCallback(() => {
    if (!state.areas[state.currentAreaIndex]) return false;
    const area = state.areas[state.currentAreaIndex];
    const requiredFields = [
      'areaIluminada',
      'numPuntosEvaluar',
      'tipoIluminacion',
      'descripcionSuperficie',
      'altura',
      'largo',
      'ancho',
      'tipoLuminaria',
      'potencia',
      'cantidad',
    ];

    for (let field of requiredFields) {
      if (!area[field] || area[field].toString().trim() === '') {
        dispatch({ type: 'SET_SUCCESS_MESSAGE', payload: `Por favor, completa el campo: ${field}` });
        return false;
      }
    }
    dispatch({ type: 'SET_SUCCESS_MESSAGE', payload: '' });
    return true;
  }, [state.areas, state.currentAreaIndex]);

  const calculateMinAreas = useCallback((indiceArea) => {
    if (indiceArea < 1) return 4;
    if (indiceArea < 2) return 9;
    if (indiceArea < 3) return 16;
    return 25;
  }, []);

  const calculateMaxAreas = useCallback((indiceArea) => {
    if (indiceArea < 1) return 6;
    if (indiceArea < 2) return 12;
    if (indiceArea < 3) return 20;
    return 30;
  }, []);

  const addArea = useCallback(() => {
    if (validateForm()) {
      dispatch({ type: 'ADD_AREA' });
    }
  }, [validateForm]);

  const deleteArea = useCallback((id) => {
    dispatch({ type: 'DELETE_AREA', payload: id });
  }, []);

  const toggleSection = useCallback((section) => {
    dispatch({ type: 'TOGGLE_SECTION', payload: section });
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    dispatch({
      type: 'UPDATE_AREA',
      payload: { [name]: value },
    });
  }, []);

  const handleAreaSelect = useCallback((selectedAreaId) => {
    dispatch({
      type: 'SET_CURRENT_AREA_INDEX',
      payload: state.areas.findIndex((area) => area.idArea === parseInt(selectedAreaId)),
    });
  }, [state.areas]);

  const handleSaveAll = useCallback(() => {
    if (validateForm()) {
      console.log('Datos guardados desde el botón principal:', state.areas);
      dispatch({ type: 'SET_SUCCESS_MESSAGE', payload: 'Guardado con éxito' });
    }
  }, [validateForm, state.areas]);

  const goToPreviousArea = useCallback(() => {
    if (state.currentAreaIndex > 0) {
      dispatch({ type: 'SET_CURRENT_AREA_INDEX', payload: state.currentAreaIndex - 1 });
    }
  }, [state.currentAreaIndex]);

  const goToNextArea = useCallback(() => {
    if (state.currentAreaIndex < state.areas.length - 1) {
      dispatch({ type: 'SET_CURRENT_AREA_INDEX', payload: state.currentAreaIndex + 1 });
    }
  }, [state.currentAreaIndex, state.areas.length]);

  const handleShowSummary = useCallback(() => {
    dispatch({ type: 'SET_SHOW_SUMMARY', payload: true });
  }, []);

  const clearLocalStorage = useCallback(() => {
    if (typeof window !== 'undefined') {
      localforage.removeItem('areas').then(() => {
        dispatch({ type: 'SET_AREAS', payload: [getNewArea(1)] });
        dispatch({ type: 'SET_CURRENT_AREA_INDEX', payload: 0 });
        console.log('Local storage limpiado');
      });
    }
  }, []);

  const calculateIndiceArea = (altura, largo, ancho) => {
    const alturaParsed = parseFloat(altura) || 0;
    const largoParsed = parseFloat(largo) || 0;
    const anchoParsed = parseFloat(ancho) || 0;

    if (alturaParsed > 0 && largoParsed + anchoParsed > 0) {
      return (largoParsed * anchoParsed) / (alturaParsed * (largoParsed + anchoParsed));
    }
    return 0;
  };

  useEffect(() => {
    if (state.areas[state.currentAreaIndex]) {
      const { altura, largo, ancho, indiceArea: prevIndiceArea } =
        state.areas[state.currentAreaIndex];
      const newIndiceArea = calculateIndiceArea(altura, largo, ancho);

      if (newIndiceArea !== prevIndiceArea) {
        dispatch({
          type: 'UPDATE_AREA',
          payload: { indiceArea: newIndiceArea },
        });
      }
    }
  }, [
    state.areas[state.currentAreaIndex]?.altura,
    state.areas[state.currentAreaIndex]?.largo,
    state.areas[state.currentAreaIndex]?.ancho,
  ]);

  return (
    <div className="container mx-auto p-4 bg-white dark:bg-gray-900 max-w-3xl rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-black dark:text-white text-center">RECONOCIMIENTO</h1>
      {state.successMessage && (
        <div className={`p-2 rounded mb-4 text-center mx-auto w-3/4 ${state.successMessage.includes('éxito') ? 'bg-green-500' : 'bg-red-500'} text-white`}>
          {state.successMessage}
        </div>
      )}
      {!state.showSummary ? (
        <form className="space-y-4">
          {state.areas.length > 0 && state.currentAreaIndex < state.areas.length && (
            <>
              <h2 className="text-xl font-bold mb-4 text-black dark:text-white text-center">Área {state.areas[state.currentAreaIndex].idArea}</h2>
              <div className="space-y-2">
                <Suspense fallback={<div>Cargando componentes, por favor espere...</div>}>
                  <IdentificacionArea
                    formData={state.areas[state.currentAreaIndex]}
                    handleChange={handleChange}
                    visible={state.activeSection === 'identificacion'}
                    toggleSection={() => toggleSection('identificacion')}
                  />
                  <DimensionesArea
                    formData={state.areas[state.currentAreaIndex]}
                    handleChange={handleChange}
                    visible={state.activeSection === 'dimensiones'}
                    toggleSection={() => toggleSection('dimensiones')}
                    calculateMinAreas={calculateMinAreas}
                    calculateMaxAreas={calculateMaxAreas}
                  />
                  <Luminaria
                    formData={state.areas[state.currentAreaIndex]}
                    handleChange={handleChange}
                    visible={state.activeSection === 'luminarias'}
                    toggleSection={() => toggleSection('luminarias')}
                  />
                  <PercepcionTrabajo
                    formData={state.areas[state.currentAreaIndex]}
                    handleChange={handleChange}
                    visible={state.activeSection === 'percepcion'}
                    toggleSection={() => toggleSection('percepcion')}
                  />
                </Suspense>
                <button
                  type="button"
                  className="bg-red-500 text-white w-full px-4 py-2 rounded-lg"
                  onClick={() => toggleSection('puestoGeneral')}
                >
                  Datos del Puesto
                </button>
                {state.activeSection === 'puestoGeneral' && (
                  <Suspense fallback={<div>Cargando datos del puesto...</div>}>
                    <FormularioPuestos
                      puestos={state.areas[state.currentAreaIndex].puestos}
                      handleSavePuestos={(updatedPuestos) => {
                        dispatch({
                          type: 'UPDATE_AREA',
                          payload: { puestos: updatedPuestos },
                        });
                        console.log('Datos de puestos guardados:', updatedPuestos);
                      }}
                    />
                  </Suspense>
                )}
              </div>
            </>
          )}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            <button
              type="button"
              onClick={handleSaveAll}
              className="bg-blue-500 text-white px-4 py-2 rounded sm:w-auto"
            >
              Guardar Todos los Datos
            </button>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            <button
              type="button"
              onClick={goToPreviousArea}
              className="bg-gray-500 text-white px-4 py-2 rounded sm:w-auto"
              disabled={state.currentAreaIndex === 0}
            >
              Área Anterior
            </button>
            <button
              type="button"
              onClick={goToNextArea}
              className="bg-gray-500 text-white px-4 py-2 rounded sm:w-auto"
              disabled={state.currentAreaIndex === state.areas.length - 1}
            >
              Siguiente Área
            </button>
            <button
              type="button"
              onClick={addArea}
              className="bg-green-500 text-white px-4 py-2 rounded sm:w-auto"
            >
              Agregar Nueva Área
            </button>
            <button
              type="button"
              onClick={() => deleteArea(state.areas[state.currentAreaIndex].idArea)}
              className="bg-red-500 text-white px-4 py-2 rounded sm:w-auto"
              disabled={state.areas.length === 1}
            >
              Eliminar Área
            </button>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            <Link
              href={{
                pathname: '/mediciones',
                query: { areaIluminada: state.areas[state.currentAreaIndex]?.areaIluminada || '' },
              }}
            >
              <button className="bg-orange-500 text-white px-4 py-2 rounded sm:w-auto">Ir a Mediciones</button>
            </Link>
            <button
              type="button"
              onClick={handleShowSummary}
              className="bg-purple-500 text-white px-4 py-2 rounded sm:w-auto"
            >
              Mostrar Resumen
            </button>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            <button
              type="button"
              onClick={clearLocalStorage}
              className="bg-red-500 text-white px-4 py-2 rounded sm:w-auto"
            >
              Limpiar Datos Guardados
            </button>
          </div>
        </form>
      ) : (
        <ResumenAreas areas={state.areas} setShowSummary={(value) => dispatch({ type: 'SET_SHOW_SUMMARY', payload: value })} />
      )}
    </div>
  );
}
