import { BadgeSelector } from "../../components/BadgeSelector";
import { useFormularioPerfumeViewModel } from "./useFormularioPerfumeViewModel";
import { GENEROS } from "../../constantes/constantes";
import { IFamilias, INotaBackend } from "../../interfaces/IPerfume";
import { IPerfumistaBackend } from "../../interfaces/IPerfumista";
import { Fragment } from "react/jsx-runtime";

export default function FormularioPerfume() {

	const {
		esModoEdicion,
		formulario,
		previewFoto,
		loading,
		error,
		guardando,
		opcionesSelectores,
		handleChange,
		handleFileChange,
		handleSubmit,
		handleCancelar,
		erroresCampos
	} = useFormularioPerfumeViewModel();

	if (loading) {
		return (
			<div className="flex h-screen w-full items-center justify-center">
				<span className="loading loading-spinner loading-lg text-neutral"></span>
			</div>
		);
	}

	return (
		// ! py -> Padding vertical. px -> Padding horizontal. Lo mismo con mx y my pero con margin.
		<div className="min-h-screen bg-base-200/30 flex justify-center items-start py-20 px-4">
			<div className="w-full max-w-4xl bg-base-100 shadow-lg rounded-2xl p-6">
				<div className="card-body">

					<h1 className="font-semibold text-lg text-center mb-6">
						{esModoEdicion ? "EDITAR PERFUME" : "NUEVO PERFUME"}
					</h1>

					{error && <div className="alert alert-error mb-4">{error}</div>}

					<div className="grid md:grid-cols-2 gap-4">
						{/* IZQUIERDA */}
						<div className="space-y-3">
							<label className="label text-neutral font-semibold">Nombre <span className="text-error">*</span></label>
							<input
								type="text"
								className={"input w-full focus:outline-none" + (erroresCampos.nombre ? " input-error" : "")}
								placeholder="Nombre"
								value={formulario.nombre}
								onChange={(e) => handleChange("nombre", e.target.value)}
							/>
							{erroresCampos.nombre && <span className="text-error text-xs">{erroresCampos.nombre}</span>}

							<div className="space-y-1 flex flex-col">
								<label className="label text-neutral font-semibold">Marca <span className="text-error">*</span></label>
								<select
									className={"select w-full" + (erroresCampos.marca ? " input-error" : "")}
									value={
										typeof formulario.marca === 'object'
											? formulario.marca.nombre
											: (formulario.marca ?? "")
									}
									onChange={(e) => {
										const nuevaMarca = opcionesSelectores.marca.find(m => m.nombre === e.target.value)
										if (nuevaMarca)
											handleChange("marca", nuevaMarca)
									}}
								>
									<option value="" disabled>Selecciona una marca</option>
									{opcionesSelectores.marca.map(m => <option key={m.nombre} value={m.nombre}>{m.nombre}</option>)}
								</select>
								{erroresCampos.marca && <span className="text-error text-xs">{erroresCampos.marca}</span>}
							</div>

							<div className="space-y-1 flex flex-col">
								<label className="label text-neutral font-semibold">Fecha de lanzamiento</label>
								<input
									type="number"
									className="input w-full focus:outline-none"
									placeholder="Año de lanzamiento"
									value={formulario.fechaLanzamiento}
									onChange={(e) => handleChange("fechaLanzamiento", e.target.value)}
									min={1800}
									max={new Date().getFullYear()}
								/>
							</div>
						</div>

						{/* DERECHA */}
						<div className="space-y-3">
							<span className="label text-neutral font-semibold">Género <span className="text-error">*</span></span>
							<select
								className={"select w-full" + (erroresCampos.genero ? " input-error" : "")}
								value={formulario.genero}
								onChange={(e) => handleChange("genero", e.target.value)}
							>
								<option disabled value="">Selecciona un género</option>
								{GENEROS.map(genero => (
									<option key={genero} value={genero}>
										{genero}
									</option>
								))}
							</select>
							{erroresCampos.genero && <span className="text-error text-xs">{erroresCampos.genero}</span>}

							<div className="space-y-1 flex flex-col">
								<label className="label text-neutral font-semibold focus:outline-none">Perfumista/s <span className="text-error">*</span></label>
								<BadgeSelector<IPerfumistaBackend>
									items={opcionesSelectores.perfumista}
									selected={formulario.perfumistas ?? []}
									onChange={(nuevos) => handleChange("perfumistas", nuevos)}
									placeholder="Selecciona los perfumistas"
									getIdentifier={(val) => val.id ?? ""}
									getLabel={(val) => val.nombre}
									error={erroresCampos.perfumistas ? true : false}
								/>
							</div>
							{erroresCampos.perfumistas && <span className="text-error text-xs">{erroresCampos.perfumistas}</span>}

							<div className="space-y-1 flex flex-col">
								<label className="label text-neutral font-semibold">Colección</label>
								<input
									type="text"
									className="input w-full focus:outline-none"
									placeholder="Colección"
									value={formulario.coleccion}
									onChange={(e) => handleChange("coleccion", e.target.value)}
								/>
							</div>
						</div>
					</div>

					<div className="space-y-1 flex flex-col">
						<label className="label text-neutral font-semibold">Familia Olfativa <span className="text-error">*</span></label>
						<BadgeSelector<IFamilias>
							items={opcionesSelectores.familia}
							selected={formulario.familiasOlfativas ?? []}
							onChange={(nuevos) => handleChange("familiasOlfativas", nuevos)}
							placeholder="Selecciona las familias"
							getIdentifier={(val) => val.nombre}
							getLabel={(val) => val.nombre}
							error={erroresCampos.familiasOlfativas ? true : false}
						/>
					</div>
					{erroresCampos.familiasOlfativas && <span className="text-error text-xs">{erroresCampos.familiasOlfativas}</span>}

					{/* DESCRIPCIÓN */}
					<label className="label text-neutral font-semibold">Descripción <span className="text-error">*</span></label>
					<textarea
						className={"textarea w-full focus:outline-none" + (erroresCampos.descripcion ? " input-error" : "")}
						placeholder="Descripción"
						value={formulario.descripcion}
						onChange={(e) => handleChange("descripcion", e.target.value)}
					></textarea>
					{erroresCampos.descripcion && <span className="text-error text-xs">{erroresCampos.descripcion}</span>}

					<label className="label text-neutral font-semibold">Foto del perfume <span className="text-error">*</span></label>
					<div className="flex items-center gap-4">
						<div className="w-16 rounded-full">
							<img src={previewFoto || "/placeholder.jpg"} alt="Vista previa del perfume" />
						</div>
						<input
							type="file"
							className={"file-input w-full" + (erroresCampos.imagen ? " input-error" : "")}
							onChange={handleFileChange}
						/>
					</div>
					{erroresCampos.imagen && <span className="text-error text-xs">{erroresCampos.imagen}</span>}

					{/* Notas */}
					<div className="divider font-semibold">NOTAS<span className="text-error">*</span></div>

					{(["salida", "corazon", "base"] as ("salida" | "corazon" | "base")[]).map((tipo) =>
						<Fragment key={tipo}>
							<label className="label text-neutral font-semibold capitalize">{tipo}</label>
							<BadgeSelector<INotaBackend>
								key={tipo}
								items={opcionesSelectores.nota.map((nota) => { return { ...nota, tipo } })}
								selected={formulario.notas?.filter(nota => nota.tipo === tipo) ?? []}
								onChange={(nuevos) => {
									handleChange("notas", [...(formulario.notas?.filter((nota) => nota.tipo !== tipo) ?? []), ...nuevos])
								}}
								placeholder={"Selecciona las notas de " + tipo}
								getIdentifier={(val) => val.nombre}
								getLabel={(val) => val.nombre}
								error={erroresCampos.notas ? true : false}
							/>
						</Fragment>
					)}
					{erroresCampos.notas && <span className="text-error text-xs">{erroresCampos.notas}</span>}

					<div className="flex gap-4 justify-end mt-3">
						<button
							className="btn"
							onClick={handleCancelar}
						>
							Cancelar
						</button>
						<button
							className="btn btn-neutral hover:hover:btn-accent text-primary-content"
							onClick={handleSubmit}
							disabled={guardando}
						>
							{guardando && <span className="loading loading-spinner"></span>}
							{esModoEdicion ? "Actualizar perfume" : "Crear perfume"}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}