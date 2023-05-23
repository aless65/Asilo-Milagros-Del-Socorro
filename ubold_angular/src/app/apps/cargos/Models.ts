
export interface Cargo {
    carg_Id?: number;
    carg_Nombre?: string; 
    carg_UsuCreacion?: number;
    usua_UsuCreacion_Nombre?: string;
    carg_FechaCreacion?: string;
    carg_UsuModificacion?: number;
    usua_UsuModificacion_Nombre?: string;
    carg_FechaModificacion?: string;
    carg_Estado?: number;
    
    

    [key: string]: number | string | undefined;
}