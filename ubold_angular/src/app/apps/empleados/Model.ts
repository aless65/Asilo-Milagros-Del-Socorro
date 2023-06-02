import { dateSelectionJoinTransformer } from "@fullcalendar/core";

export class Empleados {
    empe_Id?: number;
    empe_Nombres?: string;
    empe_Apellidos?: string;			
    empe_NombreCompleto?: string;	
    empe_Identidad?: string;			
    empe_Sexo?: string;				
    sexoDes?: string;				
    estacivi_Id	?: number;		
    estacivi_Nombre	?: string;	
    empe_Nacimiento?: string;	
    muni_Id	?: string;				
    muni_Nombre	?: string;			
    depa_Id		?: string;
    depa_Nombre?: string;			
    empe_Direccion	?: string;			
    empe_Telefono	?: string;			
    empe_Correo		?: string;		
    carg_Id	?: number;			
    carg_Nombre		?: string;		
    cent_Id	?: number;			
    cent_Nombre	?: string;			
    empe_UsuCreacion 	?: number;			
    usuarioCrea			?: string;		
    empe_FechaCreacion			?: string;	
    empe_UsuModificacion	?: number;	
    usuarioModif		?: string;			
    empe_FechaModificacion		?: string;	

	mes?: string;
    dia?: string;
    mesNombre?: string;
    ayo?: string;

    [key: string]: number | string | undefined;
}

export interface Empleados2 {
    empe_Id?: number;
    empe_Nombres?: string;
    empe_Apellidos?: string;			
    empe_NombreCompleto?: string;	
    empe_Identidad?: string;			
    empe_Sexo?: string;				
    sexoDes?: string;				
    estacivi_Id	?: number;		
    estacivi_Nombre	?: string;	
    empe_Nacimiento?: string;	
    muni_Id	?: string;				
    muni_Nombre	?: string;			
    depa_Id		?: string;			
    empe_Direccion	?: string;			
    empe_Telefono	?: string;			
    empe_Correo		?: string;		
    carg_Id	?: number;			
    carg_Nombre		?: string;		
    cent_Id	?: number;			
    cent_Nombre	?: string;			
    empe_UsuCreacion 	?: number;			
    usuarioCrea			?: string;		
    empe_FechaCreacion			?: string;	
    empe_UsuModificacion	?: number;	
    usuarioModif		?: string;			
    empe_FechaModificacion		?: string;	
	
    [key: string]: number | string | undefined;
}

			
