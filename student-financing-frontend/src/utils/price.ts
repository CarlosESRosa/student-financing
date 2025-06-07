export const calcPMT = (valor: number, parcelas: number, juros: number) =>
    (valor * juros) / (1 - Math.pow(1 + juros, -parcelas));
