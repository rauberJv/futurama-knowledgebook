
const getAllSeasons = async (page: number, size: number) => {
    const response = await fetch(`https://futuramaapi.com/api/seasons?page=${page}&size=${size}`);
    const data = await response.json();
    return data;
}

const getSeasonById = async (id: string) => {
    const response = await fetch(`https://futuramaapi.com/api/seasons/${id}`);
    const data = await response.json();
    return data;
}

export { getAllSeasons, getSeasonById };