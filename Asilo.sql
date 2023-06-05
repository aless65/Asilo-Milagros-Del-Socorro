CREATE DATABASE AsiloJAC

GO
USE AsiloJAC
GO

CREATE SCHEMA gral
GO
CREATE SCHEMA asil
GO
CREATE SCHEMA acce
GO

--************CREACION TABLA ROLES******************--
CREATE TABLE acce.tbRoles(
	role_Id					INT IDENTITY,
	role_Nombre				NVARCHAR(100) NOT NULL,
	role_UsuCreacion		INT NOT NULL,
	role_FechaCreacion		DATETIME NOT NULL CONSTRAINT DF_role_FechaCreacion DEFAULT(GETDATE()),
	role_UsuModificacion	INT,
	role_FechaModificacion	DATETIME,
	role_Estado				BIT NOT NULL CONSTRAINT DF_role_Estado DEFAULT(1)
	CONSTRAINT PK_acce_tbRoles_role_Id PRIMARY KEY(role_Id)
);
GO

--***********CREACION TABLA PANTALLAS*****************---
CREATE TABLE acce.tbPantallas(
	pant_Id					INT IDENTITY,
	pant_key                NVARCHAR(100),
	pant_Nombre				NVARCHAR(100),
	pant_Url				NVARCHAR(300),
	pant_Menu				NVARCHAR(300),
	pant_Icon				NVARCHAR(80),
	pant_isTitle            Bit,
	collapsed               bit,
    badgeVariant            NVARCHAR(255),
    badgeText               NVARCHAR(255),
    parentKey               NVARCHAR(255),
	pant_UsuCreacion		INT,
	pant_FechaCreacion		DATETIME NOT NULL CONSTRAINT DF_pant_FechaCreacion DEFAULT(GETDATE()),
	pant_UsuModificacion	INT,
	pant_FechaModificacion	DATETIME,
	pant_Estado				BIT NOT NULL CONSTRAINT DF_pant_Estado DEFAULT(1)
	CONSTRAINT PK_acce_tbPantallas_pant_Id PRIMARY KEY(pant_Id)
);
GO

INSERT INTO acce.tbPantallas(pant_key,pant_Nombre,pant_isTitle, pant_Url, pant_Menu, pant_Icon, pant_UsuCreacion)
VALUES	('inicio', 'Inicio', 1,NULL,NULL,NULL, 1),
        ('ds-dashboard-1', 'Dashboard', 0,'/dashboard-1','Inicio','home', 1),
		('acceso', 'Acceso', 1,NULL,NULL,NULL, 1),
        ('apps-usuarios', 'Usuarios', 0,'/apps/usuarios/list','Acceso','user', 1),
	    ('apps-roles', 'Roles', 0,'/apps/roles/list','Acceso','airplay', 1),
		('asilo', 'Asilo', 1,NULL,NULL,NULL, 1),
		('apps-residentes', 'Residentes', 0,'/apps/residentes/list','Asilo','users', 1),
		('apps-agendas', 'Agendas', 0,'/apps/agendas/list','Asilo','calendar', 1),
		('apps-historialPagos', 'Historial de Pagos', 0,'/apps/histoarialPagos/list','Asilo','credit-card', 1),
		('apps-enfermedades', 'Enfermedades', 0,'/apps/enfermedades/list','Asilo','activity', 1),
		('apps-medicamentos', 'Medicamentos', 0,'/apps/medicamentos/list','Asilo','package', 1),
		('apps-centros', 'Centros', 0,'/apps/centros/list','Asilo','trello', 1),
		('apps-cargos', 'Cargos', 0,'/apps/cargos/list','Asilo','shield', 1),
		('apps-habitaciones', 'Habitaciones', 0,'/apps/habitaciones/list','Asilo','briefcase', 1),
		('apps-empleados', 'Empleados', 0,'/apps/empleados/list','Asilo','users', 1),
		('apps-encargados', 'Encargados', 0,'/apps/encargados/list','Asilo','user-check', 1),
		('apps-proveedores', 'Proveedores', 0,'/apps/proveedores/list','Asilo','truck', 1),
		('apps-donaciones', 'Donaciones', 0,'/apps/donaciones/list','Asilo','user-check', 1);
GO



--INSERT INTO acce.tbPantallas (pant_key, pant_Nombre, pant_isTitle,pant_Url,pant_Menu, pant_Icon,pant_UsuCreacion, collapsed, badgeVariant, badgeText, parentKey)

--VALUES ('dashboards', 'Dashboards', 1,'/dashboard-1',Null, 'airplay', 1,1, 'success', '4', NULL);

--INSERT INTO acce.tbPantallas (pant_key, pant_Nombre, pant_isTitle, pant_Url,pant_Menu, pant_Icon,pant_UsuCreacion, collapsed, badgeVariant, badgeText, parentKey)
--VALUES ('ds-dashboard-1', 'Dashboard 1', 1, '/dashboard-1', NULL, NULL,1,0, NULL, NULL, 'dashboards');




--***********CREACION TABLA ROLES/PANTALLA*****************---
CREATE TABLE acce.tbPantallasPorRoles(
	pantrole_Id					INT IDENTITY,
	role_Id						INT NOT NULL,
	pant_Id						INT NOT NULL,

	pantrole_UsuCreacion		INT NOT NULL,
	pantrole_FechaCreacion		DATETIME NOT NULL CONSTRAINT DF_pantrole_FechaCreacion DEFAULT(GETDATE()),
	pantrole_UsuModificacion	INT,
	pantrole_FechaModificacion	DATETIME,
	pantrole_Estado				BIT NOT NULL CONSTRAINT DF_pantrole_Estado DEFAULT(1)
	CONSTRAINT FK_acce_tbPantallasPorRoles_acce_tbRoles_role_Id FOREIGN KEY(role_Id) REFERENCES acce.tbRoles(role_Id),
	CONSTRAINT FK_acce_tbPantallasPorRoles_acce_tbPantallas_pant_Id FOREIGN KEY(pant_Id)	REFERENCES acce.tbPantallas(pant_Id),
	CONSTRAINT PK_acce_tbPantallasPorRoles_pantrole_Id PRIMARY KEY(pantrole_Id),
);
GO

--****************CREACION TABLA USUARIOS****************--
CREATE TABLE acce.tbUsuarios(
	usua_Id 				INT IDENTITY(1,1),
	usua_NombreUsuario		NVARCHAR(100) NOT NULL UNIQUE,
	usua_Contrasena			NVARCHAR(MAX) NOT NULL,
	usua_EsAdmin			BIT,
	role_Id					INT,
	empe_Id					INT,
	usua_UsuCreacion		INT,
	usua_FechaCreacion		DATETIME NOT NULL CONSTRAINT DF_usua_FechaCreacion DEFAULT(GETDATE()),
	usua_UsuModificacion	INT,
	usua_FechaModificacion	DATETIME,
	usua_Estado				BIT NOT NULL CONSTRAINT DF_usua_Estado DEFAULT(1)
	CONSTRAINT PK_acce_tbUsuarios_usua_Id  PRIMARY KEY(usua_Id)
);
GO

--********* PROCEDIMIENTO INSERTAR USUARIOS ADMIN**************--
CREATE OR ALTER PROCEDURE acce.UDP_InsertUsuario
	@usua_NombreUsuario NVARCHAR(100),	@usua_Contrasena NVARCHAR(200),
	@usua_EsAdmin BIT,					@role_Id INT, 
	@empe_Id INT										
AS
BEGIN
	DECLARE @password NVARCHAR(MAX)=(SELECT HASHBYTES('Sha2_512', @usua_Contrasena));

	INSERT acce.tbUsuarios(usua_NombreUsuario, usua_Contrasena, usua_EsAdmin, role_Id, empe_Id, usua_UsuCreacion)
	VALUES(@usua_NombreUsuario, @password, @usua_EsAdmin, @role_Id, @empe_Id, 1);
END
GO

EXEC acce.UDP_InsertUsuario 'admin', '123', 1, 1, 1;
GO

--********* ALTERAR TABLA ROLES **************--
--********* AGREGAR CAMPOS AUDITORIA**************--

ALTER TABLE acce.tbRoles
ADD CONSTRAINT FK_acce_tbRoles_acce_tbUsuarios_role_UsuCreacion_usua_Id 	FOREIGN KEY(role_UsuCreacion) REFERENCES acce.tbUsuarios(usua_Id),
	CONSTRAINT FK_acce_tbRoles_acce_tbUsuarios_role_UsuModificacion_usua_Id 	FOREIGN KEY(role_UsuModificacion) REFERENCES acce.tbUsuarios(usua_Id);
GO

INSERT INTO acce.tbRoles(role_Nombre, role_UsuCreacion)
VALUES ('Administración', 1),
	   ('Recepción', 1),
	   ('Medicina', 1)
GO

--********* ALTERAR TABLA USUARIOS **************--
--********* AGREGAR CAMPO ROL, AUDITORIA**************--

ALTER TABLE acce.tbUsuarios
ADD CONSTRAINT FK_acce_tbUsuarios_acce_tbUsuarios_usua_UsuCreacion_usua_Id  FOREIGN KEY(usua_UsuCreacion) REFERENCES acce.tbUsuarios(usua_Id),
	CONSTRAINT FK_acce_tbUsuarios_acce_tbUsuarios_usua_UsuModificacion_usua_Id  FOREIGN KEY(usua_UsuModificacion) REFERENCES acce.tbUsuarios(usua_Id),
	CONSTRAINT FK_acce_tbUsuarios_acce_tbRoles_role_Id FOREIGN KEY(role_Id) REFERENCES acce.tbRoles(role_Id)
GO 

ALTER TABLE acce.tbPantallasPorRoles
ADD CONSTRAINT FK_acce_tbPantallasPorRoles_acce_tbUsuarios_pantrole_UsuCreacion_usua_Id FOREIGN KEY(pantrole_UsuCreacion) REFERENCES acce.tbUsuarios(usua_Id),
	CONSTRAINT FK_acce_tbPantallasPorRoles_acce_tbUsuarios_pantrole_UsuModificacion_usua_Id FOREIGN KEY(pantrole_UsuModificacion) REFERENCES acce.tbUsuarios(usua_Id)
GO

--*******************************************--
--********TABLA DEPARTAMENTO****************---

CREATE TABLE gral.tbDepartamentos(
	depa_Id  					CHAR(2) NOT NULL,
	depa_Nombre 				NVARCHAR(100) NOT NULL,

	depa_UsuCreacion			INT NOT NULL,
	depa_FechaCreacion			DATETIME NOT NULL CONSTRAINT DF_depa_FechaCreacion DEFAULT(GETDATE()),
	depa_UsuModificacion		INT,
	depa_FechaModificacion		DATETIME,
	depa_Estado					BIT NOT NULL CONSTRAINT DF_depa_Estado DEFAULT(1)
	CONSTRAINT PK_gral_tbDepartamentos_depa_Id 											PRIMARY KEY(depa_Id),
	CONSTRAINT FK_gral_tbDepartamentos_acce_tbUsuarios_depa_UsuCreacion_usua_Id  		FOREIGN KEY(depa_UsuCreacion) 		REFERENCES acce.tbUsuarios(usua_Id),
	CONSTRAINT FK_gral_tbDepartamentos_acce_tbUsuarios_depa_UsuModificacion_usua_Id  	FOREIGN KEY(depa_UsuModificacion) 	REFERENCES acce.tbUsuarios(usua_Id)
);
GO

--********TABLA MUNICIPIO****************---
CREATE TABLE gral.tbMunicipios(
	muni_id					CHAR(4)	NOT NULL,
	muni_Nombre				NVARCHAR(80) NOT NULL,
	depa_Id					CHAR(2)	NOT NULL,

	muni_UsuCreacion		INT	NOT NULL,
	muni_FechaCreacion		DATETIME NOT NULL CONSTRAINT DF_muni_FechaCreacion DEFAULT(GETDATE()),
	muni_UsuModificacion	INT,
	muni_FechaModificacion	DATETIME,
	muni_Estado				BIT	NOT NULL CONSTRAINT DF_muni_Estado DEFAULT(1)
	CONSTRAINT PK_gral_tbMunicipios_muni_Id 										PRIMARY KEY(muni_Id),
	CONSTRAINT FK_gral_tbMunicipios_gral_tbDepartamentos_depa_Id 				    FOREIGN KEY (depa_Id) 						REFERENCES gral.tbDepartamentos(depa_Id),
	CONSTRAINT FK_gral_tbMunicipios_acce_tbUsuarios_muni_UsuCreacion_usua_Id  		FOREIGN KEY(muni_UsuCreacion) 				REFERENCES acce.tbUsuarios(usua_Id),
	CONSTRAINT FK_gral_tbMunicipios_acce_tbUsuarios_muni_UsuModificacion_usua_Id  	FOREIGN KEY(muni_UsuModificacion) 			REFERENCES acce.tbUsuarios(usua_Id)
);
GO

--********ESTADOS CIVILES****************---
CREATE TABLE gral.tbEstadosCiviles
(
	estacivi_Id					INT IDENTITY,
	estacivi_Nombre				NVARCHAR(50),

	estacivi_UsuCreacion		INT NOT NULL,
	estacivi_FechaCreacion		DATETIME NOT NULL CONSTRAINT DF_estacivi_FechaCreacion DEFAULT(GETDATE()),
	estacivi_UsuModificacion	INT,
	estacivi_FechaModificacion	DATETIME,
	estacivi_Estado				BIT NOT NULL CONSTRAINT DF_estacivi_Estado DEFAULT(1)
   
   CONSTRAINT PK_gral_tbEstadosCiviles 												PRIMARY KEY(estacivi_Id),
   CONSTRAINT FK_gral_tbEstadosCiviles_acce_tbUsuarios_estacivi_UsuCreacion_usua_Id  	FOREIGN KEY(estacivi_UsuCreacion) 		REFERENCES acce.tbUsuarios(usua_Id),
   CONSTRAINT FK_gral_tbEstadosCiviles_acce_tbUsuarios_estacivi_UsuModificacion_usua_Id  FOREIGN KEY(estacivi_UsuModificacion) 	REFERENCES acce.tbUsuarios(usua_Id),
   CONSTRAINT UQ_asil_tbEstadosCiviles_estacivi_Nombre UNIQUE(estacivi_Nombre)
);
GO

--********TABLA MÉTODOS DE PAGO****************---
CREATE TABLE asil.tbMetodosPago
(
	meto_Id					INT IDENTITY,
	meto_Nombre				NVARCHAR(100)NOT NULL,

	meto_UsuCreacion		INT NOT NULL,
	meto_FechaCreacion		DATETIME NOT NULL CONSTRAINT DF_meto_FechaCreacion DEFAULT(GETDATE()),
	meto_UsuModificacion	INT,
	meto_FechaModificacion	DATETIME,
	meto_Estado				BIT NOT NULL CONSTRAINT DF_meto_Estado DEFAULT(1)

	CONSTRAINT PK_asil_tbMetodosPago_meto_Id 												PRIMARY KEY(meto_Id),
	CONSTRAINT FK_asil_tbMetodosPago_acce_tbUsuarios_meto_UsuCreacion_usua_Id  				FOREIGN KEY(meto_UsuCreacion) 			REFERENCES acce.tbUsuarios(usua_Id),
	CONSTRAINT FK_asil_tbMetodosPago_acce_tbUsuarios_meto_UsuModificacion_usua_Id  			FOREIGN KEY(meto_UsuModificacion) 		REFERENCES acce.tbUsuarios(usua_Id),
	CONSTRAINT UQ_asil_tbMetodosPago_meto_Nombre UNIQUE(meto_Nombre)
);
GO

--********TABLA CENTROS****************---
CREATE TABLE asil.tbCentros
(
	cent_Id					INT IDENTITY,
	cent_Nombre				NVARCHAR(200) NOT NULL,
	muni_Id					CHAR(4) NOT NULL,
	cent_Direccion			NVARCHAR(500) NOT NULL,

	cent_UsuCreacion		INT NOT NULL,
	cent_FechaCreacion		DATETIME NOT NULL CONSTRAINT DF_cent_FechaCreacion DEFAULT(GETDATE()),
	cent_UsuModificacion	INT,
	cent_FechaModificacion	DATETIME,
	cent_Estado				BIT NOT NULL CONSTRAINT DF_cent_Estado DEFAULT(1)
	CONSTRAINT PK_asil_tbCentros_cent_Id 												PRIMARY KEY(cent_Id),
	CONSTRAINT FK_asil_tbCentros_acce_tbUsuarios_cent_UsuCreacion_usua_Id  				FOREIGN KEY(cent_UsuCreacion) 			REFERENCES acce.tbUsuarios(usua_Id),
	CONSTRAINT FK_asil_tbCentros_acce_tbUsuarios_cent_UsuModificacion_usua_Id  			FOREIGN KEY(cent_UsuModificacion) 		REFERENCES acce.tbUsuarios(usua_Id),
	CONSTRAINT FK_asil_tbCentros_gral_tbMunicipios_muni_Id 								FOREIGN KEY(muni_Id) 					REFERENCES [gral].[tbMunicipios] (muni_Id),
	CONSTRAINT UQ_asil_tbCentros_carg_Nombre UNIQUE(cent_Nombre)
);
GO

--********TABLA PROVEEDORES****************---
CREATE TABLE asil.tbProveedores
(
	prov_Id						INT IDENTITY,
	prov_Nombre					NVARCHAR(200) NOT NULL,
	prov_CorreoElectronico      NVARCHAR(200) NOT NULL,
	prov_Telefono				NVARCHAR(15)NOT NULL,
	muni_Id						CHAR(4) NOT NULL,
	prov_Direccion				NVARCHAR(500) NOT NULL,

	prov_UsuCreacion			INT NOT NULL,
	prov_FechaCreacion			DATETIME NOT NULL CONSTRAINT DF_prov_FechaCreacion DEFAULT(GETDATE()),
	prov_UsuModificacion		INT,
	prov_FechaModificacion		DATETIME,
	prov_Estado					BIT NOT NULL CONSTRAINT DF_prov_Estado DEFAULT(1)

	CONSTRAINT PK_asil_tbProveedores_prov_Id											PRIMARY KEY(prov_Id),
	CONSTRAINT FK_asil_tbProveedores_acce_tbUsuarios_prov_UsuCreacion_usua_Id  			FOREIGN KEY(prov_UsuCreacion) 		REFERENCES acce.tbUsuarios(usua_Id),
	CONSTRAINT FK_asil_tbProveedores_acce_tbUsuarios_prov_UsuModificacion_usua_Id 		FOREIGN KEY(prov_UsuModificacion) 	REFERENCES acce.tbUsuarios(usua_Id),
	CONSTRAINT FK_asil_tbProveedores_gral_tbMunicipios_muni_Id							FOREIGN KEY(muni_Id) 				REFERENCES gral.tbMunicipios(muni_Id)
);
GO

--********TABLA MEDICAMENTOS****************---
CREATE TABLE asil.tbMedicamentos
(
	medi_Id						INT IDENTITY,
	medi_Nombre					NVARCHAR(300) NOT NULL,
	prov_Id						INT NOT NULL,

	medi_UsuCreacion			INT NOT NULL,
	medi_FechaCreacion			DATETIME NOT NULL CONSTRAINT DF_medi_FechaCreacion DEFAULT(GETDATE()),
	medi_UsuModificacion		INT,
	medi_FechaModificacion		DATETIME,
	medi_Estado					BIT NOT NULL CONSTRAINT DF_medi_Estado DEFAULT(1)

	CONSTRAINT PK_asil_tbMedicamentos_medi_Id											PRIMARY KEY(medi_Id),
	CONSTRAINT FK_asil_tbMedicamentos_acce_tbUsuarios_medi_UsuCreacion_usua_Id  		FOREIGN KEY(medi_UsuCreacion) 		REFERENCES acce.tbUsuarios(usua_Id),
	CONSTRAINT FK_asil_tbMedicamentos_acce_tbUsuarios_medi_UsuModificacion_usua_Id 		FOREIGN KEY(medi_UsuModificacion) 	REFERENCES acce.tbUsuarios(usua_Id),
	CONSTRAINT FK_asil_tbMedicamentos_asil_tbProveedores_prov_Id						FOREIGN KEY(prov_Id) 				REFERENCES asil.tbProveedores(prov_Id)
);
GO


--***********CREACION TABLA INVENTARIO/CENTRO*****************---
CREATE TABLE asil.tbInventarioPorCentro(
	invecent_Id					INT IDENTITY,
	medi_Id						INT NOT NULL,
	cent_Id						INT NOT NULL,
	invecent_Stock				INT NOT NULL,

	invecent_UsuCreacion		INT NOT NULL,
	invecent_FechaCreacion		DATETIME NOT NULL CONSTRAINT DF_invecent_FechaCreacion DEFAULT(GETDATE()),
	invecent_UsuModificacion	INT,
	invecent_FechaModificacion	DATETIME,
	invecent_Estado				BIT NOT NULL CONSTRAINT DF_invecent_Estado DEFAULT(1)

	CONSTRAINT PK_asil_tbInventarioPorCentro_invecent_Id					PRIMARY KEY(invecent_Id),
	CONSTRAINT FK_asil_tbInventarioPorCentro_asil_tbMedicamentos_medi_Id	FOREIGN KEY(medi_Id)	REFERENCES asil.tbMedicamentos(medi_Id),
	CONSTRAINT FK_asil_tbInventarioPorCentro_asil_tbCentros_cent_Id			FOREIGN KEY(cent_Id)	REFERENCES asil.tbCentros(cent_Id),
);
GO

--********TABLA ENFERMEDADES****************---
CREATE TABLE asil.tbEnfermedades
(
	enfe_Id					INT IDENTITY,
	enfe_Nombre				NVARCHAR(100)NOT NULL,

	enfe_UsuCreacion		INT NOT NULL,
	enfe_FechaCreacion		DATETIME NOT NULL CONSTRAINT DF_enfe_FechaCreacion DEFAULT(GETDATE()),
	enfe_UsuModificacion	INT,
	enfe_FechaModificacion	DATETIME,
	enfe_Estado				BIT NOT NULL CONSTRAINT DF_enfe_Estado DEFAULT(1)

	CONSTRAINT PK_asil_tbEnfermedades_enfe_Id 													PRIMARY KEY(enfe_Id),
	CONSTRAINT FK_asil_tbEnfermedades_acce_tbUsuarios_enfe_UsuCreacion_usua_Id  				FOREIGN KEY(enfe_UsuCreacion) 			REFERENCES acce.tbUsuarios(usua_Id),
	CONSTRAINT FK_asil_tbEnfermedades_acce_tbUsuarios_enfe_UsuModificacion_usua_Id  			FOREIGN KEY(enfe_UsuModificacion) 		REFERENCES acce.tbUsuarios(usua_Id),
	CONSTRAINT UQ_asil_tbEnfermedades_enfe_Nombre UNIQUE(enfe_Nombre)
);
GO

--********TABLA ACTIVIDADES****************---
CREATE TABLE asil.tbActividades
(
	acti_Id					INT IDENTITY,
	acti_Nombre				NVARCHAR(100)NOT NULL,
	acti_Class				NVARCHAR(500),

	acti_UsuCreacion		INT NOT NULL,
	acti_FechaCreacion		DATETIME NOT NULL CONSTRAINT DF_acti_FechaCreacion DEFAULT(GETDATE()),
	acti_UsuModificacion	INT,
	acti_FechaModificacion	DATETIME,
	acti_Estado				BIT NOT NULL CONSTRAINT DF_acti_Estado DEFAULT(1)

	CONSTRAINT PK_asil_tbActividades_acti_Id 												PRIMARY KEY(acti_Id),
	CONSTRAINT FK_asil_tbActividades_acce_tbUsuarios_enfe_UsuCreacion_usua_Id  				FOREIGN KEY(acti_UsuCreacion) 			REFERENCES acce.tbUsuarios(usua_Id),
	CONSTRAINT FK_asil_tbActividades_acce_tbUsuarios_enfe_UsuModificacion_usua_Id  			FOREIGN KEY(acti_UsuModificacion) 		REFERENCES acce.tbUsuarios(usua_Id),
	CONSTRAINT UQ_asil_tbActividades_enfe_Nombre UNIQUE(acti_Nombre)
);
GO

--********TABLA CATEGORÍAS HABITACIONES****************---
CREATE TABLE asil.tbCategoriasHabitaciones
(
	cate_Id						INT IDENTITY,
	cate_Nombre					NVARCHAR(100) NOT NULL,
	cate_Capacidad				INT NOT NULL,
	cate_Climatizacion			BIT NOT NULL,

	cate_UsuCreacion			INT NOT NULL,
	cate_FechaCreacion			DATETIME NOT NULL CONSTRAINT DF_cate_FechaCreacion DEFAULT(GETDATE()),
	cate_UsuModificacion		INT,
	cate_FechaModificacion		DATETIME,
	cate_Estado					BIT NOT NULL CONSTRAINT DF_cate_Estado DEFAULT(1)

	CONSTRAINT PK_asil_tbCategoriasHabitaciones_cate_Id 										    PRIMARY KEY(cate_Id),
	CONSTRAINT FK_asil_tbCategoriasHabitaciones_acce_tbUsuarios_cate_UsuCreacion_usua_Id  			FOREIGN KEY(cate_UsuCreacion) 			REFERENCES acce.tbUsuarios(usua_Id),
	CONSTRAINT FK_asil_tbCategoriasHabitaciones_acce_tbUsuarios_cate_UsuModificacion_usua_Id  		FOREIGN KEY(cate_UsuModificacion) 		REFERENCES acce.tbUsuarios(usua_Id),
	CONSTRAINT UQ_asil_tbCategoriasHabitaciones_cate_Nombre UNIQUE(cate_Nombre)
);
GO

--********TABLA CARGOS****************---
CREATE TABLE asil.tbCargos
(
	carg_Id					INT IDENTITY,
	carg_Nombre				NVARCHAR(100)NOT NULL,

	carg_UsuCreacion		INT NOT NULL,
	carg_FechaCreacion		DATETIME NOT NULL CONSTRAINT DF_carg_FechaCreacion DEFAULT(GETDATE()),
	carg_UsuModificacion	INT,
	carg_FechaModificacion	DATETIME,
	carg_Estado				BIT NOT NULL CONSTRAINT DF_carg_Estado DEFAULT(1)
	CONSTRAINT PK_asil_tbCargos_carg_Id 												PRIMARY KEY(carg_Id),
	CONSTRAINT FK_asil_tbCargos_acce_tbUsuarios_carg_UsuCreacion_usua_Id  				FOREIGN KEY(carg_UsuCreacion) 			REFERENCES acce.tbUsuarios(usua_Id),
	CONSTRAINT FK_asil_tbCargos_acce_tbUsuarios_carg_UsuModificacion_usua_Id  			FOREIGN KEY(carg_UsuModificacion) 		REFERENCES acce.tbUsuarios(usua_Id),
	CONSTRAINT UQ_asil_tbCargos_carg_Nombre UNIQUE(carg_Nombre)
);
GO

--********TABLA DIETAS****************---
CREATE TABLE asil.tbDietas
(
	diet_Id					INT IDENTITY,
	diet_Desayuno			NVARCHAR(500),
	diet_Almuerzo			NVARCHAR(500),
	diet_Cena				NVARCHAR(500),
	diet_Merienda			NVARCHAR(500),
	diet_Restricciones		NVARCHAR(500),
	diet_Observaciones		NVARCHAR(500),
	
	diet_UsuCreacion		INT NOT NULL,
	diet_FechaCreacion		DATETIME NOT NULL CONSTRAINT DF_diet_FechaCreacion DEFAULT(GETDATE()),
	diet_UsuModificacion	INT,
	diet_FechaModificacion	DATETIME,
	diet_Estado				BIT NOT NULL CONSTRAINT DF_diet_Estado DEFAULT(1)
	CONSTRAINT PK_asil_tbDietas_diet_Id 												PRIMARY KEY(diet_Id),
	CONSTRAINT FK_asil_tbDietas_acce_tbUsuarios_diet_UsuCreacion_usua_Id  				FOREIGN KEY(diet_UsuCreacion) 			REFERENCES acce.tbUsuarios(usua_Id),
	CONSTRAINT FK_asil_tbDietas_acce_tbUsuarios_diet_UsuModificacion_usua_Id  			FOREIGN KEY(diet_UsuModificacion) 		REFERENCES acce.tbUsuarios(usua_Id)
);
GO

--********TABLA EMPLEADOS****************---
CREATE TABLE asil.tbEmpleados
(
	empe_Id					INT IDENTITY,
	empe_Nombres			NVARCHAR(200) NOT NULL,
	empe_Apellidos			NVARCHAR(200) NOT NULL,
	empe_Identidad			VARCHAR(13) NOT NULL,
	empe_Sexo				CHAR NOT NULL,
	estacivi_Id				INT NOT NULL,
	empe_Nacimiento			DATE NOT NULL,
	muni_Id					CHAR(4) NOT NULL,
	empe_Direccion			NVARCHAR(500) NOT NULL,
	empe_Telefono			NVARCHAR(20) NOT NULL,
	empe_Correo				NVARCHAR(200) NOT NULL,
	carg_Id					INT NOT NULL,
	cent_Id					INT NOT NULL,
	
	empe_UsuCreacion		INT NOT NULL,
	empe_FechaCreacion		DATETIME NOT NULL CONSTRAINT DF_empe_FechaCreacion DEFAULT(GETDATE()),
	empe_UsuModificacion	INT,
	empe_FechaModificacion	DATETIME,
	empe_Estado				BIT NOT NULL CONSTRAINT DF_empe_Estado DEFAULT(1)
	CONSTRAINT PK_asil_tbEmpleados_empe_Id 													PRIMARY KEY(empe_Id),
	CONSTRAINT FK_asil_tbEmpleados_acce_tbUsuarios_empe_UsuCreacion_usua_Id  				FOREIGN KEY(empe_UsuCreacion) 			REFERENCES acce.tbUsuarios(usua_Id),
	CONSTRAINT FK_asil_tbEmpleados_acce_tbUsuarios_empe_UsuModificacion_usua_Id  			FOREIGN KEY(empe_UsuModificacion) 		REFERENCES acce.tbUsuarios(usua_Id),
	CONSTRAINT FK_asil_tbEmpleados_gral_tbEstadosCiviles_estacivi_Id 						FOREIGN KEY(estacivi_Id) 				REFERENCES gral.tbEstadosCiviles(estacivi_Id),
	CONSTRAINT FK_asil_tbEmpleados_gral_tbMunicipios_muni_Id 								FOREIGN KEY(muni_Id) 					REFERENCES gral.tbMunicipios(muni_Id),
	CONSTRAINT FK_asil_tbEmpleados_asil_tbCargos_carg_Id 									FOREIGN KEY(carg_Id) 					REFERENCES asil.tbCargos(carg_Id),
	CONSTRAINT FK_asil_tbEmpleados_asil_tbCentros_cent_Id 									FOREIGN KEY(cent_Id) 					REFERENCES asil.tbCentros(cent_Id),
	CONSTRAINT UQ_asil_tbEmpleados_empe_Identidad UNIQUE(empe_Identidad)
);
GO

--********TABLA AGENDAS****************---
CREATE TABLE asil.tbAgendas
(
	agen_Id					INT IDENTITY,
	agen_Nombre				NVARCHAR(300) NOT NULL,
	
	agen_UsuCreacion		INT NOT NULL,
	agen_FechaCreacion		DATETIME NOT NULL CONSTRAINT DF_agen_FechaCreacion DEFAULT(GETDATE()),
	agen_UsuModificacion	INT,
	agen_FechaModificacion	DATETIME,
	agen_Estado				BIT NOT NULL CONSTRAINT DF_agen_Estado DEFAULT(1)
	CONSTRAINT PK_asil_tbAgendas_agen_Id 												PRIMARY KEY(agen_Id),
	CONSTRAINT FK_asil_tbAgendas_acce_tbUsuarios_agen_UsuCreacion_usua_Id  				FOREIGN KEY(agen_UsuCreacion) 			REFERENCES acce.tbUsuarios(usua_Id),
	CONSTRAINT FK_asil_tbAgendas_acce_tbUsuarios_agen_UsuModificacion_usua_Id  			FOREIGN KEY(agen_UsuModificacion) 		REFERENCES acce.tbUsuarios(usua_Id),
	CONSTRAINT UQ_asil_tbAgendas_agen_Nombre UNIQUE(agen_Nombre)
);
GO

--********TABLA AGENDA DETALLES****************---
CREATE TABLE asil.tbAgendaDetalles
(
	agendeta_Id					INT IDENTITY,
	agen_Id						INT NOT NULL,
	agendeta_HoraStart			VARCHAR(5) NOT NULL,
	agendeta_HoraEnd			VARCHAR(5),
	acti_Id						INT,
	medi_Id						INT,
	agendeta_Observaciones		NVARCHAR(500),
	
	agendeta_UsuCreacion		INT NOT NULL,
	agendeta_FechaCreacion		DATETIME NOT NULL CONSTRAINT DF_agendeta_FechaCreacion DEFAULT(GETDATE()),
	agendeta_UsuModificacion	INT,
	agendeta_FechaModificacion	DATETIME,
	agendeta_Estado				BIT NOT NULL CONSTRAINT DF_agendeta_Estado DEFAULT(1)
	CONSTRAINT PK_asil_tbAgendaDetalles_agendeta_Id 												PRIMARY KEY(agendeta_Id),
	CONSTRAINT FK_asil_tbAgendaDetalles_acce_tbUsuarios_agendeta_Id_UsuCreacion_usua_Id  			FOREIGN KEY(agendeta_UsuCreacion) 			REFERENCES acce.tbUsuarios(usua_Id),
	CONSTRAINT FK_asil_tbAgendaDetalles_acce_tbUsuarios_agendeta_Id_UsuModificacion_usua_Id  		FOREIGN KEY(agendeta_UsuModificacion) 		REFERENCES acce.tbUsuarios(usua_Id),
	CONSTRAINT FK_asil_tbAgendaDetalles_asil_tbActividades_acti_Id  								FOREIGN KEY(acti_Id) 						REFERENCES asil.tbActividades(acti_Id),
	CONSTRAINT FK_asil_tbAgendaDetalles_asil_tbMedicamentos_medi_Id  								FOREIGN KEY(medi_Id) 						REFERENCES asil.tbMedicamentos(medi_Id),
);
GO

--********TABLA RESIDENTES****************---
CREATE TABLE asil.tbResidentes
(
	resi_Id					INT IDENTITY,
	resi_Nombres			NVARCHAR(200) NOT NULL,
	resi_Apellidos			NVARCHAR(200) NOT NULL,
	resi_Identidad			VARCHAR(13) NOT NULL,
	estacivi_Id				INT NOT NULL,
	resi_Nacimiento			DATE NOT NULL,
	resi_Sexo				CHAR NOT NULL,
	cent_Id					INT NOT NULL,
	diet_Id					INT,
	resi_FechaIngreso		DATE NOT NULL,
	empe_Id					INT,
	agen_Id					INT NOT NULL,
	
	resi_UsuCreacion		INT NOT NULL,
	resi_FechaCreacion		DATETIME NOT NULL CONSTRAINT DF_resi_FechaCreacion DEFAULT(GETDATE()),
	resi_UsuModificacion	INT,
	resi_FechaModificacion	DATETIME,
	resi_Estado				BIT NOT NULL CONSTRAINT DF_resi_Estado DEFAULT(1)
	CONSTRAINT PK_asil_tbResidentes_carg_Id 												PRIMARY KEY(resi_Id),
	CONSTRAINT FK_asil_tbResidentes_acce_tbUsuarios_resi_UsuCreacion_usua_Id  				FOREIGN KEY(resi_UsuCreacion) 			REFERENCES acce.tbUsuarios(usua_Id),
	CONSTRAINT FK_asil_tbResidentes_acce_tbUsuarios_resi_UsuModificacion_usua_Id  			FOREIGN KEY(resi_UsuModificacion) 		REFERENCES acce.tbUsuarios(usua_Id),
	CONSTRAINT FK_asil_tbResidentes_gral_tbEstadosCiviles_estacivi_Id 						FOREIGN KEY(estacivi_Id) 				REFERENCES gral.tbEstadosCiviles(estacivi_Id),
	CONSTRAINT FK_asil_tbResidentes_asil_tbDietas_diet_Id 									FOREIGN KEY(diet_Id) 					REFERENCES asil.tbDietas(diet_Id),
	CONSTRAINT FK_asil_tbResidentes_asil_tbEmpleados_empe_Id 								FOREIGN KEY(empe_Id) 					REFERENCES asil.tbEmpleados(empe_Id),
	CONSTRAINT FK_asil_tbResidentes_asil_tbAgendas_agen_Id 									FOREIGN KEY(agen_Id) 					REFERENCES asil.tbAgendas(agen_Id),
	CONSTRAINT FK_asil_tbResidentes_asil_tbCentros_cent_Id 									FOREIGN KEY(cent_Id) 					REFERENCES asil.tbCentros(cent_Id),
	CONSTRAINT UQ_asil_tbResidentes_resi_Identidad UNIQUE(resi_Identidad)
);
GO

CREATE TABLE asil.tbHistorialPagos
(
	pago_Id			INT IDENTITY,
	resi_Id			INT NOT NULL,
	meto_Id			INT NOT NULL,
	pago_Fecha		DATE NOT NULL,

	pago_UsuCreacion		INT NOT NULL,
	pago_FechaCreacion		DATETIME NOT NULL CONSTRAINT DF_pago_FechaCreacion DEFAULT(GETDATE()),
	pago_UsuModificacion	INT,
	pago_FechaModificacion	DATETIME,
	pago_Estado				BIT NOT NULL CONSTRAINT DF_pago_Estado DEFAULT(1)

	CONSTRAINT PK_asil_tbHistorialPagos_pago_Id 												PRIMARY KEY(pago_Id),
	CONSTRAINT FK_asil_tbHistorialPagos_acce_tbUsuarios_pago_UsuCreacion_usua_Id  				FOREIGN KEY(pago_UsuCreacion) 			REFERENCES acce.tbUsuarios(usua_Id),
	CONSTRAINT FK_asil_tbHistorialPagos_acce_tbUsuarios_pago_UsuModificacion_usua_Id  			FOREIGN KEY(pago_UsuModificacion) 		REFERENCES acce.tbUsuarios(usua_Id),
	CONSTRAINT FK_asil_tbHistorialPagos_asil_tbMetodosPago_meto_Id 								FOREIGN KEY(meto_Id) 					REFERENCES asil.tbMetodosPago(meto_Id),
	CONSTRAINT FK_asil_tbHistorialPagos_asil_tbResidentes_resi_Id 								FOREIGN KEY(resi_Id) 					REFERENCES asil.tbResidentes(resi_Id),
);
GO


--********TABLA PARENTESCOS****************---
CREATE TABLE asil.tbParentescos
(
	pare_Id					INT IDENTITY,
	pare_Nombre				NVARCHAR(100) NOT NULL,

	pare_UsuCreacion		INT NOT NULL,
	pare_FechaCreacion		DATETIME NOT NULL CONSTRAINT DF_pare_FechaCreacion DEFAULT(GETDATE()),
	pare_UsuModificacion	INT,
	pare_FechaModificacion	DATETIME,
	pare_Estado				BIT NOT NULL CONSTRAINT DF_pare_Estado DEFAULT(1)

	CONSTRAINT PK_asil_tbParentescos_pare_Id 												PRIMARY KEY(pare_Id),
	CONSTRAINT FK_asil_tbParentescos_acce_tbUsuarios_pare_UsuCreacion_usua_Id  				FOREIGN KEY(pare_UsuCreacion) 			REFERENCES acce.tbUsuarios(usua_Id),
	CONSTRAINT FK_asil_tbParentescos_acce_tbUsuarios_pare_UsuModificacion_usua_Id  			FOREIGN KEY(pare_UsuModificacion) 		REFERENCES acce.tbUsuarios(usua_Id),
	CONSTRAINT UQ_asil_tbParentescos_pare_Nombre UNIQUE(pare_Nombre)
);
GO

--********TABLA ENCARGADOS****************---
CREATE TABLE asil.tbEncargados
(
	enca_Id					INT IDENTITY,
	enca_Nombres			NVARCHAR(200) NOT NULL,
	enca_Apellidos			NVARCHAR(200) NOT NULL,
	enca_Identidad			VARCHAR(13) NOT NULL,
	estacivi_Id				INT NOT NULL,
	enca_Nacimiento			DATE NOT NULL,
	enca_Sexo				CHAR NOT NULL,
	muni_Id					CHAR(4) NOT  NULL,
	enca_Direccion			NVARCHAR(500) NOT NULL,
	enca_Telefono			NVARCHAR(20) NOT NULL,
	resi_Id					INT NOT NULL,
	pare_Id					INT NOT NULL,
	
	enca_UsuCreacion		INT NOT NULL,
	enca_FechaCreacion		DATETIME NOT NULL CONSTRAINT DF_enca_FechaCreacion DEFAULT(GETDATE()),
	enca_UsuModificacion	INT,
	enca_FechaModificacion	DATETIME,
	enca_Estado				BIT NOT NULL CONSTRAINT DF_enca_Estado DEFAULT(1)
	CONSTRAINT PK_asil_tbEncargados_enca_Id 												PRIMARY KEY(enca_Id),
	CONSTRAINT FK_asil_tbEncargados_acce_tbUsuarios_enca_UsuCreacion_usua_Id  				FOREIGN KEY(enca_UsuCreacion) 			REFERENCES acce.tbUsuarios(usua_Id),
	CONSTRAINT FK_asil_tbEncargados_acce_tbUsuarios_enca_UsuModificacion_usua_Id  			FOREIGN KEY(enca_UsuModificacion) 		REFERENCES acce.tbUsuarios(usua_Id),
	CONSTRAINT FK_asil_tbEncargados_gral_tbEstadosCiviles_estacivi_Id 						FOREIGN KEY(estacivi_Id) 				REFERENCES gral.tbEstadosCiviles(estacivi_Id),
	CONSTRAINT FK_asil_tbEncargados_gral_tbMunicipios_muni_Id 								FOREIGN KEY(muni_Id) 					REFERENCES gral.tbMunicipios(muni_Id),
	CONSTRAINT FK_asil_tbEncargados_asil_tbResidentes_resi_Id 								FOREIGN KEY(resi_Id) 					REFERENCES asil.tbResidentes(resi_Id),
	CONSTRAINT FK_asil_tbEncargados_asil_tbParentescos_pare_Id 								FOREIGN KEY(pare_Id) 					REFERENCES asil.tbParentescos(pare_Id),
	CONSTRAINT UQ_asil_tbEncargados_enca_Identidad UNIQUE(enca_Identidad)
);
GO

--********TABLA TIPOS DE SANGRE****************---
CREATE TABLE asil.tbTiposSangre
(
	tiposang_Id					INT IDENTITY,
	tiposang_Nombre				CHAR(3),

	tiposang_UsuCreacion		INT NOT NULL,
	tiposang_FechaCreacion		DATETIME NOT NULL CONSTRAINT DF_tiposang_FechaCreacion DEFAULT(GETDATE()),
	tiposang_UsuModificacion	INT,
	tiposang_FechaModificacion	DATETIME,
	tiposang_Estado				BIT NOT NULL CONSTRAINT DF_tiposang_Estado DEFAULT(1)
	CONSTRAINT PK_asil_tbTiposSangre_tiposang_Id 												PRIMARY KEY(tiposang_Id),
	CONSTRAINT FK_asil_tbTiposSangre_acce_tbUsuarios_tiposang_UsuCreacion_usua_Id  				FOREIGN KEY(tiposang_UsuCreacion) 			REFERENCES acce.tbUsuarios(usua_Id),
	CONSTRAINT FK_asil_tbTiposSangre_acce_tbUsuarios_tiposang_UsuModificacion_usua_Id  			FOREIGN KEY(tiposang_UsuModificacion) 		REFERENCES acce.tbUsuarios(usua_Id),
	CONSTRAINT UQ_asil_tbTiposSangre_tiposang_Nombre UNIQUE(tiposang_Nombre)
);
GO

--********TABLA ENFERMEDADES X RESIDENTE****************---
CREATE TABLE asil.tbEnfermedadesXResidente(
	enferesi_Id					INT IDENTITY,
	enfe_Id						INT NOT NULL,
	resi_Id						INT NOT NULL,

	enferesi_UsuCreacion		INT NOT NULL,
	enferesi_FechaCreacion		DATETIME NOT NULL CONSTRAINT DF_enferesi_FechaCreacion DEFAULT(GETDATE()),
	enferesi_UsuModificacion	INT,
	enferesi_FechaModificacion	DATETIME,
	enferesi_Estado				BIT NOT NULL CONSTRAINT DF_enferesi_Estado DEFAULT(1)

	CONSTRAINT FK_acce_tbEnfermedadesXResidente_asil_tbEnfermedades_enfe_Id FOREIGN KEY(enfe_Id) REFERENCES asil.tbEnfermedades(enfe_Id),
	CONSTRAINT FK_acce_tbEnfermedadesXResidente_asil_tbResidentes_resi_Id FOREIGN KEY(resi_Id)	REFERENCES asil.tbResidentes(resi_Id),
	CONSTRAINT PK_acce_tbEnfermedadesXResidente_enferesi_Id PRIMARY KEY(enferesi_Id),
);
GO

--********TABLA EXPEDIENTES****************---
CREATE TABLE asil.tbExpedientes
(
	expe_Id					INT IDENTITY,
	resi_Id					INT NOT NULL,
	tiposang_Id				INT NOT NULL,
	expe_FechaApertura		DATE NOT NULL,
	expe_Fotografia			NVARCHAR(500),
	expe_QRCode				NVARCHAR(MAX),
	
	expe_UsuCreacion		INT NOT NULL,
	expe_FechaCreacion		DATETIME NOT NULL CONSTRAINT DF_expe_FechaCreacion DEFAULT(GETDATE()),
	expe_UsuModificacion	INT,
	expe_FechaModificacion	DATETIME,
	expe_Estado				BIT NOT NULL CONSTRAINT DF_expe_Estado DEFAULT(1)
	CONSTRAINT PK_asil_tbExpediente_expe_Id													PRIMARY KEY(resi_Id),
	CONSTRAINT FK_asil_tbExpediente_acce_tbUsuarios_expe_UsuCreacion_usua_Id  				FOREIGN KEY(expe_UsuCreacion) 			REFERENCES acce.tbUsuarios(usua_Id),
	CONSTRAINT FK_asil_tbExpediente_acce_tbUsuarios_expe_UsuModificacion_usua_Id  			FOREIGN KEY(expe_UsuModificacion) 		REFERENCES acce.tbUsuarios(usua_Id),
	CONSTRAINT FK_asil_tbExpediente_asil_tbTipoSangre_tiposang_Id 							FOREIGN KEY(tiposang_Id) 				REFERENCES asil.tbTiposSangre(tiposang_Id),
	CONSTRAINT UQ_asil_tbExpediente_resi_Id UNIQUE(resi_Id)
);
GO

--********TABLA HISTORIAL EXPEDIENTES****************---
CREATE TABLE asil.tbHistorialExpedientes
(
	histexpe_Id						INT IDENTITY,
	expe_Id							INT NOT NULL,
	histexpe_Observaciones			NVARCHAR(1000) NOT NULL,
	empe_Id							INT NOT NULL,
	histexpe_FechaActualizacion		DATE NOT NULL,
	
	histexpe_UsuCreacion			INT NOT NULL,
	histexpe_FechaCreacion			DATETIME NOT NULL CONSTRAINT DF_histexpe_FechaCreacion DEFAULT(GETDATE()),
	histexpe_UsuModificacion		INT,
	histexpe_FechaModificacion		DATETIME,
	histexpe_Estado					BIT NOT NULL CONSTRAINT DF_histexpe_Estado DEFAULT(1)
	CONSTRAINT PK_asil_tbHistorialExpedientes_histexpe_Id													PRIMARY KEY(histexpe_Id),
	CONSTRAINT FK_asil_tbHistorialExpedientes_acce_tbUsuarios_histexpe_UsuCreacion_usua_Id  				FOREIGN KEY(histexpe_UsuCreacion) 			REFERENCES acce.tbUsuarios(usua_Id),
	CONSTRAINT FK_asil_tbHistorialExpedientes_acce_tbUsuarios_histexpe_UsuModificacion_usua_Id  			FOREIGN KEY(histexpe_UsuModificacion) 		REFERENCES acce.tbUsuarios(usua_Id),
	CONSTRAINT FK_asil_tbHistorialExpedientes_asil_tbEmpleados_empe_Id 										FOREIGN KEY(empe_Id) 						REFERENCES asil.tbEmpleados(empe_Id)
);
GO

--********TABLA HABITACIONES****************---
CREATE TABLE asil.tbHabitaciones
(
	habi_Id						INT IDENTITY,
	habi_Numero					INT NOT NULL,
	cate_Id						INT NOT NULL,
	cent_Id						INT NOT NULL,
	
	habi_UsuCreacion			INT NOT NULL,
	habi_FechaCreacion			DATETIME NOT NULL CONSTRAINT DF_habi_FechaCreacion DEFAULT(GETDATE()),
	habi_UsuModificacion		INT,
	habi_FechaModificacion		DATETIME,
	habi_Estado					BIT NOT NULL CONSTRAINT DF_habi_Estado DEFAULT(1)
	CONSTRAINT PK_asil_tbHabitaciones_habi_Id												PRIMARY KEY(habi_Id),
	CONSTRAINT FK_asil_tbHabitaciones_acce_tbUsuarios_habi_UsuCreacion_usua_Id  			FOREIGN KEY(habi_UsuCreacion) 			REFERENCES acce.tbUsuarios(usua_Id),
	CONSTRAINT FK_asil_tbHabitaciones_acce_tbUsuarios_habi_UsuModificacion_usua_Id  		FOREIGN KEY(habi_UsuModificacion) 		REFERENCES acce.tbUsuarios(usua_Id),
	CONSTRAINT FK_asil_tbHabitaciones_asil_tbCategoriasHabitaciones_cate_Id  				FOREIGN KEY(cate_Id) 					REFERENCES asil.tbCategoriasHabitaciones(cate_Id),
	CONSTRAINT FK_asil_tbHabitaciones_asil_tbCentros_cent_Id  								FOREIGN KEY(cent_Id) 					REFERENCES asil.tbCentros(cent_Id),
);
GO

--********TABLA HABITACIONES X RESIDENTE****************---
CREATE TABLE asil.tbHabitacionesXResidente
(
	habiresi_Id						INT IDENTITY,
	habi_Id							INT NOT NULL,
	resi_Id							INT NOT NULL,
	
	habiresi_UsuCreacion			INT NOT NULL,
	habiresi_FechaCreacion			DATETIME NOT NULL CONSTRAINT DF_habiresi_FechaCreacion DEFAULT(GETDATE()),
	habiresi_UsuModificacion		INT,
	habiresi_FechaModificacion		DATETIME,
	habiresi_Estado					BIT NOT NULL CONSTRAINT DF_habiresi_Estado DEFAULT(1)
	CONSTRAINT PK_asil_tbHabitacionesXResidente_habiresi_Id												PRIMARY KEY(habiresi_Id),
	CONSTRAINT FK_asil_tbHabitacionesXResidente_acce_tbUsuarios_habiresi_UsuCreacion_usua_Id  			FOREIGN KEY(habiresi_UsuCreacion) 			REFERENCES acce.tbUsuarios(usua_Id),
	CONSTRAINT FK_asil_tbHabitacionesXResidente_acce_tbUsuarios_habiresi_UsuModificacion_usua_Id  		FOREIGN KEY(habiresi_UsuModificacion) 		REFERENCES acce.tbUsuarios(usua_Id),
	CONSTRAINT FK_asil_tbHabitacionesXResidente_asil_tbHabitaciones_habi_Id 							FOREIGN KEY(habi_Id) 						REFERENCES asil.tbHabitaciones(habi_Id),
	CONSTRAINT FK_asil_tbHabitacionesXResidente_asil_tbResidentes_resi_Id  								FOREIGN KEY(resi_Id) 						REFERENCES asil.tbResidentes(resi_Id),
);
GO

--****************************************************************************************************************************************************

--********TABLA DONACIONES****************---

CREATE TABLE asil.tbCategoriaDonaciones(
	cado_Id					INT IDENTITY PRIMARY KEY,
	cado_NombreCategoria	NVARCHAR(200) NOT NULL
);

GO


INSERT INTO asil.tbCategoriaDonaciones ([cado_NombreCategoria])
VALUES ('Ayuda económica');
GO
INSERT INTO asil.tbCategoriaDonaciones ([cado_NombreCategoria])
VALUES ('Alimentos no perecederos');
GO
INSERT INTO asil.tbCategoriaDonaciones ([cado_NombreCategoria])
VALUES ('Artículos de higiene personal');
GO
INSERT INTO asil.tbCategoriaDonaciones ([cado_NombreCategoria])
VALUES ('Ropa y ropa de cama');
GO
INSERT INTO asil.tbCategoriaDonaciones ([cado_NombreCategoria])
VALUES ('Material médico y suministros');
GO


CREATE TABLE asil.tbDonacionesComunes(
	doco_Id						INT IDENTITY PRIMARY KEY,
	doco_Nombre					NVARCHAR(300) NOT NULL,
	cado_Id						INT NOT NULL,
	CONSTRAINT FK_asil_tbDonacionesComunes_cado_Id_CategoriasDonaciones							FOREIGN KEY(cado_Id) 					REFERENCES asil.tbCategoriaDonaciones(cado_Id),
);

GO

INSERT INTO asil.tbDonacionesComunes([doco_Nombre], [cado_Id])
VALUES ('Lempiras',1);
GO

INSERT INTO asil.tbDonacionesComunes([doco_Nombre], [cado_Id])
VALUES ('Libra de Arroz',2);
GO
INSERT INTO asil.tbDonacionesComunes([doco_Nombre], [cado_Id])
VALUES ('Libra de Pasta ',2);
GO
INSERT INTO asil.tbDonacionesComunes([doco_Nombre], [cado_Id])
VALUES ('Libra de Harina',2);
GO
INSERT INTO asil.tbDonacionesComunes([doco_Nombre], [cado_Id])
VALUES ('Libra de Avena',2);
GO
INSERT INTO asil.tbDonacionesComunes([doco_Nombre], [cado_Id])
VALUES ('Lata frijoles',2);
GO
INSERT INTO asil.tbDonacionesComunes([doco_Nombre], [cado_Id])
VALUES ('Lata garbanzos',2);
GO
INSERT INTO asil.tbDonacionesComunes([doco_Nombre], [cado_Id])
VALUES ('Lata lentejas',2);
GO
INSERT INTO asil.tbDonacionesComunes([doco_Nombre], [cado_Id])
VALUES ('Sopa enlatada',2);
GO
INSERT INTO asil.tbDonacionesComunes([doco_Nombre], [cado_Id])
VALUES ('Lata Vegetales',2);
GO
INSERT INTO asil.tbDonacionesComunes([doco_Nombre], [cado_Id])
VALUES ('Lata Frutas',2);
GO
INSERT INTO asil.tbDonacionesComunes([doco_Nombre], [cado_Id])
VALUES ('Bolsa Leche en polvo',2);
GO
INSERT INTO asil.tbDonacionesComunes([doco_Nombre], [cado_Id])
VALUES ('Libra Aceite vegetal',2);
GO
INSERT INTO asil.tbDonacionesComunes([doco_Nombre], [cado_Id])
VALUES ('Caja de Galletas o crackers',2);
GO
INSERT INTO asil.tbDonacionesComunes([doco_Nombre], [cado_Id])
VALUES ('Libra Azúcar',2);
GO
INSERT INTO asil.tbDonacionesComunes([doco_Nombre], [cado_Id])
VALUES ('Libra Sal',2);
GO
INSERT INTO asil.tbDonacionesComunes([doco_Nombre], [cado_Id])
VALUES ('Bote Café',2);
GO
INSERT INTO asil.tbDonacionesComunes([doco_Nombre], [cado_Id])
VALUES ('Botella Agua',2);
GO
INSERT INTO asil.tbDonacionesComunes([doco_Nombre], [cado_Id])
VALUES ('Paquetes de botellas de Agua',2);
GO
INSERT INTO asil.tbDonacionesComunes([doco_Nombre], [cado_Id])
VALUES ('Caja Barras de granola',2);
GO


INSERT INTO asil.tbDonacionesComunes([doco_Nombre], [cado_Id])
VALUES ('Paquete papel higiénico',3);
GO
INSERT INTO asil.tbDonacionesComunes([doco_Nombre], [cado_Id])
VALUES ('Paquete toallas de papel',3);
GO
INSERT INTO asil.tbDonacionesComunes([doco_Nombre], [cado_Id])
VALUES ('Paquete pañuelos desechables',3);
GO
INSERT INTO asil.tbDonacionesComunes([doco_Nombre], [cado_Id])
VALUES ('Bote jabón de manos líquido',3);
GO
INSERT INTO asil.tbDonacionesComunes([doco_Nombre], [cado_Id])
VALUES ('Caja de jabón en barra',3);
GO
INSERT INTO asil.tbDonacionesComunes([doco_Nombre], [cado_Id])
VALUES ('Bote Champú',3);
GO
INSERT INTO asil.tbDonacionesComunes([doco_Nombre], [cado_Id])
VALUES ('Pasta de dientes',3);
GO
INSERT INTO asil.tbDonacionesComunes([doco_Nombre], [cado_Id])
VALUES ('Cepillos de dientes',3);
GO
INSERT INTO asil.tbDonacionesComunes([doco_Nombre], [cado_Id])
VALUES ('Bote enjuague bucal',3);
GO
INSERT INTO asil.tbDonacionesComunes([doco_Nombre], [cado_Id])
VALUES ('Bote desodorante',3);
GO
INSERT INTO asil.tbDonacionesComunes([doco_Nombre], [cado_Id])
VALUES ('Bote crema corporal',3);
GO
INSERT INTO asil.tbDonacionesComunes([doco_Nombre], [cado_Id])
VALUES ('Paquetes compresas para incontinencia',3);
GO
INSERT INTO asil.tbDonacionesComunes([doco_Nombre], [cado_Id])
VALUES ('Paquete pañales para adultos',3);
GO
INSERT INTO asil.tbDonacionesComunes([doco_Nombre], [cado_Id])
VALUES ('paquete toallitas húmedas para adultos',3);
GO
INSERT INTO asil.tbDonacionesComunes([doco_Nombre], [cado_Id])
VALUES ('Cepillos para el cabello',3);
GO
INSERT INTO asil.tbDonacionesComunes([doco_Nombre], [cado_Id])
VALUES ('Cortauñas',3);
GO
INSERT INTO asil.tbDonacionesComunes([doco_Nombre], [cado_Id])
VALUES ('Limas de uñas',3);
GO
INSERT INTO asil.tbDonacionesComunes([doco_Nombre], [cado_Id])
VALUES ('Bastones de algodón',3);
GO
INSERT INTO asil.tbDonacionesComunes([doco_Nombre], [cado_Id])
VALUES ('Bote desinfectante de manos',3);
GO


INSERT INTO asil.tbDonacionesComunes([doco_Nombre], [cado_Id])
VALUES ('Camisetas de manga corta',4);
GO
INSERT INTO asil.tbDonacionesComunes([doco_Nombre], [cado_Id])
VALUES ('Camisas de botones',4);
GO
INSERT INTO asil.tbDonacionesComunes([doco_Nombre], [cado_Id])
VALUES ('Pantalones de tela o mezclilla',4);
GO
INSERT INTO asil.tbDonacionesComunes([doco_Nombre], [cado_Id])
VALUES ('Faldas ',4);
GO
INSERT INTO asil.tbDonacionesComunes([doco_Nombre], [cado_Id])
VALUES ('Vestidos',4);
GO
INSERT INTO asil.tbDonacionesComunes([doco_Nombre], [cado_Id])
VALUES ('Suéteres ',4);
GO
INSERT INTO asil.tbDonacionesComunes([doco_Nombre], [cado_Id])
VALUES ('Abrigos ',4);
GO
INSERT INTO asil.tbDonacionesComunes([doco_Nombre], [cado_Id])
VALUES ('Calzoncillos',4);
GO
INSERT INTO asil.tbDonacionesComunes([doco_Nombre], [cado_Id])
VALUES ('Zapatillas ',4);
GO
INSERT INTO asil.tbDonacionesComunes([doco_Nombre], [cado_Id])
VALUES ('Gorros ',4);
GO
INSERT INTO asil.tbDonacionesComunes([doco_Nombre], [cado_Id])
VALUES ('Sábanas',4);
GO
INSERT INTO asil.tbDonacionesComunes([doco_Nombre], [cado_Id])
VALUES ('Fundas de almohada',4);
GO
INSERT INTO asil.tbDonacionesComunes([doco_Nombre], [cado_Id])
VALUES ('Mantas ',4);
GO
INSERT INTO asil.tbDonacionesComunes([doco_Nombre], [cado_Id])
VALUES ('Colchas',4);
GO
INSERT INTO asil.tbDonacionesComunes([doco_Nombre], [cado_Id])
VALUES ('Edredones ligeros',4);
GO
INSERT INTO asil.tbDonacionesComunes([doco_Nombre], [cado_Id])
VALUES ('Almohadas',4);
GO
INSERT INTO asil.tbDonacionesComunes([doco_Nombre], [cado_Id])
VALUES ('Almohada impermeables',4);
GO



INSERT INTO asil.tbDonacionesComunes([doco_Nombre], [cado_Id])
VALUES ('Vendajes estériles caja',5);
GO
INSERT INTO asil.tbDonacionesComunes([doco_Nombre], [cado_Id])
VALUES ('Guantes médicos desechables caja',5);
GO
INSERT INTO asil.tbDonacionesComunes([doco_Nombre], [cado_Id])
VALUES ('Mascarillas quirúrgicas caja',5);
GO
INSERT INTO asil.tbDonacionesComunes([doco_Nombre], [cado_Id])
VALUES ('Batas desechables',5);
GO
INSERT INTO asil.tbDonacionesComunes([doco_Nombre], [cado_Id])
VALUES ('Gorros desechables',5);
GO
INSERT INTO asil.tbDonacionesComunes([doco_Nombre], [cado_Id])
VALUES ('Protectores faciales o gafas de seguridad',5);
GO
INSERT INTO asil.tbDonacionesComunes([doco_Nombre], [cado_Id])
VALUES ('Bote de Algodón',5);
GO
INSERT INTO asil.tbDonacionesComunes([doco_Nombre], [cado_Id])
VALUES ('Termómetro',5);
GO
INSERT INTO asil.tbDonacionesComunes([doco_Nombre], [cado_Id])
VALUES ('Rollod de Esparadrapo ',5);
GO
INSERT INTO asil.tbDonacionesComunes([doco_Nombre], [cado_Id])
VALUES ('Jeringa',5);
GO
INSERT INTO asil.tbDonacionesComunes([doco_Nombre], [cado_Id])
VALUES ('Agujas desechables',5);
GO
INSERT INTO asil.tbDonacionesComunes([doco_Nombre], [cado_Id])
VALUES ('Caja de gasas estériles',5);
GO
INSERT INTO asil.tbDonacionesComunes([doco_Nombre], [cado_Id])
VALUES ('Caja de Toallitas desinfectantes',5);
GO
INSERT INTO asil.tbDonacionesComunes([doco_Nombre], [cado_Id])
VALUES ('Bote de Solución salina',5);
GO
INSERT INTO asil.tbDonacionesComunes([doco_Nombre], [cado_Id])
VALUES ('Sillas de ruedas',5);
GO
INSERT INTO asil.tbDonacionesComunes([doco_Nombre], [cado_Id])
VALUES ('bastones para caminar',5);
GO
INSERT INTO asil.tbDonacionesComunes([doco_Nombre], [cado_Id])
VALUES ('Colchones antiescaras',5);
GO
INSERT INTO asil.tbDonacionesComunes([doco_Nombre], [cado_Id])
VALUES ('Bote de Cloro',5);
GO
INSERT INTO asil.tbDonacionesComunes([doco_Nombre], [cado_Id])
VALUES ('Bote de detergente',5);
GO
INSERT INTO asil.tbDonacionesComunes([doco_Nombre], [cado_Id])
VALUES ('Escoba',5);
GO
INSERT INTO asil.tbDonacionesComunes([doco_Nombre], [cado_Id])
VALUES ('Trapeador',5);
GO






CREATE TABLE asil.tbDonaciones
(
	dona_Id						INT IDENTITY,
	dona_Fecha					DATE NOT NULL,
	dona_QueEs					CHAR(1),
	dona_NombreDonante			NVARCHAR(400) NOT NULL,

	dona_UsuCreacion			INT NOT NULL,
	dona_FechaCreacion			DATETIME NOT NULL CONSTRAINT DF_dona_FechaCreacion DEFAULT(GETDATE()),
	dona_UsuModificacion		INT,
	dona_FechaModificacion		DATETIME,
	dona_Estado					BIT NOT NULL CONSTRAINT DF_dona_Estado DEFAULT(1)
	CONSTRAINT PK_asil_tbDonaciones_dona_Id													PRIMARY KEY(dona_Id),
	CONSTRAINT FK_asil_tbDonaciones_acce_tbUsuarios_dona_UsuCreacion_usua_Id  				FOREIGN KEY(dona_UsuCreacion) 			REFERENCES acce.tbUsuarios(usua_Id),
	CONSTRAINT FK_asil_tbDonaciones_acce_tbUsuarios_dona_UsuModificacion_usua_Id  			FOREIGN KEY(dona_UsuModificacion) 		REFERENCES acce.tbUsuarios(usua_Id),

);
GO

CREATE TABLE asil.tbDonacionesDetalles(
	deto_Id						INT IDENTITY PRIMARY KEY,
	dona_Id						INT NOT NULL,
	doco_Id						INT,
	deto_Cantidad				INT,
	deto_Descripcion			NVARCHAR(MAX),
	deto_Estado					BIT DEFAULT 1,
	CONSTRAINT FK_asil_tbDonacionesDetalles_doco_Id_tbDonacionesComunes								FOREIGN KEY(doco_Id) 					REFERENCES asil.tbDonacionesComunes(doco_Id),
	CONSTRAINT FK_asil_tbDonacionesDetalles_dona_Id_tbDonaciones									FOREIGN KEY(dona_Id) 					REFERENCES asil.tbDonaciones(dona_Id),

);


--********TABLA DONACIONES X CENTRO****************---
CREATE TABLE asil.tbDonacionesXCentro
(
	donacent_Id						INT IDENTITY,
	dona_Id							INT NOT NULL,
	cent_Id							INT NOT NULL,
	donacent_UsuCreacion			INT NOT NULL,
	donacent_FechaCreacion			DATETIME NOT NULL CONSTRAINT DF_donacent_FechaCreacion DEFAULT(GETDATE()),
	donacent_UsuModificacion		INT,
	donacent_FechaModificacion		DATETIME,
	donacent_Estado					BIT NOT NULL CONSTRAINT DF_donacent_Estado DEFAULT(1)
	CONSTRAINT PK_asil_tbDonacionesXcentro_donacent_Id													PRIMARY KEY(donacent_Id),
	CONSTRAINT FK_asil_tbDonacionesXcentro_acce_tbUsuarios_donacent_UsuCreacion_usua_Id  				FOREIGN KEY(donacent_UsuCreacion) 			REFERENCES acce.tbUsuarios(usua_Id),
	CONSTRAINT FK_asil_tbDonacionesXcentro_acce_tbUsuarios_donacent_UsuModificacion_usua_Id  			FOREIGN KEY(donacent_UsuModificacion) 		REFERENCES acce.tbUsuarios(usua_Id),
	CONSTRAINT FK_asil_tbDonacionesXCentro_tbDonaciones_dona_Id 										FOREIGN KEY(dona_Id) 						REFERENCES  asil.tbDonaciones(dona_Id),
    CONSTRAINT FK_asil_tbDonacionesXCentro_tbCentros_cent_Id											FOREIGN KEY(cent_Id) 						REFERENCES  asil.tbCentros(cent_Id)

);
GO


--****************************************************************************************************************************************************

--********TABLA MUERTOS****************---
CREATE TABLE asil.tbMuertos
(
	muer_Id						INT IDENTITY,
	resi_Id						INT NOT NULL,
	muer_FechaYHora				DATETIME NOT NULL,
	muer_Descripcion			NVARCHAR(500),					

	muer_UsuCreacion			INT NOT NULL,
	muer_FechaCreacion			DATETIME NOT NULL CONSTRAINT DF_muer_FechaCreacion DEFAULT(GETDATE()),
	muer_UsuModificacion		INT,
	muer_FechaModificacion		DATETIME,
	muer_Estado					BIT NOT NULL CONSTRAINT DF_muer_Estado DEFAULT(1)
	CONSTRAINT PK_asil_tbMuertos_muer_Id												PRIMARY KEY(muer_Id),
	CONSTRAINT FK_asil_tbMuertos_acce_tbUsuarios_muer_UsuCreacion_usua_Id  				FOREIGN KEY(muer_UsuCreacion) 			REFERENCES acce.tbUsuarios(usua_Id),
	CONSTRAINT FK_asil_tbMuertos_acce_tbUsuarios_muer_UsuModificacion_usua_Id  			FOREIGN KEY(muer_UsuModificacion) 		REFERENCES acce.tbUsuarios(usua_Id),
	CONSTRAINT FK_asil_tbMuertos_asil_tbResidentes_resi_Id 								FOREIGN KEY(resi_Id) 					REFERENCES asil.tbResidentes(resi_Id)
);
GO

--INSERT DE LA BASE DE DATOS

INSERT gral.tbDepartamentos(depa_Id, depa_Nombre, depa_UsuCreacion)
VALUES('01','Atlantida', 1),
      ('02','Colon', 1),
	  ('03','Comayagua', 1),
	  ('04','Copan', 1),
	  ('05','Cortes', 1),
	  ('06','Choluteca', 1),
	  ('07','El Paraiso', 1),
	  ('08','Francisco Morazan', 1),
	  ('09','Gracias a Dios', 1),
	  ('10','Intibuca', 1),
	  ('11','Islas de La Bahia', 1),
	  ('12','La Paz', 1),
	  ('13','Lempira', 1),
	  ('14','Ocotepeque', 1),
	  ('15','Olancho', 1),
	  ('16','Santa Barbara', 1),
	  ('17','Valle', 1),
	  ('18','Yoro', 1);
GO

INSERT gral.tbMunicipios(muni_id, muni_Nombre, depa_Id, muni_UsuCreacion)
VALUES('0101','La Ceiba ','01', 1),
      ('0102','El Porvenir','01', 1), 
	  ('0103','Esparta','01', 1),
	  ('0104','Jutiapa','01', 1),
	  ('0105','La Masica','01', 1),
	  ('0201','Trujillo','02', 1),
	  ('0202','Balfate','02', 1),
	  ('0203','Iriona','02', 1),
	  ('0204','Limon','02', 1),
	  ('0205','Saba','02', 1),
	  ('0301','Comayagua','03', 1),
	  ('0302','Ajuterique','03', 1),
      ('0303','El Rosario','03', 1),
	  ('0304','Esquias','03', 1),
      ('0305','Humuya','03', 1),
	  ('0401','Santa Rosa de Copan','04', 1),
	  ('0402','Cabanas','04', 1),
      ('0403','Concepcion','04', 1),
	  ('0404','Copan Ruinas','04', 1),
      ('0405','Corquin','04', 1),
	  ('0501','San Pedro Sula ','05', 1),
      ('0502','Choloma ','05', 1),
      ('0503','Omoa','05', 1),
      ('0504','Pimienta','05', 1),
	  ('0505','Potrerillos','05', 1),
	  ('0506','Puerto Cortes','05', 1),
	  ('0601','Choluteca','06', 1),
      ('0602','Apacilagua','06', 1),
      ('0603','Concepcion de Maria','06', 1),
      ('0604','Duyure','06', 1),
	  ('0605','El Corpus','07', 1),
	  ('0701','Yuscaran','07', 1),
      ('0702','Alauca','07', 1),
      ('0703','Danli','07', 1),
	  ('0704','El Paraiso','07', 1),
      ('0705','Ghinope','07', 1),
	  ('0801','Distrito Central (Comayaguela y Tegucigalpa)','08', 1),
      ('0802','Alubaran','08', 1),
      ('0803','Cedros','08', 1),
      ('0804','Curaron','08', 1),
	  ('0805','El Porvenir','08', 1),
	  ('0901','Puerto Lempira','09', 1),
      ('0902','Brus Laguna','09', 1),
      ('0903','Ahuas','09', 1),
	  ('0904','Juan Francisco Bulnes','09', 1),
      ('0905','Villeda Morales','09', 1),
	  ('1001','La Esperanza','10', 1),
      ('1002','Camasca','10', 1),
      ('1003','Colomoncagua','10', 1),
	  ('1004','Concepcion','10', 1),
      ('1005','Dolores','10', 1),
	  ('1101','Roatan','11', 1),
      ('1102','Guanaja','11', 1),
      ('1103','Jose Santos Guardiola','11', 1),
	  ('1104','Utila','11', 1),
	  ('1201','La Paz','12', 1),
      ('1202','Aguanqueterique','12', 1),
      ('1203','Cabanas','12', 1),
	  ('1204','Cane','12', 1),
      ('1205','Chinacla','12', 1),
	  ('1301','Gracias','13', 1),
      ('1302','Belen','13', 1),
      ('1303','Candelaria','13', 1),
	  ('1304','Cololaca','13', 1),
      ('1305','Erandique','13', 1),
	  ('1401','Ocotepeque','14', 1),
      ('1402','Belen Gualcho','14', 1),
      ('1403','Concepcion','14', 1),
	  ('1404','Dolores Merendon','14', 1),
      ('1405','Fraternidad','14', 1),
	  ('1501','Juticalpa','15', 1),
      ('1502','Campamento','15', 1),
      ('1503','Catacamas','15', 1),
	  ('1504','Concordia','15', 1),
      ('1505','Dulce Nombre de Culmo','15', 1),
	  ('1601','Santa Barbara','16', 1),
      ('1602','Arada','16', 1),
      ('1603','Atima','16', 1),
	  ('1604','Azacualpa','16', 1),
      ('1605','Ceguaca','16', 1),
	  ('1701','Nacaome','17', 1),
      ('1702','Alianza','17', 1),
      ('1703','Amapala','17', 1),
	  ('1704','Aramecina','17', 1),
      ('1705','Caridad','17', 1),
	  ('1801','Yoro','18', 1),
      ('1802','Arenal','18', 1),
      ('1803','El Negrito','18', 1),
	  ('1804','El Progreso','18', 1),
      ('1805','Jocon','18', 1)
GO
--********INSERT TABLA METODOS DE PAGOS****************---
INSERT INTO asil.tbMetodosPago(meto_Nombre, meto_UsuCreacion)
VALUES('Efectivo',1),
      ('Tarjeta',1)
GO

--********INSERT TABLA Estados Civiles****************---
INSERT INTO gral.tbEstadosCiviles(estacivi_Nombre,estacivi_UsuCreacion)
VALUES('Soltero(a)',1),
      ('Casado(a)',1),
      ('Viudo(a)',1),
	  ('Divorciado(a)',1),
	  ('Union Libre',1)
GO

--********INSERT TABLA CENTROS****************---
INSERT INTO asil.tbCentros(cent_Nombre, muni_Id, cent_Direccion, cent_UsuCreacion)
VALUES('Asilo de Ancianos Milagros del Socorro Roatán', '1101', 'Avenida La Paz',1 ),
      ('Asilo de Ancianos Milagros del Socorro La Ceiba', '0101', 'Barrio La Granja',1 ),
	  ('Asilo de Ancianos Milagros del Socorro Catacamas', '1503', 'Avenida el Porvenir',1 ),
	  ('Asilo de Ancianos Milagros del Socorro El Progreso', '1804', 'Barrio Progreso',1 ),
	  ('Asilo de Ancianos Milagros del Socorro Omoa', '0503', '11 calle, 2 avenida',1 )
GO


--********INSERT TABLA ENFERMEDADES****************---
INSERT INTO asil.tbEnfermedades(enfe_Nombre, enfe_UsuCreacion)
VALUES('Mal de Alzheimer',1),
      ('Artritis',1),
	  ('Asma',1),
	  ('Cáncer',1),
	  ('EPOC',1),
	  ('Enfermedad de Crohn',1),
	  ('Fibrosis quística',1),
	  ('Diabetes',1),
	  ('Presión arterial alta (hipertensión)',1),
	  ('VIH/sida',1),
	  ('Migraña',1),
	  ('Depresión',1),
	  ('Bipolar',1),
	  ('Mal de Parkinson',1)
GO
--********INSERT TABLA ACTIVIDADES****************---
INSERT INTO asil.tbActividades(acti_Nombre,acti_Class,acti_UsuCreacion)
VALUES('Medicación','bg-info',1),
	  ('Desayuno','bg-warning',1),
      ('Almuerzo','bg-danger',1),
	  ('Cena','bg-dark',1),
	  ('Caminar','bg-success',1),
	  ('Juegos de mesa','bg-success',1),
	  ('Lectura','bg-primary',1)


GO
 --********INSERT TABLA CATEGORIAS HABITACIONES****************---
INSERT INTO asil.tbCategoriasHabitaciones(cate_Nombre, cate_Capacidad, cate_Climatizacion, cate_UsuCreacion)
VALUES('Habitación Individual',1,1,1),
	  ('Habitación Doble',2,0,1),
	  ('Habitación Triple',3,0,1),
	  ('Habitación cuádruple',1,4,1)
GO


 --********INSERT TABLA CATEGORIAS HABITACIONES****************---
INSERT INTO asil.tbHabitaciones(habi_Numero, cate_Id, cent_Id, habi_UsuCreacion)
VALUES
  ('100', 1, 1, 1),
  ('100', 2, 2, 1),
  ('100', 1, 3, 1),
  ('100', 1, 4, 1),
  ('101', 3, 2, 1),
  ('101', 1, 4, 1),
  ('102', 2, 3, 1),
  ('102', 2, 4, 1),
  ('103', 1, 1, 1),
  ('103', 3, 2, 1),
  ('104', 1, 2, 1),
  ('104', 2, 3, 1),
  ('105', 2, 4, 1),
  ('105', 3, 1, 1),
  ('106', 1, 3, 1),
  ('106', 1, 4, 1),
  ('107', 2, 2, 1),
  ('107', 3, 1, 1),
  ('108', 1, 1, 1),
  ('108', 2, 3, 1);


--********INSERT TABLA CARGOS****************---
INSERT INTO asil.tbCargos(carg_Nombre, carg_UsuCreacion)
VALUES('Gerente',1),
      ('Cuidador',1),
	  ('Psicólogo',1),
	  ('Trabajador social',1),
	  ('Enfermero con conocimientos en geriatría',1),
	  ('Auxiliares de enfermería',1),
	  ('Animador sociocultural',1),
	  ('Educador Social.',1),
	  ('Cocineros',1),
	  ('Ayudantes de cocina',1),
	  ('Doctor especializado en geriatría',1),
	  ('Médico especializado en geriatría',1)
GO
	  --********INSERT TABLA DIETA ****************---
INSERT INTO asil.tbDietas(diet_Desayuno, diet_Almuerzo, diet_Cena, diet_Merienda, diet_UsuCreacion)
VALUES('', '','','',1);

INSERT INTO asil.tbDietas(diet_Desayuno, diet_Almuerzo, diet_Cena, diet_Merienda, diet_UsuCreacion)
VALUES('Leche descremada,cereales integrales', 'Fruta,legumbre,Carne poco grasa','patata y verduras,queso','Yogurt poco azucarado',1);

INSERT INTO asil.tbDietas(diet_Desayuno, diet_Almuerzo, diet_Cena, diet_Merienda, diet_UsuCreacion)
VALUES('Cafe con leche, Tostadas con aceite, pera', 'Crema de patatas, Albondigas con tomate y pan','Sopa de fideos, salchichas de pollo, pan','Vaso d leche con magdalenas',1);
GO
INSERT INTO asil.tbDietas(diet_Desayuno, diet_Almuerzo, diet_Cena, diet_Merienda, diet_UsuCreacion)
VALUES	  ('Galletas con mermelada, leche', 'Ensalada de tomate, Lentejas con chorizo','Calabacines rellenos, Pan y yogur','Cafe con leche pan con aceite y queso',1);

GO
INSERT INTO asil.tbDietas(diet_Desayuno, diet_Almuerzo, diet_Cena, diet_Merienda, diet_UsuCreacion)
VALUES	  ('Jugo de naranja, sandwich de jamón y queso', 'Patatas estofadas, ensalada verde, pan, cuajada','Acelgas rehogadas con ajo, jamon de pollo al horno y Manzana','Yogur con miel y nueces',1);

GO
INSERT INTO asil.tbDietas(diet_Desayuno, diet_Almuerzo, diet_Cena, diet_Merienda, diet_UsuCreacion)
VALUES	  ('Brioche, Zumo de naranja y mandarina', 'Ensalada variada, Paella marinera','Flan de pescado con salsa de tomate, kiwi','Yogur con galletas',1);

GO
INSERT INTO asil.tbDietas(diet_Desayuno, diet_Almuerzo, diet_Cena, diet_Merienda, diet_UsuCreacion)
VALUES	  ('Leche, Tostadas con jamón y frutos secos', 'Potaje de espinacas y garbanzos, Pescado Frito','Crema de puerros, tortillas de patatas, jugo de piña','Bizcochos de fresa',1);


GO
	  --********INSERT TABLA agendas ****************---

INSERT INTO asil.tbAgendas( [agen_Nombre], [agen_UsuCreacion])
VALUES('Estándar',1);
GO
--INSERT INTO asil.tbAgendas( [agen_Nombre], [agen_UsuCreacion])
--VALUES('De pago',1);

	  --********INSERT TABLA Residente ****************---
INSERT INTO asil.tbResidentes(resi_Nombres, resi_Apellidos, resi_Identidad, estacivi_Id, resi_Nacimiento, resi_Sexo, cent_Id, diet_Id,[agen_Id], resi_FechaIngreso, resi_UsuCreacion)
VALUES('Lourdes Darleny', 'Rodriguez', '0102036515786',1,'1975-12-05','F',1,2,1,'2010-10-05',1);
GO
INSERT INTO asil.tbResidentes(resi_Nombres, resi_Apellidos, resi_Identidad, estacivi_Id, resi_Nacimiento, resi_Sexo, cent_Id, diet_Id,[agen_Id], resi_FechaIngreso, resi_UsuCreacion)
VALUES('Maria Lucero', 'Ramirez', '4528796123541',1,'1970-12-02','F',4,3,1,'2010-02-25',1);
GO
INSERT INTO asil.tbResidentes(resi_Nombres, resi_Apellidos, resi_Identidad, estacivi_Id, resi_Nacimiento, resi_Sexo, cent_Id, diet_Id,[agen_Id], resi_FechaIngreso, resi_UsuCreacion)
VALUES('Karla Elisa', 'Ramirez', '8596796123546',1,'1970-11-12','F',3,4,1,'2012-02-25',1);
GO
INSERT INTO asil.tbResidentes(resi_Nombres, resi_Apellidos, resi_Identidad, estacivi_Id, resi_Nacimiento, resi_Sexo, cent_Id, diet_Id,[agen_Id], resi_FechaIngreso, resi_UsuCreacion)
VALUES('Elisa', 'Maradiaga', '8596256152354',1,'1970-11-12','F',2,5,1,'2012-02-25',1);


INSERT INTO asil.tbHabitacionesXResidente(habi_Id, resi_Id, habiresi_UsuCreacion)
VALUES (1, 1, 1),
	   (6, 2, 1),
	   (3, 3, 1),
	   (2, 4, 1)

	  --********INSERT TABLA Proveedores ****************---
INSERT INTO [asil].[tbProveedores](prov_Nombre, prov_CorreoElectronico, prov_Telefono, muni_Id, prov_Direccion, prov_UsuCreacion)
VALUES
  ('PharmaCorp', 'info@pharmacorp.com', '555-123-4567', '0501', '123 Main Street', 1),
  ('MediSupplies', 'sales@medisupplies.com', '555-987-6543', '1805', '456 Elm Street', 1),
  ('HealthPlus', 'info@healthplus.com', '555-789-0123', '1705', '789 Oak Avenue', 1),
  ('MediWorld', 'sales@mediworld.com', '555-456-7890', '1605', '987 Pine Road', 1),
  ('PharmaLink', 'info@pharmalink.com', '555-234-5678', '0201', '654 Cedar Lane', 1),
  ('MediCare', 'sales@medicare.com', '555-876-5432', '1503', '321 Maple Avenue', 1),
  ('HealthLine', 'info@healthline.com', '555-345-6789', '1802', '789 Oak Street', 1),
  ('PharmaDirect', 'sales@pharmadirect.com', '555-678-9012', '1802', '456 Elm Road', 1),
  ('MediPharm', 'info@medipharm.com', '555-901-2345', '0505', '123 Pine Lane', 1),
  ('HealthCare', 'sales@healthcare.com', '555-789-0123', '1703', '987 Maple Street', 1);


	  --********INSERT TABLA Tipo de Sangre ****************---
INSERT INTO [asil].tbTiposSangre([tiposang_Nombre], [tiposang_UsuCreacion])
VALUES
  ('A+', 1),
  ('A-', 1),
  ('B+', 1),
  ('B-', 1),
  ('AB+', 1),
  ('AB-', 1),
  ('O+', 1),
  ('O-', 1);

  
INSERT INTO [asil].[tbExpedientes]([resi_Id], [tiposang_Id], [expe_FechaApertura], [expe_Fotografia], [expe_UsuCreacion])
VALUES (1,1,'2019-02-28','https://i.ibb.co/gwPvK1D/lourdes.jpg',1),
	   (2,1,'2019-12-28','https://i.ibb.co/bmkYXSJ/foto-042-486x734.jpg',1),
	   (3,4,'2021-05-06','https://i.ibb.co/YcS5wZk/s-old-woman-portrait.jpg',1),
	   (4,2,'2021-05-06','https://i.ibb.co/PNrM316/113179532-h-720.jpg',1)




INSERT INTO  asil.tbEmpleados(empe_Nombres,empe_Apellidos,empe_Identidad,empe_Sexo,estacivi_Id,empe_Nacimiento,muni_Id,empe_Direccion,empe_Telefono,empe_Correo,carg_Id,cent_Id,empe_UsuCreacion)
VALUES('Catalina','Diaz','0502198001425','F',1,'1990-12-05','0502','Barrio el Centro','89526301','diaz12@gmail.com',1,1,1),
      ('Karla','Hernadez','0502198005263','F',1,'2000-12-09','0502','3 calle 1 avenida ','99526301','hernadez2@gmail.com',2,1,1),
	  ('Valentin','Andrades','0502200005263','M',1,'2000-03-09','0502','1 calle 1 avenida ','99876301','Andradess@gmail.com',3,1,1),
	  ('Juan','Perez','0102200005263','M',1,'2000-03-12','0502','1 calle 3 avenida ','99874401','juan34@gmail.com',4,1,1),
	  ('Kevin','Manzano','0102200002263','M',1,'2000-04-13','0502','1 calle 3 avenida ','39874401','kevin@gmail.com',5,1,1),
	  ('Keneth','Menjivar','0103200002263','M',1,'2000-05-23','0502','2 calle 3 avenida ','39858401','keneth23@gmail.com',6,1,1),
	  ('Sebastian','Alvares','0103200302263','M',1,'2000-05-23','0502','2 calle 2 avenida ','39858401','sebastian23@gmail.com',2,1,1),
	  ('Manuel','Almendradez','0203200202263','M',1,'2000-01-03','0502','1 calle 3 avenida ','90858401','manuel23@gmail.com',2,1,1),
	  ('Mario','Jimenez','0501200202263','M',1,'2000-10-03','0502','3 calle 3 avenida ','91858401','mmario@gmail.com',2,1,1),
	  ('Carlos', 'Martínez', '0502198001455', 'M', 1, '1980-05-02', '0502', 'Calle Principal #123', '99991234', 'carlosmartinez@gmail.com', 2, 2, 1),
	  ('María', 'García', '0502199005263', 'F', 1, '1990-02-05', '0502', 'Avenida Central #456', '99996543', 'mariagarcia@gmail.com', 2, 3, 1),
	  ('Luis', 'Hernández', '0502200015263', 'M', 1, '2000-12-05', '0502', 'Barrio Nuevo #789', '99992134', 'luishernandez@gmail.com', 2, 4, 1),
	  ('Ana', 'Rodríguez', '0102200001263', 'F', 1, '2000-02-01', '0502', 'Calle Secundaria #234', '99991222', 'anarodriguez@gmail.com', 2, 3, 1),
	  ('Pedro', 'López', '0102205002263', 'M', 1, '2000-02-01', '0502', 'Avenida Principal #567', '99996567', 'pedrolopez@gmail.com', 2, 4, 1),
	  ('Laura', 'Flores', '0203200205263', 'F', 1, '2002-03-02', '0502', 'Avenida Vieja #222', '99992222', 'lauraflores@gmail.com', 5, 1, 1);


	  --********INSERT TABLA Parentescos ****************---
INSERT INTO [asil].tbParentescos(pare_Nombre, pare_UsuCreacion)
VALUES
  ('Padre/Madre', 1),
  ('Tío(a)', 1),
  ('Primo(a)', 1),
  ('Hijo(a)', 1),
  ('Nieto(a)', 1),
  ('Sobrino(a)', 1),
  ('Hermano(a)', 1),
  ('Otro', 1);


----********INSERT TABLA Agendas ****************---
--INSERT INTO [asil].tbAgendas(agen_Nombre, agen_UsuCreacion)
--VALUES
--  ('Estándar', 1)


--********INSERT TABLA Agendas Detalles****************---
INSERT INTO [asil].tbAgendaDetalles(agen_Id, agendeta_HoraStart, agendeta_HoraEnd, acti_Id, medi_Id,agendeta_Observaciones, agendeta_UsuCreacion)
VALUES (1, '09:00', '10:30', 2, null,  null, 1),
	   (1, '12:00', '13:30', 3, null,  null, 1),
	   (1, '18:00', '19:30', 4, null,  null, 1),
	   (1, '15:20', '15:45', 6, null,  'no todos tienen q ir jejejej', 1)


--********INSERT TABLA Medicamentos****************---
INSERT INTO [asil].tbMedicamentos(medi_Nombre, prov_Id, medi_UsuCreacion)
VALUES ('Divalproato sódico', 1, 1),
	   ('Olanzapina (Zyprexa)', 10, 1),
	   ('Acetato de metilprednisolona', 5, 1),
	   ('Hidroxicloroquina', 1, 1),
	   ('Nateglinida ', 8, 1)



GO

INSERT INTO asil.tbEncargados([enca_Nombres], [enca_Apellidos], [enca_Identidad], [estacivi_Id], [enca_Nacimiento], [enca_Sexo], [muni_Id], [enca_Direccion], [enca_Telefono], [resi_Id], [pare_Id], [enca_UsuCreacion])
VALUES('Andrés','álvarez','0502200102725',1,'2001-02-14','M','0502','Residencial la europa calle 5, casa 16','99658475',1,2,1);
GO

INSERT INTO asil.tbEncargados ([enca_Nombres], [enca_Apellidos], [enca_Identidad], [estacivi_Id], [enca_Nacimiento], [enca_Sexo], [muni_Id], [enca_Direccion], [enca_Telefono], [resi_Id], [pare_Id], [enca_UsuCreacion])
VALUES ('Juan', 'Pérez', '0401199801234', 2, '1998-01-04', 'M', '0401', 'Colonia San Marcos calle 10, casa 24', '98765432', 2, 3, 1);

GO
INSERT INTO asil.tbEncargados ([enca_Nombres], [enca_Apellidos], [enca_Identidad], [estacivi_Id], [enca_Nacimiento], [enca_Sexo], [muni_Id], [enca_Direccion], [enca_Telefono], [resi_Id], [pare_Id], [enca_UsuCreacion])
VALUES ('María', 'López', '0305199509876', 3, '1995-05-03', 'F', '0305', 'Barrio El Centro calle 15, casa 8', '12345678', 3, 4, 1);
GO





INSERT INTO asil.tbHistorialPagos([resi_Id], [meto_Id], [pago_Fecha], [pago_UsuCreacion])
VALUES(1,1,'2023-05-20',1);
GO

INSERT INTO asil.tbHistorialPagos([resi_Id], [meto_Id], [pago_Fecha], [pago_UsuCreacion])
VALUES(1,2,'2023-04-20',1);
GO

INSERT INTO asil.tbHistorialPagos([resi_Id], [meto_Id], [pago_Fecha], [pago_UsuCreacion])
VALUES(1,1,'2023-03-20',1);
GO

INSERT INTO asil.tbHistorialPagos([resi_Id], [meto_Id], [pago_Fecha], [pago_UsuCreacion])
VALUES(2,1,'2023-05-20',1);
GO

INSERT INTO asil.tbHistorialPagos([resi_Id], [meto_Id], [pago_Fecha], [pago_UsuCreacion])
VALUES(2,2,'2023-04-20',1);
GO

INSERT INTO asil.tbHistorialPagos([resi_Id], [meto_Id], [pago_Fecha], [pago_UsuCreacion])
VALUES(2,1,'2023-03-20',1);
GO







  INSERT INTO [acce].[tbPantallasPorRoles](role_Id,pant_Id,pantrole_UsuCreacion)
  VALUES(1,2,1),
        (1,4,1),
		(1,5,1),
		(2,6,1),
		(1,7,1),
		(1,8,1),
		(2,9,1),
		(2,10,1),
		(2,11,1)
