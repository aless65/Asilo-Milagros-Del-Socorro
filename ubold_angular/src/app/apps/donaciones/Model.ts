export class Donaciones{
dona_Id?: number;
dona_NombreDonante?: string;
dona_Fecha?: string;
dona_QueEs?: string;
esDescrip?: string;
dona_UsuCreacion?: number;
usua_UsuCreacion_Nombre?: string;
dona_FechaCreacion?: string;
dona_UsuModificacion?: number;
usua_UsuModificacion_Nombre?: string;
dona_FechaModificacion?: string;
cent_Id?: number[];
mes?: string;
dia?: string;
mesNombre?: string;
ayo?: string; 
}



export class DonacionesComunes{
    doco_Id?: number;
    doco_Nombre?: string;
    cado_Id?: number;
    cado_NombreCategoria?: string;
}

export class DonacionesDetalles{
      deto_Id?: number;
      dona_Id?: number;
      dona_NombreDonante?: string;
      doco_Id?: number;
      doco_Nombre?: string;
      deto_Cantidad?: number;
      deto_Descripcion?: string;

} 

export class Centro {
    cent_Id?: number;
    cent_Nombre?: string;

    [key: string]: number | string | undefined;
}
