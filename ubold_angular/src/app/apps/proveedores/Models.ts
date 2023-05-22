
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