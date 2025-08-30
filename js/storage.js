const KEY = "inventario";

export const saveInventario = (data) => {
    localStorage.setItem(KEY, JSON.stringify(data));
};

export const loadInventario = () => {
    const data = localStorage.getItem(KEY);
    return data ? JSON.parse(data) : [];
};