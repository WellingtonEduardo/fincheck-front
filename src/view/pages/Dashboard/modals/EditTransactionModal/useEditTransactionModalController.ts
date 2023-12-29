import {type UpdateTransactionParams} from './../../../../../app/services/transactionsService/update';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {useBankAccounts} from '../../../../../app/hooks/useBankAccounts';
import {useCategories} from '../../../../../app/hooks/useCategories';
import {useMemo, useState} from 'react';
import {type Transaction} from '../../../../../app/entities/Transaction';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {transactionsService} from '../../../../../app/services/transactionsService';
import toast from 'react-hot-toast';
import {currencyStringToNumber} from '../../../../../app/utils/currencyStringToNumber';

const schema = z.object({
	value: z.union([
		z.string().min(1, 'Saldo inicial é obrigatório'),
		z.number().min(1, 'Saldo inicial é obrigatório'),
	]),
	name: z.string().min(1, 'Informe o nome'),
	categoryId: z.string().min(1, 'Informe a categoria'),
	bankAccountId: z.string().min(1, 'Informe a categoria'),
	date: z.date(),
});

type FormData = z.infer<typeof schema>;

export function useEditTransactionModalController(
	transaction: Transaction | undefined,
	onClose: () => void,
) {
	const {
		handleSubmit: hookFormHandleSubmit,
		register,
		formState: {errors},
		control,
	} = useForm<FormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			bankAccountId: transaction?.bankAccountId,
			categoryId: transaction?.categoryId,
			name: transaction?.name,
			value: transaction?.value,
			date: transaction ? new Date(transaction.date) : new Date(),
		},
	});

	const {accounts} = useBankAccounts();
	const {categories: categoriesList} = useCategories();
	const categories = useMemo(() => categoriesList.filter(category => category.type === transaction?.type), [categoriesList, transaction]);

	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

	const queryClient = useQueryClient();

	function customInvalidateQueries(keys: string[]) {
		keys.forEach(key => {
			void queryClient.invalidateQueries({queryKey: [key]});
		});
	}

	const {
		isPending,
		mutateAsync: updateTransaction,
	} = useMutation({
		async mutationFn(data: UpdateTransactionParams) {
			return transactionsService.update(data);
		},
	});

	const {
		isPending: isLoadingDelete,
		mutateAsync: removeAccount,
	} = useMutation({
		async mutationFn(transactionsId: string) {
			return transactionsService.remove(transactionsId);
		},
	});

	const handleSubmit = hookFormHandleSubmit(async data => {
		try {
			await updateTransaction({
				...data,
				id: transaction!.id,
				type: transaction!.type,
				value: currencyStringToNumber(data.value),
				date: data.date.toISOString(),
			});

			customInvalidateQueries(['transactions', 'bankAccounts']);

			toast.success(
				transaction!.type === 'EXPENSE'
					? 'Despesa editada com sucesso!'
					: 'Receita editada com sucesso!',
			);
			onClose();
		} catch {
			toast.error(
				transaction!.type === 'EXPENSE'
					? 'Erro ao editar a despesa!'
					: 'Erro ao editar a receita!',
			);
		}
	});

	function handleOpenDeleteModal() {
		setIsDeleteModalOpen(true);
	}

	function handleCloseDeleteModal() {
		setIsDeleteModalOpen(false);
	}

	async function handleDeleteTransaction() {
		try {
			await removeAccount(transaction!.id);

			customInvalidateQueries(['transactions', 'bankAccounts']);

			toast.success(transaction!.type === 'EXPENSE'
				? 'A despesa foi deletada com sucesso!'
				: 'A receita foi deletada com sucesso!');
			onClose();
		} catch {
			toast.error(transaction!.type === 'EXPENSE'
				? 'Erro ao deletar a despesa!'
				: 'Erro ao deletar a receita!');
		}
	}

	return {
		register,
		control,
		errors,
		handleSubmit,
		accounts,
		categories,
		isLoading: isPending,
		isDeleteModalOpen,
		isLoadingDelete,
		handleDeleteTransaction,
		handleOpenDeleteModal,
		handleCloseDeleteModal,
	};
}
