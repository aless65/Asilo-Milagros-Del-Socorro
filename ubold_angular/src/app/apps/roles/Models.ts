
export interface Rol {
    usua_Id?: number;
    usua_NombreUsuario?: string; 
    usua_Contrasena?: string;
    usua_EsAdmin?: string;
    role_Id?: number;
    role_Nombre?: string;
    empe_NombreCompleto?: string;
    usua_UsuCreacion?: number;
    usua_UsuCreacion_Nombre?: string;
    usua_UsuModificacion?: number;
    cent_Id?: number;
    usua_UsuModificacion_Nombre?: string;

    [key: string]: number | string | undefined;
}