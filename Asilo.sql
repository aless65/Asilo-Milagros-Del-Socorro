CREATE DATABASE Asilo

GO
USE Asilo
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
	pant_Nombre				NVARCHAR(100) NOT NULL,
	pant_Url				NVARCHAR(300) NOT NULL,
	pant_Menu				NVARCHAR(300) NOT NULL,
	pant_Icon				NVARCHAR(80) NOT NULL,
	pant_UsuCreacion		INT NOT NULL,
	pant_FechaCreacion		DATETIME NOT NULL CONSTRAINT DF_pant_FechaCreacion DEFAULT(GETDATE()),
	pant_UsuModificacion	INT,
	pant_FechaModificacion	DATETIME,
	pant_Estado				BIT NOT NULL CONSTRAINT DF_pant_Estado DEFAULT(1)
	CONSTRAINT PK_acce_tbPantallas_pant_Id PRIMARY KEY(pant_Id)
);
GO

INSERT INTO acce.tbPantallas(pant_Nombre, pant_Url, pant_Menu, pant_Icon, pant_UsuCreacion)
VALUES ('usuarios', '/acceso/usuarios', 'acceso', 'ic_user', 1),
       ('roles', '/acceso/roles', 'acceso', 'ic_kanban', 1),
	   ('reporte citas', '/reportes/citas', 'reportes', 'ic_analytics', 1),
       ('empleados', '/asilca/empleados', 'óptica', 'ic_user', 1),
	   ('clientes', '/asilca/clientes', 'óptica', 'ic_user', 1),
	   ('citas', '/asilca/citas', 'óptica', 'ic_calendar', 1),
	   ('proveedores', '/asilca/proveedores', 'óptica', 'ic_banking', 1),
	   ('ordenes', '/asilca/ordenes', 'óptica', 'ic_booking', 1),
	   ('marcas', '/asilca/marcas', 'óptica', 'ic_ecommerce', 1),
	   ('categorias', '/asilca/categorias','óptica', 'ic_blog', 1),
	   ('sucursales', '/asilca/sucursales', 'óptica', 'ic_banking', 1),
	   ('consultorios', '/asilca/consultorios', 'óptica', 'ic_chat', 1),
	   ('envios', '/asilca/envios', 'óptica', 'ic_mail', 1),
	   ('ventas', '/asilca/ventas', 'óptica', 'ic_cart', 1),
	   ('facturas', '/asilca/facturas', 'óptica', 'ic_invoice', 1)
       --('Marca', '/Marca/Listado', 'asilca', 'marcasItem', 1)
GO



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
	usua_NombreUsuario		NVARCHAR(100) NOT NULL,
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
	muni_Id					INT NOT NULL,
	cent_Direccion			NVARCHAR(500) NOT NULL,

	cent_UsuCreacion		INT NOT NULL,
	cent_FechaCreacion		DATETIME NOT NULL CONSTRAINT DF_cent_FechaCreacion DEFAULT(GETDATE()),
	cent_UsuModificacion	INT,
	cent_FechaModificacion	DATETIME,
	cent_Estado				BIT NOT NULL CONSTRAINT DF_cent_Estado DEFAULT(1)
	CONSTRAINT PK_asil_tbCentros_cent_Id 												PRIMARY KEY(cent_Id),
	CONSTRAINT FK_asil_tbCentros_acce_tbUsuarios_cent_UsuCreacion_usua_Id  				FOREIGN KEY(cent_UsuCreacion) 			REFERENCES acce.tbUsuarios(usua_Id),
	CONSTRAINT FK_asil_tbCentros_acce_tbUsuarios_cent_UsuModificacion_usua_Id  			FOREIGN KEY(cent_UsuModificacion) 		REFERENCES acce.tbUsuarios(usua_Id),
	CONSTRAINT FK_asil_tbCentros_gral_tbMunicipios_muni_Id 								FOREIGN KEY(muni_Id) 					REFERENCES acce.tbUsuarios(usua_Id),
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
CREATE TABLE acce.tbInventarioPorCentro(
	invecent_Id					INT IDENTITY,
	medi_Id						INT NOT NULL,
	cent_Id						INT NOT NULL,
	invecent_Stock				INT NOT NULL,

	invecent_UsuCreacion		INT NOT NULL,
	invecent_FechaCreacion		DATETIME NOT NULL CONSTRAINT DF_invecent_FechaCreacion DEFAULT(GETDATE()),
	invecent_UsuModificacion	INT,
	invecent_FechaModificacion	DATETIME,
	invecent_Estado				BIT NOT NULL CONSTRAINT DF_invecent_Estado DEFAULT(1)

	CONSTRAINT PK_acce_tbInventarioPorCentro_invecent_Id					PRIMARY KEY(invecent_Id),
	CONSTRAINT FK_acce_tbInventarioPorCentro_asil_tbMedicamentos_medi_Id	FOREIGN KEY(medi_Id)	REFERENCES asil.tbMedicamentos(medi_Id),
	CONSTRAINT FK_acce_tbInventarioPorCentro_asil_tbCentros_cent_Id			FOREIGN KEY(cent_Id)	REFERENCES asil.tbCentros(cent_Id),
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
	diet_Desayuno			NVARCHAR(500) NOT NULL,
	diet_Almuerzo			NVARCHAR(500) NOT NULL,
	diet_Cena				NVARCHAR(500) NOT NULL,
	diet_Merienda			NVARCHAR(500) NOT NULL,
	diet_Restricciones		NVARCHAR(500) NOT NULL,
	diet_Observaciones		NVARCHAR(500) NOT NULL,
	
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

--********TABLA RESIDENTES****************---
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
	empe_Direccion			DATE NOT NULL,
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
	agendeta_Hora				TIME NOT NULL,
	acti_Id						INT NOT NULL,
	medi_Id						INT NOT NULL,
	agendeta_Observaciones		NVARCHAR(500) NOT NULL,
	
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
	diet_Id					INT NOT NULL,
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
	muni_Id					CHAR(4) NOT NULL,
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

--********TABLA DONACIONES****************---
CREATE TABLE asil.tbDonaciones
(
	dona_Id						INT IDENTITY,
	dona_NombreDonante			NVARCHAR(400) NOT NULL,
	dona_Cantidad				DECIMAL(18, 2) NOT NULL,
	
	dona_UsuCreacion			INT NOT NULL,
	dona_FechaCreacion			DATETIME NOT NULL CONSTRAINT DF_dona_FechaCreacion DEFAULT(GETDATE()),
	dona_UsuModificacion		INT,
	dona_FechaModificacion		DATETIME,
	dona_Estado					BIT NOT NULL CONSTRAINT DF_dona_Estado DEFAULT(1)
	CONSTRAINT PK_asil_tbDonaciones_dona_Id													PRIMARY KEY(dona_Id),
	CONSTRAINT FK_asil_tbDonaciones_acce_tbUsuarios_dona_UsuCreacion_usua_Id  				FOREIGN KEY(dona_UsuCreacion) 			REFERENCES acce.tbUsuarios(usua_Id),
	CONSTRAINT FK_asil_tbDonaciones_acce_tbUsuarios_dona_UsuModificacion_usua_Id  			FOREIGN KEY(dona_UsuModificacion) 		REFERENCES acce.tbUsuarios(usua_Id)
);
GO

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
	CONSTRAINT PK_asil_tbDonaciones_donacent_Id													PRIMARY KEY(dona_Id),
	CONSTRAINT FK_asil_tbDonaciones_acce_tbUsuarios_donacent_UsuCreacion_usua_Id  				FOREIGN KEY(donacent_UsuCreacion) 			REFERENCES acce.tbUsuarios(usua_Id),
	CONSTRAINT FK_asil_tbDonaciones_acce_tbUsuarios_donacent_UsuModificacion_usua_Id  			FOREIGN KEY(donacent_UsuModificacion) 		REFERENCES acce.tbUsuarios(usua_Id)
);
GO

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

