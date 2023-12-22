import {type CreateBankAccountParams} from './../../../../../app/services/bankAccountsService/create';
import {z} from 'zod';
import {useDashboard} from '../../components/DashboardContext/useDashboard';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {bankAccountsService} from '../../../../../app/services/bankAccountsService';
import toast from 'react-hot-toast';
import {currencyStringToNumber} from '../../../../../app/utils/currencyStringToNumber';

const schema = z.object({
	initialBalance: z.union([
		z.string().min(1, 'Saldo inicial é obrigatório'),
		z.number().min(1, 'Saldo inicial é obrigatório'),
	]),
	name: z.string().min(1, 'Nome da conta é obrigatório'),
	type: z.enum(['CHECKING', 'INVESTMENT', 'CASH']),
	color: z.string().min(1, 'Cor é obrigatório'),
});

type FormData = z.infer<typeof schema>;

export function useEditAccountModalController() {
	const {
		isEditAccountModalOpen,
		closeEditAccountModal,
		accountBeingEdited,
	} = useDashboard();

	const {
		handleSubmit: hookFormHandleSubmit,
		register,
		formState: {errors},
		control,
		reset,
	} = useForm<FormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			color: accountBeingEdited?.color,
			initialBalance: accountBeingEdited?.initialBalance,
			name: accountBeingEdited?.name,
			type: accountBeingEdited?.type,
		},
	});

	const queryClient = useQueryClient();

	const {mutateAsync, isPending} = useMutation({
		async mutationFn(data: CreateBankAccountParams) {
			return bankAccountsService.update({
				id: accountBeingEdited!.id,
				...data,
			});
		},
	});

	const handleSubmit = hookFormHandleSubmit(async data => {
		try {
			await mutateAsync({
				...data,
				initialBalance: currencyStringToNumber(data.initialBalance),
			});

			// eslint-disable-next-line @typescript-eslint/no-floating-promises
			queryClient.invalidateQueries({queryKey: ['bankAccounts']});

			toast.success('A conta foi editada com sucesso!');
			closeEditAccountModal();
		} catch {
			toast.error('Erro ao salvar as alterações!');
		}
	});

	return {
		isEditAccountModalOpen,
		closeEditAccountModal,
		register,
		errors,
		handleSubmit,
		control,
		isLoading: isPending,
	};
}
