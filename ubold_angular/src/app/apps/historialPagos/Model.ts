
export class HistorialPago {
    
      pago_Id?: number;
      resi_Id?: number;
      resi_NombreCompleto?: string;
      meto_Id?: number;
      meto_Nombre?: string; 
      pago_Fecha?: string;
      pago_UsuCreacion?: number;
      usuCrea?: string;
      pago_FechaCreacion?: string;
      pago_UsuModificacion?: number;
      usuModif?: string;
      pago_FechaModificacion?: string;
    [key: string]: number | string | undefined;
}




export class Residente {
    expe_Id?: number;
    resi_Id?: number;
    resi_NombreCompleto?:string;
    tiposang_Id?: number;
    tiposang_Nombre?: string;
    expe_FechaApertura?: string;
    expe_Fotografia?: string;
    expe_UsuCreacion?: number;
    usua_UsuCreacion_Nombre?: string;
    expe_FechaCreacion?: string;
    expe_UsuModificacion?: number;
    usua_UsuModificacion_Nombre?: string;
    expe_FechaModificacion?: string;


    [key: string]: number | string | undefined ;
}


export interface PagosPost {
    pago_Id?: number;
    resi_Id?: number;
    resi_NombreCompleto?: string;
    meto_Id?: number;
    meto_Nombre?: string;
    pago_Fecha?: string;
    pago_UsuCreacion?: number;
    usuCrea?: string;
    pago_FechaCreacion?: string;
    pago_UsuModificacion?: number;
    usuModif?: string;
    pago_FechaModificacion?: string; 
    mes?: string;
    dia?: string;
    mesNombre?: string;
  }
  

export interface Pagos{
      id?: number;
      day?: string;
      pago_Id?: number;
      resi_Id?: number;
      resi_NombreCompleto?: string;
      meto_Id?: number;
      meto_Nombre?: string;
      pago_Fecha?: string;
      pago_UsuCreacion?: number;
      usuCrea?: string;
      pago_FechaCreacion?: string;
      pago_UsuModificacion?: number;
      usuModif?: string;
      pago_FechaModificacion?: string; 
      mes?: string;
      dia?: string;
      mesNombre?: string;
}