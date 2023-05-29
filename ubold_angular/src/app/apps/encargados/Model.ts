import { dateSelectionJoinTransformer } from "@fullcalendar/core";

export class Encargado {
    
    enca_Id?: number;
    nombreCompleto?: string;
    enca_Nombres?: string;
    enca_Apellidos?: string;
    enca_Identidad?: string;
    estacivi_Id?: number;
    estacivi_Nombre?: string;
    enca_Nacimiento?: string;
    enca_Sexo?: string;
    enca_SexoDesc?: string;
    muni_Id?: string;
    muni_Nombre?: string;
    enca_Direccion?: string;
    enca_Telefono?: string;
    resi_Id?: number;
    resi_Nombres?: string;
    resi_Apellidos?: string;
    pare_Id?: number;
    pare_Nombre?: string;
    enca_UsuCreacion?: number;
    usua_UsuCreacion_Nombre?: string;
    enca_FechaCreacion?: string;
    enca_UsuModificacion?: number;
    enca_FechaModificacion?: string;
    usua_UsuModificacion_Nombre?: string;
	
    [key: string]: number | string | undefined;
}

			
