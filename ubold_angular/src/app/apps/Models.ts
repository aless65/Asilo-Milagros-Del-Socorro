
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
    expe_FechaApertura?: string;
    resi_UsuCreacion?: number;
    usuCrea?: string;
    resi_UsuModificacion?: number;
    usuModif?: string;
    resi_FechaCreacion?: string;
    resi_FechaModificacion?: string;
    habi_Id?: number;

    [key: string]: number | string | undefined | number[];
}

export interface Encargado {
    enca_Id?: number;
    enca_Nombres?: string;
    enca_Apellidos?: string;
    enca_Identidad?: string;
    estacivi_Id?: number;
    enca_Nacimiento?: string;
    enca_Sexo?: string;
    muni_Id?: number;
    enca_Direccion?: string;
    enca_Telefono?: string;
    resi_Id?: number;
    pare_Id?: number;
    enca_UsuCreacion?: number;
    usuCrea?: string;
    enca_UsuModificacion?: number;
    usuModif?: string;
    enca_FechaModificacion?: string;

    [key: string]: number | string | undefined ;
}

export interface Expediente {
    expe_Id?: number;
    resi_Id?: number;
    tiposang_Id?: number;
    expe_FechaApertura?: string;
    expe_Fotografia?: string;
    expe_Enfermedades?: number[];
    expe_UsuCreacion?: number;
    expe_UsuCreacion_Nombre?: string;
    expe_UsuModificacion?: number;
    expe_UsuModificacion_Nombre?: string;
    expe_FechaCreacion?: string;
    expe_FechaModificacion?: string;

    [key: string]: number | string | undefined | number[];
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

export interface Cargos{
    carg_Id?: number;
    carg_Nombre?: string;
    carg_UsuCreacion?: number;
    usua_UsuCreacion_Nombre?: string;
    carg_FechaCreacion?: string;
    carg_UsuModificacion?: number;
    usua_UsuModificacion_Nombre?: string;
    carg_FechaModificacion?: string;
}

export interface Centros{
    cent_Id?:number;
    cent_Nombre?: string;
    muni_Id?: string;
    muni_Nombre?: string;
    depa_Id?: string,
    depa_Nombre?: string; 
    cent_Direccion?: string; 
    cent_UsuCreacion?: number;
    cent_FechaCreacion?: string;
    usua_UsuCreacion_Nombre?: string;
    cent_UsuModificacion?: number;
    usua_UsuModificacion_Nombre?: string;
    cent_FechaModificacion?: string;

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

export interface Centro {
    cent_Id?: number;
    cent_Nombre?: string;

    [key: string]: number | string | undefined;
}

export interface AgendaDetalle {
    agendeta_Id?: number;
    agendeta_HoraStart?: string;
    agendeta_HoraEnd?: string;
    acti_Id?: number;
    acti_Nombre?: string;
    acti_Class?: string;
    medi_Id?: number;
    medi_Nombre?: string;
    agendeta_Observaciones?: string;
    agendeta_UsuCreacion?: number;
    agendeta_UsuModificacion?: number;

    [key: string]: number | string | undefined;
}

export interface Actividad {
    acti_Id?: number;
    acti_Nombre?: string;
    acti_Class?: string;

    [key: string]: number | string | undefined;
}

export interface Medicamento {
    medi_Id?: number;
    medi_Nombre?: string;

    [key: string]: number | string | undefined;
}

export interface Habitacion {
    habi_Id?: number;
    habi_Numero?: number;
    cate_Id?: number;
    habi_UsuCreacion?: number;
    usua_UsuCreacion_Nombre?: string;
    habi_FechaCreacion?: string;
    habi_UsuModificacion?: number;
    usua_UsuModificacion_Nombre?: string;
    habi_FechaModificacion?: string;

    [key: string]: number | string | undefined;
}

export interface MetodoPago {
    meto_Id?: number;
    meto_Nombre?: string;

    [key: string]: number | string | undefined;
}