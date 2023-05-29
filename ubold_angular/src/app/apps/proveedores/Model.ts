import { dateSelectionJoinTransformer } from "@fullcalendar/core";

export class Proveedor {
    prov_Id?: number;
    prov_Nombre?:string;
    prov_CorreoElectronico?:string;
    prov_Telefono?: string;
    muni_Id?: string;
    muni_Nombre?: string;
    depa_Nombre?: string;
    depa_Id?: string;
    prov_Direccion?: string;
    prov_UsuCreacion?: number;
    prov_FechaCreacion?: string;
    usua_UsuCreacion_Nombre?: string;
    prov_UsuModificacion?: number;
    usua_UsuModificacion_Nombre?: string;
    prov_FechaModificacion?: string;
    prov_Estado?: string;
	
    [key: string]: number | string | undefined;
}

			
