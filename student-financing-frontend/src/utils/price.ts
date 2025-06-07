
export const calcPMT = (valorTotal: number, parcelas: number, jurosMes: number) => {
    const i = jurosMes / 100; // transforma % em fração
    if (i === 0) return valorTotal / parcelas; // sem juros
    return (valorTotal * i) / (1 - Math.pow(1 + i, -parcelas));
};
