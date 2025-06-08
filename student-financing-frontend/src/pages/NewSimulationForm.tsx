import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Input from '../ui/Input';
import { PrimaryButton } from '../ui/PrimaryButton';
import {
    simulationSchema,
    type SimulationFormData,
} from '../schemas/simulation';
import { calcPMT } from '../utils/price';
import { createSimulation } from '../services/simulation';

export default function SimulationForm() {
    const navigate = useNavigate();

    const {
        control,
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<SimulationFormData>({
        resolver: zodResolver(simulationSchema),
        mode: 'onBlur',
        defaultValues: {
            valor_total: undefined,
            quantidade_parcelas: undefined,
            juros_ao_mes: undefined,
        },
    });

    /* valores ao vivo para o cálculo da parcela */
    const valor = watch('valor_total');
    const parcelas = watch('quantidade_parcelas');
    const juros = watch('juros_ao_mes');

    const parcelaCalculada =
        valor && parcelas && juros
            ? calcPMT(valor, parcelas, juros).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
            })
            : '—';

    const onSubmit = async (data: SimulationFormData) => {
        try {
            await createSimulation(data);
            reset();               // limpa formulário
            navigate('/historico');
        } catch {
            alert('Erro ao salvar simulação');
        }
    };

    return (
        <main className="flex items-center justify-center bg-bg px-4">
            <div className="mt-10 w-full max-w-md bg-surface shadow-xl rounded-2xl p-6">
                <h1 className="text-center text-3xl font-semibold text-primary mb-8">
                    Nova simulação
                </h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* ---------------- Valor total com máscara ---------------- */}
                    <Controller
                        name="valor_total"
                        control={control}
                        rules={{ required: 'Informe um valor' }}
                        render={({ field }) => (
                            <Input
                                label="Valor total (R$)"
                                type="text"
                                placeholder="Ex.: 10.000,00"
                                /* exibe o valor formatado */
                                value={
                                    field.value === undefined
                                        ? ''
                                        : field.value.toLocaleString('pt-BR', {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        })
                                }
                                /* converte digitação → número */
                                onChange={e => {
                                    const onlyDigits = e.target.value.replace(/\D/g, ''); // só dígitos
                                    if (!onlyDigits) return field.onChange(undefined);

                                    const numeric = Number(onlyDigits) / 100; // 12345 -> 123,45
                                    field.onChange(numeric);
                                }}
                                onBlur={field.onBlur}
                                ref={field.ref}
                                error={errors.valor_total?.message}
                            />
                        )}
                    />

                    <Input
                        label="Quantidade de parcelas"
                        type="number"
                        min={1}
                        placeholder="Ex.: 24"
                        register={register('quantidade_parcelas', { valueAsNumber: true })}
                        error={errors.quantidade_parcelas?.message}
                    />

                    <Input
                        label="Juros ao mês (%)"
                        type="number"
                        min={0}
                        step="0.01"
                        placeholder="Ex.: 2"
                        register={register('juros_ao_mes', { valueAsNumber: true })}
                        error={errors.juros_ao_mes?.message}
                    />

                    <div className="text-center text-lg font-medium bg-primary/5 py-2 rounded-lg">
                        Parcela mensal:{' '}
                        <span className="text-primary">{parcelaCalculada}</span>
                    </div>

                    <PrimaryButton
                        type="submit"
                        isLoading={isSubmitting}
                        loadingText="Salvando..."
                        className="w-full"
                    >
                        Salvar simulação
                    </PrimaryButton>
                </form>
            </div>
        </main>
    );
}
