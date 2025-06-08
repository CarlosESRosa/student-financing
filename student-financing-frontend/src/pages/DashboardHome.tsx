import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import { fetchSimulations, type Simulation } from '../services/simulation';
import { toBRL, toNum } from '../utils/number';

/* --- helpers de estilo --- */
const Card = styled.div.attrs({
    className: 'bg-surface rounded-xl shadow p-6 flex flex-col gap-2',
})``;

export default function DashboardHome() {
    const navigate = useNavigate();
    const [data, setData] = useState<Simulation[]>([]);
    const [loading, setLoading] = useState(true);

    /* buscar simulações */
    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const sims = await fetchSimulations();
                setData(sims);
            } catch {
                setData([]);          // 404 ou erro ⇒ lista vazia
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    /* ------------ calculos e UI normal (já existentes) ------------ */
    /* últimas 5 */
    const recent = useMemo(
        () =>
            [...data]
                .sort(
                    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
                )
                .slice(0, 5),
        [data],
    );

    const total = data.length;
    const mediaParcelas = useMemo(
        () =>
            data.length
                ? data.reduce((acc, cur) => acc + toNum(cur.valor_parcela_mensal), 0) /
                data.length
                : 0,
        [data],
    );

    const chartData = useMemo(
        () =>
            [...data]
                .sort(
                    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
                )
                .map(s => ({
                    date: new Date(s.createdAt).toLocaleDateString(),
                    valor: toNum(s.valor_total),
                })),
        [data],
    );

    /* carregando */
    if (loading) return <p className="text-center py-10">Carregando dashboard…</p>;

    if (total === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center gap-6">
                <h1 className="text-2xl font-semibold">
                    Você ainda não fez nenhuma simulação
                </h1>
                <button
                    onClick={() => navigate('/nova-simulacao')}
                    className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg"
                >
                    Criar nova simulação
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* ----- cards resumo ----- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Card>
                    <span className="text-sm text-gray-600">Total de simulações</span>
                    <strong className="text-3xl">{total}</strong>
                </Card>
                <Card>
                    <span className="text-sm text-gray-600">Valor médio da parcela</span>
                    <strong className="text-3xl">{toBRL(mediaParcelas)}</strong>
                </Card>
            </div>

            {/* ----- últimas 5 ----- */}
            <Card>
                <h2 className="text-lg font-semibold mb-4">Últimas 5 simulações</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead>
                            <tr className="bg-primary/5">
                                <th className="px-4 py-2 text-left">Data</th>
                                <th className="px-4 py-2 text-left">Valor total</th>
                                <th className="px-4 py-2 text-left">Parcelas</th>
                                <th className="px-4 py-2 text-left">Parcela mensal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recent.map(r => (
                                <tr key={r.id} className="border-t">
                                    <td className="px-4 py-2">
                                        {new Date(r.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-4 py-2">{toBRL(toNum(r.valor_total))}</td>
                                    <td className="px-4 py-2">{r.quantidade_parcelas}</td>
                                    <td className="px-4 py-2">
                                        {toBRL(toNum(r.valor_parcela_mensal))}
                                    </td>
                                </tr>
                            ))}
                            {!recent.length && (
                                <tr>
                                    <td colSpan={4} className="py-4 text-center">
                                        Nenhuma simulação ainda.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* ----- gráfico ----- */}
            <Card>
                <h2 className="text-lg font-semibold mb-4">
                    Evolução do valor das simulações
                </h2>
                {chartData.length ? (
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={chartData}>
                            <XAxis dataKey="date" />
                            <YAxis
                                tickFormatter={v =>
                                    v.toLocaleString('pt-BR', { maximumFractionDigits: 0 })
                                }
                            />
                            <Tooltip
                                formatter={v => toBRL(v as number)}
                                labelFormatter={l => `Data: ${l}`}
                            />
                            <Line
                                type="monotone"
                                dataKey="valor"
                                stroke="#003D49"
                                strokeWidth={2}
                                dot={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                ) : (
                    <p className="text-center text-gray-500 py-10">
                        Nenhum dado para exibir gráfico.
                    </p>
                )}
            </Card>
        </div>
    );
}
