import { useRef, useState } from "react";
import type { IUserProfile } from "../../interfaces/IPerfil";
import { FormError } from "../../components/FormError";

const DEFAULT_PROFILE_IMAGE = "/user/profile-pic/default-profile.jpg";
const MAX_DESCRIPCION_LENGTH = 300;

interface IEditProfileFormProps {
	user: IUserProfile;
	loading: boolean;
	onCancel: () => void;
	onSave: (data: {
		email: string;
		descripcion: string;
		foto?: string;
		archivo?: File | null;
		quitarFoto?: boolean;
	}) => Promise<void>;
}

export default function EditProfileForm({ user, loading, onCancel, onSave }: IEditProfileFormProps) {
	const [email, setEmail] = useState(user.email);
	const [descripcion, setDescripcion] = useState(user.descripcion);
	const [archivo, setArchivo] = useState<File | null>(null);
	const [previewFoto, setPreviewFoto] = useState(user.pfp || DEFAULT_PROFILE_IMAGE);
	const [quitarFoto, setQuitarFoto] = useState(false);
	const [error, setError] = useState("");
	const inputFotoRef = useRef<HTMLInputElement | null>(null);

	const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setError("");
		const file = e.target.files?.[0];
		if (!file) return;

		setArchivo(file);
		setQuitarFoto(false);
		setPreviewFoto(URL.createObjectURL(file));
	};

	const handleQuitarFoto = () => {
		setError("");
		setArchivo(null);
		setQuitarFoto(true);
		setPreviewFoto(DEFAULT_PROFILE_IMAGE);

		if (inputFotoRef.current) {
			inputFotoRef.current.value = "";
		}
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError("");

		const descripcionLimpia = descripcion.trim();

		if (descripcion.length > MAX_DESCRIPCION_LENGTH) {
			setError(`La descripción no puede superar ${MAX_DESCRIPCION_LENGTH} caracteres.`);
			return;
		}

		try {
			await onSave({
				email: email.trim(),
				descripcion: descripcionLimpia,
				archivo,
				quitarFoto,
				foto: quitarFoto ? "" : undefined,
			});
		} catch (err) {
			setError(err instanceof Error ? err.message : "No se pudo guardar");
		}
	};

	return (
		<form onSubmit={handleSubmit} className="card bg-base-100 shadow-sm">
			<div className="card-body">
				<h2 className="card-title text-base-content">Editar perfil</h2>

				<label className="label font-semibold text-base-content">Email</label>
				<input
					type="email"
					className="input w-full"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>

				<label className="label font-semibold text-base-content">Descripción</label>
				<textarea
					className={`textarea w-full h-28 focus:outline-none ${descripcion.length > MAX_DESCRIPCION_LENGTH ? "textarea-error" : ""}`}
					value={descripcion}
					onChange={(e) => {
						setError("");
						setDescripcion(e.target.value);
					}}
					aria-invalid={descripcion.length > MAX_DESCRIPCION_LENGTH}
				/>
				<div className={`flex justify-end text-xs ${descripcion.length > MAX_DESCRIPCION_LENGTH ? "text-error" : "opacity-70"}`}>
					{descripcion.length}/{MAX_DESCRIPCION_LENGTH}
				</div>

				<label className="label font-semibold text-base-content">Foto</label>
				<div className="flex flex-col gap-3 sm:flex-row sm:items-center">
					<div className="avatar shrink-0">
						<div className="h-16 w-16 overflow-hidden rounded-full ring-2 ring-base-content/10">
							<img
								src={previewFoto || DEFAULT_PROFILE_IMAGE}
								alt="Vista previa del perfil"
								className="h-full w-full object-cover"
							/>
						</div>
					</div>
					<div className="flex w-full flex-col gap-2">
						<input
							ref={inputFotoRef}
							type="file"
							className="file-input file-input-bordered w-full"
							accept="image/*"
							onChange={handleFotoChange}
						/>
						<button
							type="button"
							className="btn btn-outline btn-error w-fit"
							onClick={handleQuitarFoto}
							disabled={loading}
						>
							Quitar foto
						</button>
					</div>
				</div>

				<FormError message={error} />

				<div className="flex gap-4 justify-end mt-3">
					<button type="button" className="btn btn-ghost text-base-content" onClick={onCancel}>
						Cancelar
					</button>
					<button
						type="submit"
						className="btn btn-primary text-primary-content"
						disabled={loading}
					>
						{loading ? "Guardando..." : "Guardar cambios"}
					</button>
				</div>
			</div>
		</form>
	);
}
