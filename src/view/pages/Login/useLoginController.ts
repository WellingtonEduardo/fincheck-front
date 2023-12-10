import {type SigninParams} from './../../../app/services/authService/signin';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {useMutation} from '@tanstack/react-query';
import {authService} from '../../../app/services/authService';
import toast from 'react-hot-toast';

const schema = z.object({
	email: z.string().min(1, 'E-mail é obrigatório').email('Informe um e-mail válido'),
	password: z.string().min(8, 'Senha deve ter pelo menos 8 dígitos'),
});

type FormData = z.infer<typeof schema>;

export function useLoginController() {
	const {
		handleSubmit: hookFormHandleSubmit,
		register,
		formState: {errors},
	} = useForm<FormData>({
		resolver: zodResolver(schema),
	});

	const {mutateAsync, isPending} = useMutation({
		async mutationFn(data: SigninParams) {
			return authService.signin(data);
		},
	});

	const handleSubmit = hookFormHandleSubmit(async data => {
		try {
			const {accessToken} = await mutateAsync(data);
			console.log({accessToken});
		} catch {
			toast.error('Credenciais inválidas!');
		}
	});

	return {handleSubmit, register, errors, isLoading: isPending};
}
