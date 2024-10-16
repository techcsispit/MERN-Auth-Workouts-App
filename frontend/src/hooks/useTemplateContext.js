import { useContext } from "react";
import { TemplateContext } from "../context/TemplateContext";

export const useTemplatessContext= () => {
    const context = useContext(TemplateContext)
    if(!context){
        throw Error('useTemplatessContext must be used inside a TemplatesContextProvider')
    }
    return context
}