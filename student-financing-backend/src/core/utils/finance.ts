export const calculateMonthlyInstallment = (totalValue: number, numberOfInstallments: number, monthlyInterestRate: number): number => {
    const i = monthlyInterestRate / 100; // percentage ➜ decimal
    const n = numberOfInstallments;
    const pv = totalValue;

    // PMT = PV * (i / (1 - (1 + i)^-n))  – Price system formula
    const pmt = pv * (i / (1 - Math.pow(1 + i, -n)));

    return Number(pmt.toFixed(2));
};