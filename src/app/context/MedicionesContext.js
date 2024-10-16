import { createContext, useReducer, useContext } from 'react';

const initialState = {
  areas: [],
  formData: {
    tipoIluminacion: 'ARTIFICIAL',
    cci: 'SÍ',
    area: '',
    departamento: '',
    mediciones: [],
  },
  visibleSections: {
    iluminacion: false,
    areaIluminada: false,
    medicion: true,
  },
  currentMedicionIndex: 0,
  showSummary: false,
  selectedAreaId: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_AREAS':
      return { ...state, areas: action.payload };
    case 'SET_FORM_DATA':
      return { ...state, formData: { ...state.formData, ...action.payload } };
    case 'TOGGLE_SECTION':
      return {
        ...state,
        visibleSections: {
          ...state.visibleSections,
          [action.payload]: !state.visibleSections[action.payload],
        },
      };
    case 'SET_SHOW_SUMMARY':
      return { ...state, showSummary: action.payload };
    case 'SET_CURRENT_MEDICION_INDEX':
      return { ...state, currentMedicionIndex: action.payload };
    case 'SET_SELECTED_AREA_ID':
      return { ...state, selectedAreaId: action.payload };
    default:
      return state;
  }
}

const MedicionesContext = createContext();

export function MedicionesProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <MedicionesContext.Provider value={{ state, dispatch }}>
      {children}
    </MedicionesContext.Provider>
  );
}

export function useMediciones() {
  return useContext(MedicionesContext);
}
