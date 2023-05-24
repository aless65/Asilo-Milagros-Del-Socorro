
export interface EstadoCivil {
    estacivi_Id?: number;
    estacivi_Nombre?: string;

    [key: string]: number | string | undefined ;
}


export interface Residente {
    resi_Id?: number;
    resi_Nombres?: string;
    resi_Apellidos?: string;
    resi_Identidad?: string;
    tiposang_Id?: number;
    tiposang_Nombre?: string;
    estacivi_Id?: number;
    resi_Sexo?: string;
    cent_Id?: number;
    cent_Nombre?: string;
    sexoDes?: string;
    diet_Id?: number;
    resi_FechaIngreso?: string;
    empe_Id?: number;
    agen_Id?: number;
    resi_Nacimiento?: string;
    expe_Fotografia?: string;
    expe_FechaApertura: string;
    resi_UsuCreacion?: number;
    usuCrea?: string;
    resi_UsuModificacion?: number;
    usuModif?: string;
    resi_FechaCreacion?: string;
    resi_FechaModificacion?: string;

    [key: string]: number | string | undefined ;
}


export interface Proveedor {
    prov_Id?: number;
    prov_Nombre?: string;
    prov_CorreoElectronico?: string;
    prov_Telefono?: string;
    muni_Id?: string;
    muni_Nombre?: string;
    prov_Direccion?: string;
    prov_UsuCreacion?: number;
    prov_UsuCreacion_Nombre?: string;
    prov_UsuModificacion?: number;
    prov_UsuModificacion_Nombre?: string;
    prov_FechaCreacion?: string;
    prov_FechaModificacion?: string;

    [key: string]: number | string | undefined;
}


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

export interface TipoSangre {
    tiposang_Id?: number;
    tiposang_Nombre?: string;
    tiposang_UsuCreacion?: number;
    usua_UsuCreacion_Nombre?: string;
    tiposang_UsuModificacion?: number;
    usua_UsuModificacion_Nombre?: string;
    tiposang_FechaCreacion?: string;
    tiposang_FechaModificacion?: string;

    [key: string]: number | string | undefined;
}

export interface Municipio {
    muni_Id?: string;
    muni_Nombre?: string;
    depa_Id?: string;
    depa_Nombre?: string;

    [key: string]: number | string | undefined;
}

export interface Parentesco {
    pare_Id?: number;
    pare_Nombre?: string;

    [key: string]: number | string | undefined;
}