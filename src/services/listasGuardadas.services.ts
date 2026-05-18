const API = `${import.meta.env.VITE_SERVER_URL}listas/`;

const getToken = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No hay token de autenticación. Por favor, inicia sesión.");
  }
  return token;
};

export const guardarLista = async (idLista: number) => {
  const url = `${API}guardar/${idLista}`;
  const token = getToken();

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ username: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!).userName : '' }),
    });

    const data = await response.json();
    data.status = response.status;

    if (!response.ok) {
      throw new Error(data.mensaje || "No se pudo guardar la lista");
    }

    return data;
  } catch (err) {
    return err;
  }
};

export const quitarListaGuardada = async (idLista: number) => {
  const url = `${API}guardar/${idLista}`;
  const token = getToken();

  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ username: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!).userName : '' }),
    });

    const data = await response.json();
    data.status = response.status;

    if (!response.ok) {
      throw new Error(data.mensaje || "No se pudo quitar la lista guardada");
    }

    return data;
  } catch (err) {
    return err;
  }
};

export const getListasGuardadas = async () => {
  const url = `${API}guardadas`;
  const token = getToken();

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    const data = await response.json();
    data.status = response.status;

    if (!response.ok) {
      throw new Error(data.mensaje || "No se pudieron obtener las listas guardadas");
    }

    return data;
  } catch (err) {
    return err;
  }
};

export const estaListaGuardada = async (idLista: number) => {
  const url = `${API}guardada/${idLista}`;
  const token = getToken();

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    const data = await response.json();
    data.status = response.status;

    if (!response.ok) {
      throw new Error(data.mensaje || "No se pudo verificar la lista guardada");
    }

    return data;
  } catch (err) {
    return err;
  }
};
