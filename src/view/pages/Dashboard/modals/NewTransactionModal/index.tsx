import {Controller} from 'react-hook-form';
import {Button} from '../../../../components/Button';
import {DatePickerInput} from '../../../../components/DatePickerInput';
import {Input} from '../../../../components/Input';
import {InputCurrency} from '../../../../components/InputCurrency';
import {Modal} from '../../../../components/Modal';
import {Select} from '../../../../components/Select';
import {useNewTransactionModalController} from './useNewTransactionModalController';

export function NewTransactionModal() {
	const {
		isNewTransactionModalOpen,
		newTransactionType,
		closeNewTransactionModal,
		control,
		errors,
		register,
		handleSubmit,
		accounts,
		categories,
		isLoading,
	} = useNewTransactionModalController();

	const isExpense = newTransactionType === 'EXPENSE';

	return (

		<Modal
			title={isExpense ? 'Nova Despesa' : 'Nova Receita'}
			open={isNewTransactionModalOpen}
			onClose={closeNewTransactionModal}
		>

			<form onSubmit={handleSubmit}>
				<div >
					<span className='text-gray-600 tracking-[-0.5px] text-xs'>
            Valor {isExpense ? 'da despesa' : 'da receita'}
					</span>
					<div className='flex items-center gap-2'>
						<span className='text-gray-600 tracking-[-0.5px] text-lg'>R$</span>

						<Controller
							control={control}
							name='value'
							defaultValue='0'
							render={({field: {onChange, value}}) => (
								<InputCurrency
									error={errors.value?.message}
									onChange={onChange}
									value={value}
								/>
							)}
						/>
					</div>
				</div>

				<div className='mt-10 flex flex-col gap-4'>
					<Input
						type='text'
						placeholder={isExpense ? 'Nome da Despesa' : 'Nome da Receita'}
						error={errors.name?.message}
						{...register('name')}
					/>

					<Controller
						control={control}
						name='categoryId'
						defaultValue=''
						render={({field: {onChange, value}}) => (
							<Select
								placeholder='Categoria'
								options={categories.map(category => (
									{
										label: category.name,
										value: category.id,
									}))}
								error={errors.categoryId?.message}
								onChange={onChange}
								value={value}
							/>
						)}
					/>

					<Controller
						control={control}
						name='bankAccountId'
						defaultValue=''
						render={({field: {onChange, value}}) => (
							<Select
								placeholder={isExpense ? 'Pagar com' : 'Receber com'}
								options={accounts.map(account => (
									{
										label: account.name,
										value: account.id,
									}))}
								error={errors.bankAccountId?.message}
								onChange={onChange}
								value={value}
							/>
						)}
					/>

					<Controller
						control={control}
						name='date'
						defaultValue={new Date()}
						render={({field: {onChange, value}}) => (
							<DatePickerInput
								value={value}
								onChange={onChange}
								error={errors.date?.message}
							/>
						)}
					/>

				</div>
				<Button isLoading={isLoading} type='submit' className='w-full mt-6'>
          Criar
				</Button>
			</form>

		</Modal>

	);
}
