import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import { /* addDays, endOfMonth, startOfMonth, startOfWeek, endOfWeek,*/ startOfDay, endOfDay, isWithinInterval } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css'; // necessário para funcionamento interno
import { fetchSimulations, type Simulation } from '../services/simulation';
import Pagination from '../ui/Pagination';
import Input from '../ui/Input';

/* ---------- tabela estilizada ---------- */
const Table = styled.table.attrs({
    className: 'min-w-full text-sm border-collapse',
})``;

const Th = styled.th.attrs({
    className: 'py-3 px-4 text-left font-semibold bg-primary/5',
})``;

const Td = styled.td.attrs({
    className: 'py-2 px-4 border-t',
})``;

const pageSize = 10;

export default function SimulationHistory() {
    /* --- estado global de dados --- */
    const [data, setData] = useState<Simulation[]>([]);
    const [loading, setLoading] = useState(true);

    /* --- filtros --- */
    const [range, setRange] = useState<[Date | null, Date | null]>([null, null]);
    const [valor, setValor] = useState<number | ''>('');
    const [parcelas, setParcelas] = useState<number | ''>('');

    /* --- paginação --- */
    const [page, setPage] = useState(1);

    /* --- busca inicial --- */
    useEffect(() => {
        (async () => {
            setLoading(true);
            const sims = await fetchSimulations();
            setData(sims);
            setLoading(false);
        })();
    }, []);

    /* --- aplicar filtros --- */
    const filtered = useMemo(() => {
        let res = data;

        /* data */
        if (range[0]) {
            const filterStart = startOfDay(range[0]);
            const filterEnd = range[1] ? endOfDay(range[1]) : endOfDay(range[0]);

            res = res.filter(s => {
                const simulationDate = new Date(s.createdAt);
                return isWithinInterval(simulationDate, { start: filterStart, end: filterEnd });
            });
        }

        /* valor total */
        if (valor !== '') {
            res = res.filter(s => Number(s.valor_total) === Number(valor));
        }

        /* quantidade de parcelas */
        if (parcelas !== '') {
            res = res.filter(s => s.quantidade_parcelas === Number(parcelas));
        }

        return res;
    }, [data, range, valor, parcelas]);

    /* --- paginação --- */
    const totalPages = Math.ceil(filtered.length / pageSize);
    const pageData = filtered.slice((page - 1) * pageSize, page * pageSize);

    /* resetar página quando filtros mudam */
    useEffect(() => { setPage(1); }, [filtered]);

    /* --- UI --- */
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold">Histórico de simulações</h1>

            {/* -------- filtros -------- */}
            <div className="bg-surface rounded-xl p-4 flex flex-wrap gap-4 items-end shadow">
                {/* Date range */}
                <div className="flex flex-col">
                    <label className="text-xs text-gray-600">Período</label>
                    <DatePicker
                        selectsRange
                        startDate={range[0]}
                        endDate={range[1]}
                        onChange={(update: [Date | null, Date | null]) => setRange(update)}
                        isClearable
                        className="w-full px-4 py-2 rounded-[5px] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20"
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Selecione um período"
                    />
                    {/*<div className="flex gap-1 mt-1 text-xs">
                        <button
                            className="underline text-secondary"
                            onClick={() => setRange([startOfDay(new Date()), endOfDay(new Date())])}
                        >
                            Hoje
                        </button>
                        <span>|</span>
                        <button
                            className="underline text-secondary"
                            onClick={() =>
                                setRange([startOfWeek(new Date(), { weekStartsOn: 1 }), endOfWeek(new Date(), { weekStartsOn: 1 })])
                            }
                        >
                            Esta semana
                        </button>
                        <span>|</span>
                        <button
                            className="underline text-secondary"
                            onClick={() => setRange([startOfMonth(new Date()), endOfMonth(new Date())])}
                        >
                            Este mês
                        </button>
                    </div>*/}
                </div>

                {/* Valor */}
                <Input
                    label="Valor total (R$)"
                    type="number"
                    value={valor}
                    onChange={e => setValor(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="Ex.: 25000"
                    className="w-32"
                />

                {/* Parcelas */}
                <Input
                    label="Parcelas"
                    type="number"
                    value={parcelas}
                    onChange={e => setParcelas(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="Ex.: 24"
                    className="w-24"
                />

                {/* Limpar */}
                <button
                    onClick={() => {
                        setRange([null, null]);
                        setValor('');
                        setParcelas('');
                    }}
                    className="ml-auto text-sm underline text-red-600"
                >
                    Limpar filtros
                </button>
            </div>

            {/* -------- tabela -------- */}
            {loading ? (
                <p className="text-center py-10">Carregando...</p>
            ) : (
                <>
                    <div className="overflow-x-auto bg-surface rounded-xl shadow">
                        <Table>
                            <thead>
                                <tr>
                                    <Th>Data</Th>
                                    <Th>Valor total (R$)</Th>
                                    <Th>Parcelas</Th>
                                    <Th>Juros / mês (%)</Th>
                                    <Th>Parcela mensal (R$)</Th>
                                </tr>
                            </thead>
                            <tbody>
                                {pageData.map(row => (
                                    <tr key={row.id} className="hover:bg-primary/5">
                                        <Td>{new Date(row.createdAt).toLocaleDateString()}</Td>
                                        <Td>{Number(row.valor_total).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Td>
                                        <Td>{row.quantidade_parcelas}</Td>
                                        <Td>{Number(row.juros_ao_mes).toFixed(2)}</Td>
                                        <Td>{Number(row.valor_parcela_mensal).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Td>
                                    </tr>
                                ))}
                                {pageData.length === 0 && (
                                    <tr>
                                        <Td colSpan={5} className="text-center py-6">
                                            Nenhuma simulação encontrada.
                                        </Td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </div>

                    {/* paginação */}
                    <Pagination page={page} totalPages={totalPages} onChange={setPage} />
                </>
            )}
        </div>
    );
}
