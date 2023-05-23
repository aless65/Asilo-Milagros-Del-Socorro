
--************EMPLEADOS******************--

/*VISTA EMPLEADOS*/
CREATE OR ALTER   VIEW [asil].[VW_tbEmpleados]
AS
	SELECT emp.[empe_Id], [empe_Nombres], [empe_Apellidos],emp.empe_Nombres +' '+ emp.empe_Apellidos empe_NombreCompleto ,[empe_Identidad], 
	[empe_Sexo], CASE WHEN empe_Sexo= 'F' THEN 'Femenino'
				ELSE 'Masculino'
			END AS SexoDes,emp.[estacivi_Id],est.estacivi_Nombre, [empe_Nacimiento],
	emp.[muni_Id],muni.muni_Nombre, depa.depa_Id, depa.depa_Nombre [empe_Direccion],
	[empe_Telefono], [empe_Correo], emp.[carg_Id], carg.carg_Nombre, emp.[cent_Id], cent.cent_Nombre,
	[empe_UsuCreacion], usu1.usua_NombreUsuario usuarioCrea, [empe_FechaCreacion], [empe_UsuModificacion],
	usu2.usua_NombreUsuario usuarioModif, [empe_FechaModificacion], [empe_Estado]
	FROM [asil].[tbEmpleados] emp INNER JOIN [acce].[tbUsuarios] usu1
	ON usu1.usua_Id = emp.empe_UsuCreacion LEFT JOIN [acce].[tbUsuarios] usu2
	ON usu2.usua_Id = emp.empe_UsuModificacion INNER JOIN gral.tbMunicipios muni
	ON muni.muni_id = emp.muni_Id INNER JOIN GRAL.tbDepartamentos depa
	ON depa.depa_Id = muni.depa_Id INNER JOIN gral.tbEstadosCiviles est
	ON est.estacivi_Id = emp.estacivi_Id INNER JOIN asil.tbCargos carg
	ON carg.carg_Id = emp.carg_Id INNER JOIN asil.tbCentros cent
	ON cent.cent_Id = emp.cent_Id 

GO

--select*from asil.VW_tbEmpleados

/*LISTAR EMPLEADOS*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbEmpleados_List
AS
BEGIN
	SELECT *
	FROM asil.VW_tbEmpleados
	WHERE  [empe_Estado] = 1
END
GO

/*FIND EMPLEADOS*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbEmpleados_Find 
	@empe_Id	INT
AS
BEGIN
	SELECT * FROM asil.VW_tbEmpleados
	WHERE [empe_Estado] = 1
	AND  [empe_Id]= @empe_Id
END
GO


/*INSERTAR EMPELADO*/

CREATE OR ALTER PROCEDURE asil.UDP_asil_tbEmpleados_Insert
	@empe_Nombres			NVARCHAR(200),
	@empe_Apellidos			NVARCHAR(200),
	@empe_Identidad			VARCHAR(13),	
	@empe_Sexo				CHAR(1),
	@estacivi_Id			INT,	 
	@empe_Nacimiento		DATE,	
	@muni_Id				CHAR(4),	
	@empe_Direccion			NVARCHAR(500),
	@empe_Telefono			NVARCHAR(20),
	@empe_Correo			NVARCHAR(200),	
	@carg_Id				INT,	
	@cent_Id				INT,	
	@empe_UsuCreacion       INT
AS 
BEGIN
	BEGIN TRY
		IF NOT EXISTS (SELECT * FROM asil.tbEmpleados 
						WHERE empe_Identidad = @empe_Identidad)
			BEGIN
			INSERT INTO asil.tbEmpleados([empe_Nombres],[empe_Apellidos],[empe_Identidad],[empe_Sexo],[estacivi_Id],
			[empe_Nacimiento],[muni_Id],[empe_Direccion],[empe_Telefono],[empe_Correo],[carg_Id],[cent_Id],[empe_UsuCreacion])
			VALUES(@empe_Nombres,@empe_Apellidos,@empe_Identidad,@empe_Sexo,@estacivi_Id,@empe_Nacimiento,@muni_Id,@empe_Direccion,
			@empe_Telefono,@empe_Correo,@carg_Id,@cent_Id,@empe_UsuCreacion);
					
			SELECT 1 as proceso

			END
		ELSE IF EXISTS (SELECT * FROM asil.tbEmpleados 
						WHERE empe_Identidad = @empe_Identidad
						AND empe_Estado = 0)
			BEGIN
				UPDATE asil.tbEmpleados 
				SET empe_Estado = 1
				WHERE empe_Identidad = @empe_Identidad
				SELECT  1 as proceso
			END
		ELSE
			SELECT  -2 as proceso
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END
GO

/*ACTUALIZAR EMPELADO*/
CREATE OR ALTER PROCEDURE asil.UDP_tnEmpleados_Actualizar
	@empe_Id				INT,
	@empe_Nombres			NVARCHAR(200),
	@empe_Apellidos			NVARCHAR(200),
	@empe_Identidad			VARCHAR(13),	
	@empe_Sexo				CHAR(1),
	@estacivi_Id			INT,	 
	@empe_Nacimiento		DATE,	
	@muni_Id				CHAR(4),	
	@empe_Direccion			NVARCHAR(500),
	@empe_Telefono			NVARCHAR(20),
	@empe_Correo			NVARCHAR(200),	
	@carg_Id				INT,	
	@cent_Id				INT,	
	@empe_UsuModificacion   INT
	AS
	BEGIN
	BEGIN TRY
	IF NOT EXISTS (SELECT * FROM asil.tbEmpleados 
						WHERE empe_Identidad = @empe_Identidad)
		BEGIN			
			UPDATE  asil.tbEmpleados
			SET 	empe_Nombres= @empe_Nombres,
			        empe_Apellidos= @empe_Apellidos,
					empe_Identidad= @empe_Identidad,
			        empe_Sexo= @empe_Sexo,
					estacivi_Id= @estacivi_Id,
					empe_Nacimiento	 = @empe_Nacimiento,
					muni_Id	= @muni_Id,		
					empe_Direccion= @empe_Direccion,	
					empe_Telefono= @empe_Telefono,	
					empe_Correo	= @empe_Correo,
					carg_Id	= @carg_Id,		
					cent_Id	= @cent_Id,		
					empe_UsuModificacion = @empe_UsuModificacion,
					empe_FechaModificacion = GETDATE()
			WHERE 	empe_Id = @empe_Id

			SELECT 1 AS proceso
		END
		ELSE IF EXISTS (SELECT * FROM asil.tbEmpleados
						WHERE empe_Identidad     = @empe_Identidad
							  AND empe_Estado = 1
							  AND empe_Id != @empe_Id)

			SELECT -2 AS proceso
		ELSE
			UPDATE asil.tbEmpleados
			SET     empe_Estado          = 1,
			       empe_Nombres= @empe_Nombres,
			        empe_Apellidos= @empe_Apellidos,
					empe_Identidad= @empe_Identidad,
			        empe_Sexo= @empe_Sexo,
					estacivi_Id= @estacivi_Id,
					empe_Nacimiento	 = @empe_Nacimiento,
					muni_Id	= @muni_Id,		
					empe_Direccion= @empe_Direccion,	
					empe_Telefono= @empe_Telefono,	
					empe_Correo	= @empe_Correo,
					carg_Id	= @carg_Id,		
					cent_Id	= @cent_Id,		
					empe_UsuModificacion = @empe_UsuModificacion,
					empe_FechaModificacion = GETDATE()
			WHERE  @empe_Identidad = empe_Identidad

			SELECT 1 AS proceso
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END
GO


/* ELIMINAR EMPLEADO*/

CREATE OR ALTER PROCEDURE asil.UPD_tbEmpleados_Eliminar
	@empe_Id	INT
AS
BEGIN
	BEGIN TRY
		IF NOT EXISTS (SELECT * FROM asil.tbEmpleados WHERE empe_Id = @empe_Id)
			BEGIN
				UPDATE asil.tbEmpleados 
				SET empe_Estado = 0
				WHERE empe_Id = @empe_Id

				SELECT 1 AS proceso
			END
		ELSE
			SELECT 'El registro del empleado no se puede eliminar porque está siendo usado'
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END
GO

--************/EMPLEADOS******************--

--************RESIDENTES******************--


/*VISTA RESIDENTES*/
CREATE OR ALTER VIEW asil.VW_tbResidentes
AS
	SELECT [resi_Id], [resi_Nombres], [resi_Apellidos],
	[resi_Identidad], res.[estacivi_Id],esci.estacivi_Nombre,  [resi_Nacimiento], 
	[resi_Sexo],CASE WHEN resi_Sexo = 'F' THEN 'Femenino'
				ELSE 'Masculino'
			END AS SexoDes ,res.[diet_Id],dit.diet_Desayuno, dit.diet_Almuerzo, dit.diet_Cena, 
	empe.empe_Nombres, empe_Apellidos, empe.empe_Nombres + ' ' + empe_Apellidos AS empe_NombreCompleto,
	dit.diet_Merienda, dit.diet_Observaciones, dit.diet_Restricciones,[resi_FechaIngreso],res.[empe_Id], 
	res.[agen_Id], ag.agen_Nombre,[resi_UsuCreacion], usu1.usua_NombreUsuario usuCrea, [resi_FechaCreacion], 
	[resi_UsuModificacion], usu2.usua_NombreUsuario usuModif, [resi_FechaModificacion],
	[resi_Estado]
	FROM [asil].[tbResidentes] res INNER JOIN gral.tbEstadosCiviles esci
	ON esci.estacivi_Id = res.estacivi_Id INNER JOIN asil.tbDietas dit
	ON dit.diet_Id = res.diet_Id INNER JOIN ASIL.tbEmpleados empe
	ON empe.empe_Id = res.empe_Id INNER JOIN asil.tbAgendas ag
	ON ag.agen_Id = res.agen_Id INNER JOIN acce.tbUsuarios usu1
	ON usu1.usua_Id = res.resi_UsuCreacion LEFT JOIN acce.tbUsuarios usu2
	ON usu2.usua_Id = res.resi_UsuModificacion


GO



/*LISTAR RESIDENTES*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbResidentes_List
AS
BEGIN
	SELECT *
	FROM asil.VW_tbResidentes
	WHERE resi_Estado  = 1
END
GO

/*FIND RESIDENTES*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbResidentes_Find 
	@resi_Id	INT
AS
BEGIN
	SELECT * FROM asil.VW_tbResidentes
	WHERE resi_Estado = 1
	AND  resi_Id = @resi_Id
END
GO

/*INSERTAR RESIDENTES*/
CREATE OR ALTER PROCEDURE asil.UDP_tbResidentes_Agregar
	@resi_Nombres			NVARCHAR(200),
	@resi_Apellidos			NVARCHAR(200), 
	@resi_Identidad			VARCHAR(13),
	@estacivi_Id			INT, 
	@resi_Nacimiento		DATE,
	@resi_Sexo				CHAR(1), 
	@diet_Id				INT,
	@resi_FechaIngreso		DATE, 
	@empe_Id				INT,
	@agen_Id				INT,
	@resi_UsuCreacion		INT
AS
BEGIN




BEGIN TRY
		IF NOT EXISTS (SELECT * FROM asil.tbResidentes 
						WHERE resi_Identidad = @resi_Identidad)
			BEGIN
			INSERT INTO asil.tbResidentes([resi_Nombres],[resi_Apellidos],[resi_Identidad],[estacivi_Id],[resi_Nacimiento],[resi_Sexo],[diet_Id],[resi_FechaIngreso],[empe_Id],	[agen_Id],[resi_UsuCreacion])
		     VALUES(
			 @resi_Nombres		,
			 @resi_Apellidos	,	
			 @resi_Identidad	,	
			 @estacivi_Id		,
			 @resi_Nacimiento	,
			 @resi_Sexo			,
			 @diet_Id			,
			 @resi_FechaIngreso	,
			 @empe_Id			,
			 @agen_Id			,
			 @resi_UsuCreacion	);
					
			SELECT 1 as proceso

			END
		ELSE IF EXISTS (SELECT * FROM asil.tbResidentes 
						WHERE resi_Identidad = @resi_Identidad
						AND resi_Estado = 0)
			BEGIN
				UPDATE asil.tbResidentes 
				SET resi_Estado = 1
				WHERE resi_Identidad = @resi_Identidad
				SELECT  1 as proceso
			END
		ELSE
			SELECT  -2 as proceso
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END
GO

/*ACTUALIZAR EMPELADO*/
CREATE OR ALTER PROCEDURE asil.UDP_tbResidentes_Actualizar
	@resi_Id				INT,
	@resi_Nombres			NVARCHAR(200),
	@resi_Apellidos			NVARCHAR(200), 
	@resi_Identidad			VARCHAR(13),
	@estacivi_Id			INT, 
	@resi_Nacimiento		DATE,
	@resi_Sexo				CHAR(1), 
	@diet_Id				INT,
	@resi_FechaIngreso		DATE, 
	@empe_Id				INT,
	@agen_Id				INT,
	@resi_UsuModificacion	INT
	AS
	BEGIN
	BEGIN TRY
	IF NOT EXISTS (SELECT * FROM asil.tbResidentes 
						WHERE resi_Identidad = @resi_Identidad)
		BEGIN			
			UPDATE  asil.tbResidentes
			SET 	resi_Nombres		= @resi_Nombres		,
			        resi_Apellidos		= @resi_Apellidos	,	
					resi_Identidad		= @resi_Identidad	,	
			        estacivi_Id			= @estacivi_Id		,
					resi_Nacimiento		= @resi_Nacimiento	,
					resi_Sexo			= @resi_Sexo		,	
					diet_Id				= @diet_Id			,
					resi_FechaIngreso	= @resi_FechaIngreso,	
					empe_Id				= @empe_Id			,
					agen_Id				= @agen_Id			,
					resi_UsuModificacion= @resi_UsuModificacion,
					resi_FechaModificacion = GETDATE()
			WHERE 	empe_Id = @empe_Id

			SELECT 1 AS proceso
		END
		ELSE IF EXISTS (SELECT * FROM asil.tbResidentes
						WHERE resi_Identidad     = @resi_Identidad
							  AND resi_Estado = 1
							  AND resi_Id != @resi_Id)

			SELECT -2 AS proceso
		ELSE
			UPDATE  asil.tbResidentes
			SET 	resi_Nombres		= @resi_Nombres		,
			        resi_Apellidos		= @resi_Apellidos	,	
					resi_Identidad		= @resi_Identidad	,	
			        estacivi_Id			= @estacivi_Id		,
					resi_Nacimiento		= @resi_Nacimiento	,
					resi_Sexo			= @resi_Sexo		,	
					diet_Id				= @diet_Id			,
					resi_FechaIngreso	= @resi_FechaIngreso,	
					empe_Id				= @empe_Id			,
					agen_Id				= @agen_Id			,
					resi_UsuModificacion= @resi_UsuModificacion,
					resi_FechaModificacion = GETDATE()
			WHERE 	resi_Identidad = @resi_Identidad
			SELECT 1 AS proceso
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH

END
GO


/* ELIMINAR RESIDENTE*/

CREATE OR ALTER PROCEDURE asil.UPD_tbResidentes_Eliminar
	@resi_Id	INT
AS
BEGIN
	BEGIN TRY
		IF NOT EXISTS (SELECT * FROM asil.tbResidentes WHERE resi_Id = @resi_Id)
			BEGIN
				UPDATE asil.tbResidentes 
				SET resi_Estado = 0
				WHERE resi_Id = @resi_Id
				SELECT 1 AS proceso
			END
		ELSE
			SELECT 'El registro del Residente no puede ser eliminado porque está siendo usado'
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END
GO

--************ /RESIDENTES******************--


--************AGENDAS******************--


/*VISTA AGENDAS*/
CREATE OR ALTER VIEW asil.VW_tbAgendas
AS
	SELECT 
	[agen_Id], [agen_Nombre], [agen_UsuCreacion],usu1.usua_NombreUsuario usuCrea, [agen_FechaCreacion], 
	[agen_UsuModificacion], usu2.usua_NombreUsuario usuModif,[agen_FechaModificacion], [agen_Estado]
	FROM [asil].[tbAgendas] age INNER JOIN [acce].[tbUsuarios] usu1
	ON usu1.usua_Id = age.agen_UsuCreacion LEFT JOIN acce.tbUsuarios usu2
	ON usu2.usua_Id = age.agen_UsuModificacion
GO


/*LISTAR AGENDAS*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbAgendas_List
AS
BEGIN
	SELECT *
	FROM asil.VW_tbAgendas
	WHERE agen_Estado  = 1
END
GO

/*FIND AGENDAS*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbAgendas_Find 
	@agen_Id	INT
AS
BEGIN
	SELECT * FROM asil.VW_tbAgendas
	WHERE agen_Estado = 1
	AND  agen_Id = @agen_Id
END
GO


/*INSERTAR AGENDAS*/   /*PENDIENTE DE CAMBIAR POR SER PANTALLA DOBLE*/
CREATE OR ALTER PROCEDURE asil.UDP_tbAgendas_Agregar
	@agen_Nombre			NVARCHAR(300),
	@agen_UsuCreacion		INT
AS
BEGIN
BEGIN TRY
		IF NOT EXISTS (SELECT * FROM asil.tbAgendas 
						WHERE agen_Nombre = @agen_Nombre)
			BEGIN
			INSERT INTO asil.tbAgendas([agen_Nombre],[agen_UsuCreacion])
		     VALUES(@agen_Nombre,	
					@agen_UsuCreacion);
					
			SELECT 1 as proceso

			END
		ELSE IF EXISTS (SELECT * FROM asil.tbAgendas 
						WHERE agen_Nombre = @agen_Nombre
						AND agen_Estado = 0)
			BEGIN
				UPDATE asil.tbAgendas 
				SET agen_Estado = 1
				WHERE agen_Nombre = @agen_Nombre
				SELECT  1 as proceso
			END
		ELSE
			SELECT  -2 as proceso
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END
GO

/*ACTUALIZAR AGENDA*/
CREATE OR ALTER PROCEDURE asil.UDP_tbAgendas_Actualizar
	@agen_Id				INT,
    @agen_Nombre			NVARCHAR(300),
	@agen_UsuModificacion	INT
	AS
	BEGIN
	BEGIN TRY
	IF NOT EXISTS (SELECT * FROM asil.tbAgendas 
						WHERE agen_Nombre = @agen_Nombre)
		BEGIN			
			UPDATE  asil.tbAgendas
			SET agen_Nombre				= @agen_Nombre		,
			    agen_UsuModificacion	= @agen_UsuModificacion	,	
				agen_FechaModificacion	= GETDATE()						
			WHERE 	agen_Id = @agen_Id

			SELECT 1 AS proceso
		END
		ELSE IF EXISTS (SELECT * FROM asil.tbAgendas
						WHERE agen_Nombre     = @agen_Nombre
							  AND agen_Estado = 1
							  AND agen_Id != @agen_Id)

			SELECT -2 AS proceso /*ya existe*/
		ELSE
			UPDATE  asil.tbAgendas
			SET 	agen_Nombre				= @agen_Nombre		,
					agen_UsuModificacion	= @agen_UsuModificacion	,	
					agen_FechaModificacion	= GETDATE()				
			WHERE 	agen_Nombre = @agen_Nombre
			SELECT 1 AS proceso
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH

END
GO

/* ELIMINAR AGENDA*/

CREATE OR ALTER PROCEDURE asil.UPD_tbAgendas_Eliminar
	@agen_Id	INT
AS
BEGIN
	BEGIN TRY
		IF NOT EXISTS (SELECT * FROM asil.tbAgendas WHERE agen_Id = @agen_Id)
			BEGIN
				UPDATE asil.tbAgendas 
				SET agen_Estado = 0
				WHERE agen_Id = @agen_Id
				SELECT 1 AS proceso
			END
		ELSE
			SELECT 'La agenda no puede ser eliminada porque está siendo usada'
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END
GO



/*  TABLA HISTORIAL DE PAGOS */


/*VISTA HISTORIAL D EPAGO*/
CREATE OR ALTER VIEW asil.VW_tbHistorialPagos
AS
	SELECT 
	[pago_Id], hip.[resi_Id], resi.resi_Nombres+ ' ' + resi.resi_Apellidos resi_NombreCompleto,hip.[meto_Id], met.meto_Nombre, 
	[pago_Fecha],[pago_UsuCreacion], usu1.usua_NombreUsuario usuCrea,[pago_FechaCreacion],
	[pago_UsuModificacion], usu2.usua_NombreUsuario usuModif,[pago_FechaModificacion], [pago_Estado]
	FROM [asil].[tbHistorialPagos] hip INNER JOIN [asil].[tbResidentes] resi
	ON resi.resi_Id = hip.resi_Id INNER JOIN [asil].[tbMetodosPago] met
	ON met.meto_Id = hip.meto_Id INNER JOIN [acce].[tbUsuarios] usu1
	ON usu1.usua_Id = hip.pago_UsuCreacion LEFT JOIN [acce].[tbUsuarios] usu2
	ON usu2.usua_Id = hip.pago_UsuModificacion
GO


/*LISTAR HISTORIAL PAGOS*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbHistorialPagos_List
AS
BEGIN
	SELECT *
	FROM asil.VW_tbHistorialPagos
	WHERE pago_Estado  = 1
END
GO

/*FIND HISTORIAL PAGOS*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbHistorialPagos_Find 
	@pago_Id	INT
AS
BEGIN
	SELECT * FROM asil.VW_tbHistorialPagos
	WHERE pago_Estado = 1
	AND  pago_Id = @pago_Id
END
GO



/*INSERTAR HISTORIAL PAGOS*/ 
CREATE OR ALTER PROCEDURE asil.UDP_tbHistorialPagos_Agregar
	@resi_Id				INT,
	@meto_Id				INT, 
	@pago_Fecha				DATE,
	@pago_UsuCreacion		INT
AS
BEGIN
BEGIN TRY
		
			INSERT INTO asil.tbHistorialPagos([resi_Id],[meto_Id],[pago_Fecha],[pago_UsuCreacion])
		     VALUES(@resi_Id		,
					@meto_Id		,
					@pago_Fecha		,
					@pago_UsuCreacion);
					
			SELECT 1 as proceso
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END
GO

/*ACTUALIZAR HISTORIAL PAGOS*/   /* HAY ALGO QUE NO ME CUADRA AQUÍ, PENDIENTE COMENTARLO CON ALLE*/
CREATE OR ALTER PROCEDURE asil.UDP_tbHistorialPagos_Actualizar
	@pago_Id				INT, 
    @resi_Id				INT,
	@meto_Id				INT, 
	@pago_Fecha				DATE,
	@pago_UsuModificacion	INT
AS
BEGIN
	BEGIN TRY
		
			UPDATE  asil.tbHistorialPagos
			SET 
			    resi_Id					= @resi_Id				,	
				meto_Id					= @meto_Id				,
				pago_Fecha				=  @pago_Fecha			,
				pago_UsuModificacion	=  @pago_UsuModificacion,
				pago_FechaModificacion	= GETDATE()
			WHERE pago_Id = @pago_Id

			SELECT 1 AS proceso

	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH

END
GO

/* ELIMINAR HISTORIAL PAGO*/

CREATE OR ALTER PROCEDURE asil.UPD_tbHistorialPagos_Eliminar
	@pago_Id	INT
AS
BEGIN
	BEGIN TRY
		IF NOT EXISTS (SELECT * FROM asil.tbHistorialPagos WHERE pago_Id = @pago_Id)
			BEGIN
				UPDATE asil.tbHistorialPagos 
				SET pago_Estado = 0
				WHERE pago_Id = @pago_Id
				SELECT 1 AS proceso
			END
		ELSE
			SELECT 'El registro no puede ser eliminado porque está siendo usado'
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END
GO




-------------------------------------------------------------------------------------------------------------------------
						/*******      YA ESTABAN HECHOS  SOLO CAMBIÉ LUGAR     ********/

--************CENTROS******************--

/*VISTA CENTRO*/
CREATE OR ALTER VIEW asil.VW_tbCentros
AS
	SELECT 
		   cent_Id,
		   cent_Nombre,
		   t1.muni_Id, 
		   t4.muni_Nombre,
		   depa.depa_Id,
		   depa.depa_Nombre,
		   cent_Direccion, 
		   cent_UsuCreacion, 
		   cent_FechaCreacion,  
		   t2.usua_NombreUsuario AS usua_UsuCreacion_Nombre,
		   cent_UsuModificacion,
		   t3.usua_NombreUsuario AS usua_UsuModificacion_Nombre,
		   cent_FechaModificacion,
	       cent_Estado
		   FROM asil.tbCentros t1 INNER JOIN acce.tbUsuarios t2
		   ON t1.cent_UsuCreacion = T2.usua_Id
		   LEFT JOIN acce.tbUsuarios t3
		   ON t1.cent_UsuModificacion = t3.usua_Id LEFT JOIN gral.tbMunicipios t4
		   ON T1.muni_Id = t4.muni_id INNER JOIN [gral].[tbDepartamentos] depa
		   ON depa.depa_Id = t4.depa_Id
GO

/*LISTAR CENTROS*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbCentros_List
AS
BEGIN
	SELECT *
	FROM asil.VW_tbCentros
	WHERE cent_Estado = 1
END
GO

/*FIND CENTROS*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_VW_tbCentros_Find 
	@cent_Id	INT
AS
BEGIN
	SELECT * FROM asil.VW_tbCentros
	WHERE cent_Estado = 1
	AND cent_Id = @cent_Id
END
GO


/*INSERTAR CENTROS*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbCentros_Insert
	@cent_Nombre				NVARCHAR(200),
	@muni_Id					CHAR(4),
	@cent_Direccion			    NVARCHAR(500),
    @cent_UsuCreacion		    INT 
AS 
BEGIN
	BEGIN TRY
		IF NOT EXISTS (SELECT * FROM asil.tbCentros 
						WHERE cent_Nombre = @cent_Nombre)
			BEGIN
			INSERT INTO asil.tbCentros(cent_Nombre, muni_Id, cent_Direccion, cent_UsuCreacion)
			VALUES(@cent_Nombre, @muni_Id, @cent_Direccion, @cent_UsuCreacion)
			
			SELECT 1 as proceso
			END
		ELSE IF EXISTS (SELECT * FROM asil.tbCentros 
						WHERE cent_Nombre = @cent_Nombre
						AND cent_Estado = 0)
			BEGIN
				UPDATE asil.tbCentros 
				SET cent_Estado = 1
				WHERE cent_Nombre = @cent_Nombre

				SELECT 1 as proceso
			END
		ELSE
			SELECT -2 as proceso
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END
GO




/*EDITAR CENTROS*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbCentros_Update
    @cent_Id					INT,
	@cent_Nombre				NVARCHAR(200),
	@muni_Id					CHAR(4),
	@cent_Direccion			    NVARCHAR(500),
    @cent_UsuModificacion		    INT
AS
BEGIN
	BEGIN TRY
	IF NOT EXISTS (SELECT * FROM asil.tbCentros 
						WHERE cent_Nombre = @cent_Nombre)
		BEGIN			
			UPDATE  asil.tbCentros
			SET 	cent_Nombre          = @cent_Nombre,
			        muni_Id              = @muni_Id,
					cent_Direccion       = @cent_Direccion,
					cent_UsuModificacion = @cent_UsuModificacion,
					cent_FechaModificacion = GETDATE()
			WHERE 	cent_Id = @cent_Id

			SELECT 1 as proceso
		END
		ELSE IF EXISTS (SELECT * FROM asil.tbCentros
						WHERE cent_Nombre     = @cent_Nombre 
							  AND cent_Estado = 1
							  AND cent_Id     != @cent_Id)

			SELECT -2 as proceso
		ELSE
			UPDATE  asil.tbCentros
			SET cent_Estado          = 1,
			    muni_Id              = @muni_Id,
				cent_Direccion	     = @cent_Direccion,
			    cent_UsuModificacion =  @cent_UsuModificacion,
				cent_FechaModificacion = GETDATE()
			WHERE @cent_Nombre = cent_Nombre

			SELECT 1 as proceso
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END
GO


/*ELIMINAR CENTROS*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbCentros_Delete
	 @cent_Id	INT
AS
BEGIN
	BEGIN TRY


	IF NOT EXISTS (SELECT * FROM asil.tbCentros WHERE cent_Id = @cent_Id)
			BEGIN
			UPDATE asil.tbCentros
			SET cent_Estado = 0
			WHERE cent_Id = @cent_Id
			SELECT 1 AS proceso
			END
		ELSE
			SELECT 'El registro no puede ser eliminado porque está siendo usado'
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END
GO





--************PROVEEDORES******************--

/*VISTA PROVEEDORES*/
CREATE OR ALTER VIEW asil.VW_tbProveedores
AS
	SELECT prov_Id,
	       prov_Nombre,
	       prov_CorreoElectronico,
	       prov_Telefono,
	       t1.muni_Id,
		   t4.muni_Nombre,
		   depa.depa_Nombre,
		   depa.depa_Id,
	       prov_Direccion,
		   prov_UsuCreacion,
		   prov_FechaCreacion,
		   t2.usua_NombreUsuario AS usua_UsuCreacion_Nombre,
		   prov_UsuModificacion,
		   t3.usua_NombreUsuario AS usua_UsuModificacion_Nombre,
		   prov_FechaModificacion,
		   prov_Estado
		   FROM asil.tbProveedores t1 LEFT JOIN acce.tbUsuarios t2
		   ON t1.prov_UsuCreacion = T2.usua_Id
		   LEFT JOIN acce.tbUsuarios t3
		   ON t1.prov_UsuModificacion = t3.usua_Id INNER JOIN gral.tbMunicipios t4
		   ON T1.muni_Id = t4.muni_id INNER JOIN [gral].[tbDepartamentos] depa
		   ON depa.depa_Id = t4.depa_Id
GO

/*LISTAR PROVEEDORES*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbProveedores_List
AS
BEGIN
	SELECT *
	FROM asil.VW_tbProveedores
	WHERE prov_Estado = 1
END
GO

/*FIND PROVEEDORES*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbProveedores_Find 
	@prov_Id	INT
AS
BEGIN
	SELECT * FROM asil.VW_tbProveedores
	WHERE prov_Estado = 1
	AND prov_Id = @prov_Id
END
GO


/*INSERTAR PROVEEDORES*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbProveedores_Insert
	@prov_Nombre				 NVARCHAR(200),
	@prov_CorreoElectronico      NVARCHAR(200),
	@prov_Telefono				 NVARCHAR(15),
	@muni_Id				     CHAR(4),
	@prov_Direccion				 NVARCHAR(500),
	@prov_UsuCreacion			 INT 
AS 
BEGIN
	BEGIN TRY
		IF NOT EXISTS (SELECT * FROM asil.tbProveedores 
						WHERE prov_Nombre = @prov_Nombre)
			BEGIN
			INSERT INTO asil.tbProveedores(prov_Nombre, prov_CorreoElectronico, prov_Telefono, muni_Id, prov_Direccion, prov_UsuCreacion)
			VALUES(@prov_Nombre, @prov_CorreoElectronico, @prov_Telefono, @muni_Id, @prov_Direccion, @prov_UsuCreacion)
			
			SELECT 1 as proceso
			END
		ELSE IF EXISTS (SELECT * FROM asil.tbProveedores  
						WHERE prov_Nombre = @prov_Nombre
						AND prov_Estado = 0)
			BEGIN
				UPDATE asil.tbProveedores 
				SET prov_Estado = 1
				WHERE prov_Nombre = @prov_Nombre

				SELECT 1 as proceso
			END
		ELSE
			SELECT -2 as proceso
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END
GO




/*EDITAR PROVEEDOR*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbProveedores_Update
    @prov_Id					INT,
	@prov_Nombre				NVARCHAR(200),
	@prov_CorreoElectronico     NVARCHAR(200),
	@prov_Telefono				NVARCHAR(15),
	@muni_Id					CHAR(4),
	@prov_Direccion				NVARCHAR(500),
	@prov_UsuModificacion		INT 
AS
BEGIN
	BEGIN TRY
	IF NOT EXISTS (SELECT * FROM asil.tbProveedores 
						WHERE prov_Nombre = @prov_Nombre)
		BEGIN			
			UPDATE  asil.tbProveedores
			SET 	prov_Nombre            = @prov_Nombre,
			        prov_CorreoElectronico = @prov_CorreoElectronico,
					prov_Telefono          = @prov_Telefono,
			        muni_Id              = @muni_Id,
					prov_Direccion       = @prov_Direccion,
					prov_UsuModificacion = @prov_UsuModificacion,
					prov_FechaModificacion = GETDATE()
			WHERE 	prov_Id = @prov_Id

			SELECT 1 as proceso
		END
		ELSE IF EXISTS (SELECT * FROM asil.tbProveedores
						WHERE prov_Nombre     = @prov_Nombre
							  AND prov_Estado = 1
							  AND prov_Id     != @prov_Id)

			SELECT -2 as proceso
		ELSE
			UPDATE  asil.tbProveedores
			SET     prov_Estado          = 1,
			        prov_CorreoElectronico = @prov_CorreoElectronico,
					prov_Telefono          = @prov_Telefono,
			        muni_Id              = @muni_Id,
					prov_Direccion       = @prov_Direccion,
					prov_UsuModificacion = @prov_UsuModificacion,
					prov_FechaModificacion = GETDATE()
			WHERE  @prov_Nombre = prov_Nombre

			SELECT 1 as proceso
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END
GO


/*ELIMINAR PROVEEDOR*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbProveedores_Delete
	 @prov_Id	INT
AS
BEGIN
	BEGIN TRY
	IF NOT EXISTS (SELECT * FROM asil.tbProveedores WHERE prov_Id = @prov_Id)
			BEGIN
					UPDATE asil.tbProveedores
					SET prov_Estado = 0
					WHERE prov_Id = @prov_Id
					SELECT 1 AS proceso
			END
		ELSE
			SELECT 'El registro no puede ser eliminado porque está siendo usado'
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END
GO

-------------------------------------------------------------------------------------------------------------------------

/*VISTA HABITACIONES*/
CREATE OR ALTER VIEW asil.VW_tbHabitaciones
AS
	SELECT [habi_Id], [habi_Numero],
	hab.[cate_Id], cate.cate_Nombre,hab.[cent_Id],cent.cent_Nombre,
	[habi_UsuCreacion],usu1.usua_NombreUsuario usuCrea,[habi_FechaCreacion],
	[habi_UsuModificacion], usu2.usua_NombreUsuario usuModif,
	[habi_Estado], [habi_FechaModificacion]
	FROM [asil].[tbHabitaciones] hab INNER JOIN [asil].[tbCategoriasHabitaciones] cate
	ON cate.cate_Id = hab.cate_Id INNER JOIN [asil].[tbCentros] cent 
	ON cent.cent_Id = hab.cent_Id INNER JOIN [acce].[tbUsuarios] usu1
	ON usu1.usua_Id = hab.habi_UsuCreacion LEFT JOIN acce.tbUsuarios usu2
	ON usu2.usua_Id = hab.habi_UsuModificacion
GO

/*LISTAR HABITACIONES*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbHabitaciones_List
AS
BEGIN
	SELECT *
	FROM asil.VW_tbHabitaciones
	WHERE habi_Estado = 1
END
GO

/*FIND HABITACIONES*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbHabitaciones_Find 
	@habi_Id	INT
AS
BEGIN
	SELECT * FROM asil.VW_tbHabitaciones
	WHERE habi_Estado = 1
	AND habi_Id = @habi_Id
END
GO


/* INSERTAR HABITACIONES */
CREATE OR ALTER PROCEDURE asil.UDP_tbHabitaciones_Agregar
/*	@habi_Id			INT, */
	@habi_Numero		INT,
	@cate_Id			INT, 
	@cent_Id			INT, 
	@habi_UsuCreacion	INT
AS
BEGIN
	BEGIN TRY
		IF NOT EXISTS (SELECT * FROM asil.tbHabitaciones 
						WHERE habi_Numero = @habi_Numero)
			BEGIN
			INSERT INTO asil.tbHabitaciones(habi_Numero, cate_Id, cent_Id, habi_UsuCreacion)
			VALUES(@habi_Numero, @cate_Id, @cent_Id, @habi_UsuCreacion)
			
			SELECT 1 as proceso
			END
		ELSE IF EXISTS (SELECT * FROM asil.tbHabitaciones 
						WHERE  habi_Numero = @habi_Numero
						AND habi_Estado = 0)
			BEGIN
				UPDATE asil.tbHabitaciones 
				SET habi_Estado = 1
				WHERE habi_Numero = @habi_Numero

				SELECT 1 as proceso
			END
		ELSE
			SELECT -2 as proceso
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END
GO

/* ACTUALIZAR HABITACIONES */


CREATE OR ALTER PROCEDURE asil.UDP_tbHabitaciones_Actulaizar
		@habi_Id				INT,
		@habi_Numero			INT,
		@cate_Id				INT,
		@cent_Id				INT,
		@habi_UsuModificacion	INT
AS
BEGIN
	BEGIN TRY
	IF NOT EXISTS (SELECT * FROM asil.tbHabitaciones 
						WHERE habi_Numero = @habi_Numero)
		BEGIN			
			UPDATE  asil.tbHabitaciones 
			SET 	
			        habi_Numero				= @habi_Numero		,
					cate_Id					= @cate_Id			,
			        cent_Id					= @cent_Id			,
					habi_UsuModificacion	= @habi_UsuModificacion,
					habi_FechaModificacion	= GETDATE()
			WHERE 	habi_Id = @habi_Id

			SELECT 1 as proceso
		END
		ELSE IF EXISTS (SELECT * FROM asil.tbHabitaciones 
						WHERE habi_Numero     = @habi_Numero
							  AND habi_Estado = 1
							  AND habi_Id     != @habi_Id)

			SELECT -2 as proceso
		ELSE
			UPDATE  asil.tbHabitaciones 
			SET     habi_Estado             = 1,
			        habi_Numero				= @habi_Numero		,
					cate_Id					= @cate_Id			,
			        cent_Id					= @cent_Id			,
					habi_UsuModificacion	= @habi_UsuModificacion,
					habi_FechaModificacion	= GETDATE()				
			WHERE  @habi_Numero = @habi_Numero

			SELECT 1 as proceso
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END
GO


/*ELIMINAR HABITACION*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbHabitaciones_Delete
	 @habi_Id	INT
AS
BEGIN
	BEGIN TRY
	IF NOT EXISTS (SELECT * FROM asil.tbHabitaciones WHERE habi_Id = @habi_Id)
			BEGIN
					UPDATE asil.tbHabitaciones
					SET habi_Estado = 0
					WHERE habi_Id = @habi_Id
					SELECT 1 AS proceso
			END
		ELSE
			SELECT 'El registro no puede ser eliminado porque está siendo usado'
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END
GO




