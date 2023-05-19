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

--************MEDICAMENTO******************--

/*VISTA MEDICAMENTO*/
CREATE OR ALTER VIEW asil.VW_tbMedicamentos
AS
	SELECT medi_Id,
	       medi_Nombre,
		   prov_Id,
		   t4.prov_Nombre,
		   medi_UsuCreacion,
		   t2.usua_NombreUsuario AS usua_UsuCreacion_Nombre,
		   medi_FechaCreacion,
		   medi_UsuModificacion,
		   t3.usua_NombreUsuario AS usua_UsuModificacion_Nombre,
		   medi_FechaModificacion,
		   medi_Estado
		   FROM asil.tbMedicamentos t1 LEFT JOIN acce.tbUsuarios t2
		   ON t1.cate_UsuCreacion = T2.usua_Id
		   LEFT JOIN acce.tbUsuarios t3
		   ON t1.cate_UsuModificacion = t3.usua_Id INNER JOIN asil.tbProveedores t4
		   ON t1.prov_Id = t4.prov_Id 
GO

/*LISTAR MEDICAMENTO*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbMedicamentos_List
AS
BEGIN
	SELECT *
	FROM asil.VW_tbMedicamentos
	WHERE medi_Estado = 1
END
GO

/*FIND MEDICAMENTO*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbMedicamentos_Find 
	@medi_Id	INT
AS
BEGIN
	SELECT * FROM asil.VW_tbMedicamentos
	WHERE medi_Estado = 1
	AND cate_Id = @medi_Id
END
GO


/*INSERTAR MEDICAMENTO*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbMedicamentos_Insert
	@medi_Nombre					NVARCHAR(300) ,
	@prov_Id						INT ,
	@medi_UsuCreacion			    INT
	
AS 
BEGIN
	BEGIN TRY
		IF NOT EXISTS (SELECT * FROM asil.tbMedicamentos
						WHERE medi_Nombre = @medi_Nombre)
			BEGIN
			INSERT INTO asil.tbMedicamentos(medi_Nombre, prov_Id, medi_UsuCreacion)
			VALUES(@medi_Nombre, @prov_Id, @medi_UsuCreacion)
			
			SELECT 'El medicamento ha sido insertado'
			END
		ELSE IF EXISTS (SELECT * FROM asil.tbMedicamentos 
						WHERE medi_Nombre = @medi_Nombre
						AND medi_Estado = 0)
			BEGIN
				UPDATE asil.tbMedicamentos 
				SET    medi_Estado      = 1,
				       prov_Id          = @prov_Id,
					   medi_UsuCreacion = @medi_UsuCreacion
				WHERE medi_Nombre = @medi_Nombre

				SELECT 'El medicamento ha sido insertado'
			END
		ELSE
			SELECT 'Este medicamento ya existe'
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
	END CATCH
END
GO




/*EDITAR MEDICAMENTO*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbMedicamentos_Update
    @medi_Id              INT,
	@medi_Nombre          NVARCHAR(100),
	@prov_Id              INT,
	@medi_UsuModificacion INT
AS
BEGIN
	BEGIN TRY
	IF NOT EXISTS (SELECT * FROM asil.tbMedicamentos 
						WHERE medi_Nombre = @medi_Nombre)
		BEGIN			
			UPDATE  asil.tbMedicamentos
			SET 	medi_Nombre           = @medi_Nombre,
			        prov_Id               = @prov_Id,
					medi_UsuModificacion  = @medi_UsuModificacion,
					medi_FechaModificacion = GETDATE()
			WHERE 	medi_Id                = @medi_Id

			SELECT 'El medicamento ha sido editado'
		END
		ELSE IF EXISTS (SELECT * FROM asil.tbMedicamentos 
						WHERE medi_Nombre     = @medi_Nombre
							  AND medi_Estado = 1
							  AND medi_Id     != @medi_Id)

			SELECT 'El medicamento ya existe'
		ELSE
			UPDATE  asil.tbMedicamentos 
			SET     medi_Estado          = 1,
					medi_UsuModificacion = @medi_UsuModificacion,
					medi_FechaModificacion = GETDATE(),
					prov_Id                = @prov_Id
			WHERE   medi_Nombre = @medi_Nombre

			SELECT 'El medicamento ha sido editado'
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
	END CATCH
END
GO


/*ELIMINAR MEDICAMENTO*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbMedicamentos_Delete
	 @medi_Id	INT
AS
BEGIN
	BEGIN TRY
		UPDATE asil.tbMedicamentos
		SET medi_Estado = 0
		WHERE medi_Id = @medi_Id

		SELECT 'El medicamento ha sido eliminada'
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
	END CATCH
END
GO

--************CARGOS******************--

/*VISTA CARGOS*/
CREATE OR ALTER VIEW asil.VW_tbCargos
AS
	SELECT carg_Id,
	       carg_Nombre,
		   carg_UsuCreacion,
		   t2.usua_NombreUsuario AS usua_UsuCreacion_Nombre,
		   carg_FechaCreacion,
		   carg_UsuModificacion,
		   t3.usua_NombreUsuario AS usua_UsuModificacion_Nombre,
		   carg_FechaModificacion,
		   carg_Estado
		   FROM asil.tbCargos t1 LEFT JOIN acce.tbUsuarios t2
		   ON t1.carg_UsuCreacion = T2.usua_Id
		   LEFT JOIN acce.tbUsuarios t3
		   ON t1.carg_UsuModificacion = t3.usua_Id
GO

/*LISTAR CARGOS*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbCargos_List
AS
BEGIN
	SELECT *
	FROM asil.VW_tbCargos
	WHERE carg_Estado = 1
END
GO

/*FIND CARGOS*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbCargos_Find 
	@carg_Id	INT
AS
BEGIN
	SELECT * FROM asil.VW_tbCargos
	WHERE carg_Estado = 1
	AND carg_Id = @carg_Id
END
GO


/*INSERTAR CARGOS*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbCargos_Insert
	@carg_Nombre				NVARCHAR(100),
	@carg_UsuCreacion		    INT
	
AS 
BEGIN
	BEGIN TRY
		IF NOT EXISTS (SELECT * FROM asil.tbCargos
						WHERE carg_Nombre = @carg_Nombre)
			BEGIN
			INSERT INTO asil.tbCargos(carg_Nombre, carg_UsuCreacion)
			VALUES(@carg_Nombre, @carg_UsuCreacion)
			
			SELECT 'El cargo ha sido insertado'
			END
		ELSE IF EXISTS (SELECT * FROM asil.tbCargos 
						WHERE carg_Nombre = @carg_Nombre
						AND carg_Estado = 0)
			BEGIN
				UPDATE asil.tbCargos 
				SET    carg_Estado      = 1,
					   carg_UsuCreacion = @carg_UsuCreacion
				WHERE carg_Nombre = @carg_Nombre

				SELECT 'El cargo ha sido insertado'
			END
		ELSE
			SELECT 'Este cargo ya existe'
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
	END CATCH
END
GO




/*EDITAR CARGOS*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbCargos_Update
   @carg_Id					    INT,
   @carg_Nombre				    NVARCHAR(100),
   @carg_UsuModificacion	    INT
AS
BEGIN
	BEGIN TRY
	IF NOT EXISTS (SELECT * FROM asil.tbCargos 
						WHERE carg_Nombre = @carg_Nombre)
		BEGIN			
			UPDATE  asil.tbCargos
			SET 	carg_Nombre           = @carg_Nombre,
					carg_UsuModificacion  = @carg_UsuModificacion,
					carg_FechaModificacion = GETDATE()
			WHERE 	carg_Id                = @carg_Id

			SELECT 'El cargo ha sido editado'
		END
		ELSE IF EXISTS (SELECT * FROM asil.tbCargos 
						WHERE carg_Nombre     = @carg_Nombre
							  AND carg_Estado = 1
							  AND carg_Id     != @carg_Id)

			SELECT 'El cargo ya existe'
		ELSE
			UPDATE  asil.tbCargos 
			SET     carg_Estado          = 1,
					carg_UsuModificacion = @carg_UsuModificacion,
					carg_FechaModificacion = GETDATE()
			WHERE   carg_Nombre = @carg_Nombre

			SELECT 'El cargo ha sido editado'
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
	END CATCH
END
GO


/*ELIMINAR CARGOS*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbCargos_Delete
	 @carg_Id	INT
AS
BEGIN
	BEGIN TRY
		UPDATE asil.tbCargos
		SET carg_Estado = 0
		WHERE carg_Id = @carg_Id

		SELECT 'El cargo ha sido eliminado'
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
	END CATCH
END
GO

--************DIETAS******************--

/*VISTA DIETAS*/
CREATE OR ALTER VIEW asil.VW_tbDietas
AS
	SELECT diet_Id,
	       diet_Desayuno,
		   diet_Almuerzo,
		   diet_Cena,
		   diet_Merienda,
		   diet_Restricciones,
		   diet_Observaciones,
		   diet_UsuCreacion,
		   t2.usua_NombreUsuario AS usua_UsuCreacion_Nombre,
		   diet_FechaCreacion,
		   diet_UsuModificacion,
		   t3.usua_NombreUsuario AS usua_UsuModificacion_Nombre,
		   diet_FechaModificacion,
		   diet_Estado
		   FROM asil.tbDietas t1 LEFT JOIN acce.tbUsuarios t2
		   ON t1.diet_UsuCreacion = T2.usua_Id
		   LEFT JOIN acce.tbUsuarios t3
		   ON t1.diet_UsuModificacion = t3.usua_Id
GO

/*LISTAR DIETAS*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbDietas_List
AS
BEGIN
	SELECT *
	FROM asil.VW_tbDietas
	WHERE diet_Estado = 1
END
GO

/*FIND DIETAS*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbDietas_Find 
	@diet_Id	INT
AS
BEGIN
	SELECT * FROM asil.tbDietas
	WHERE diet_Estado = 1
	AND   diet_Id     = @diet_Id
END
GO


/*INSERTAR DIETAS*/
CREATE PROCEDURE asil.UDP_asil_tbDiestas_Insert
(
    @diet_Desayuno         NVARCHAR(500),
    @diet_Almuerzo         NVARCHAR(500),
    @diet_Cena             NVARCHAR(500),
    @diet_Merienda         NVARCHAR(500),
    @diet_Restricciones    NVARCHAR(500),
    @diet_Observaciones    NVARCHAR(500),
    @diet_UsuCreacion      INT
)
AS
BEGIN
  BEGIN TRY
    
    IF NOT EXISTS (
        SELECT * FROM asil.tbDietas
        WHERE
            diet_Desayuno = @diet_Desayuno AND
            diet_Almuerzo = @diet_Almuerzo AND
            diet_Cena = @diet_Cena AND
            diet_Merienda = @diet_Merienda AND
            diet_Restricciones = @diet_Restricciones AND
            diet_Observaciones = @diet_Observaciones
    )
    BEGIN
       
        INSERT INTO asil.tbDietas (diet_Desayuno, diet_Almuerzo, diet_Cena, diet_Merienda, diet_Restricciones, diet_Observaciones, diet_UsuCreacion)
        VALUES (@diet_Desayuno, @diet_Almuerzo, @diet_Cena, @diet_Merienda, @diet_Restricciones, @diet_Observaciones, @diet_UsuCreacion)

        
        SELECT 'Dieta insertada correctamente.'
    END
	ELSE IF EXISTS ( SELECT * FROM asil.tbDietas
        WHERE
            diet_Desayuno = @diet_Desayuno AND
            diet_Almuerzo = @diet_Almuerzo AND
            diet_Cena     = @diet_Cena AND
            diet_Merienda = @diet_Merienda AND
            diet_Restricciones = @diet_Restricciones AND
            diet_Observaciones = @diet_Observaciones
			AND diet_Estado = 0)
			BEGIN
				UPDATE asil.tbDietas 
				SET    diet_Estado      = 1,
					   diet_UsuCreacion = @diet_UsuCreacion
				WHERE  diet_Desayuno = @diet_Desayuno AND
                       diet_Almuerzo = @diet_Almuerzo AND
                       diet_Cena     = @diet_Cena AND
                       diet_Merienda = @diet_Merienda AND
                       diet_Restricciones = @diet_Restricciones AND
                       diet_Observaciones = @diet_Observaciones

				SELECT 'Dieta insertada correctamente.'
			END

    ELSE
    BEGIN
        SELECT 'No se puede insertar la dieta debido a valores duplicados.'
    END
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
	END CATCH
END

GO




/*EDITAR DIETAS*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbDietas_Update
    @diet_Id               INT,
	@diet_Desayuno         NVARCHAR(500),
    @diet_Almuerzo         NVARCHAR(500),
    @diet_Cena             NVARCHAR(500),
    @diet_Merienda         NVARCHAR(500),
    @diet_Restricciones    NVARCHAR(500),
    @diet_Observaciones    NVARCHAR(500),
    @diet_UsuModificacion  INT
AS
BEGIN
	BEGIN TRY
	 IF NOT EXISTS (
        SELECT * FROM asil.tbDietas
        WHERE
            diet_Desayuno = @diet_Desayuno AND
            diet_Almuerzo = @diet_Almuerzo AND
            diet_Cena = @diet_Cena AND
            diet_Merienda = @diet_Merienda AND
            diet_Restricciones = @diet_Restricciones AND
            diet_Observaciones = @diet_Observaciones
    )
		BEGIN			
			UPDATE  asil.tbDietas
			SET 	diet_Desayuno         = @diet_Desayuno,
			        diet_Almuerzo         = @diet_Almuerzo,
					diet_Cena             = @diet_Cena,
					diet_Merienda         = @diet_Merienda,
					diet_Restricciones    = @diet_Restricciones,
					diet_Observaciones    = @diet_Observaciones,
					diet_UsuModificacion  = @diet_UsuModificacion,
					diet_FechaModificacion = GETDATE()
			WHERE 	diet_Id                = @diet_Id

			SELECT 'La dieta ha sido editada'
		END
		ELSE IF EXISTS ( SELECT * FROM asil.tbDietas
        WHERE
            diet_Desayuno = @diet_Desayuno AND
            diet_Almuerzo = @diet_Almuerzo AND
            diet_Cena     = @diet_Cena AND
            diet_Merienda = @diet_Merienda AND
            diet_Restricciones = @diet_Restricciones AND
            diet_Observaciones = @diet_Observaciones
			AND diet_Estado = 0
			AND diet_Id     != @diet_Id)

			SELECT 'La dieta ya existe'
		ELSE
			UPDATE asil.tbDietas 
				SET    diet_Estado      = 1,
					   diet_UsuModificacion = @diet_UsuModificacion
				WHERE  diet_Desayuno = @diet_Desayuno AND
                       diet_Almuerzo = @diet_Almuerzo AND
                       diet_Cena     = @diet_Cena AND
                       diet_Merienda = @diet_Merienda AND
                       diet_Restricciones = @diet_Restricciones AND
                       diet_Observaciones = @diet_Observaciones

			SELECT 'La dieta ha sido editada'
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
	END CATCH
END
GO


/*ELIMINAR DIETAS*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbDietas_Delete
	 @diet_Id	INT
AS
BEGIN
	BEGIN TRY
		UPDATE asil.tbDietas
		SET    diet_Estado = 0
		WHERE diet_Id = @diet_Id

		SELECT 'La dieta ha sido eliminada'
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
	END CATCH
END
GO

--************AGENDAS******************--

/*VISTA AGENDAS*/
CREATE OR ALTER VIEW asil.VW_tbAgendas
AS
	SELECT agen_Id,
	       agen_Nombre,
		   agen_UsuCreacion,
		   t2.usua_NombreUsuario AS usua_UsuCreacion_Nombre,
		   agen_FechaCreacion,
		   agen_UsuModificacion,
		   t3.usua_NombreUsuario AS usua_UsuModificacion_Nombre,
		   agen_FechaModificacion,
		   agen_Estado
		   FROM asil.tbAgendas t1 LEFT JOIN acce.tbUsuarios t2
		   ON t1.carg_UsuCreacion = T2.usua_Id
		   LEFT JOIN acce.tbUsuarios t3
		   ON t1.carg_UsuModificacion = t3.usua_Id
GO

/*LISTAR AGENDAS*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbAgendas_List
AS
BEGIN
	SELECT *
	FROM asil.VW_tbAgendas
	WHERE agen_Estado = 1
END
GO

/*FIND AGENDAS*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbAgendas_Find 
	@agen_Id	INT
AS
BEGIN
	SELECT * FROM asil.VW_tbAgendas
	WHERE agen_Estado = 1
	AND agen_Id = @agen_Id
END
GO


/*INSERTAR AGENDAS*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbAgendas_Insert
	@agen_Nombre				NVARCHAR(300),
	@agen_UsuCreacion		    INT
	
AS 
BEGIN
	BEGIN TRY
		IF NOT EXISTS (SELECT * FROM asil.tbAgendas
						WHERE agen_Nombre = @agen_Nombre)
			BEGIN
			INSERT INTO asil.tbAgendas(agen_Nombre, agen_UsuCreacion)
			VALUES(@agen_Nombre, @agen_UsuCreacion)
			
			SELECT 'La agenda ha sido insertada'
			END
		ELSE IF EXISTS (SELECT * FROM asil.tbAgendas 
						WHERE agen_Nombre = @agen_Nombre
						AND agen_Estado = 0)
			BEGIN
				UPDATE asil.tbAgendas 
				SET    agen_Estado      = 1,
					   agen_UsuCreacion = @agen_UsuCreacion
				WHERE agen_Nombre = @agen_Nombre

				SELECT 'La agenda ha sido insertado'
			END
		ELSE
			SELECT 'Esta agenda ya existe'
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
	END CATCH
END
GO




/*EDITAR AGENDAS*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbAgendas_Update
   @agen_Id				        INT,
   @agen_Nombre				    NVARCHAR(300),
   @agen_UsuModificacion	    INT
AS
BEGIN
	BEGIN TRY
	IF NOT EXISTS (SELECT * FROM asil.tbAgendas 
						WHERE agen_Nombre = @agen_Nombre)
		BEGIN			
			UPDATE  asil.tbAgendas
			SET 	agen_Nombre            = @agen_Nombre,
					agen_UsuModificacion   = @agen_UsuModificacion,
					agen_FechaModificacion = GETDATE()
			WHERE 	agen_Id                = @agen_Id

			SELECT 'La agenda ha sido editada'
		END
		ELSE IF EXISTS (SELECT * FROM asil.tbAgendas
						WHERE agen_Nombre     = @agen_Nombre
							  AND agen_Estado = 1
							  AND agen_Id     != @agen_Id)

			SELECT 'La agenda ya existe'
		ELSE
			UPDATE  asil.tbAgendas
			SET     agen_Estado	          = 1,
					agen_UsuModificacion = @agen_UsuModificacion,
					agen_FechaModificacion = GETDATE()
			WHERE   agen_Nombre = @agen_Nombre

			SELECT 'La agenda ha sido editada'
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
	END CATCH
END
GO


/*ELIMINAR AGENDAS*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbAgendas_Delete
	 @agen_Id	INT
AS
BEGIN
	BEGIN TRY
		UPDATE asil.tbAgendas
		SET agen_Estado = 0
		WHERE agen_Id = @agen_Id

		SELECT 'La agenda ha sido eliminada'
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
	END CATCH
END
GO

--************EMPLEADOS******************--

/*VISTA EMPLEADOS*/
CREATE OR ALTER VIEW asil.VW_tbEmpleados
AS
	SELECT T1.empe_Id, 
	       empe_Nombres, 
		   empe_Apellidos, 
		   ([empe_Nombres] + ' ' + [empe_Apellidos]) AS empe_NombreCompleto,
		   empe_Identidad, 
		   empe_FechaNacimiento, 
		   CASE WHEN  empe_Sexo = 'F' THEN 'Femenino'
				ELSE 'Masculino'
		   END AS  empe_Sexo,
		   T1.estacivi_Id, 
		   T4.estacivi_Nombre AS Empe_EstadoCivilNombre,
		   empe_Telefono, 
		   empe_CorreoElectronico, 
		   empe_Direccion,
		   t6.muni_Id,
		   T7.muni_Nombre, 
		   T7.depa_Id,
		   T1.carg_Id,
		   T8.carg_Nombre,
		   T1.cent_Id,
		   T5.cent_Nombre 
		   empe_UsuCreacion, 
		   T2.usua_NombreUsuario AS Empe_NombreUsuarioCreacion,
		   empe_FechaCreacion, 
		   empe_UsuModificacion, 
		   T3.usua_NombreUsuario AS Empe_NombreUsuarioModificacion,
		   empe_FechaModificacion, 
		   empe_Estado
	FROM asil.tbEmpleados T1  INNER JOIN acce.tbUsuarios T2
	ON T1.empe_UsuCreacion = T2.usua_Id LEFT JOIN acce.tbUsuarios T3 
	ON T1.empe_UsuModificacion = T3.usua_Id INNER JOIN gral.tbEstadosCiviles T4
	ON T1.estacivi_Id = T4.estacivi_Id INNER JOIN asil.tbCentros T5
	ON T1.cent_Id = T5.cent_Id INNER JOIN gral.tbMunicipios T7
	ON T6.muni_Id = T7.muni_id INNER JOIN asil.tbCargos T8
	ON T1.carg_Id = T8.carg_Id
GO



/*LISTAR EMPLEADOS*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbEmpleados_List
AS
BEGIN
	SELECT * FROM asil.VW_tbEmpleados
	WHERE empe_Estado = 1
END	
GO

/*FIND EMPLEADOS*/
GO
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbEmpleados_Find 
	@empe_Id	INT
AS
BEGIN
	SELECT * FROM asil.VW_tbEmpleados
	WHERE empe_Id = @empe_Id
END
GO


/*INSERTAR EMPLEADOS*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbEmpleados_Insert
	@empe_Nombres			NVARCHAR(200),
	@empe_Apellidos			NVARCHAR(200),
	@empe_Identidad			VARCHAR(13),
	@empe_Sexo				CHAR,
	@estacivi_Id			INT,
	@empe_Nacimiento		DATE,
	@muni_Id				CHAR(4),
	@empe_Direccion			NVARCHAR(200),
	@empe_Telefono			NVARCHAR(20),
	@empe_Correo			NVARCHAR(200),
	@carg_Id				INT,
	@cent_Id				INT,
	@empe_UsuCreacion		INT  
	
AS 
BEGIN
	BEGIN TRY
		IF NOT EXISTS (SELECT * FROM asil.tbEmpleados
						WHERE empe_Identidad = @empe_Identidad)
			BEGIN
			INSERT INTO asil.tbEmpleados(empe_Nombres,
			                            empe_Apellidos,
										empe_Identidad,
										empe_Sexo,
										estacivi_Id,
										empe_Nacimiento,
										muni_Id,
										empe_Direccion,
										empe_Telefono,
										empe_Correo,
										carg_Id,
										cent_Id,
										empe_UsuCreacion)
			                     VALUES(@empe_Nombres,
			                            @empe_Apellidos,
										@empe_Identidad,
										@empe_Sexo,
										@estacivi_Id,
										@empe_Nacimiento,
										@muni_Id,
										@empe_Direccion,
										@empe_Telefono,
										@empe_Correo,
										@carg_Id,
										@cent_Id,
										@empe_UsuCreacion)
			
			SELECT 'El empleado ha sido insertado'
			END
		ELSE IF EXISTS (SELECT * FROM asil.tbEmpleados 
						WHERE empe_Identidad = @empe_Identidad
						AND empe_Estado = 0)
			BEGIN
				UPDATE asil.tbEmpleados  
				SET    empe_Estado      = 1,
					   empe_UsuCreacion = @empe_UsuCreacion,
					   empe_Nombres    = @empe_Nombres,
					   empe_Apellidos = @empe_Apellidos,
					   empe_Sexo     = @empe_Sexo,
					   estacivi_Id = @estacivi_Id,
					   empe_Nacimiento = @empe_Nacimiento,
					   muni_Id       = @muni_Id,
					  empe_Direccion = @empe_Direccion,
					  empe_Telefono = @empe_Telefono,
					  empe_Correo = @empe_Correo,
					  carg_Id = @carg_Id,
					  cent_Id = @cent_Id
				WHERE empe_Identidad = @empe_Identidad

				SELECT 'El empleado ha sido insertado'
			END
		ELSE
			SELECT 'Ya existe un empleado con este número de identidad'
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
	END CATCH
END
GO




/*EDITAR EMPLEADOS*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbEmpleados_Update
   @empe_Id					INT,
    @empe_Nombres			NVARCHAR(200),
	@empe_Apellidos			NVARCHAR(200),
	@empe_Identidad			VARCHAR(13),
	@empe_Sexo				CHAR,
	@estacivi_Id			INT,
	@empe_Nacimiento		DATE,
	@muni_Id				CHAR(4),
	@empe_Direccion			NVARCHAR(200),
	@empe_Telefono			NVARCHAR(20),
	@empe_Correo			NVARCHAR(200),
	@carg_Id				INT,
	@cent_Id				INT,
	@empe_UsuModificacion		INT  
AS
BEGIN
	BEGIN TRY
	IF NOT EXISTS (SELECT * FROM asil.tbEmpleados
						WHERE empe_Identidad = @empe_Identidad)
		BEGIN			
			UPDATE  asil.tbEmpleados
			SET 	empe_Nombres            = @empe_Nombres,
					empe_Apellidos   = @empe_Apellidos,
					empe_Identidad    = @empe_Identidad,
					empe_Sexo          = @empe_Sexo,
					estacivi_Id      = @estacivi_Id,
					empe_Nacimiento  = @empe_Nacimiento,
					muni_Id           = @muni_Id,
					empe_Direccion    = @empe_Direccion,
					empe_Telefono    = @empe_Telefono,
					empe_Correo     = @empe_Correo,
					carg_Id        = @carg_Id,
					cent_Id       = @cent_Id,
					empe_UsuModificacion = @empe_UsuModificacion,
					empe_FechaModificacion = GETDATE()
			WHERE 	empe_Id                = @empe_Id

			SELECT 'El empleado ha sido editado'
		END
		ELSE IF EXISTS (SELECT * FROM asil.tbEmpleados
						WHERE empe_Identidad     = @empe_Identidad
							  AND empe_Estado = 1
							  AND empe_Id     != @empe_Id)

			SELECT 'Ya existe un empleado con este número de identidad'
		ELSE
			UPDATE  asil.tbEmpleados
			SET     empe_Estado	          = 1,
			        empe_Nombres            = @empe_Nombres,
					empe_Apellidos   = @empe_Apellidos,
					empe_Sexo          = @empe_Sexo,
					estacivi_Id      = @estacivi_Id,
					empe_Nacimiento  = @empe_Nacimiento,
					muni_Id           = @muni_Id,
					empe_Direccion    = @empe_Direccion,
					empe_Telefono    = @empe_Telefono,
					empe_Correo     = @empe_Correo,
					carg_Id        = @carg_Id,
					cent_Id       = @cent_Id,
					empe_UsuModificacion = @empe_UsuModificacion,
					empe_FechaModificacion = GETDATE()
			WHERE   empe_Identidad = @empe_Identidad

			SELECT 'El empleado ha sido editado'
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
	END CATCH
END
GO


/*ELIMINAR EMPLEADOS*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbEmpleados_Delete
	 @empe_Id	INT
AS
BEGIN
	BEGIN TRY
		UPDATE asil.tbEmpleados
		SET empe_Estado = 0
		WHERE empe_Id = @empe_Id

		SELECT 'El empleado ha sido eliminado'
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
	END CATCH
END
GO

--************AGENDA DETALLES******************--

/*VISTA AGENDA DETALLES*/
CREATE OR ALTER VIEW asil.VW_tbAgendaDetalles
AS
	SELECT agendeta_Id,
	       agen_Id,
		   agendeta_Hora,
		   acti_Id,
		   medi_Id,
		   agendeta_Observaciones,
		   agendeta_UsuCreacion,
		   agendeta_FechaCreacion,
		   t2.usua_NombreUsuario AS usua_UsuCreacion_Nombre,
		   agendeta_UsuModificacion,
		   t3.usua_NombreUsuario AS usua_UsuModificacion_Nombre,
		   agendeta_FechaModificacion,
		   agendeta_Estado
		   FROM asil.tbAgendaDetalles t1 LEFT JOIN acce.tbUsuarios t2
		   ON t1.carg_UsuCreacion = T2.usua_Id
		   LEFT JOIN acce.tbUsuarios t3
		   ON t1.carg_UsuModificacion = t3.usua_Id INNER JOIN asil.tbAgendas t4
		   ON t1.agen_Id = t4.agen_Id INNER JOIN asil.tbActividades t5
		   ON t1.acti_Id = t5.acti_Id INNER JOIN asil.tbMedicamentos t6
		   ON t1.medi_Id = t6.medi_Id
GO

/*LISTAR AGENDA DETALLES*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbAgendaDetalles_List
AS
BEGIN
	SELECT *
	FROM asil.VW_tbAgendaDetalles
	WHERE agendeta_Estado = 1
END
GO

/*FIND AGENDA DETALLES*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbAgendaDetalles_Find 
	@agendeta_Id	INT
AS
BEGIN
	SELECT * FROM asil.VW_tbAgendaDetalles
	WHERE agendeta_Estado = 1
	AND agendeta_Id = @agendeta_Id
END
GO


/*INSERTAR AGENDA DETALLES*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbAgendaDetalles_Insert
	@agen_Id					INT,
	@agendeta_Hora				TIME,
	@acti_Id					INT ,
	@medi_Id					INT,
	@agendeta_Observaciones		NVARCHAR,
	@agendeta_UsuCreacion		INT
	
AS 
BEGIN
	BEGIN TRY
		IF NOT EXISTS (SELECT * FROM asil.tbAgendaDetalles
						WHERE agen_Id = @agen_Id AND
						       agendeta_Hora = @agendeta_Hora)
			BEGIN
			INSERT INTO asil.tbAgendaDetalles(agen_Id, agendeta_Hora, acti_Id, medi_Id,agendeta_Observaciones,agendeta_UsuCreacion)
			VALUES(@agen_Id, @agendeta_Hora, @acti_Id, @medi_Id,@agendeta_Observaciones,@agendeta_UsuCreacion)
			
			SELECT 'El detalle de agenda ha sido insertado'
			END
		ELSE IF EXISTS (SELECT * FROM asil.tbAgendaDetalles 
						WHERE agen_Id = @agen_Id AND
						agendeta_Hora = @agendeta_Hora)
			BEGIN
				UPDATE asil.tbAgendaDetalles 
				SET    agendeta_Estado      = 1,
				       acti_Id = @acti_Id,
					   medi_Id = @medi_Id,
					   agendeta_Observaciones = @agendeta_Observaciones,
					   agen_UsuCreacion = @agen_UsuCreacion
				WHERE agen_Id = @agen_Id AND
					  agendeta_Hora = @agendeta_Hora

				SELECT 'El detalle de agenda ha sido insertado'
			END
		ELSE
			SELECT 'Este detalle ya existe en la agenda'
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
	END CATCH
END
GO




/*EDITAR AGENDA DETALLES*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbAgendaDetalles_Update
    @agendeta_Id					INT,
    @agen_Id					INT,
	@agendeta_Hora				TIME,
	@acti_Id					INT ,
	@medi_Id					INT,
	@agendeta_Observaciones		NVARCHAR,
	@agendeta_UsuModificacion		INT
AS
BEGIN
	BEGIN TRY
		BEGIN			
			UPDATE  asil.tbAgendaDetalles
			SET 	agen_Id					   = @agen_Id,
			        agendeta_Hora			   = @agendeta_Hora,
					acti_Id					   = @acti_Id,
					medi_Id					   = @medi_Id,
					agendeta_Observaciones     = @agendeta_Observaciones,
					agendeta_UsuModificacion   = @agendeta_UsuModificacion,
					agendeta_FechaModificacion = GETDATE()
			WHERE 	agendeta_Id                = @agendeta_Id

			SELECT 'El detalle de la agenda ha sido editado'
		END
		
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
	END CATCH
END
GO


/*ELIMINAR AGENDA DETALLES*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbAgendaDetalles_Delete
	 @agendeta_Id	INT
AS
BEGIN
	BEGIN TRY
		UPDATE asil.tbAgendaDetalles
		SET agendeta_Estado = 0
		WHERE agendeta_Id = @agendeta_Id

		SELECT 'El detalle de la agenda ha sido eliminado'
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
	END CATCH
END
GO


--************RESIDENTES******************--

/*VISTA RESIDENTES*/
CREATE OR ALTER VIEW asil.VW_tbResidentes
AS
	SELECT resi_Id,
	       resi_Nombres,
		   resi_Apellidos,
		   resi_Identidad,
		   estacivi_Id,
		   t4.estacivi_Nombre,
		   resi_Nacimiento,
		   CASE WHEN  resi_Sexo = 'F' THEN 'Femenino'
				ELSE 'Masculino'
		   END AS  resi_Sexo,
		   
		   diet_Id,
		   resi_FechaIngreso,
		   empe_Id,
		   t5.empe_Nombres,
		   agen_Id,
		   t6.agen_Nombre,
		   resi_UsuCreacion,
		   t2.usua_NombreUsuario AS usua_UsuCreacion_Nombre,
		   resi_FechaCreacion,
		   resi_UsuModificacion,
		   t3.usua_NombreUsuario AS usua_UsuModificacion_Nombre,
		   resi_FechaModificacion,
		   resi_Estado
		   FROM asil.tbAgendaDetalles t1 LEFT JOIN acce.tbUsuarios t2
		   ON t1.resi_UsuCreacion = T2.usua_Id
		   LEFT JOIN acce.tbUsuarios t3
		   ON t1.resi_UsuModificacion = t3.usua_Id INNER JOIN gral.tbEstadosCiviles t4
		   ON t1.estacivi_Id = t4.estacivi_Id INNER JOIN asil.tbEmpleados t5
		   ON t1.empe_Id = t5.empe_Id INNER JOIN asil.tbAgendas t6
		   ON t1.agen_Id = t6,agen_Id 
GO

/*LISTAR RESIDENTES*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbResidentes_List
AS
BEGIN
	SELECT *
	FROM asil.asil.VW_tbResidentes
	WHERE resi_Estado = 1
END
GO

/*FIND RESIDENTES*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbResidentes_Find 
	@resi_Id	INT
AS
BEGIN
	SELECT * FROM asil.VW_tbResidentes
	WHERE resi_Estado = 1
	AND resi_Id = @resi_Id
END
GO


/*INSERTAR RESIDENTES*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbResidentes_Insert
	@resi_Nombres			NVARCHAR(200),
	@resi_Apellidos			NVARCHAR(200),
	@resi_Identidad			VARCHAR(13),
	@estacivi_Id			INT,
	@resi_Nacimiento		DATE,
	@resi_Sexo				CHAR,
	@diet_Id				INT ,
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
			INSERT INTO asil.tbResidentes(resi_Nombres, resi_Apellidos,resi_Identidad,estacivi_Id,resi_Nacimiento,resi_Sexo,diet_Id,resi_FechaIngreso,empe_Id,agen_Id,resi_UsuCreacion)
			VALUES(@resi_Nombres, @resi_Apellidos,@resi_Identidad,@estacivi_Id,@resi_Nacimiento,@resi_Sexo,@diet_Id,@resi_FechaIngreso,@empe_Id,@agen_Id,@resi_UsuCreacion)
			
			SELECT 'El residente ha sido insertado'
			END
		ELSE IF EXISTS (SELECT * FROM asil.tbResidentes 
						WHERE resi_Identidad = @resi_Identidad
						AND resi_Estado = 0)
			BEGIN
				UPDATE asil.tbResidentes 
				SET    resi_Estado      = 1,
					   resi_UsuCreacion = @resi_UsuCreacion,
					   resi_Nombres = @resi_Nombres,
					   resi_Apellidos = @resi_Apellidos,
					   estacivi_Id = @estacivi_Id,
					   resi_Nacimiento = @resi_Nacimiento,
					   resi_Sexo = @resi_Sexo,
					   diet_Id = @diet_Id,
					   resi_FechaIngreso = @resi_FechaIngreso,
					   empe_Id = @empe_Id,
					   agen_Id= @agen_Id
				WHERE resi_Identidad = @resi_Identidad

				SELECT 'El residente ha sido insertado'
			END
		ELSE
			SELECT 'Ya existe un residente con este número de identidad'
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
	END CATCH
END
GO




/*EDITAR RESIDENTES*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbResidentes_Update
    @resi_Id                INT,
    @resi_Nombres			NVARCHAR(200),
	@resi_Apellidos			NVARCHAR(200),
	@resi_Identidad			VARCHAR(13),
	@estacivi_Id			INT,
	@resi_Nacimiento		DATE,
	@resi_Sexo				CHAR,
	@diet_Id				INT ,
	@resi_FechaIngreso		DATE,
	@empe_Id				INT,
	@agen_Id				INT,
	@resi_UsuModificacion		INT 
AS
BEGIN
	BEGIN TRY
	IF NOT EXISTS (SELECT * FROM asil.tbResidentes
						WHERE resi_Identidad = @resi_Identidad)
		BEGIN			
			UPDATE  asil.tbResidentes
			SET 	resi_Nombres            = @resi_Nombres,
			        resi_Apellidos         = @resi_Apellidos,
					resi_Identidad         = @resi_Identidad,
					estacivi_Id            = @estacivi_Id,
					resi_Nacimiento        = @resi_Nacimiento,
					resi_Sexo              = @resi_Sexo,
					diet_Id                = @diet_Id,
					resi_FechaIngreso      = @resi_FechaIngreso,
					empe_Id                = @empe_Id,
					agen_Id                = @agen_Id,
					resi_UsuModificacion   = @agen_UsuModificacion,
					resi_FechaModificacion = GETDATE()
			WHERE 	resi_Id                = @resi_Id

			SELECT 'El residente ha sido editado'
		END
		ELSE IF EXISTS (SELECT * FROM asil.tbResidentes
						WHERE resi_Identidad  = @resi_Identidad
							  AND resi_Estado = 1
							  AND resi_Id    != @resi_Id)

			SELECT 'Ya existe un residente con este número de identidad'
		ELSE
			UPDATE  asil.tbResidentes
			SET     resi_Estado	          = 1,
			        resi_Nombres            = @resi_Nombres,
			        resi_Apellidos         = @resi_Apellidos,
					estacivi_Id            = @estacivi_Id,
					resi_Nacimiento        = @resi_Nacimiento,
					resi_Sexo              = @resi_Sexo,
					diet_Id                = @diet_Id,
					resi_FechaIngreso      = @resi_FechaIngreso,
					empe_Id                = @empe_Id,
					agen_Id                = @agen_Id,
					resi_UsuModificacion = @resi_UsuModificacion,
					resi_FechaModificacion = GETDATE()
			WHERE   resi_Identidad = @resi_Identidad

			SELECT 'El residente ha sido editado'
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
	END CATCH
END
GO


/*ELIMINAR RESIDENTES*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbResidentes_Delete
	 @resi_Id	INT
AS
BEGIN
	BEGIN TRY
		UPDATE asil.tbResidentes
		SET resi_Estado = 0
		WHERE resi_Id = @resi_Id

		SELECT 'El residente ha sido eliminado'
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
	END CATCH
END
GO

--************PARENTESCOS******************--

/*VISTA PARENTESCOS*/
CREATE OR ALTER VIEW asil.VW_tbParentescos
AS
	SELECT pare_Id,
	       pare_Nombre,
		   pare_UsuCreacion,
		   t2.usua_NombreUsuario AS usua_UsuCreacion_Nombre,
		   pare_FechaCreacion,
		   pare_UsuModificacion,
		   t3.usua_NombreUsuario AS usua_UsuModificacion_Nombre,
		   pare_FechaModificacion,
		   pare_Estado
		   FROM asil.tbParentescos t1 LEFT JOIN acce.tbUsuarios t2
		   ON t1.carg_UsuCreacion = T2.usua_Id
		   LEFT JOIN acce.tbUsuarios t3
		   ON t1.carg_UsuModificacion = t3.usua_Id
GO

/*LISTAR PARENTESCOS*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbParentescos_List
AS
BEGIN
	SELECT *
	FROM asil.VW_tbParentescos
	WHERE pare_Estado = 1
END
GO

/*FIND PARENTESCOS*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbParentescos_Find 
	@pare_Id	INT
AS
BEGIN
	SELECT * FROM  asil.VW_tbParentescos
	WHERE pare_Estado = 1
	AND pare_Id = @pare_Id
END
GO


/*INSERTAR PARENTESCOS*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbParentescos_Insert
	@pare_Nombre				NVARCHAR(100),
	@pare_UsuCreacion		    INT
	
AS 
BEGIN
	BEGIN TRY
		IF NOT EXISTS (SELECT * FROM asil.tbParentescos
						WHERE pare_Nombre = @pare_Nombre)
			BEGIN
			INSERT INTO asil.tbParentescos(pare_Nombre, pare_UsuCreacion)
			VALUES(@pare_Nombre, @pare_UsuCreacion)
			
			SELECT 'El parentesco ha sido insertado'
			END
		ELSE IF EXISTS (SELECT * FROM asil.tbParentescos 
						WHERE pare_Nombre = @pare_Nombre
						AND pare_Estado = 0)
			BEGIN
				UPDATE asil.tbParentescos 
				SET    pare_Estado      = 1,
					   pare_UsuCreacion = @pare_UsuCreacion
				WHERE pare_Nombre = @pare_Nombre

				SELECT 'El parentesco ha sido insertado'
			END
		ELSE
			SELECT 'Este parentesco ya existe'
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
	END CATCH
END
GO




/*EDITAR PARENTESCOS*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbParentescos_Update
  @pare_Id					INT,
  @pare_Nombre				NVARCHAR(100),
  @pare_UsuModificacion	    INT
AS
BEGIN
	BEGIN TRY
	IF NOT EXISTS (SELECT * FROM asil.tbParentescos 
						WHERE pare_Nombre = @pare_Nombre)
		BEGIN			
			UPDATE  asil.tbParentescos
			SET 	pare_Nombre            = @pare_Nombre,
					pare_UsuModificacion   = @pare_UsuModificacion,
					pare_FechaModificacion = GETDATE()
			WHERE 	pare_Id                = @pare_Id

			SELECT 'El parentesco ha sido editado'
		END
		ELSE IF EXISTS (SELECT * FROM asil.tbParentescos
						WHERE pare_Nombre     = @pare_Nombre
							  AND pare_Estado = 1
							  AND pare_Id     != @pare_Id)

			SELECT 'El parentesco ya existe'
		ELSE
			UPDATE  asil.tbParentescos
			SET     pare_Estado	          = 1,
					pare_UsuModificacion = @pare_UsuModificacion,
					pare_FechaModificacion = GETDATE()
			WHERE   pare_Nombre = @pare_Nombre

			SELECT 'El parentesco ha sido editado'
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
	END CATCH
END
GO


/*ELIMINAR PARENTESCOS*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbParentescos_Delete
	 @pare_Id	INT
AS
BEGIN
	BEGIN TRY
		UPDATE asil.tbParentescos
		SET pare_Estado = 0
		WHERE pare_Id = @pare_Id

		SELECT 'El parentesco ha sido eliminado'
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
	END CATCH
END
GO

--************ENCARGADOS******************--

/*VISTA ENCARGADOS*/
CREATE OR ALTER VIEW asil.VW_tbEncargados
AS
	SELECT enca_Id,
	       enca_Nombres,
		   enca_Apellidos,
		   enca_Identidad,
		   estacivi_Id,
		   t4.estacivi_Nombre,
		   enca_Nacimiento,
		   
		   CASE WHEN  enca_Sexo = 'F' THEN 'Femenino'
				ELSE 'Masculino'
		   END AS  enca_Sexo,
		   muni_Id,
		   t7.muni_Nombre,
		   enca_Direccion,
		   enca_Telefono,
		   resi_Id,
		   t8.resi_Nombres,
		   pare_Id,
		   t9.pare_Nombre,
		   enca_UsuCreacion,
		   t2.usua_NombreUsuario AS usua_UsuCreacion_Nombre,
		   enca_FechaCreacion,
		   enca_UsuModificacion,
		   enca_FechaModificacion,
		   t3.usua_NombreUsuario AS usua_UsuModificacion_Nombre,
		   enca_Estado
		   FROM asil.tbEncargados t1 LEFT JOIN acce.tbUsuarios t2
		   ON t1.carg_UsuCreacion = T2.usua_Id
		   LEFT JOIN acce.tbUsuarios t3
		   ON t1.carg_UsuModificacion = t3.usua_Id INNER JOIN gral.tbEstadosCiviles t4
		   ON t1.estacivi_Id = t4.estacivi_Id INNER JOIN gral.tbMunicipios T7
	       ON T1.muni_Id = T7.muni_id INNER JOIN asil.tbResidentes T8
		   ON t1.resi_Id = t8.resi_Id INNER JOIN asil.tbParentescos t9
		   ON t1.pare_Id = t9.pare_Id
GO

/*LISTAR ENCARGADOS*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbEncargados_List
AS
BEGIN
	SELECT *
	FROM asil.VW_tbEncargados
	WHERE enca_Estado = 1
END
GO

/*FIND ENCARGADOS*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbEncargados_Find 
	@enca_Id	INT
AS
BEGIN
	SELECT * FROM asil.VW_tbEncargados
	WHERE enca_Estado = 1
	AND enca_Id = @enca_Id
END
GO


/*INSERTAR ENCARGADOS*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbEncargados_Insert
   @enca_Nombres			NVARCHAR(200),
   @enca_Apellidos			NVARCHAR(200),
   @enca_Identidad			VARCHAR(13),
   @estacivi_Id				INT,
   @enca_Nacimiento			DATE,
   @enca_Sexo				CHAR ,
   @muni_Id					CHAR(4),
   @enca_Direccion			NVARCHAR(500),
   @enca_Telefono			NVARCHAR(20),
   @resi_Id					INT,
   @pare_Id					INT,
   @enca_UsuCreacion		INT	 
	
AS 
BEGIN
	BEGIN TRY
		IF NOT EXISTS (SELECT * FROM asil.tbEncargados
						WHERE enca_Identidad = @enca_Identidad)
			BEGIN
			INSERT INTO asil.tbEncargados(enca_Nombres,
			                              enca_Apellidos,
										  enca_Identidad, 
										  estacivi_Id,
										  enca_Nacimiento, 
										  enca_Sexo, 
										  muni_Id,
										  enca_Direccion, 
										  enca_Telefono, 
										  resi_Id, 
										  pare_Id, 
										  enca_UsuCreacion)
			VALUES(@enca_Nombres, @enca_Apellidos, @enca_Identidad, @estacivi_Id,@enca_Nacimiento, @enca_Sexo, @muni_Id,@enca_Direccion, @enca_Telefono, @resi_Id, @pare_Id, @enca_UsuCreacion)
			
			SELECT 'El encargado ha sido insertado'
			END
		ELSE IF EXISTS (SELECT * FROM asil.tbEncargados 
						WHERE enca_Identidad = @enca_Identidad
						AND enca_Estado = 0)
			BEGIN
				UPDATE asil.tbEncargados 
				SET    enca_Estado = 1,
				       enca_Nombres     = @enca_Nombres,
					   enca_Apellidos   = @enca_Apellidos,
					   estacivi_Id      = @estacivi_Id,
					   enca_Nacimiento  = @enca_Nacimiento,
					   enca_Sexo        = @enca_Sexo,
					   muni_Id          = @muni_Id,
					   enca_Direccion   = @enca_Direccion,
					   enca_Telefono    = @enca_Telefono,
					   resi_Id          = @resi_Id,
					   pare_Id          = @pare_Id,
					   enca_UsuCreacion = @enca_UsuCreacion
				WHERE enca_Identidad = @enca_Identidad

				SELECT 'El encargado ha sido insertado'
			END
		ELSE
			SELECT 'Ya existe un encargado con este número de identidad'
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
	END CATCH
END
GO




/*EDITAR ENCARGADOS*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbEncargados_Update
    @enca_Id					INT,
   @enca_Nombres			NVARCHAR(200),
   @enca_Apellidos			NVARCHAR(200),
   @enca_Identidad			VARCHAR(13),
   @estacivi_Id				INT,
   @enca_Nacimiento			DATE,
   @enca_Sexo				CHAR ,
   @muni_Id					CHAR(4),
   @enca_Direccion			NVARCHAR(500),
   @enca_Telefono			NVARCHAR(20),
   @resi_Id					INT,
   @pare_Id					INT,
   @enca_UsuModificacion	INT	  
AS
BEGIN
	BEGIN TRY
	IF NOT EXISTS (SELECT * FROM asil.tbEncargados 
						WHERE enca_Identidad = @enca_Identidad)
		BEGIN			
			UPDATE  asil.tbEncargados
			SET 	enca_Nombres          = @enca_Nombres,
			        enca_Apellidos        = @enca_Apellidos,
					enca_Identidad        = @enca_Identidad,
					estacivi_Id           = @estacivi_Id,
					enca_Nacimiento       = @enca_Nacimiento,
					enca_Sexo             = @enca_Sexo,
					muni_Id               = @muni_Id,
					enca_Direccion        = @enca_Direccion,
					enca_Telefono         = @enca_Telefono,
					resi_Id               = @resi_Id,
					pare_Id               = @pare_Id,
					enca_UsuModificacion   = @enca_UsuModificacion,
					enca_FechaModificacion = GETDATE()
			WHERE 	enca_Id                = @enca_Id

			SELECT 'El encargado ha sido editado'
		END
		ELSE IF EXISTS (SELECT * FROM asil.tbEncargados
						WHERE enca_Identidad  = @enca_Identidad
							  AND enca_Estado = 1
							  AND enca_Id     != @enca_Id)

			SELECT 'Ya existe un encargado con este número de identidad'
		ELSE
			UPDATE  asil.tbEncargados
			SET     enca_Estado	           = 1,
			        enca_Nombres           = @enca_Nombres,
					enca_Apellidos         = @enca_Apellidos,
					estacivi_Id            = @estacivi_Id,
					enca_Nacimiento        = @enca_Nacimiento,
					enca_Sexo              = @enca_Sexo,
					muni_Id                = @muni_Id,
					enca_Direccion         = @enca_Direccion,
					enca_Telefono          = @enca_Telefono,
					resi_Id                = @resi_Id,
					pare_Id                = @pare_Id,
					enca_UsuModificacion   = @enca_UsuModificacion,
					enca_FechaModificacion = GETDATE()
			WHERE   enca_Identidad         = @enca_Identidad

			SELECT 'El encargado ha sido editado'
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
	END CATCH
END
GO


/*ELIMINAR ENCARGADOS*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbEncargados_Delete
	 @enca_Id	INT
AS
BEGIN
	BEGIN TRY
		UPDATE asil.tbEncargados
		SET   enca_Estado = 0
		WHERE enca_Id     = @enca_Id

		SELECT 'El encargado ha sido eliminado'
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
	END CATCH
END
GO

--************TIPOS DE SANGRE******************--

/*VISTA TIPOS DE SANGRE*/
CREATE OR ALTER VIEW asil.VW_tbTiposSangre
AS
	SELECT tiposang_Id,
	       tiposang_Nombre,
		   tiposang_UsuCreacion,
		   t2.usua_NombreUsuario AS usua_UsuCreacion_Nombre,
		   tiposang_FechaCreacion,
		   tiposang_UsuModificacion,
		   t3.usua_NombreUsuario AS usua_UsuModificacion_Nombre,
		   tiposang_FechaModificacion,
		   tiposang_Estado
		   FROM asil.tbTiposSangre t1 LEFT JOIN acce.tbUsuarios t2
		   ON t1.carg_UsuCreacion = T2.usua_Id
		   LEFT JOIN acce.tbUsuarios t3
		   ON t1.carg_UsuModificacion = t3.usua_Id
GO

/*LISTAR TIPOS DE SANGRE*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbTiposSangre_List
AS
BEGIN
	SELECT *
	FROM asil.VW_tbTiposSangre
	WHERE tiposang_Estado = 1
END
GO

/*FIND TIPOS DE SANGRE*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbTiposSangre_Find 
	@tiposang_Id	INT
AS
BEGIN
	SELECT * FROM  asil.VW_tbTiposSangre
	WHERE tiposang_Estado = 1
	AND tiposang_Id = @tiposang_Id
END
GO


/*INSERTAR TIPOS DE SANGRE*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbTiposSangre_Insert
	@tiposang_Nombre				CHAR(3),
	@tiposang_UsuCreacion		    INT 
	
AS 
BEGIN
	BEGIN TRY
		IF NOT EXISTS (SELECT * FROM asil.tbTiposSangre
						WHERE tiposang_Nombre = @tiposang_Nombre)
			BEGIN
			INSERT INTO asil.tbTiposSangre(tiposang_Nombre, tiposang_UsuCreacion)
			VALUES(@tiposang_Nombre, @tiposang_UsuCreacion)
			
			SELECT 'El tipo de sangre ha sido insertado'
			END
		ELSE IF EXISTS (SELECT * FROM asil.tbTiposSangre 
						WHERE tiposang_Nombre = @tiposang_Nombre
						AND tiposang_Estado = 0)
			BEGIN
				UPDATE asil.tbTiposSangre 
				SET    tiposang_Estado      = 1,
					   tiposang_UsuCreacion = @tiposang_UsuCreacion
				WHERE tiposang_Nombre = @tiposang_Nombre

				SELECT 'El tipo de sangre ha sido insertado'
			END
		ELSE
			SELECT 'Este tipo de sangre ya existe'
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
	END CATCH
END
GO




/*EDITAR TIPOS DE SANGRE*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbTiposSangre_Update
  @tiposang_Id					INT,
  @tiposang_Nombre				CHAR(3),
  @tiposang_UsuModificacion	INT
AS
BEGIN
	BEGIN TRY
	IF NOT EXISTS (SELECT * FROM asil.tbTiposSangre 
						WHERE tiposang_Nombre = @tiposang_Nombre)
		BEGIN			
			UPDATE  asil.tbTiposSangre
			SET 	tiposang_Nombre            = @tiposang_Nombre,
					tiposang_UsuModificacion   = @tiposang_UsuModificacion,
					tiposang_FechaModificacion = GETDATE()
			WHERE 	tiposang_Id                = @tiposang_Id

			SELECT 'El tipo de sangre ha sido editado'
		END
		ELSE IF EXISTS (SELECT * FROM asil.tbTiposSangre
						WHERE tiposang_Nombre      = @tiposang_Nombre
							  AND tiposang_Estado  = 1
							  AND tiposang_Id     != @tiposang_Id)

			SELECT 'El tipo de sangre ya existe'
		ELSE
			UPDATE  asil.tbTiposSangre
			SET     tiposang_Estado	          = 1,
					tiposang_UsuModificacion  = @tiposang_UsuModificacion,
					tiposang_FechaModificacion = GETDATE()
			WHERE   tiposang_Nombre = @tiposang_Nombre

			SELECT 'El tipo de sangre ha sido editado'
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
	END CATCH
END
GO


/*ELIMINAR TIPOS DE SANGRE*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbTiposSangre_Delete
	 @tiposang_Id	INT
AS
BEGIN
	BEGIN TRY
		UPDATE asil.tbTiposSangre
		SET tiposang_Estado = 0
		WHERE tiposang_Id   = @tiposang_Id

		SELECT 'El tipo de sangre ha sido eliminado'
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
	END CATCH
END
GO

--************TABLA ENFERMEDADES X RESIDENTE******************--

/*VISTA ENFERMEDADES X RESIDENTE*/
CREATE OR ALTER VIEW asil.VW_tbEnfermedadesXResidente
AS
	SELECT enferesi_Id,
	       enfe_Id,
		   t4.enfe_Nombre,
		   resi_Id,
		   t5.resi_Nombres,
		   enferesi_UsuCreacion,
		   t2.usua_NombreUsuario AS usua_UsuCreacion_Nombre,
		   enferesi_FechaCreacion,
		   enferesi_UsuModificacion,
		   t3.usua_NombreUsuario AS usua_UsuModificacion_Nombre,
		   enferesi_FechaModificacion,
		   enferesi_Estado
		   FROM asil.tbEnfermedadesXResidente t1 LEFT JOIN acce.tbUsuarios t2
		   ON t1.carg_UsuCreacion = T2.usua_Id
		   LEFT JOIN acce.tbUsuarios t3
		   ON t1.carg_UsuModificacion = t3.usua_Id INNER JOIN asil.tbEnfermedades t4
		   ON t1.enfe_Id = t4.enfe_Id  INNER JOIN asil.tbResidentes T5
		   ON t1.resi_Id = t5.resi_Id
GO

/*LISTAR ENFERMEDADES X RESIDENTE*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbEnfermedadesXResidente_List
AS
BEGIN
	SELECT *
	FROM asil.VW_tbEnfermedadesXResidente
	WHERE enferesi_Estado = 1
END
GO

/*FIND ENFERMEDADES X RESIDENTE*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbEnfermedadesXResidente_Find 
	@enferesi_Id	INT
AS
BEGIN
	SELECT * FROM  asil.VW_tbEnfermedadesXResidente
	WHERE enferesi_Estado = 1
	AND enferesi_Id = @enferesi_Id
END
GO


/*INSERTAR ENFERMEDADES X RESIDENTE*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbEnfermedadesXResidente_Insert
	@enfe_Id						INT,
	@resi_Id						INT,
	@enferesi_UsuCreacion		    INT 
	
AS 
BEGIN
	BEGIN TRY
		IF NOT EXISTS (SELECT * FROM asil.tbEnfermedadesXResidente
						WHERE enfe_Id   = @enfe_Id 
						    AND resi_Id = @resi_Id)
			BEGIN
			INSERT INTO asil.tbEnfermedadesXResidente(enfe_Id, resi_Id, enferesi_UsuCreacion)
			VALUES(@tiposang_Nombre, @tiposang_UsuCreacion)
			
			SELECT 'La enfermedad por recidente ha sido insertada'
			END
		ELSE IF EXISTS (SELECT * FROM asil.tbEnfermedadesXResidente
						WHERE enfe_Id   = @enfe_Id 
						 AND resi_Id    = @resi_Id
						AND enferesi_Estado = 0)
			BEGIN
				UPDATE asil.tbEnfermedadesXResidente 
				SET    enferesi_Estado      = 1,
					   enferesi_UsuCreacion = @enferesi_UsuCreacion
				WHERE enfe_Id   = @enfe_Id 
				   AND resi_Id = @resi_Id

				SELECT 'La enfermedad por recidente ha sido insertada'
			END
		ELSE
			SELECT 'Esta enfermedad por recidente ya existe'
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
	END CATCH
END
GO




/*EDITAR ENFERMEDADES X RESIDENTE*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbEnfermedadesXResidente_Update
    @enferesi_Id					INT,
	@enfe_Id						INT,
	@resi_Id						INT,
	@enferesi_UsuModificacion	    INT 
AS
BEGIN
	BEGIN TRY
	IF NOT EXISTS (SELECT * FROM asil.tbEnfermedadesXResidente
						WHERE enfe_Id   = @enfe_Id 
						    AND resi_Id = @resi_Id)
		BEGIN			
			UPDATE  asil.tbEnfermedadesXResidente
			SET 	enfe_Id                    = @enfe_Id,
			        resi_Id                    = @resi_Id,
			        enferesi_UsuModificacion   = @enferesi_UsuModificacion,
					enferesi_FechaModificacion = GETDATE()
			WHERE 	enferesi_Id                = @enferesi_Id

			SELECT 'La enfermedad por recidente ha sido editada'
		END
		ELSE IF EXISTS (SELECT * FROM asil.tbEnfermedadesXResidente
						WHERE enfe_Id   = @enfe_Id 
						      AND resi_Id = @resi_Id
							  AND enferesi_Estado  = 1
							  AND enferesi_Id     != @enferesi_Id)

			SELECT 'La enfermedad por este recidente ya existe'
		ELSE
			UPDATE  asil.tbEnfermedadesXResidente
			SET     enferesi_Estado	          = 1,
					enferesi_UsuModificacion  = @enferesi_UsuModificacion,
					enferesi_FechaModificacion = GETDATE()
			WHERE   enfe_Id   = @enfe_Id 
			      AND resi_Id = @resi_Id

			SELECT 'La enfermedad por recidente ha sido editada'
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
	END CATCH
END
GO


/*ELIMINAR ENFERMEDADES X RESIDENTE*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbEnfermedadesXResidente_Delete
	 @enferesi_Id	INT
AS
BEGIN
	BEGIN TRY
		UPDATE asil.tbEnfermedadesXResidente
		SET enferesi_Estado = 0
		WHERE enferesi_Id   = @enferesi_Id

		SELECT 'La enfermedad por recidente ha sido eliminada'
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
	END CATCH
END
GO

--************EXPEDIENTES******************--

/*VISTA EXPEDIENTES*/
CREATE OR ALTER VIEW asil.VW_tbExpedientes
AS
	SELECT expe_Id,
	       resi_Id,
		   t4.resi_Nombres,
		   tiposang_Id,
		   t5.tiposang_Nombre,
		   expe_FechaApertura,
		   expe_Fotografia,
		   expe_UsuCreacion,
		   expe_FechaCreacion,
		   t2.usua_NombreUsuario AS usua_UsuCreacion_Nombre,
		   expe_UsuModificacion,
		   t3.usua_NombreUsuario AS usua_UsuModificacion_Nombre,
            expe_FechaModificacion,
			expe_Estado
		   FROM asil.tbTiposSangre t1 LEFT JOIN acce.tbUsuarios t2
		   ON t1.carg_UsuCreacion = T2.usua_Id
		   LEFT JOIN acce.tbUsuarios t3
		   ON t1.carg_UsuModificacion = t3.usua_Id INNER JOIN tbResidentes t4
		   ON t1.resi_Id = t4.resi_Id INNER JOIN asil.tbTiposSangre t5
		   ON t1.tiposang_Id = t5.tiposang_Id
GO

/*LISTAR EXPEDIENTES*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbExpedientes_List
AS
BEGIN
	SELECT *
	FROM asil.VW_tbExpedientes
	WHERE expe_Estado = 1
END
GO

/*FIND EXPEDIENTES*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbExpedientes_Find 
	@expe_Id	INT
AS
BEGIN
	SELECT * FROM  asil.VW_tbExpedientes
	WHERE expe_Estado = 1
	AND expe_Id = @expe_Id
END
GO


/*INSERTAR EXPEDIENTES*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbExpedientes_Insert
	@resi_Id					INT,
	@tiposang_Id				INT,
	@expe_FechaApertura		    DATE,
	@expe_Fotografia			NVARCHAR(500),
	@expe_UsuCreacion		    INT  
	
AS 
BEGIN
	BEGIN TRY
		IF NOT EXISTS (SELECT * FROM asil.tbExpedientes
						WHERE resi_Id = @resi_Id)
			BEGIN
			INSERT INTO asil.tbExpedientes(resi_Id, tiposang_Id, expe_FechaApertura, expe_Fotografia, expe_UsuCreacion)
			VALUES(@resi_Id, @tiposang_Id, @expe_FechaApertura, @expe_Fotografia, @expe_UsuCreacion)
			
			SELECT 'El expediente ha sido insertado'
			END
		ELSE IF EXISTS (SELECT * FROM asil.tbExpedientes 
						WHERE resi_Id = @resi_Id
						AND expe_Estado = 0)
			BEGIN
				UPDATE asil.tbExpedientes 
				SET    expe_Estado      = 1,
				       tiposang_Id      = @tiposang_Id,
					   expe_FechaApertura = @expe_FechaApertura,
					   expe_Fotografia   = @expe_Fotografia,
					   expe_UsuCreacion = @expe_UsuCreacion
				WHERE resi_Id = @resi_Id

				SELECT 'El expediente ha sido insertado'
			END
		ELSE
			SELECT 'Este expediente ya existe'
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
	END CATCH
END
GO




/*EDITAR EXPEDIENTES*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbExpedientes_Update
  @expe_Id					INT,
  @resi_Id					INT,
  @tiposang_Id				INT,
  @expe_FechaApertura		DATE,
  @expe_Fotografia			NVARCHAR(500),
  @expe_UsuModificacion	    INT
AS
BEGIN
	BEGIN TRY
	IF NOT EXISTS (SELECT * FROM asil.tbExpedientes 
						WHERE resi_Id = @resi_Id)
		BEGIN			
			UPDATE  asil.tbExpedientes
			SET 	resi_Id            = @resi_Id,
					tiposang_Id   = @tiposang_Id,
					expe_FechaApertura = @expe_FechaApertura,
					expe_Fotografia    = @expe_Fotografia,
					expe_UsuModificacion = @expe_UsuModificacion,
					expe_FechaModificacion = GETDATE()
			WHERE 	expe_Id                = @expe_Id

			SELECT 'El expediente ha sido editado'
		END
		ELSE IF EXISTS (SELECT * FROM asil.tbExpedientes
						WHERE resi_Id      = @resi_Id
							  AND expe_Estado  = 1
							  AND expe_Id     != @expe_Id)

			SELECT 'El expediente ya existe'
		ELSE
			UPDATE  asil.tbExpedientes
			SET     expe_Estado	          = 1,
			        tiposang_Id = @tiposang_Id,
					expe_FechaApertura = @expe_FechaApertura,
					expe_Fotografia  = @expe_Fotografia,
					expe_UsuModificacion  = @tiposang_UsuModificacion,
					expe_FechaModificacion = GETDATE()
			WHERE   resi_Id = @resi_Id

			SELECT 'El expediente ha sido editado'
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
	END CATCH
END
GO


/*ELIMINAR EXPEDIENTES*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbExpedientes_Delete
	 @expe_Id	INT
AS
BEGIN
	BEGIN TRY
		UPDATE asil.tbExpedientes
		SET expe_Estado = 0
		WHERE expe_Id   = @expe_Id

		SELECT 'El expediente ha sido eliminado'
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
	END CATCH
END
GO

--************HISTORIAL EXPEDIENTES******************--

/*VISTA HISTORIAL EXPEDIENTES*/
CREATE OR ALTER VIEW asil.VW_tbHistorialExpedientes
AS
	SELECT histexpe_Id,
	       expe_Id,

		   histexpe_Observaciones,
		   empe_Id,
		   t4.empe_Nombres,
		   histexpe_FechaActualizacion,
		   histexpe_UsuCreacion,
		   t2.usua_NombreUsuario AS usua_UsuCreacion_Nombre,
		   histexpe_FechaCreacion,
		   histexpe_UsuModificacion,
		   t3.usua_NombreUsuario AS usua_UsuModificacion_Nombre,
           histexpe_FechaModificacion,
		   histexpe_Estado
		   FROM asil.tbHistorialExpedientes t1 LEFT JOIN acce.tbUsuarios t2
		   ON t1.carg_UsuCreacion = T2.usua_Id
		   LEFT JOIN acce.tbUsuarios t3
		   ON t1.carg_UsuModificacion = t3.usua_Id INNER JOIN asil.tbEmpleados t4
		   ON t1.empe_Id = t4.empe_Id
GO

/*LISTAR HISTORIAL EXPEDIENTES*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbHistorialExpedientes_List
AS
BEGIN
	SELECT *
	FROM asil.VW_tbHistorialExpedientes
	WHERE histexpe_Estado = 1
END
GO

/*FIND HISTORIAL EXPEDIENTES*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbHistorialExpedientes_Find 
	@histexpe_Id	INT
AS
BEGIN
	SELECT * FROM  asil.VW_tbHistorialExpedientes
	WHERE histexpe_Estado = 1
	AND histexpe_Id = @histexpe_Id
END
GO


/*INSERTAR HISTORIAL EXPEDIENTES*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbHistorialExpedientes_Insert
	@expe_Id							INT,
	@histexpe_Observaciones			    NVARCHAR(1000),
	@empe_Id							INT,
	@histexpe_FechaActualizacion		DATE,
	@histexpe_UsuCreacion			    INT
	
AS 
BEGIN
	BEGIN TRY
		IF NOT EXISTS (SELECT * FROM asil.tbHistorialExpedientes
						WHERE histexpe_Observaciones = @histexpe_Observaciones
						  AND expe_Id = @expe_Id )
			BEGIN
			INSERT INTO asil.tbHistorialExpedientes(expe_Id, histexpe_Observaciones, empe_Id, histexpe_FechaActualizacion,histexpe_UsuCreacion)
			VALUES(@expe_Id, @histexpe_Observaciones, @empe_Id, @histexpe_FechaActualizacion,@histexpe_UsuCreacion)
			
			SELECT 'El historial expediente ha sido insertado'
			END
		ELSE IF EXISTS (SELECT * FROM asil.tbHistorialExpedientes
						WHERE histexpe_Observaciones = @histexpe_Observaciones
						  AND expe_Id = @expe_Id
						  AND histexpe_Estado = 0)
			BEGIN
				UPDATE asil.tbHistorialExpedientes 
				SET    histexpe_Estado      = 1,
				       empe_Id               = @empe_Id,
					   histexpe_FechaActualizacion = @histexpe_FechaActualizacion,
					   histexpe_UsuCreacion   = @histexpe_UsuCreacion
				WHERE resi_Id = @resi_Id
				      AND histexpe_Observaciones = @histexpe_Observaciones
					  AND expe_Id = @expe_Id

				SELECT 'El historial expediente ha sido insertado'
			END
		ELSE
			SELECT 'Este historial expediente ya existe'
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
	END CATCH
END
GO




/*EDITAR HISTORIAL EXPEDIENTES*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbHistorialExpedientes_Update
    @histexpe_Id                        INT,
	@expe_Id							INT,
	@histexpe_Observaciones			    NVARCHAR(1000),
	@empe_Id							INT,
	@histexpe_FechaActualizacion		DATE,
	@histexpe_UsuCreacion			    INT
	
AS
BEGIN
	BEGIN TRY
	
		BEGIN			
			UPDATE  asil.tbHistorialExpedientes
			SET 	expe_Id            = @expe_Id,
					histexpe_Observaciones   = @histexpe_Observaciones,
					empe_Id = @empe_Id,
					histexpe_FechaActualizacion    = @histexpe_FechaActualizacion,
					histexpe_UsuModificacion = @histexpe_UsuModificacion,
					histexpe_FechaModificacion = GETDATE()
			WHERE 	histexpe_Id                = @histexpe_Id

			SELECT 'El historial expediente ha sido editado'
		END
		
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
	END CATCH
END
GO


/*ELIMINAR HISTORIAL EXPEDIENTES*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbHistorialExpedientes_Delete
	 @histexpe_Id	INT
AS
BEGIN
	BEGIN TRY
		UPDATE asil.tbHistorialExpedientes
		SET histexpe_Estado = 0
		WHERE histexpe_Id   = @histexpe_Id

		SELECT 'El historial expediente ha sido eliminado'
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
	END CATCH
END
GO

