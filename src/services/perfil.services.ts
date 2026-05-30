import type { IBackendPerfumeFavorito, IBackendUser, IPerfil, IUpdateProfilePayload } from "../interfaces/IPerfil";
import { getHandler } from "./handler";

const customFetch = getHandler("perfil");

type ProfileResponse = {
	result: {
		user: IBackendUser;
		listasCreadas?: Array<IPerfil["listasCreadas"][number]>;
		listasGuardadas?: Array<IPerfil["listasGuardadas"][number]>;
		perfumesFavoritos?: IBackendPerfumeFavorito[];
	};
};

type UpdateProfileResponse = {
	result: {
		user: IBackendUser;
	};
};

const defaultProfileImage = "/user/profile-pic/default-profile.jpg";

const mapUser = (user: IBackendUser) => ({
	id: user.id,
	userName: user.username,
	email: user.email || "",
	descripcion: user.descripcion || "",
	pfp: user.foto || defaultProfileImage,
	rol: user.rol || "BASICO",
});

const mapPerfumeFavorito = (perfume: IBackendPerfumeFavorito) => ({
	id: perfume.id,
	nombre: perfume.nombre || "",
	foto: perfume.foto || "",
	marca: perfume.marca || "",
	familiasOlfativas: perfume.familiasOlfativas || [],
});

const getMyProfile = async (): Promise<IPerfil> => {
	const data = await customFetch<ProfileResponse>("", "No se pudo cargar el perfil", true);

	return {
		user: mapUser(data.result.user),
		listasCreadas: data.result.listasCreadas ?? [],
		listasGuardadas: data.result.listasGuardadas ?? [],
		perfumesFavoritos: (data.result.perfumesFavoritos ?? []).map(mapPerfumeFavorito),
	};
};

const updateMyProfile = async (payload: IUpdateProfilePayload) => {
	const formData = new FormData();

	formData.append("email", payload.email);
	formData.append("descripcion", payload.descripcion);
	formData.append("foto", payload.foto || "");

	if (payload.archivo) {
		formData.append("foto", payload.archivo);
	}

	const data = await customFetch<UpdateProfileResponse>(
		"",
		"No se pudo actualizar el perfil",
		true,
		"PATCH",
		formData
	);

	const mappedUser = mapUser(data.result.user);

	localStorage.setItem(
		"user",
		JSON.stringify({
			id: mappedUser.id,
			userName: mappedUser.userName,
			pfp: mappedUser.pfp,
			rol: mappedUser.rol,
		}),
	);

	return mappedUser;
};

export { getMyProfile, updateMyProfile };
