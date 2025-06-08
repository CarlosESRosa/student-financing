export const toBRL = (n: number) =>
    n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

export const toNum = (v: string | number) => Number(v);
