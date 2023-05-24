
export interface Centro {
    cent_Id?: number;
    cent_Nombre?: string; 
    muni_Id?: string;
    muni_Nombre?: string;
    depa_Id?: string;
    depa_Nombre?:string;
    cent_Direccion?: string;
    cent_UsuCreacion?: number;
    usua_UsuCreacion_Nombre?: string;
    cent_UsuModificacion?: number;
    usua_UsuModificacion_Nombre?: string;
    cent_FechaModificacion?: string;
    cent_FechaCreacion?: string;
    


    [key: string]: number | string | undefined;
}

export interface Municipio {
    muni_Id?: string;
    muni_Nombre?: string;
    depa_Id?: string;
    depa_Nombre?: string;

    [key: string]: number | string | undefined;
}