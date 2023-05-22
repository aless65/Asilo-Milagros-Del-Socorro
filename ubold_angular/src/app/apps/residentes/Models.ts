
export interface Residente {
    resi_Id?: number;
    resi_Nombres?: string;
    resi_Apellidos?: string;
    resi_Identidad?: string;
    estacivi_Id?: number;
    resi_Sexo?: string;
    sexoDes?: string;
    diet_Id?: number;
    resi_FechaIngreso?: string;
    empe_Id?: number;
    agen_Id?: number;
    resi_Nacimiento?: string;
    expe_Fotografia?: string;
    resi_UsuCreacion?: number;
    usuCrea?: string;
    resi_UsuModificacion?: number;
    usuModif?: string;
    resi_FechaCreacion?: string;
    resi_FechaModificacion?: string;

    [key: string]: number | string | undefined ;
}