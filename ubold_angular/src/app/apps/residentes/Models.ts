
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