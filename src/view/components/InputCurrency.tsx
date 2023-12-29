import {CrossCircledIcon} from '@radix-ui/react-icons';
import {NumericFormat} from 'react-number-format';
import {cn} from '../../app/utils/cn';

type InputCurrencyProps = {
	error?: string;
	value?: string | number;
	onChange?(value: string): void;
};

export function InputCurrency({error, value, onChange}: InputCurrencyProps) {
	const formattedValue = typeof value === 'string' ? value.replace(/\./g, '').replace(/,/, '.') : value;

	return (
		<div>

			<NumericFormat
				thousandSeparator='.'
				decimalSeparator=','
				value={formattedValue}
				onChange={event => {
					onChange?.(event.target.value);
				}}

				className={cn(
					'w-full text-gray-800 text-[32px] font-bold tracking-[-1px] outline-none',
					error && ' text-red-900',
				)}
			/>

			{error && (
				<div className='flex gap-2 items-center mt-2 text text-red-900'>
					<CrossCircledIcon />
					<span className='text-xs'>{error}</span>
				</div>
			)}
		</div>
	);
}
