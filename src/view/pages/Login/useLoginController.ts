import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {z} from 'zod';

type FormData = {
	email: string; password: string;
};

const schema = z.object({
	email: z.string().min(1, 'E-mail é obrigatório').email('Informe um e-mail válido'),
	password: z.string().min(8, 'Senha deve ter pelo menos 8 dígitos'),
});

export function useLoginController() {
	const {
		handleSubmit: hookFormHandleSubmit,
		register,
		formState: {errors},
	} = useForm<FormData>({
		resolver: zodResolver(schema),
	});

	const handleSubmit = hookFormHandleSubmit(data => {
		console.log('foi');
	});

	return {handleSubmit, register, errors};
}
