import {type SignupParams} from './../../../app/services/authService/signup';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {authService} from '../../../app/services/authService';
import {useMutation} from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {useAuth} from '../../../app/hooks/useAuth';

const schema = z.object({
	name: z.string().min(1, 'Nome é obrigatório'),
	email: z.string().min(1, 'E-mail é obrigatório').email('Informe um e-mail válido'),
	password: z.string().min(8, 'Senha deve ter pelo menos 8 dígitos'),
});

type FormData = z.infer<typeof schema>;

export function useRegisterController() {
	const {
		handleSubmit: hookFormHandleSubmit,
		register,
		formState: {errors},
	} = useForm<FormData>({
		resolver: zodResolver(schema),
	});

	const {mutateAsync, isPending} = useMutation({
		async mutationFn(data: SignupParams) {
			return authService.signup(data);
		},
	});

	const {signin} = useAuth();

	const handleSubmit = hookFormHandleSubmit(async data => {
		try {
			const {accessToken} = await mutateAsync(data);
			signin(accessToken);
		} catch {
			toast.error('Ocorreu um erro ao criar a sua conta!');
		}
	});

	return {handleSubmit, register, errors, isLoading: isPending};
}
