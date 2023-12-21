import {type BankAccountParams} from './../../../../../app/services/bankAccountsService/create';
import {z} from 'zod';
import {useDashboard} from '../../components/DashboardContext/useDashboard';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useMutation} from '@tanstack/react-query';
import {bankAccountsService} from '../../../../../app/services/bankAccountsService';
import toast from 'react-hot-toast';
import {currencyStringToNumber} from '../../../../../app/utils/currencyStringToNumber';

const schema = z.object({
	initialBalance: z.string().min(1, 'Saldo inicial é obrigatório'),
	name: z.string().min(1, 'Nome da conta é obrigatório'),
	type: z.enum(['CHECKING', 'INVESTMENT', 'CASH']),
	color: z.string().min(1, 'Cor é obrigatório'),
});

type FormData = z.infer<typeof schema>;

export function useNewAccountModalController() {
	const {
		isNewAccountModalOpen,
		closeNewAccountModal,
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

	const {mutateAsync, isPending} = useMutation({
		async mutationFn(data: BankAccountParams) {
			return bankAccountsService.create(data);
		},
	});

	const handleSubmit = hookFormHandleSubmit(async data => {
		try {
			await mutateAsync({
				...data,
				initialBalance: currencyStringToNumber(data.initialBalance),
			});

			toast.success('Conta foi cadastrada com sucesso');
			closeNewAccountModal();
			reset({
				color: '',
				initialBalance: '0',
				name: '',
				type: 'CHECKING',
			});
		} catch {
			toast.error('Erro ao cadastrar a conta!');
		}
	});

	return {
		isNewAccountModalOpen,
		closeNewAccountModal,
		register,
		errors,
		handleSubmit,
		control,
		isLoading: isPending,
	};
}
