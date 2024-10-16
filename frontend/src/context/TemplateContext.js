import { createContext, useReducer } from "react";

// Create a context for templates
export const TemplateContext = createContext();

// Define the reducer function for managing template state
export const templatesReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TEMPLATES':
      return {
        templates: action.payload
      };
    case 'CREATE_TEMPLATE':
      return {
        templates: [action.payload, ...state.templates]
      };
      case 'UPDATE_TEMPLATE':
        return {
          templates: state.templates.map((t) => 
            t._id === action.payload._id ? action.payload : t
          )
        };
      
    case 'DELETE_TEMPLATE':
      return {
        templates: state.templates.filter((t) => t._id !== action.payload._id)
      };
    default:
      return state;
  }
};

// Provide the TemplateContext to the component tree
export const TemplateContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(templatesReducer, {
    templates: []
  });

  return (
    <TemplateContext.Provider value={{ ...state, dispatch }}>
      {children}
    </TemplateContext.Provider>
  );
};
