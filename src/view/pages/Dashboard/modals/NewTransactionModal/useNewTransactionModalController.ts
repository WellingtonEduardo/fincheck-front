import {type CreateTransactionParams} from './../../../../../app/services/transactionsService/create';
import {z} from 'zod';
import {useDashboard} from '../../components/DashboardContext/useDashboard';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {useBankAccounts} from '../../../../../app/hooks/useBankAccounts';
import {useCategories} from '../../../../../app/hooks/useCategories';
import {useMemo} from 'react';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {transactionsService} from '../../../../../app/services/transactionsService';
import toast from 'react-hot-toast';
import {currencyStringToNumber} from '../../../../../app/utils/currencyStringToNumber';

const schema = z.object({
	value: z.string().min(1, 'Informe o valor'),
	name: z.string().min(1, 'Informe o nome'),
	categoryId: z.string().min(1, 'Informe a categoria'),
	bankAccountId: z.string().min(1, 'Informe a categoria'),
	date: z.date(),
});

type FormData = z.infer<typeof schema>;

export function useNewTransactionModalController() {
	const {
		isNewTransactionModalOpen,
		newTransactionType,
		closeNewTransactionModal,
	} = useDashboard();

	const {
		handleSubmit: hookFormHandleSubmit,
		register,
		formState: {errors},
		control,
		reset,
	} = useForm<FormData>({
		resolver: zodResolver(schema),
	});

	const {accounts} = useBankAccounts();
	const {categories: categoriesList} = useCategories();

	const categories = useMemo(() => categoriesList.filter(category => category.type === newTransactionType), [categoriesList, newTransactionType]);

	const {mutateAsync, isPending} = useMutation({
		async mutationFn(data: CreateTransactionParams) {
			return transactionsService.create(data);
		},
	});

	const queryClient = useQueryClient();

	function customInvalidateQueries(keys: string[]) {
		keys.forEach(key => {
			void queryClient.invalidateQueries({queryKey: [key]});
		});
	}

	const handleSubmit = hookFormHandleSubmit(async data => {
		try {
			await mutateAsync({
				...data,
				date: data.date.toISOString(),
				value: currencyStringToNumber(data.value),
				type: newTransactionType!,
			});

			customInvalidateQueries(['transactions', 'bankAccounts']);

			toast.success(
				newTransactionType === 'EXPENSE'
					? 'Despesa cadastrada com sucesso!'
					: 'Receita cadastrada com sucesso!',
			);

			closeNewTransactionModal();
			reset({
				bankAccountId: '',
				categoryId: '',
				date: new Date(),
				name: '',
				value: '0',
			});
		} catch {
			toast.error(
				newTransactionType === 'EXPENSE'
					? 'Erro ao cadastrar a despesa!'
					: 'Erro ao cadastrar a receita!',
			);
		}
	});

	return {
		isNewTransactionModalOpen,
		newTransactionType,
		closeNewTransactionModal,
		register,
		control,
		errors,
		handleSubmit,
		accounts,
		categories,
		isLoading: isPending,
	};
}
