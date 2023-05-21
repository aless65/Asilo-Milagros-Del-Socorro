
export interface Enfermedad {
    enfe_Id?: number;
    enfe_Nombre?: string;
    enfe_UsuCreacion?: number;
    usua_UsuCreacion_Nombre?: string;
    enfe_UsuModificacion?: number;
    usua_UsuModificacion_Nombre?: string;
    enfe_FechaCreacion?: string;
    enfe_FechaModificacion?: string;

    [key: string]: number | string | undefined;
}