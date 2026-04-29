const URL_SERVER = `http://localhost:8080/api`;

export interface IVotacionRequest {
  id_perfume: number;
  tipo: string; // 'favorito' o 'like'
}

// Guardar un perfume como favorito
export const addFavorite = async (idPerfume: number): Promise<void> => {
  const response = await fetch(`${URL_SERVER}/votacion`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id_perfume: idPerfume,
      tipo: 'favorito'
    } as IVotacionRequest),
  });

  if (!response.ok) {
    throw new Error('No se pudo guardar el perfume como favorito');
  }
};

// Eliminar un perfume de favoritos
export const removeFavorite = async (idPerfume: number): Promise<void> => {
  const response = await fetch(`${URL_SERVER}/votacion/${idPerfume}?tipo=favorito`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('No se pudo eliminar el perfume de favoritos');
  }
};

// Verificar si un perfume es favorito del usuario actual
export const isFavorite = async (idPerfume: number): Promise<boolean> => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  const response = await fetch(`${URL_SERVER}/votacion/${idPerfume}/favorito`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 404) return false;
    throw new Error('No se pudo verificar si el perfume es favorito');
  }

  const data = await response.json();
  return data.isFavorite;
};
