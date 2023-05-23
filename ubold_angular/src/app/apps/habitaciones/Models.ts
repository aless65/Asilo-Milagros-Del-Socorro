
export interface Habitacion {
    habi_Id?: number;
    habi_Numero?: number; 
    cate_Id?: number;
    cate_Nombre?: string;
    cent_Id?: number;
    cent_Nombre?: string;
    habi_UsuCreacion?: number;
    usuCrea?: string;
    habi_UsuModificacion?: number;
    usuModif?: string;
    

    [key: string]: number | string | undefined;
}