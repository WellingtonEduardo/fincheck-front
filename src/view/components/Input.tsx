import {forwardRef, type ComponentProps} from 'react';

import {CrossCircledIcon} from '@radix-ui/react-icons';

import {cn} from '../../app/utils/cn';

type InputProps = {
	name: string;
	error?: string;

} & ComponentProps<'input'>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
	({placeholder, name, id, className, error, ...props}, ref) => {
		const inputId = id ?? name;

		return (
			<div className=' relative'>

				<input
					ref={ref}
					{...props}
					name={name}
					placeholder=' '
					id={inputId}
					className={cn(
						'bg-white w-full rounded-lg border border-gray-500 px-3 h-[52px] text-gray-800 pt-4 peer placeholder-shown:pt-0 focus:border-gray-800 transition-all outline-none',
						className,
						error && '!border-red-900',
					)}
				/>

				<label htmlFor={inputId}
					className='absolute text-xs left-[13px] top-2 pointer-events-none text-gray-700 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 transition-all'>
					{placeholder}
				</label>

				{error && (
					<div className='flex gap-2 items-center mt-2 text text-red-900'>
						<CrossCircledIcon />
						<span className='text-xs'>{error}</span>
					</div>
				)}

			</div>
		);
	},
);

Input.displayName = 'Input';

