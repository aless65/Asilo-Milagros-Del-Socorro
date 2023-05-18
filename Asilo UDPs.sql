--************USUARIOS******************--

/*Vista usuarios*/
CREATE OR ALTER VIEW acce.VW_tbUsuarios
AS
	SELECT t1.usua_Id, 
		   t1.usua_NombreUsuario, 
		   t1.usua_Contrasena, 
		   t1.usua_EsAdmin, 
		   t1.role_Id,
		   t2.role_Nombre, 
		   t1.empe_Id,
		   (SELECT t3.empe_Nombres + ' '+ empe_Apellidos) AS empe_NombreCompleto, 
		   t1.usua_UsuCreacion, 
		   t4.usua_NombreUsuario AS usua_UsuCreacion_Nombre,
		   t1.usua_FechaCreacion, 
	       t1.usua_UsuModificacion,
		   t5.usua_NombreUsuario AS usua_UsuModificacion_Nombre, 
		   t1.usua_FechaModificacion,
		   t1.usua_Estado,
		   cent_Id,
		   t3.empe_Correo	
		   FROM acce.tbUsuarios t1 LEFT JOIN acce.tbRoles t2
		   ON t1.role_Id = t2.role_Id
		   LEFT JOIN asil.tbEmpleados t3
		   ON t3.empe_Id = t1.empe_Id 
		   LEFT JOIN acce.tbUsuarios t4
		   ON t1.usua_UsuCreacion = T4.usua_Id
		   LEFT JOIN acce.tbUsuarios t5
		   ON t1.usua_UsuModificacion = t5.usua_Id
GO

/*Listar Usuarios*/
CREATE OR ALTER PROCEDURE acce.UDP_acce_tbUsuarios_List
AS
BEGIN
	SELECT * FROM acce.VW_tbUsuarios
	WHERE usua_Estado = 1
END
GO

/*Insertar Usuarios*/
CREATE OR ALTER PROCEDURE acce.UDP_acce_tbUsuarios_Insert
	@usua_NombreUsuario NVARCHAR(150),
	@usua_Contrasena NVARCHAR(MAX),
	@usua_EsAdmin BIT,
	@role_Id INT, 
	@empe_Id INT,
	@usua_usuCreacion INT
AS 
BEGIN
	
	BEGIN TRY
		
		DECLARE @password NVARCHAR(MAX)=(SELECT HASHBYTES('Sha2_512', @usua_Contrasena));

		IF NOT EXISTS (SELECT * FROM acce.tbUsuarios
						WHERE @usua_NombreUsuario = usua_NombreUsuario)
		BEGIN
			INSERT INTO acce.tbUsuarios
			VALUES(@usua_NombreUsuario,@password,@usua_EsAdmin,@role_Id,@empe_Id,@usua_usuCreacion,GETDATE(),NULL,NULL,1)

			SELECT 'El usuario se ha insertado'
		END
		ELSE IF EXISTS (SELECT * FROM acce.tbUsuarios
						WHERE @usua_NombreUsuario = usua_NombreUsuario
							  AND usua_Estado = 1)

			SELECT 'Este usuario ya existe'
		ELSE
			BEGIN
				UPDATE acce.tbUsuarios
				SET usua_Estado = 1,
					usua_Contrasena = @password,
					usua_EsAdmin = @usua_EsAdmin,
					role_Id = @role_Id,
					empe_Id = @empe_Id
				WHERE usua_NombreUsuario = @usua_NombreUsuario

				SELECT 'El usuario se ha insertado'
			END
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
	END CATCH 
END
GO

/*Find Usuarios*/
CREATE OR ALTER PROCEDURE acce.UDP_acce_VW_tbUsuarios_Find 
	@usua_Id	INT
AS
BEGIN
	SELECT * FROM acce.VW_tbUsuarios
	WHERE usua_Estado = 1
	AND usua_Id = @usua_Id
END
GO


/*Editar usuarios*/
CREATE OR ALTER PROCEDURE acce.UDP_acce_tbUsuarios_UPDATE
	@usua_Id					INT,
	@usua_EsAdmin				BIT,
	@role_Id					INT,
	@empe_Id					INT,
	@usua_UsuModificacion		INT
AS
BEGIN
	BEGIN TRY
		UPDATE acce.tbUsuarios
		SET usua_EsAdmin = @usua_EsAdmin,
			role_Id = @role_Id,
			empe_Id = @empe_Id,
			usua_UsuModificacion = @usua_UsuModificacion,
			usua_FechaModificacion = GETDATE()
		WHERE usua_Id = @usua_Id

		SELECT 'El usuario ha sido editado con éxito'
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
	END CATCH
END
GO


/*Eliminar usuarios*/
CREATE OR ALTER PROCEDURE acce.UDP_acce_tbUsuarios_DELETE
	@usua_Id	INT
AS
BEGIN
	BEGIN TRY
		UPDATE acce.tbUsuarios
		SET usua_Estado = 0
		WHERE usua_Id = @usua_Id

		SELECT 'El usuario ha sido eliminado'
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
	END CATCH
END
GO

--************ENFERMEDADES******************--

/*Vista enfermedades*/
CREATE OR ALTER VIEW asil.VW_tbEnfermedades
AS
	SELECT t1.enfe_Id,
		   t1.enfe_Nombre,
		   t1.enfe_UsuCreacion, 
		   t2.usua_NombreUsuario AS usua_UsuCreacion_Nombre,
		   t1.enfe_FechaCreacion, 
	       t1.enfe_UsuModificacion,
		   t3.usua_NombreUsuario AS usua_UsuModificacion_Nombre, 
		   t1.enfe_FechaModificacion,
		   t1.enfe_Estado
		   FROM asil.tbEnfermedades t1 LEFT JOIN acce.tbUsuarios t2
		   ON t1.enfe_UsuCreacion = T2.usua_Id
		   LEFT JOIN acce.tbUsuarios t3
		   ON t1.enfe_UsuModificacion = t3.usua_Id
GO

/*Listar enfermedades*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbEnfermedades_List
AS
BEGIN
	SELECT * FROM asil.VW_tbEnfermedades
	WHERE enfe_Estado = 1
END
GO

/*Insertar Usuarios*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbEnfermedades_Insert
	@enfe_Nombre		NVARCHAR(100),
	@enfe_UsuCreacion	INT
AS 
BEGIN
	
	BEGIN TRY

		IF NOT EXISTS (SELECT * FROM asil.tbEnfermedades
						WHERE @enfe_Nombre = enfe_Nombre)
		BEGIN
			INSERT INTO asil.tbEnfermedades(enfe_Nombre, enfe_UsuCreacion)
			VALUES(@enfe_Nombre,@enfe_UsuCreacion)

			SELECT 'La enfermedad ha sido insertada exitosamente'
		END
		ELSE IF EXISTS (SELECT * FROM asil.tbEnfermedades
						WHERE @enfe_Nombre = enfe_Nombre
							  AND enfe_Estado = 1)

			SELECT 'Esta enfermedad ya existe'
		ELSE
			BEGIN
				UPDATE asil.tbEnfermedades
				SET enfe_Estado = 1
				WHERE enfe_Nombre = @enfe_Nombre

				SELECT 'La enfermedad ha sido insertada exitosamente'
			END
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
	END CATCH 
END
GO

/*Find Usuarios*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_VW_tbEnfermedades_Find 
	@enfe_Id	INT
AS
BEGIN
	SELECT * FROM asil.VW_tbEnfermedades
	WHERE enfe_Id = @enfe_Id
END
GO


/*Editar usuarios*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbEnfermedades_Update
	@enfe_Id					INT,
	@enfe_Nombre				NVARCHAR(100),
	@enfe_UsuModificacion		INT
AS
BEGIN
	BEGIN TRY
	IF NOT EXISTS (SELECT * FROM asil.tbEnfermedades 
						WHERE @enfe_Nombre = enfe_Nombre)
		BEGIN			
			UPDATE asil.tbEnfermedades
			SET 	enfe_Nombre = @enfe_Nombre,
					enfe_UsuModificacion = @enfe_UsuModificacion,
					[enfe_FechaModificacion] = GETDATE()
			WHERE 	enfe_Nombre = @enfe_Nombre

			SELECT 'La enfermedad ha sido editada exitosamente'
		END
		ELSE IF EXISTS (SELECT * FROM asil.tbEnfermedades
						WHERE enfe_Nombre = @enfe_Nombre
							  AND enfe_Estado = 1
							  AND enfe_Id != @enfe_Id)

			SELECT 'La enfermedad ya existe'
		ELSE
			UPDATE asil.tbEnfermedades
			SET enfe_Estado = 1,
			    [enfe_UsuModificacion] = @enfe_UsuModificacion,
				[enfe_FechaModificacion] = GETDATE()
			WHERE @enfe_Nombre = enfe_Nombre

			SELECT 'La enfermedad ha sido editada'
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
	END CATCH
END
GO


/*Eliminar usuarios*/
CREATE OR ALTER PROCEDURE acce.UDP_asil_tbEnfermedades_Delete
	@enfe_Id	INT
AS
BEGIN
	BEGIN TRY
		UPDATE asil.tbEnfermedades
		SET enfe_Estado = 0
		WHERE enfe_Id = @enfe_Id

		SELECT 'La enfermedad ha sido eliminada'
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
	END CATCH
END
GO

--************CENTROS******************--

/*VISTA CENTRO*/
CREATE OR ALTER VIEW asil.VW_tbCentros
AS
	SELECT 
		   cent_Id,
		   cent_Nombre,
		   t1.muni_Id, 
		   t4.muni_Nombre
		   cent_Direccion, 
		   cent_UsuCreacion, 
		   cent_FechaCreacion,  
		   t2.usua_NombreUsuario AS usua_UsuCreacion_Nombre,
		   cent_UsuModificacion,
		   t3.usua_NombreUsuario AS usua_UsuModificacion_Nombre,
		   cent_FechaModificacion,
	       cent_Estado
		   FROM asil.tbCentros t1 LEFT JOIN acce.tbUsuarios t2
		   ON t1.cent_UsuCreacion = T2.usua_Id
		   LEFT JOIN acce.tbUsuarios t3
		   ON t1.cent_UsuModificacion = t3.usua_Id INNER JOIN gral.tbMunicipios t4
		   ON T1.muni_Id = t4.muni_id
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
			
			SELECT 'El centro ha sido insertado'
			END
		ELSE IF EXISTS (SELECT * FROM asil.tbCentros 
						WHERE cent_Nombre = @cent_Nombre
						AND cent_Estado = 0)
			BEGIN
				UPDATE asil.tbCentros 
				SET cent_Estado = 1
				WHERE cent_Nombre = @cent_Nombre

				SELECT 'El centro ha sido insertado'
			END
		ELSE
			SELECT 'Este centro ya existe'
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
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

			SELECT 'El centro ha sido editado'
		END
		ELSE IF EXISTS (SELECT * FROM asil.tbCentros
						WHERE cent_Nombre     = @cent_Nombre 
							  AND cent_Estado = 1
							  AND cent_Id     != @cent_Id)

			SELECT 'El centro ya existe'
		ELSE
			UPDATE  asil.tbCentros
			SET cent_Estado          = 1,
			    muni_Id              = @muni_Id,
				cent_Direccion	     = @cent_Direccion,
			    cent_UsuModificacion =  @cent_UsuModificacion,
				cent_FechaModificacion = GETDATE()
			WHERE @cent_Nombre = cent_Nombre

			SELECT 'El cargo ha sido editado'
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
	END CATCH
END
GO


/*ELIMINAR CENTROS*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbCentros_Delete
	 @cent_Id	INT
AS
BEGIN
	BEGIN TRY
		UPDATE asil.tbCentros
		SET cent_Estado = 0
		WHERE cent_Id = @cent_Id

		SELECT 'El centro ha sido eliminado'
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
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
		   ON T1.muni_Id = t4.muni_id
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
			
			SELECT 'El proveedor ha sido insertado'
			END
		ELSE IF EXISTS (SELECT * FROM asil.tbProveedores  
						WHERE prov_Nombre = @prov_Nombre
						AND prov_Estado = 0)
			BEGIN
				UPDATE asil.tbProveedores 
				SET prov_Estado = 1
				WHERE prov_Nombre = @prov_Nombre

				SELECT 'El proveedor ha sido insertado'
			END
		ELSE
			SELECT 'Este proveedor ya existe'
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
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

			SELECT 'El proveedor ha sido editado'
		END
		ELSE IF EXISTS (SELECT * FROM asil.tbProveedores
						WHERE prov_Nombre     = @prov_Nombre
							  AND prov_Estado = 1
							  AND prov_Id     != @prov_Id)

			SELECT 'El proveedor ya existe'
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

			SELECT 'El proveedor ha sido editado'
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
	END CATCH
END
GO


/*ELIMINAR PROVEEDOR*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbProveedores_Delete
	 @prov_Id	INT
AS
BEGIN
	BEGIN TRY
		UPDATE asil.tbProveedores
		SET prov_Estado = 0
		WHERE prov_Id = @prov_Id

		SELECT 'El proveedor ha sido eliminado'
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
	END CATCH
END
GO

--************ACTIVIDADES******************--

/*VISTA ACTIVIDADES*/
CREATE OR ALTER VIEW asil.VW_tbActividades
AS
	SELECT acti_Id, 
	       acti_Nombre, 
		   acti_UsuCreacion, 
		   t2.usua_NombreUsuario AS usua_UsuCreacion_Nombre,
		   acti_FechaCreacion, 
		   acti_UsuModificacion, 
		   t3.usua_NombreUsuario AS usua_UsuModificacion_Nombre,
		   acti_FechaModificacion, 
		   acti_Estado
		   FROM asil.tbActividades t1 LEFT JOIN acce.tbUsuarios t2
		   ON t1.acti_UsuCreacion = T2.usua_Id
		   LEFT JOIN acce.tbUsuarios t3
		   ON t1.acti_UsuModificacion = t3.usua_Id 
GO

/*LISTAR ACTIVIDADES*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbActividades_List
AS
BEGIN
	SELECT *
	FROM asil.VW_tbActividades
	WHERE acti_Estado = 1
END
GO

/*FIND ACTIVIDADES*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbActividades_Find 
	@acti_Id	INT
AS
BEGIN
	SELECT * FROM asil.VW_tbActividades
	WHERE acti_Estado = 1
	AND acti_Id = @acti_Id
END
GO


/*INSERTAR ACTIVIDADES*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbActividades_Insert
	@acti_Nombre      NVARCHAR(100),
	@acti_UsuCreacion INT
AS 
BEGIN
	BEGIN TRY
		IF NOT EXISTS (SELECT * FROM asil.tbActividades
						WHERE acti_Nombre = @acti_Nombre)
			BEGIN
			INSERT INTO asil.tbActividades(acti_Nombre, acti_UsuCreacion)
			VALUES(@acti_Nombre, @acti_UsuCreacion)
			
			SELECT 'La actividad ha sido insertada'
			END
		ELSE IF EXISTS (SELECT * FROM asil.tbActividades 
						WHERE acti_Nombre = @acti_Nombre
						AND acti_Estado = 0)
			BEGIN
				UPDATE asil.tbActividades 
				SET acti_Estado = 1
				WHERE acti_Nombre = @acti_Nombre

				SELECT 'La actividad ha sido insertada'
			END
		ELSE
			SELECT 'Esta actividad ya existe'
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
	END CATCH
END
GO




/*EDITAR ACTIVIDADES*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbActividades_Update
    @acti_Id          INT,
	@acti_Nombre      NVARCHAR(100),
	@acti_UsuModificacion INT
AS
BEGIN
	BEGIN TRY
	IF NOT EXISTS (SELECT * FROM asil.tbActividades 
						WHERE acti_Nombre = @acti_Nombre)
		BEGIN			
			UPDATE  asil.tbActividades
			SET 	acti_Nombre           = @acti_Nombre,
			        acti_UsuModificacion  = @acti_UsuModificacion,
					acti_FechaModificacion = GETDATE()
			WHERE 	acti_Id = @acti_Id

			SELECT 'La actividad ha sido editada'
		END
		ELSE IF EXISTS (SELECT * FROM asil.tbActividades 
						WHERE acti_Nombre     = @acti_Nombre
							  AND acti_Estado = 1
							  AND acti_Id     != @acti_Id)

			SELECT 'La actividad ya existe'
		ELSE
			UPDATE  asil.tbActividades 
			SET     acti_Estado          = 1,
					acti_UsuModificacion = @acti_UsuModificacion,
					acti_FechaModificacion = GETDATE()
			WHERE   acti_Nombre = @acti_Nombre

			SELECT 'La actividad ha sido editada'
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
	END CATCH
END
GO


/*ELIMINAR ACTIVIDADES*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbActividades_Delete
	 @acti_Id	INT
AS
BEGIN
	BEGIN TRY
		UPDATE asil.tbActividades
		SET acti_Estado = 0
		WHERE acti_Id = @acti_Id

		SELECT 'La actividad ha sido eliminada'
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
	END CATCH
END
GO

--************CATEGORÍAS HABITACIONES******************--

/*VISTA CATEGORÍAS HABITACIONES*/
CREATE OR ALTER VIEW asil.VW_tbCategoriasHabitaciones
AS
	SELECT cate_Id,
	       cate_Nombre,
		   cate_Capacidad,
		   cate_Climatizacion,
		   cate_UsuCreacion,
		   t2.usua_NombreUsuario AS usua_UsuCreacion_Nombre,
		   cate_FechaCreacion,
		   cate_UsuModificacion,
		   t3.usua_NombreUsuario AS usua_UsuModificacion_Nombre,
		   cate_FechaModificacion,
		   cate_Estado
		   FROM asil.tbCategoriasHabitaciones t1 LEFT JOIN acce.tbUsuarios t2
		   ON t1.cate_UsuCreacion = T2.usua_Id
		   LEFT JOIN acce.tbUsuarios t3
		   ON t1.cate_UsuModificacion = t3.usua_Id 
GO

/*LISTAR CATEGORÍAS HABITACIONES*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbCategoriasHabitaciones_List
AS
BEGIN
	SELECT *
	FROM asil.VW_tbCategoriasHabitaciones
	WHERE cate_Estado = 1
END
GO

/*FIND CATEGORÍAS HABITACIONES*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbCategoriasHabitaciones_Find 
	@cate_Id	INT
AS
BEGIN
	SELECT * FROM asil.VW_tbCategoriasHabitaciones
	WHERE cate_Estado = 1
	AND cate_Id = @cate_Id
END
GO


/*INSERTAR CATEGORÍAS HABITACIONES*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbCategoriasHabitaciones_Insert
	@cate_Nombre          NVARCHAR(100),
	@cate_Capacidad       INT,
	@cate_Climatizacion   BIT,
	@cate_UsuCreacion     INT
AS 
BEGIN
	BEGIN TRY
		IF NOT EXISTS (SELECT * FROM asil.tbCategoriasHabitaciones
						WHERE cate_Nombre = @cate_Nombre)
			BEGIN
			INSERT INTO asil.tbCategoriasHabitaciones(cate_Nombre, cate_Capacidad, cate_Climatizacion, cate_UsuCreacion)
			VALUES(@cate_Nombre, @cate_Capacidad, @cate_Climatizacion, @cate_UsuCreacion)
			
			SELECT 'La categoria de la habitación ha sido insertada'
			END
		ELSE IF EXISTS (SELECT * FROM asil.tbCategoriasHabitaciones 
						WHERE cate_Nombre = @cate_Nombre
						AND cate_Estado = 0)
			BEGIN
				UPDATE asil.tbCategoriasHabitaciones 
				SET    cate_Estado        = 1,
				       cate_Capacidad     = @cate_Capacidad,
					   cate_Climatizacion = @cate_Climatizacion,
					   cate_UsuCreacion   = @cate_UsuCreacion
				WHERE cate_Nombre = @cate_Nombre

				SELECT 'La categoria de la habitación ha sido insertada'
			END
		ELSE
			SELECT 'Esta categoria de la habitación ya existe'
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
	END CATCH
END
GO




/*EDITAR CATEGORÍAS HABITACIONES*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbCategoriasHabitaciones_Update
    @cate_Id              INT,
	@cate_Nombre          NVARCHAR(100),
	@cate_Capacidad       INT,
	@cate_Climatizacion   BIT,
	@cate_UsuModificacion     INT
AS
BEGIN
	BEGIN TRY
	IF NOT EXISTS (SELECT * FROM asil.tbCategoriasHabitaciones 
						WHERE @cate_Nombre = @cate_Nombre)
		BEGIN			
			UPDATE  asil.tbCategoriasHabitaciones
			SET 	cate_Nombre           = @cate_Nombre,
			        cate_Capacidad        = @cate_Capacidad,
					cate_Climatizacion    = @cate_Climatizacion,
			        cate_UsuModificacion  = @cate_UsuModificacion,
					cate_FechaModificacion = GETDATE()
			WHERE 	cate_Id = @cate_Id

			SELECT 'La categoria ha sido editada'
		END
		ELSE IF EXISTS (SELECT * FROM asil.tbCategoriasHabitaciones 
						WHERE cate_Nombre     = @cate_Nombre
							  AND cate_Estado = 1
							  AND cate_Id     != @cate_Id)

			SELECT 'La categoria ya existe'
		ELSE
			UPDATE  asil.tbCategoriasHabitaciones 
			SET     cate_Estado          = 1,
					cate_UsuModificacion = @cate_UsuModificacion,
					cate_FechaModificacion = GETDATE()
			WHERE   cate_Nombre = @cate_Nombre

			SELECT 'La categoria ha sido editada'
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
	END CATCH
END
GO


/*ELIMINAR ACTIVIDADES*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbCategoriasHabitaciones_Delete
	 @cate_Id	INT
AS
BEGIN
	BEGIN TRY
		UPDATE asil.tbCategoriasHabitaciones
		SET cate_Estado = 0
		WHERE cate_Id = @cate_Id

		SELECT 'La categoria ha sido eliminada'
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
	END CATCH
END
GO