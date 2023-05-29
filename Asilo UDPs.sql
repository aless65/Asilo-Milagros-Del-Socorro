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

--************ROLES******************--

/*Vista Roles*/
--CREATE OR ALTER VIEW acce.VW_tbRoles
--AS
--	SELECT  t1.role_Id,
--	        role_Nombre,
--			role_UsuCreacion,
--		   t2.usua_NombreUsuario AS usua_UsuCreacion_Nombre,
--		   role_FechaCreacion,
--		   role_UsuModificacion,
--		   t3.usua_NombreUsuario AS usua_UsuModificacion_Nombre, 
--		   role_FechaModificacion,
--		   role_Estado
--		   FROM acce.tbRoles t1 LEFT JOIN acce.tbUsuarios t2
--		   ON t1.role_UsuCreacion = T2.usua_Id
--		   LEFT JOIN acce.tbUsuarios t3
--		   ON t1.role_UsuModificacion = t3.usua_Id
--GO

--/*Listar Roles*/
--CREATE OR ALTER PROCEDURE acce.UDP_acce_tbRoles_List
--AS
--BEGIN
--	SELECT * FROM acce.VW_tbRoles
--	WHERE role_Estado = 1
--END
--GO

--/*Insertar Roles*/
--CREATE OR ALTER PROCEDURE acce.UDP_acce_tbRoles_Insert 
--	@role_Nombre		NVARCHAR(100),
--	@role_UsuCreacion	INT
--AS 
--BEGIN
	
--	BEGIN TRY

--		IF NOT EXISTS (SELECT * FROM acce.tbRoles
--						WHERE role_Nombre = @role_Nombre)
--		BEGIN
--			INSERT INTO acce.tbRoles(role_Nombre, role_UsuCreacion)
--			VALUES(@role_Nombre, @role_UsuCreacion)

--			SELECT 'El rol ha sido insertado exitosamente'
--		END
--		ELSE IF EXISTS (SELECT * FROM acce.tbRoles
--						WHERE role_Nombre = @role_Nombre
--							  AND role_Estado = 1)

--			SELECT 'Este rol ya existe'
--		ELSE
--			BEGIN
--				UPDATE acce.tbRoles
--				SET role_Estado = 1
--				WHERE role_Nombre = @role_Nombre

--				SELECT 'El rol ha sido insertado exitosamente'
--			END
--	END TRY
--	BEGIN CATCH
--		SELECT 'Ha ocurrido un error'
--	END CATCH 
--END
--GO

--/*Find Roles*/
--CREATE OR ALTER PROCEDURE asil.UDP_acce_VW_tbRoles_Find 
--	@role_Id	INT
--AS
--BEGIN
--	SELECT * FROM acce.VW_tbRoles
--	WHERE role_Id = @role_Id
--END
--GO


--/*Editar Roles*/
--CREATE OR ALTER PROCEDURE acce.UDP_acce_tbRoles_Update 
--	@role_Id					INT,
--	@role_Nombre				NVARCHAR(100),
--	@role_UsuModificacion		INT
--AS
--BEGIN
--	BEGIN TRY
--	IF NOT EXISTS (SELECT * FROM acce.tbRoles 
--						WHERE role_Nombre = @role_Nombre)
--		BEGIN			
--			UPDATE acce.tbRoles
--			SET 	role_Nombre = @role_Nombre,
--					role_UsuModificacion = @role_UsuModificacion,
--					role_FechaModificacion = GETDATE()
--			WHERE 	role_Id = @role_Id

--			SELECT 'El rol ha sido editado exitosamente'
--		END
--		ELSE IF EXISTS (SELECT * FROM acce.tbRoles 
--						WHERE role_Nombre = @role_Nombre
--							  AND role_Estado = 1
--							  AND role_Id != @role_Id)

--			SELECT 'El rol ya existe'
--		ELSE
--			UPDATE acce.tbRoles 
--			SET role_Estado = 1,	
--			    role_UsuModificacion = @role_UsuModificacion,
--				role_FechaModificacion = GETDATE()
--			WHERE role_Nombre = @role_Nombre

--			SELECT 'El rol ha sido editado exitosamente'
--	END TRY
--	BEGIN CATCH
--		SELECT 'Ha ocurrido un error'
--	END CATCH
--END
--GO


--/*Eliminar Roles*/
--CREATE OR ALTER PROCEDURE acce.UDP_acce_tbRoles_Delete 
--	@role_Id	INT
--AS
--BEGIN
--	BEGIN TRY
--		IF NOT EXISTS (SELECT * FROM acce.tbPantallasPorRoles WHERE role_Id = @role_Id)
--			BEGIN
--				UPDATE acce.tbRoles
--				SET role_Estado = 0
--				WHERE role_Id = @role_Id

--				SELECT 'El rol ha sido eliminado'
--			END
--		ELSE
--			SELECT 'El rol no puede ser eliminado ya que está siendo usado en otro registro'
--	END TRY
--	BEGIN CATCH
--		SELECT 'Ha ocurrido un error'
--	END CATCH
--END
GO

---------- Pantallas Por Roles -----------
CREATE OR ALTER VIEW  acce.VW_tbPantallasPorRoles
AS
	SELECT pantrole_Id,
	       T1.role_Id, 
		   T4.role_Nombre AS pantrole_NombreRol,
		   T1.pant_Id,
		   t5.pant_Nombre AS pantrole_NombrePantalla, 
		   T5.pant_Menu AS pantrole_NombreMenu,
		   pantrole_UsuCreacion, 
		   pantrole_FechaCreacion, 
		   pantrole_UsuModificacion, 
		   pantrole_FechaModificacion, 
		   pantrole_Estado
FROM [acce].[tbPantallasPorRoles] T1 INNER JOIN acce.tbUsuarios T2
ON T1.pantrole_UsuCreacion = T2.usua_Id LEFT JOIN acce.tbUsuarios T3
ON T1.pantrole_UsuModificacion = t3.usua_Id INNER JOIN [acce].[tbRoles] T4
ON T1.role_Id = T4.role_Id INNER JOIN [acce].[tbPantallas] T5
ON T1.pant_Id = T5.pant_Id
WHERE T1.pantrole_Estado = 1
GO


/*Acceso a pantallas*/
GO
CREATE OR ALTER PROCEDURE acce.UDP_tbRolesPorPantalla_Accesos
	@role_Id		INT,
	@esAdmin		BIT,
	@pant_Nombre	NVARCHAR(100)
AS
BEGIN
	IF @esAdmin = 1
		SELECT 1
	ELSE IF EXISTS (SELECT * 
					FROM [acce].[tbPantallasPorRoles] T1 INNER JOIN acce.tbPantallas T2
					ON T1.pant_Id = T2.pant_Id
					WHERE T1.[role_Id] = @role_Id 
					AND T2.pant_Nombre = @pant_Nombre)
		SELECT 1
	ELSE
		SELECT 0
END

GO

---------- Pantallas -----------
CREATE OR ALTER VIEW acce.VW_tbPantallas
AS
	SELECT  pant_Id,
	        pant_Nombre, 
			pant_Url, 
			pant_Menu, 
			pant_Icon, 
			pant_UsuCreacion, 
			T2.usua_NombreUsuario AS pant_NombreUsuarioCreacion,
			pant_FechaCreacion, 
			pant_UsuModificacion,
			T3.usua_NombreUsuario AS pant_NombreUsuarioModificacio, 
			pant_FechaModificacion, 
			pant_Estado
FROM [acce].[tbPantallas] t1 INNER JOIN acce.tbUsuarios T2
ON T1.[pant_UsuCreacion] = T2.usua_Id LEFT JOIN acce.tbUsuarios T3
ON T1.[pant_UsuModificacion] = T3.usua_Id 
WHERE [pant_Estado] = 1
GO


/*Listado de Pantallas*/
CREATE OR ALTER PROCEDURE acce.UDP_acce_tbPantallas_List
AS
BEGIN
	SELECT * 
	FROM acce.VW_tbPantallas
END
GO


/*Insertar Pantallas*/
CREATE OR ALTER PROCEDURE acce.UDP_acce_tbPantallas_Insert
	@pant_Nombre          NVARCHAR(100), 
	@pant_Url             NVARCHAR(300), 
	@pant_Menu            NVARCHAR(300), 
	@pant_Icon          NVARCHAR(80), 
	@pant_UsuCreacion     INT 

AS
BEGIN
	BEGIN TRY
		IF NOT EXISTS (SELECT * FROM acce.tbPantallas
						WHERE pant_Nombre = @pant_Nombre)
			BEGIN
			INSERT INTO [acce].[tbPantallas](pant_Nombre, pant_Url, pant_Menu, pant_Icon, pant_UsuCreacion)
			VALUES(@pant_Nombre, @pant_Url, @pant_Menu, @pant_Icon, @pant_UsuCreacion)
			
			SELECT 'La pantalla ha sido insertada con éxito'
			END
		ELSE IF EXISTS (SELECT * FROM [acce].[tbPantallas]
						WHERE [pant_Nombre] = @pant_Nombre AND
						[pant_Estado]  = 0)
			BEGIN
				UPDATE [acce].[tbPantallas]
				SET [pant_Estado] = 1
				WHERE  [pant_Nombre] = @pant_Nombre

				SELECT 'La pantalla ha sido insertada con éxito'
			END
		ELSE
			SELECT 'La pantalla ya existe'
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
	END CATCH
END
GO


/*Editar Pantallas*/
CREATE OR ALTER PROCEDURE acce.UDP_acce_tbPantallas_Update
	@pant_Id               INT,
	@pant_Nombre           NVARCHAR(100), 
	@pant_Url              NVARCHAR(300), 
	@pant_Menu             NVARCHAR(300), 
	@pant_Icon           NVARCHAR(80), 
	@pant_UsuModificacion   INT
AS
BEGIN 
	BEGIN TRY
	IF NOT EXISTS (SELECT * FROM [acce].[tbPantallas]
						WHERE @pant_Nombre = [pant_Nombre])
		BEGIN			
			UPDATE  [acce].[tbPantallas]
			SET 	[pant_Nombre] = @pant_Nombre,
			        [pant_Url] = @pant_Url,
                    [pant_Menu] = @pant_Menu,
					[pant_Icon] = @pant_Icon,
					[pant_UsuModificacion]= @pant_UsuModificacion,
					[pant_FechaModificacion] = GETDATE()
			WHERE 	[pant_Id] = @pant_Id
			SELECT 'La pantalla ha sido editada con éxito'
		END
		ELSE IF EXISTS (SELECT * FROM [acce].[tbPantallas]
						WHERE @pant_Nombre = [pant_Nombre]
							  AND [pant_Estado] = 1
							  AND [pant_Id] != @pant_Id)
			SELECT 'La pantalla ya existe'
		ELSE
			UPDATE [acce].[tbPantallas]
			SET [pant_Estado] = 1,
			    [pant_UsuModificacion]  = @pant_UsuModificacion,
			    [pant_Url] = @pant_Url,
                [pant_Menu] = @pant_Menu,
				[pant_Icon] = @pant_Icon,
				[pant_FechaModificacion] = GETDATE()
			WHERE  [pant_Nombre] = @pant_Nombre

			SELECT 'La pantalla ha sido editada con éxito'
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
	END CATCH
END
GO


/*Eliminar pantalla*/
CREATE OR ALTER PROCEDURE acce.UDP_acce_tbPantallas_Delete 
	@pant_Id     INT
AS
BEGIN
	BEGIN TRY
		IF NOT EXISTS (SELECT * FROM [acce].[tbPantallasPorRoles] WHERE [pant_Id] = @pant_Id)
			BEGIN
				UPDATE [acce].[tbPantallas]
				SET [pant_Estado] = 0
				WHERE  [pant_Id]= @pant_Id

				SELECT 'La pantalla ha sido eliminada'
			END
		ELSE
			SELECT 'La pantalla no puede ser eliminada ya que está siendo usada'
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
	END CATCH
END
GO





/*Listado de Pantallas*/
CREATE OR ALTER PROCEDURE acce.UDP_acce_tbPantallas_List
AS
BEGIN
	SELECT pant_Id, pant_Nombre, pant_Menu
	FROM [acce].[tbPantallas]
	WHERE [pant_Estado] = 1
	GROUP BY pant_Menu, pant_Nombre, pant_Id
END
GO

---------- PANTALLAS -----------
/*UDP para pantallas*/
CREATE OR ALTER PROCEDURE acce.UDP_opti_tbPantallas_ListMenu
	@usua_EsAdmin	BIT,
	@role_Id		INT
AS
BEGIN
	IF @usua_EsAdmin > 0
		BEGIN
			SELECT * 
			FROM acce.tbPantallas 
			WHERE pant_Estado = 1
		END
	ELSE
		BEGIN
			SELECT * 
			FROM acce.tbPantallas T1 INNER JOIN acce.tbPantallasPorRoles T2
			ON T1.pant_Id = T2.pant_Id
			AND t2.role_Id = @role_Id
		END
	
END

go
/*Listado de Pantallas por rol*/


CREATE OR ALTER PROCEDURE acce.UDP_acce_tbPantallasPorRoles_List 
	@role_Id	INT
AS
BEGIN
	SELECT * 
	FROM acce.VW_tbPantallasPorRoles
	WHERE role_Id = @role_Id
END
GO


/*Insertar pantallas por roles*/
CREATE OR ALTER PROCEDURE acce.UDP_acce_tbPantallasPorRoles_Insert 
	@role_Id               INT, 
	@pant_Id               INT, 
	@pantrole_UsuCreacion  INT
AS
BEGIN
	BEGIN TRY
		IF NOT EXISTS (SELECT * FROM acce.tbPantallasPorRoles 
						WHERE pant_Id = @pant_Id AND role_Id = @role_Id)
			BEGIN
			INSERT INTO acce.tbPantallasPorRoles(role_Id,pant_Id,pantrole_UsuCreacion)
			VALUES(@role_Id,@pant_Id,@pantrole_UsuCreacion)
			
			SELECT 'Operación realizada con éxito'
			END
		ELSE IF EXISTS (SELECT * FROM acce.tbPantallasPorRoles 
						WHERE pant_Id = @pant_Id AND role_Id = @role_Id
						AND pantrole_Estado = 0)
			BEGIN
				UPDATE [acce].[tbPantallasPorRoles]
				SET [pantrole_Estado] = 1
				WHERE pant_Id = @pant_Id AND role_Id = @role_Id

				SELECT 'Operación realizada con éxito'
			END
		ELSE
			SELECT 'La pantalla x rol ya existe'
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
	END CATCH
END
GO

/*Eliminar pantalla por rol*/
CREATE OR ALTER PROCEDURE acce.UDP_acce_tbPantallaPorRoles_Delete 
	@role_Id	INT
AS
BEGIN
	BEGIN TRY
			BEGIN
				DELETE
				FROM [acce].[tbPantallasPorRoles]
				WHERE role_Id = @role_Id 

				SELECT 'La pantalla ha sido eliminada'
			END
		
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
	END CATCH
END
GO


---------- ROLES -----------
CREATE OR ALTER VIEW acce.VW_tbRoles
AS
	SELECT t1.role_Id,
	       role_Nombre, 
		   role_UsuCreacion,
		   t2.usua_NombreUsuario AS role_NombreUsuarioCreacion, 
		   role_FechaCreacion, 
		   role_UsuModificacion,
		   t3.usua_NombreUsuario AS role_NombreUsuarioModificacion, 
		   role_FechaModificacion, 
		   role_Estado
FROM acce.tbRoles t1  INNER JOIN acce.tbUsuarios t2
ON t1.role_UsuCreacion = t2.usua_Id LEFT JOIN acce.tbUsuarios t3
ON t1.role_UsuModificacion = t3.usua_Id 
WHERE t1.role_Estado = 1
GO


/*Listado de roles*/
CREATE OR ALTER PROCEDURE acce.UDP_acce_tbRoles_List
AS
BEGIN
	SELECT *
	FROM acce.VW_tbRoles
END
GO

/*Listado de roles find*/
CREATE OR ALTER PROCEDURE acce.UDP_acce_tbRoles_Find
	@role_Id	INT
AS
BEGIN
	SELECT *
	FROM acce.VW_tbRoles
	WHERE role_Id = @role_Id
END
GO

/*Insertar roles*/
CREATE OR ALTER PROCEDURE acce.UDP_acce_tbRoles_Insert 
	@role_Nombre         NVARCHAR(100),
	@role_UsuCreacion    INT
AS
BEGIN
	BEGIN TRY
		IF NOT EXISTS (SELECT * FROM [acce].[tbRoles]
						WHERE [role_Nombre] = @role_Nombre)
			BEGIN
			INSERT INTO [acce].[tbRoles](role_Nombre, role_UsuCreacion)
			VALUES(@role_Nombre, @role_UsuCreacion)
			
			SELECT SCOPE_IDENTITY() AS CodeStatus, 'El rol ha sido insertado con éxito' AS MessageStatus
			END
		ELSE IF EXISTS (SELECT * FROM  [acce].[tbRoles]
						WHERE role_Nombre = @role_Nombre
						AND role_Estado = 0)
			BEGIN
				UPDATE [acce].[tbRoles]
				SET [role_Estado] = 1
				WHERE [role_Nombre] = @role_Nombre

				SELECT (SELECT role_Id FROM [acce].[tbRoles] WHERE [role_Nombre] = @role_Nombre) AS CodeStatus, 'El rol ha sido insertado con éxito' AS MessageStatus
			END
		ELSE
			SELECT 'El rol ya existe' AS MessageStatus
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error' AS MessageStatus
	END CATCH
END
GO


/*Editar roles*/
CREATE OR ALTER PROCEDURE acce.UDP_acce_tbRoles_Update 
	@role_Id                  INT,
	@role_Nombre              NVARCHAR(100),  
	@role_UsuModificacion     INT

AS
BEGIN 
	BEGIN TRY
	IF NOT EXISTS (SELECT * FROM [acce].[tbRoles]
						WHERE @role_Nombre = role_Nombre)
		BEGIN			
			UPDATE  [acce].[tbRoles]
			SET 	[role_Nombre] = @role_Nombre,
			        [role_UsuModificacion] = @role_UsuModificacion,
					[role_FechaModificacion] = GETDATE()
			WHERE 	[role_Id] = @role_Id
			SELECT 'El rol ha sido editado con éxito'
		END
		ELSE IF EXISTS (SELECT * FROM [acce].[tbRoles]
						WHERE @role_Nombre = role_Nombre
							  AND role_Estado = 1
							  AND role_Id != @role_Id)
			SELECT 'El rol ya existe'
		ELSE
			UPDATE [acce].[tbRoles]
			SET role_Estado = 1,
			    role_UsuModificacion = @role_UsuModificacion,
				[role_FechaModificacion] = GETDATE()
			WHERE role_Nombre = @role_Nombre

			SELECT 'El rol ha sido editado con éxito'
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
	END CATCH
END
GO


/*Eliminar Rol*/
CREATE OR ALTER PROCEDURE acce.UDP_acce_tbRoles_Delete 
	@role_Id	INT
AS
BEGIN
	BEGIN TRY
		IF NOT EXISTS (SELECT * FROM [acce].tbUsuarios WHERE [role_Id] = @role_Id AND usua_Estado = 1)
			BEGIN
				UPDATE [acce].[tbRoles]
				SET role_Estado = 0
				WHERE role_Id = @role_Id

				SELECT 'El rol ha sido eliminado'
			END
		ELSE
			SELECT 'El rol no puede ser eliminado ya que está siendo usado'
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

/*Insertar enfermedades*/
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

/*Find enfermedades*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_VW_tbEnfermedades_Find 
	@enfe_Id	INT
AS
BEGIN
	SELECT * FROM asil.VW_tbEnfermedades
	WHERE enfe_Id = @enfe_Id
END
GO


/*Editar enfermedades*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbEnfermedades_Update 
	@enfe_Id					INT,
	@enfe_Nombre				NVARCHAR(100),
	@enfe_UsuModificacion		INT
AS
BEGIN
	BEGIN TRY
	IF NOT EXISTS (SELECT * FROM asil.tbEnfermedades 
						WHERE @enfe_Nombre = [enfe_Nombre])
		BEGIN			
			UPDATE asil.tbEnfermedades
			SET 	[enfe_Nombre] = @enfe_Nombre,
					[enfe_UsuModificacion] = @enfe_UsuModificacion,
					[enfe_FechaModificacion] = GETDATE()
			WHERE 	[enfe_Id] = @enfe_Id

			SELECT 'La enfermedad ha sido editada exitosamente'
		END
		ELSE IF EXISTS (SELECT * FROM asil.tbEnfermedades 
						WHERE @enfe_Nombre = [enfe_Nombre]
							  AND enfe_Estado = 1
							  AND [enfe_Id] != @enfe_Id)

			SELECT 'La enfermedad ya existe'
		ELSE
			UPDATE asil.tbEnfermedades 
			SET enfe_Estado = 1,	
			    [enfe_UsuModificacion] = @enfe_UsuModificacion,
				[enfe_FechaModificacion] = GETDATE()
			WHERE @enfe_Nombre = [enfe_Nombre]

			SELECT 'La enfermedad ha sido editada exitosamente'
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
	END CATCH
END
GO


/*Eliminar enfermedades*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbEnfermedades_Delete 
	@enfe_Id	INT
AS
BEGIN
	BEGIN TRY
		IF NOT EXISTS (SELECT * FROM asil.tbEnfermedadesXResidente WHERE enfe_Id = @enfe_Id)
			BEGIN
				UPDATE asil.tbEnfermedades
				SET enfe_Estado = 0
				WHERE enfe_Id = @enfe_Id

				SELECT 'La enfermedad ha sido eliminada'
			END
		ELSE
			SELECT 'La enfermedad no puede ser eliminada ya que está siendo usada en otro registro'
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
		   acti_Class,
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


/*ELIMINAR CATEGORÍAS HABITACIONES*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbCategoriasHabitaciones_Delete
	 @cate_Id	INT
AS
BEGIN
	BEGIN TRY
	IF NOT EXISTS (SELECT * FROM asil.tbCategoriasHabitaciones WHERE cate_Id = @cate_Id AND cate_Estado = 1)
		BEGIN
		UPDATE asil.tbCategoriasHabitaciones
		SET cate_Estado = 0
		WHERE cate_Id = @cate_Id

		SELECT 'La categoria ha sido eliminada'
		END
		ELSE
			SELECT 'La categoria no puede ser eliminado ya que está siendo usado en otro registro'
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
	END CATCH
END
GO

--************MEDICAMENTOS******************--

/*Vista medicamentos*/
CREATE OR ALTER VIEW asil.VW_tbMedicamentos
AS
	SELECT t1.medi_Id,
		   t1.medi_Nombre,
		   t1.prov_Id,
		   t4.prov_Nombre,
		   t1.medi_UsuCreacion, 
		   t2.usua_NombreUsuario AS usua_UsuCreacion_Nombre,
		   t1.medi_FechaCreacion, 
	       t1.medi_UsuModificacion,
		   t3.usua_NombreUsuario AS usua_UsuModificacion_Nombre, 
		   t1.medi_FechaModificacion,
		   t1.medi_Estado
		   FROM asil.tbMedicamentos t1 LEFT JOIN acce.tbUsuarios t2
		   ON t1.medi_UsuCreacion = T2.usua_Id
		   LEFT JOIN acce.tbUsuarios t3
		   ON t1.medi_UsuModificacion = t3.usua_Id LEFT JOIN asil.tbProveedores t4
		   ON t1.prov_Id = t4.prov_Id
GO

/*Listar medicamentos*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbMedicamentos_List
AS
BEGIN
	SELECT * FROM asil.VW_tbMedicamentos
	WHERE medi_Estado = 1
END
GO

/*Insertar medicamentos*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbMedicamentos_Insert
	@medi_Nombre		NVARCHAR(300),
	@prov_Id			INT,
	@cent_Id			INT,
	@invecent_Stock		INT,
	@medi_UsuCreacion	INT
AS 
BEGIN
	
	BEGIN TRY

		IF NOT EXISTS (SELECT * FROM asil.tbMedicamentos
						WHERE medi_Nombre = @medi_Nombre)
		BEGIN
			INSERT INTO asil.tbMedicamentos(medi_Nombre, prov_Id, medi_UsuCreacion)
			VALUES(@medi_Nombre,@prov_Id,@medi_UsuCreacion)

			DECLARE @medi_Id INT = SCOPE_IDENTITY()

			SELECT 'El medicamento ha sido insertado exitosamente'
		END
		ELSE IF EXISTS (SELECT * FROM asil.tbMedicamentos
						WHERE medi_Nombre = @medi_Nombre
							  AND medi_Estado = 1)

			SELECT 'Este medicamento ya existe'
		ELSE
			BEGIN
				UPDATE asil.tbMedicamentos
				SET medi_Estado = 1,
					prov_Id = @prov_Id
				WHERE medi_Nombre = @medi_Nombre

				SELECT 'El medicamento ha sido insertado exitosamente'
			END
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
	END CATCH 
END
GO

/*Find medicamentos*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbMedicamentos_Find 
	@medi_Id	INT
AS
BEGIN
	SELECT * FROM asil.VW_tbMedicamentos
	WHERE medi_Id = @medi_Id
END
GO


/*Editar medicamentos*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbMedicamentos_Update
	@medi_Id					INT,
	@medi_Nombre				NVARCHAR(300),
	@prov_Id					INT,
	@cent_Id					INT,
	@invecent_Stock				INT,
	@medi_UsuModificacion		INT
AS
BEGIN
	BEGIN TRY
	IF NOT EXISTS (SELECT * FROM asil.tbMedicamentos	 
						WHERE medi_Nombre = @medi_Nombre)
		BEGIN			
			UPDATE asil.tbMedicamentos
			SET 	medi_Nombre = @medi_Nombre,
					prov_Id = @prov_Id,
					medi_UsuModificacion = @medi_UsuModificacion,
					[medi_FechaModificacion] = GETDATE()
			WHERE 	medi_Nombre = @medi_Nombre

			SELECT 'El medicamento ha sido editado exitosamente'
		END
		ELSE IF EXISTS (SELECT * FROM asil.tbMedicamentos
						WHERE medi_Nombre = @medi_Nombre
							  AND medi_Estado = 1
							  AND medi_Id != @medi_Id)

			SELECT 'El medicamento ya existe'
		ELSE
			UPDATE asil.tbMedicamentos
			SET medi_Estado = 1,
				prov_Id = @prov_Id,
			    [medi_UsuModificacion] = @medi_UsuModificacion,
				[medi_FechaModificacion] = GETDATE()
			WHERE medi_Nombre = @medi_Nombre

			SELECT 'El medicamento ha sido editado exitosamente'
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
	END CATCH
END
GO


/*Eliminar medicamentos*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbMedicamentos_Delete 
	@medi_Id	INT
AS
BEGIN
	BEGIN TRY
		IF NOT EXISTS (SELECT * FROM asil.tbInventarioPorCentro WHERE medi_Id = @medi_Id AND invecent_Stock > 0)
			BEGIN
				UPDATE asil.tbMedicamentos
				SET medi_Estado = 0
				WHERE medi_Id = @medi_Id

				SELECT 'El medicamento ha sido eliminado'
			END
		ELSE
			SELECT 'El medicamento no puede ser eliminado ya que está siendo usado en otro registro'
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
	IF NOT EXISTS (SELECT * FROM asil.tbEmpleados WHERE carg_Id = @carg_Id AND empe_Estado = 1)
	BEGIN
		UPDATE asil.tbCargos
		SET carg_Estado = 0
		WHERE carg_Id = @carg_Id

		SELECT 'El cargo ha sido eliminado'
		END
		ELSE
			SELECT 'El cargo no puede ser eliminado ya que está siendo usado en otro registro'
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
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbDietas_Insert
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
	IF NOT EXISTS (SELECT * FROM asil.tbResidentes WHERE diet_Id = @diet_Id AND resi_Estado = 1)
	 BEGIN
		UPDATE asil.tbDietas
		SET    diet_Estado = 0
		WHERE diet_Id = @diet_Id

		SELECT 'La dieta ha sido eliminada'
		END
		ELSE
			SELECT 'La dieta no puede ser eliminada ya que está siendo usado en otro registro'
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

--************AGENDA DETALLES******************--

/*VISTA AGENDA DETALLES*/
CREATE OR ALTER VIEW asil.VW_tbAgendaDetalles
AS
	SELECT agendeta_Id,
	       t1.agen_Id,
		   t4.agen_Nombre,
		   agendeta_HoraStart,
		   agendeta_HoraEnd,
		   t1.acti_Id,
		   t5.acti_Nombre,
		   t5.acti_Class,
		   t1.medi_Id,
		   t6.medi_Nombre,
		   agendeta_Observaciones,
		   agendeta_UsuCreacion,
		   agendeta_FechaCreacion,
		   t2.usua_NombreUsuario AS usua_UsuCreacion_Nombre,
		   agendeta_UsuModificacion,
		   t3.usua_NombreUsuario AS usua_UsuModificacion_Nombre,
		   agendeta_FechaModificacion,
		   agendeta_Estado
		   FROM asil.tbAgendaDetalles t1 LEFT JOIN acce.tbUsuarios t2
		   ON t1.agendeta_UsuCreacion = T2.usua_Id
		   LEFT JOIN acce.tbUsuarios t3
		   ON t1.agendeta_UsuModificacion = t3.usua_Id LEFT JOIN asil.tbAgendas t4
		   ON t1.agen_Id = t4.agen_Id LEFT JOIN asil.tbActividades t5
		   ON t1.acti_Id = t5.acti_Id LEFT JOIN asil.tbMedicamentos t6
		   ON t1.medi_Id = t6.medi_Id
GO

/*LISTAR AGENDA DETALLES*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbAgendaDetalles_List 
	@agen_Id	INT
AS
BEGIN
	SELECT *
	FROM asil.VW_tbAgendaDetalles
	WHERE agendeta_Estado = 1
	AND agen_Id = @agen_Id
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
	@agendeta_HoraStart			TIME,
	@agendeta_HoraEnd			TIME,
	@acti_Id					INT ,
	@medi_Id					INT,
	@agendeta_Observaciones		NVARCHAR,
	@agendeta_UsuCreacion		INT
	
AS 
BEGIN
	BEGIN TRY
		IF NOT EXISTS (SELECT * FROM asil.tbAgendaDetalles
						WHERE agen_Id = @agen_Id AND
						       agendeta_HoraStart = @agendeta_HoraStart)
			BEGIN
			INSERT INTO asil.tbAgendaDetalles(agen_Id, agendeta_HoraStart, agendeta_HoraEnd, acti_Id, medi_Id,agendeta_Observaciones,agendeta_UsuCreacion)
			VALUES(@agen_Id, @agendeta_HoraStart, @agendeta_HoraEnd, @acti_Id, @medi_Id,@agendeta_Observaciones,@agendeta_UsuCreacion)
			
			SELECT 'El detalle de agenda ha sido insertado'
			END
		ELSE IF EXISTS (SELECT * FROM asil.tbAgendaDetalles 
						WHERE agen_Id = @agen_Id AND
						agendeta_HoraStart = @agendeta_HoraStart)
			BEGIN
				UPDATE asil.tbAgendaDetalles 
				SET    agendeta_Estado      = 1,
				       acti_Id = @acti_Id,
					   medi_Id = @medi_Id,
					   agendeta_HoraEnd = @agendeta_HoraEnd,
					   agendeta_Observaciones = @agendeta_Observaciones,
					   agendeta_UsuCreacion = @agendeta_UsuCreacion
				WHERE agen_Id = @agen_Id AND
					  agendeta_HoraStart = @agendeta_HoraStart

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
    @agendeta_Id				INT,
    @agen_Id					INT,
	@agendeta_HoraStart			TIME,
	@agendeta_HoraEnd			TIME,
	@acti_Id					INT ,
	@medi_Id					INT,
	@agendeta_Observaciones		NVARCHAR,
	@agendeta_UsuModificacion	INT
AS
BEGIN
	BEGIN TRY
		BEGIN			
			UPDATE  asil.tbAgendaDetalles
			SET 	agen_Id					   = @agen_Id,
			        agendeta_HoraStart		   = @agendeta_HoraStart,
			        agendeta_HoraEnd		   = @agendeta_HoraEnd,
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
	IF NOT EXISTS (SELECT * FROM asil.tbAgendaDetalles WHERE agendeta_Id = @agendeta_Id AND agendeta_Estado = 1)
			BEGIN
		UPDATE asil.tbAgendaDetalles
		SET agendeta_Estado = 0
		WHERE agendeta_Id = @agendeta_Id

		SELECT 'El detalle de la agenda ha sido eliminado'
		END
		ELSE
			SELECT 'El detalle de la agenda no puede ser eliminado ya que está siendo usado en otro registro'
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
	SELECT res.[resi_Id], [resi_Nombres], [resi_Apellidos],
		   cent.cent_Nombre, res.cent_Id, tipos.tiposang_Id,
		   tipos.tiposang_Nombre,
	[resi_Identidad], res.[estacivi_Id],esci.estacivi_Nombre,  [resi_Nacimiento], 
	[resi_Sexo],CASE WHEN resi_Sexo = 'F' THEN 'Femenino'
				ELSE 'Masculino'
			END AS SexoDes ,res.[diet_Id],dit.diet_Desayuno, dit.diet_Almuerzo, dit.diet_Cena, 
	empe.empe_Nombres, empe_Apellidos, empe.empe_Nombres + ' ' + empe_Apellidos AS empe_NombreCompleto,
	dit.diet_Merienda, dit.diet_Observaciones, dit.diet_Restricciones,[resi_FechaIngreso],res.[empe_Id], 
	res.[agen_Id], ag.agen_Nombre,[resi_UsuCreacion], usu1.usua_NombreUsuario usuCrea, [resi_FechaCreacion], 
	[resi_UsuModificacion], usu2.usua_NombreUsuario usuModif, [resi_FechaModificacion],
	[resi_Estado],
	expe.expe_Fotografia, expe_FechaApertura
	FROM [asil].[tbResidentes] res INNER JOIN gral.tbEstadosCiviles esci
	ON esci.estacivi_Id = res.estacivi_Id LEFT JOIN asil.tbDietas dit
	ON dit.diet_Id = res.diet_Id LEFT JOIN ASIL.tbEmpleados empe
	ON empe.empe_Id = res.empe_Id LEFT JOIN asil.tbAgendas ag
	ON ag.agen_Id = res.agen_Id LEFT JOIN acce.tbUsuarios usu1
	ON usu1.usua_Id = res.resi_UsuCreacion LEFT JOIN acce.tbUsuarios usu2
	ON usu2.usua_Id = res.resi_UsuModificacion LEFT JOIN asil.tbExpedientes expe
	ON res.resi_Id = expe.resi_Id LEFT JOIN asil.tbCentros cent 
	ON res.cent_Id = cent.cent_Id LEFT JOIN asil.tbTiposSangre tipos
	ON expe.tiposang_Id = tipos.tiposang_Id
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
	@cent_Id				INT,
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
			INSERT INTO asil.tbResidentes([resi_Nombres],[resi_Apellidos],[resi_Identidad],[estacivi_Id],[resi_Nacimiento],[resi_Sexo],[cent_Id],[diet_Id],[resi_FechaIngreso],[empe_Id], agen_Id ,[resi_UsuCreacion])
		     VALUES(
			 @resi_Nombres		,
			 @resi_Apellidos	,	
			 @resi_Identidad	,	
			 @estacivi_Id		,
			 @resi_Nacimiento	,
			 @resi_Sexo			,
			 @cent_Id			,
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
	@cent_Id				INT,
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
					cent_Id				= @cent_Id			,
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
					cent_Id				= @cent_Id			,
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
		   ON t1.pare_UsuCreacion = T2.usua_Id
		   LEFT JOIN acce.tbUsuarios t3
		   ON t1.pare_UsuModificacion = t3.usua_Id
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
	IF NOT EXISTS (SELECT * FROM asil.tbParentescos WHERE pare_Id = @pare_Id AND pare_Estado = 1)
			BEGIN
		UPDATE asil.tbParentescos
		SET pare_Estado = 0
		WHERE pare_Id = @pare_Id

		SELECT 'El parentesco ha sido eliminado'
		END
		ELSE
			SELECT 'El parentesco no puede ser eliminado ya que está siendo usado en otro registro'

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
		   t1.estacivi_Id,
		   t4.estacivi_Nombre,
		   enca_Nacimiento,
		   
		   CASE WHEN  enca_Sexo = 'F' THEN 'Femenino'
				ELSE 'Masculino'
		   END AS  enca_Sexo,
		   t1.muni_Id,
		   t7.muni_Nombre,
		   enca_Direccion,
		   enca_Telefono,
		   t1.resi_Id,
		   t8.resi_Nombres,
		   t8.resi_Apellidos,
		   t8.resi_Estado,
		   t1.pare_Id,
		   t9.pare_Nombre,
		   enca_UsuCreacion,
		   t2.usua_NombreUsuario AS usua_UsuCreacion_Nombre,
		   enca_FechaCreacion,
		   enca_UsuModificacion,
		   enca_FechaModificacion,
		   t3.usua_NombreUsuario AS usua_UsuModificacion_Nombre,
		   enca_Estado
		   FROM asil.tbEncargados t1 LEFT JOIN acce.tbUsuarios t2
		   ON t1.enca_UsuCreacion = T2.usua_Id
		   LEFT JOIN acce.tbUsuarios t3
		   ON t1.enca_UsuModificacion = t3.usua_Id INNER JOIN gral.tbEstadosCiviles t4
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

				SELECT 'El encargado ha sido insertado exitosamente'
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

			SELECT 'El encargado ha sido editado exitosamente'
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

			SELECT 'El encargado ha sido editado exitosamente'
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
		   ON t1.tiposang_UsuCreacion = T2.usua_Id
		   LEFT JOIN acce.tbUsuarios t3
		   ON t1.tiposang_UsuModificacion = t3.usua_Id
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
  @tiposang_UsuModificacion	    INT
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
	IF NOT EXISTS (SELECT * FROM asil.tbTiposSangre WHERE tiposang_Id = @tiposang_Id AND tiposang_Estado = 1)
			BEGIN
		UPDATE asil.tbTiposSangre
		SET tiposang_Estado = 0
		WHERE tiposang_Id   = @tiposang_Id

		SELECT 'El tipo de sangre ha sido eliminado'
		END
		ELSE
			SELECT 'El tipo de sangre no puede ser eliminado ya que está siendo usado en otro registro'
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
	       t1.enfe_Id,
		   t4.enfe_Nombre,
		   t1.resi_Id,
		   t5.resi_Nombres,
		   enferesi_UsuCreacion,
		   t2.usua_NombreUsuario AS usua_UsuCreacion_Nombre,
		   enferesi_FechaCreacion,
		   enferesi_UsuModificacion,
		   t3.usua_NombreUsuario AS usua_UsuModificacion_Nombre,
		   enferesi_FechaModificacion,
		   enferesi_Estado
		   FROM asil.tbEnfermedadesXResidente t1 LEFT JOIN acce.tbUsuarios t2
		   ON t1.enferesi_UsuCreacion = T2.usua_Id
		   LEFT JOIN acce.tbUsuarios t3
		   ON t1.enferesi_UsuModificacion = t3.usua_Id INNER JOIN asil.tbEnfermedades t4
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
			VALUES(@enfe_Id, @resi_Id, @enferesi_UsuCreacion)
			
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
	IF NOT EXISTS (SELECT * FROM asil.tbEnfermedadesXResidente WHERE enferesi_Id = @enferesi_Id AND enferesi_Estado = 1)
		BEGIN
		UPDATE asil.tbEnfermedadesXResidente
		SET enferesi_Estado = 0
		WHERE enferesi_Id   = @enferesi_Id

		SELECT 'La enfermedad por recidente ha sido eliminada'
		END
		ELSE
			SELECT 'La enfermedad no puede ser eliminada ya que está siendo usado en otro registro'
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
	END CATCH
END
GO

--************EXPEDIENTES******************--

/*Vista expedientes*/
CREATE OR ALTER VIEW asil.VW_tbExpedientes
AS
	SELECT t1.expe_Id,
		   t1.resi_Id,
		   (t5.[resi_Nombres] + ' ' + t5.[resi_Apellidos]) AS resi_NombreCompleto,
		   t5.resi_Estado,
		   t1.tiposang_Id,
		   t6.tiposang_Nombre,
		   t1.expe_FechaApertura,
		   t1.expe_Fotografia,
		   t1.expe_UsuCreacion, 
		   t2.usua_NombreUsuario AS usua_UsuCreacion_Nombre,
		   t1.expe_FechaCreacion, 
	       t1.expe_UsuModificacion,
		   t3.usua_NombreUsuario AS usua_UsuModificacion_Nombre, 
		   t1.expe_FechaModificacion,
		   t1.expe_Estado
		   FROM asil.tbExpedientes t1 LEFT JOIN acce.tbUsuarios t2
		   ON t1.expe_UsuCreacion = T2.usua_Id
		   LEFT JOIN acce.tbUsuarios t3
		   ON t1.expe_UsuModificacion = t3.usua_Id LEFT JOIN asil.tbResidentes t5
		   ON t1.resi_Id = t5.resi_Id LEFT JOIN asil.tbTiposSangre t6
		   ON t1.tiposang_Id = t6.tiposang_Id
GO

/*Listar expedientes*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbExpedientes_List
AS
BEGIN
	SELECT * FROM asil.VW_tbExpedientes
	WHERE expe_Estado = 1
END
GO

/*Insertar expedientes*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbExpedientes_Insert
	@resi_Id				INT,
	@tiposang_Id			INT,
	@expe_FechaApertura		DATE,
	@expe_Fotografia		NVARCHAR(500),
	@expe_UsuCreacion		INT
AS 
BEGIN
	
	BEGIN TRY

		IF NOT EXISTS (SELECT * FROM asil.tbExpedientes
						WHERE resi_Id = @resi_Id)
		BEGIN
			INSERT INTO asil.tbExpedientes(resi_Id, tiposang_Id, expe_FechaApertura, expe_Fotografia, expe_UsuCreacion)
			VALUES(@resi_Id,@tiposang_Id,@expe_FechaApertura,@expe_Fotografia,@expe_UsuCreacion)

			SELECT 'El expediente ha sido insertado exitosamente'

		END
		ELSE IF EXISTS (SELECT * FROM asil.tbExpedientes
						WHERE resi_Id = @resi_Id
							  AND expe_Estado = 1)

			SELECT 'Este expediente ya existe'
		ELSE
			BEGIN
				UPDATE asil.tbExpedientes
				SET expe_Estado = 1,
					resi_Id = @resi_Id,
					tiposang_Id = @tiposang_Id,
					expe_FechaApertura = @expe_FechaApertura,
					expe_Fotografia = @expe_Fotografia,
					expe_UsuModificacion = @expe_UsuCreacion,
					expe_FechaModificacion = GETDATE()
				WHERE resi_Id = @resi_Id

				SELECT 'El expediente ha sido insertado exitosamente'
			END
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
	END CATCH 
END
GO

/*Find expedientes*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbExpedientes_Find 
	@expe_Id	INT
AS
BEGIN
	SELECT * FROM asil.VW_tbExpedientes
	WHERE expe_Id = @expe_Id
END
GO


/*Editar expediente*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbExpedientes_Update
	@expe_Id					INT,
	@tiposang_Id				INT,
	@expe_FechaApertura			DATE,
	@expe_Fotografia			NVARCHAR(500),
	@expe_UsuModificacion		INT
AS
BEGIN
	BEGIN TRY
			UPDATE asil.tbExpedientes
			SET 	tiposang_Id = @tiposang_Id,
					expe_FechaApertura = @expe_FechaApertura,
					expe_Fotografia = @expe_Fotografia,
					expe_UsuModificacion = @expe_UsuModificacion,
					[expe_FechaModificacion] = GETDATE()
			WHERE 	expe_Id = @expe_Id

			SELECT 'El expediente ha sido editado exitosamente'
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
	END CATCH
END
GO


/*Eliminar expedientes*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbExpedientes_Delete 
	@expe_Id	INT
AS
BEGIN
	BEGIN TRY
		IF NOT EXISTS (SELECT * FROM asil.VW_tbExpedientes WHERE expe_Id = @expe_Id AND resi_Estado = 1)
			BEGIN
				UPDATE asil.tbExpedientes
				SET expe_Estado = 0
				WHERE expe_Id = @expe_Id

				SELECT 'El expediente ha sido eliminado'
			END
		ELSE
			SELECT 'El expediente no puede ser eliminado ya que está siendo usado en otro registro'
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
	END CATCH
END
GO

--************HISTORIAL EXPEDIENTES ******************--

/*Vista historial expedientes*/
CREATE OR ALTER VIEW asil.VW_tbHistorialExpedientes
AS
	SELECT t1.histexpe_Id,
		   t1.expe_Id,
		   t1.histexpe_Observaciones,
		   t1.empe_Id,
		   (t2.[empe_Nombres] + ' ' + t2.[empe_Apellidos]) AS empe_NombreCompleto,
		   t1.histexpe_FechaActualizacion
		   FROM asil.tbHistorialExpedientes t1 INNER JOIN asil.tbEmpleados t2
		   ON t1.empe_Id = t2.empe_Id
GO

/*Listar historial expedientes según expediente*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbHistorialExpedientes_List
	@expe_Id		INT
AS
BEGIN
	SELECT * FROM asil.VW_tbHistorialExpedientes
	WHERE expe_Id = @expe_Id
END
GO

/*Insertar historial expedientes*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbHistorialExpedientes_Insert
	@expe_Id							INT,
	@histexpe_Observaciones				NVARCHAR(100),
	@empe_Id							INT,
	@histexpe_FechaActualizacion		NVARCHAR(500),
	@histexpe_UsuCreacion				INT
AS 
BEGIN
	
	BEGIN TRY

		IF NOT EXISTS (SELECT * FROM asil.tbHistorialExpedientes
						WHERE expe_Id = @expe_Id
						AND histexpe_Observaciones = @histexpe_Observaciones
						AND empe_Id = @empe_Id
						AND histexpe_FechaActualizacion = @histexpe_FechaActualizacion)
		BEGIN
			INSERT INTO asil.tbHistorialExpedientes(expe_Id, histexpe_Observaciones, empe_Id, histexpe_FechaActualizacion, histexpe_UsuCreacion)
			VALUES(@expe_Id,@histexpe_Observaciones,@empe_Id,@histexpe_FechaActualizacion,@histexpe_UsuCreacion)


			SELECT 'El historial ha sido insertado exitosamente'
		END
		ELSE IF EXISTS (SELECT * FROM asil.tbHistorialExpedientes
						WHERE expe_Id = @expe_Id
						AND histexpe_Observaciones = @histexpe_Observaciones
						AND empe_Id = @empe_Id
						AND histexpe_FechaActualizacion = @histexpe_FechaActualizacion
						AND histexpe_Estado = 1)

			SELECT 'Este historial ya existe'
		ELSE
			BEGIN
				UPDATE asil.tbHistorialExpedientes
				SET histexpe_Estado = 1
				WHERE expe_Id = @expe_Id
				AND histexpe_Observaciones = @histexpe_Observaciones
				AND empe_Id = @empe_Id
				AND histexpe_FechaActualizacion = @histexpe_FechaActualizacion
				AND histexpe_Estado = 1

				SELECT 'El historial ha sido insertado exitosamente'
			END
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
	END CATCH 
END
GO

--/*Find expedientes*/
--CREATE OR ALTER PROCEDURE asil.UDP_asil_tbExpedientes_Find 
--	@expe_Id	INT
--AS
--BEGIN
--	SELECT * FROM asil.VW_tbExpedientes
--	WHERE expe_Id = @expe_Id
--END
--GO


/*Editar historial expediente*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbHistorialExpedientes_Update
	@histexpe_Id						INT,
	@histexpe_Observaciones				NVARCHAR(100),
	@empe_Id							INT,
	@histexpe_FechaActualizacion		NVARCHAR(500),
	@histexpe_UsuModificacion			INT
AS
BEGIN
	BEGIN TRY
			UPDATE asil.tbHistorialExpedientes
			SET 	histexpe_Observaciones = @histexpe_Observaciones,
					empe_Id = @empe_Id,
					histexpe_FechaActualizacion = @histexpe_FechaActualizacion,
					histexpe_UsuModificacion = @histexpe_UsuModificacion,
					[histexpe_FechaModificacion] = GETDATE()
			WHERE 	histexpe_Id = @histexpe_Id

			SELECT 'El historial ha sido editado exitosamente'
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
	END CATCH
END
GO


/*Eliminar historial expedientes*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbHistorialExpedientes_Delete 
	@histexpe_Id	INT
AS
BEGIN
	BEGIN TRY
		UPDATE asil.tbHistorialExpedientes
				SET histexpe_Estado = 0
				WHERE histexpe_Id = @histexpe_Id

				SELECT 'El historial ha sido eliminado'
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
	END CATCH
END
GO

--************HABITACIONES******************--

/*VISTA HABITACIONES*/
CREATE OR ALTER VIEW asil.VW_tbHabitaciones
AS
	SELECT habi_Id,
	       habi_Numero,
		   t1.cate_Id,
		   t4.cate_Nombre,
		   t1.cent_Id,
		   t5.cent_Nombre
		   habi_UsuCreacion,
		   t2.usua_NombreUsuario AS usua_UsuCreacion_Nombre,
		   habi_FechaCreacion,
		   habi_UsuModificacion,
		   habi_FechaModificacion,
		   t3.usua_NombreUsuario AS usua_UsuModificacion_Nombre,
		   habi_Estado
		   FROM asil.tbHabitaciones t1 LEFT JOIN acce.tbUsuarios t2
		   ON t1.habi_UsuCreacion = T2.usua_Id
		   LEFT JOIN acce.tbUsuarios t3
		   ON t1.habi_UsuModificacion = t3.usua_Id INNER JOIN asil.tbCategoriasHabitaciones T4
		   ON t1.cate_Id = t4.cate_Id INNER JOIN asil.tbCentros t5
		   ON t1.cent_Id = t5.cent_Id
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
	SELECT * FROM  asil.VW_tbHabitaciones
	WHERE habi_Estado = 1
	AND habi_Id = @habi_Id
END
GO


/*INSERTAR HABITACIONES*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbHabitaciones_Insert
	@habi_Numero					INT,
	@cate_Id						INT,
	@cent_Id						INT,
	@habi_UsuCreacion			    INT
	
AS 
BEGIN
	BEGIN TRY
		IF NOT EXISTS (SELECT * FROM asil.tbHabitaciones
						WHERE @habi_Numero = @habi_Numero)
			BEGIN
			INSERT INTO asil.tbHabitaciones(habi_Numero, cate_Id, cent_Id, habi_UsuCreacion)
			VALUES(@habi_Numero, @cate_Id, @cent_Id, @habi_UsuCreacion)
			
			SELECT 'La habitación ha sido insertada'
			END
		ELSE IF EXISTS (SELECT * FROM asil.tbHabitaciones 
						WHERE @habi_Numero = @habi_Numero
						AND habi_Estado = 0)
			BEGIN
				UPDATE asil.tbHabitaciones 
				SET    habi_Estado      = 1,
					   habi_UsuCreacion = @habi_UsuCreacion,
					   cate_Id = @cate_Id,
					   cent_Id = @cent_Id
				WHERE habi_Numero = @habi_Numero

				SELECT 'La habitación ha sido insertada'
			END
		ELSE
			SELECT 'Esta habitación ya existe'
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
	END CATCH
END
GO




/*EDITAR HABITACIONES*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbHabitaciones_Update
    @habi_Id                        INT,
	@habi_Numero					INT,
	@cate_Id						INT,
	@cent_Id						INT,
	@habi_UsuModificacion			    INT
AS
BEGIN
	BEGIN TRY
	IF NOT EXISTS (SELECT * FROM asil.tbHabitaciones 
						WHERE habi_Numero = @habi_Numero)
		BEGIN			
			UPDATE  asil.tbHabitaciones
			SET 	habi_Numero          = @habi_Numero,
					cate_Id              = @cate_Id,
					cent_Id              = @cent_Id,
					habi_UsuModificacion = @habi_UsuModificacion,
					habi_FechaModificacion = GETDATE()
			WHERE 	habi_Id              = @habi_Id

			SELECT 'La habitación ha sido editada'
		END
		ELSE IF EXISTS (SELECT * FROM asil.tbHabitaciones
						WHERE habi_Numero      = @habi_Numero
							  AND habi_Estado  = 1
							  AND habi_Id     != @habi_Id)

			SELECT 'La habitación ya existe'
		ELSE
			UPDATE  asil.tbHabitaciones
			SET     habi_Estado	          = 1,
			        cate_Id = @cate_Id,
					cent_Id = @cent_Id,
					habi_UsuModificacion  = @habi_UsuModificacion,
					habi_FechaModificacion = GETDATE()
			WHERE   habi_Numero = @habi_Numero

			SELECT 'La habitación ha sido editada'
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
	END CATCH
END
GO


/*ELIMINAR HABITACIONES*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbHabitaciones_Delete
	 @habi_Id	INT
AS
BEGIN
	BEGIN TRY
	IF NOT EXISTS( SELECT * FROM asil.tbHabitaciones WHERE habi_Id = @habi_Id )
	   BEGIN
		UPDATE asil.tbHabitaciones
		SET habi_Estado = 0
		WHERE habi_Id   = @habi_Id

		SELECT 'La habitación ha sido eliminada'
		END
		ELSE 
		SELECT 'La habitación no puede ser eliminada ya que se esta usando en otro registro'
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
	END CATCH
END
GO

--************MUERTOS******************--

/*VISTA MUERTOS*/
CREATE OR ALTER VIEW asil.VW_tbMuertos
AS
	SELECT muer_Id,
	       t1.resi_Id,
		   (resi_Nombres + ' ' + resi_Apellidos) AS resi_NombreCompleto,
		   muer_FechaYHora,
		   muer_Descripcion,
		   muer_UsuCreacion,
		   muer_FechaCreacion,
		   t2.usua_NombreUsuario AS usua_UsuCreacion_Nombre,
		   muer_UsuModificacion,
		   muer_FechaModificacion,
		   t3.usua_NombreUsuario AS usua_UsuModificacion_Nombre,
		   muer_Estado
		   FROM asil.tbMuertos t1 LEFT JOIN acce.tbUsuarios t2
		   ON t1.muer_UsuCreacion = T2.usua_Id
		   LEFT JOIN acce.tbUsuarios t3
		   ON t1.muer_UsuModificacion = t3.usua_Id INNER JOIN asil.tbResidentes t4
		   ON t1.resi_Id = t4.resi_Id 
GO

/*LISTAR MUERTOS*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbMuertos_List
AS
BEGIN
	SELECT *
	FROM asil.VW_tbMuertos
	WHERE muer_Estado = 1
END
GO

/*FIND MUERTOS*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbMuertos_Find 
	@muer_Id	INT
AS
BEGIN
	SELECT * FROM  asil.VW_tbMuertos
	WHERE muer_Estado = 1
	AND muer_Id = @muer_Id
END
GO


/*INSERTAR MUERTOS*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbMuertos_Insert
	@resi_Id						INT,
	@muer_FechaYHora				DATETIME,
	@muer_Descripcion			NVARCHAR(500),
	@muer_UsuCreacion			INT
	
AS 
BEGIN
	BEGIN TRY
		IF NOT EXISTS (SELECT * FROM asil.tbMuertos
						WHERE resi_Id = @resi_Id)
			BEGIN
			INSERT INTO asil.tbMuertos(resi_Id, muer_FechaYHora, muer_Descripcion, muer_UsuCreacion)
			VALUES(@resi_Id, @muer_FechaYHora, @muer_Descripcion, @muer_UsuCreacion)
			
			SELECT 'La muerte ha sido insertada'
			END
		ELSE IF EXISTS (SELECT * FROM asil.tbMuertos 
						WHERE resi_Id = @resi_Id
						AND muer_Estado = 0)
			BEGIN
				UPDATE asil.tbMuertos 
				SET    muer_Estado      = 1,
					   muer_FechaYHora = @muer_FechaYHora,
					   muer_Descripcion = @muer_Descripcion,
					   muer_UsuCreacion = @muer_UsuCreacion
				WHERE resi_Id = @resi_Id

				SELECT 'La muerte ha sido insertada'
			END
		ELSE
			SELECT 'ya existe'
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
	END CATCH
END
GO


/*EDITAR MUERTOS*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbMuertos_Update
    @muer_Id                        INT,
	@muer_FechaYHora				DATETIME,
	@muer_Descripcion				NVARCHAR(500),
	@muer_UsuModificacion			INT
AS
BEGIN
	BEGIN TRY
		UPDATE  asil.tbMuertos
			SET 	muer_FechaYHora = @muer_FechaYHora,
					muer_Descripcion = @muer_Descripcion,
					muer_UsuModificacion = @muer_UsuModificacion,
					muer_FechaModificacion = GETDATE()
			WHERE 	muer_Id              = @muer_Id

			SELECT 'ha sido editado'
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
	END CATCH
END
GO


/*ELIMINAR MUERTOS*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbMuertos_Delete
	 @muer_Id	INT
AS
BEGIN
	BEGIN TRY
		UPDATE asil.tbMuertos
		SET muer_Estado = 0
		WHERE muer_Id   = @muer_Id

		SELECT 'ha sido eliminado'
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
	END CATCH
END
GO

--************DONACIONES******************--

/*Vista donaciones*/
CREATE OR ALTER VIEW asil.VW_tbDonaciones
AS
	SELECT t1.dona_Id,
		   t1.dona_NombreDonante,
		   t1.dona_Cantidad, 
		   t2.usua_NombreUsuario AS usua_UsuCreacion_Nombre,
		   t1.dona_FechaCreacion, 
	       t1.dona_UsuModificacion,
		   t3.usua_NombreUsuario AS usua_UsuModificacion_Nombre, 
		   t1.dona_FechaModificacion,
		   t1.dona_Estado
		   FROM asil.tbDonaciones t1 LEFT JOIN acce.tbUsuarios t2
		   ON t1.dona_UsuCreacion = T2.usua_Id
		   LEFT JOIN acce.tbUsuarios t3
		   ON t1.dona_UsuModificacion = t3.usua_Id 
GO

/*Listar donaciones*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbDonaciones_List
AS
BEGIN
	SELECT * FROM asil.VW_tbDonaciones
	WHERE dona_Estado = 1
END
GO

/*Insertar donaciones*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbDonaciones_Insert
	@dona_NombreDonante		NVARCHAR(400),
	@dona_Cantidad			DECIMAL(18,2),
	@dona_Fecha				DATE,
	@dona_UsuCreacion		INT
AS 
BEGIN
	
	BEGIN TRY

		INSERT INTO asil.tbDonaciones(dona_NombreDonante, dona_Cantidad, dona_Fecha, dona_UsuCreacion)
			VALUES(@dona_NombreDonante,@dona_Cantidad,@dona_Fecha,@dona_UsuCreacion)

			SELECT SCOPE_IDENTITY()

	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
	END CATCH 
END
GO

/*Find donaciones*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbDonaciones_Find 
	@dona_Id	INT
AS
BEGIN
	SELECT * FROM asil.VW_tbDonaciones
	WHERE dona_Id = @dona_Id
END
GO


/*Editar donaciones*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbDonaciones_Update
	@dona_Id					INT,
	@dona_NombreDonante			NVARCHAR(300),
	@dona_Cantidad				DECIMAL(18,2),
	@dona_Fecha					DATE,
	@dona_UsuModificacion		INT
AS
BEGIN
	BEGIN TRY
		UPDATE asil.tbDonaciones
			SET 	dona_NombreDonante = @dona_NombreDonante,
					dona_Cantidad = @dona_Cantidad,
					dona_Fecha = @dona_Fecha,
					dona_UsuModificacion = @dona_UsuModificacion,
					[dona_FechaModificacion] = GETDATE()
			WHERE 	dona_Id = @dona_Id

			SELECT 'La donación ha sido editada exitosamente'
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
	END CATCH
END
GO


/*Eliminar donaciones*/
CREATE OR ALTER PROCEDURE asil.UDP_asil_tbDonaciones_Delete 
	@dona_Id	INT
AS
BEGIN
	BEGIN TRY
		UPDATE asil.tbDonaciones
				SET dona_Estado = 0
				WHERE dona_Id = @dona_Id

				SELECT 'La donación ha sido eliminada'
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
	END CATCH
END
GO


--************ESTADOS CIVILES******************--

/*Listar estados*/
GO
CREATE OR ALTER PROCEDURE gral.UDP_gral_tbEstadosCiviles_List
AS
BEGIN
	SELECT estacivi_Id, estacivi_Nombre
	FROM [gral].[tbEstadosCiviles]
	WHERE estacivi_Estado = 1
END



--************MUNICIPIOS******************--
/*Listar municipios*/
GO
CREATE OR ALTER PROCEDURE gral.UDP_gral_tbMunicipios_List 
	@depa_Id	INT
AS
BEGIN
	IF @depa_Id < 1
		BEGIN
			SELECT muni_Id, muni_Nombre, depa.depa_Id, depa.depa_Nombre
			FROM [gral].tbMunicipios muni INNER JOIN gral.tbDepartamentos depa
			ON muni.depa_Id = depa.depa_Id
		END
	ELSE
		BEGIN
			SELECT muni_Id, muni_Nombre, depa.depa_Id, depa.depa_Nombre
			FROM [gral].tbMunicipios muni INNER JOIN gral.tbDepartamentos depa
			ON muni.depa_Id = depa.depa_Id
			AND muni.depa_Id = @depa_Id
		END
END


--************DEPARTAMENTOS******************--

/*Listar departamentos*/
GO
CREATE OR ALTER PROCEDURE gral.UDP_gral_tbDepartamentos_List
AS
BEGIN
	SELECT depa_Id, depa_Nombre
	FROM [gral].tbDepartamentos
	WHERE depa_Estado = 1
END
GO


--************METODO DE PAGO******************--
CREATE OR ALTER VIEW asil.VW_tbMetodosPagos
AS
	SELECT meto_Id, 
	       meto_Nombre, 
		   meto_UsuCreacion, 
		   T2.usua_NombreUsuario AS meto_NombreUsuarioCreacion,
		   meto_FechaCreacion, 
		   meto_UsuModificacion, 
		   t3.usua_NombreUsuario AS meto_NombreUsuarioModificacion,
		   meto_FechaModificacion, 
		   meto_Estado
	FROM asil.tbMetodosPago t1 INNER JOIN acce.tbUsuarios T2
	ON T1.meto_UsuCreacion = T2.usua_Id LEFT JOIN acce.tbUsuarios T3
	ON T1.meto_UsuModificacion = T3.usua_Id
	WHERE T1.meto_Estado = 1
GO


/*Listado de metodos de pago*/
CREATE OR ALTER PROCEDURE gral.UDP_asil_tbMetodosPagos_List
AS
BEGIN
	SELECT * 
	FROM asil.VW_tbMetodosPagos
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
						WHERE cent_Nombre = @cent_Nombre )
			BEGIN
			INSERT INTO asil.tbCentros(cent_Nombre, muni_Id, cent_Direccion, cent_UsuCreacion)
			VALUES(@cent_Nombre, @muni_Id, @cent_Direccion, @cent_UsuCreacion)
			
			SELECT 'El centro ha sido insertado con éxito'
			END
		ELSE IF EXISTS (SELECT * FROM asil.tbCentros 
						WHERE cent_Nombre = @cent_Nombre
						AND cent_Estado = 0)
			BEGIN
				UPDATE asil.tbCentros
				SET cent_Estado = 1
				WHERE cent_Nombre = @cent_Nombre

				SELECT 'El centro ha sido insertado con éxito'
			END
		ELSE
			SELECT 'El centro ya existe'
	END TRY
	BEGIN CATCH
		SELECT 'Ha ocurrido un error'
	END CATCH
END

go

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


	IF NOT EXISTS (SELECT * FROM asil.tbInventarioPorCentro WHERE cent_Id = @cent_Id)
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
