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
	SELECT muni_Id, muni_Nombre
	FROM [gral].tbMunicipios
	WHERE muni_Estado = 1
	AND depa_Id = @depa_Id
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

