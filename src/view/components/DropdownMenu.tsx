import * as RdxDropdownMenu from '@radix-ui/react-dropdown-menu';
import {cn} from '../../app/utils/cn';

function DropdownMenuRoot({children}: {children: React.ReactNode}) {
	return (
		<RdxDropdownMenu.Root>
			{children}
		</RdxDropdownMenu.Root>
	);
}

function DropdownMenuTrigger({children}: {children: React.ReactNode}) {
	return (
		<RdxDropdownMenu.Trigger className='outline-none'>
			{children}
		</RdxDropdownMenu.Trigger>
	);
}

type DropdownMenuContentProps = {
	children: React.ReactNode;
	className?: string;
};

function DropdownMenuContent({children, className}: DropdownMenuContentProps) {
	return (
		<RdxDropdownMenu.Portal>
			<RdxDropdownMenu.Content
				side='bottom'
				className={cn(
					'rounded-2xl p-2 bg-white space-y-2 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)]',
					className,
				)}
			>
				{children}
			</RdxDropdownMenu.Content>
		</RdxDropdownMenu.Portal>
	);
}

type DropdownMenuItemProps = {
	children: React.ReactNode;
	className?: string;
	onSelect?(): void;
};

function DropdownMenuItem({children, className, onSelect}: DropdownMenuItemProps) {
	return (
		<RdxDropdownMenu.Item
			onSelect={onSelect}
			className={cn(
				'min-h-[48px] outline-none flex items-center p-4 text-gray-800 text-sm data-[highlighted]:bg-gray-50 rounded-2xl transition-colors cursor-pointer data-[side=bottom]:animate-slide-up-and-fade',
				className,
			)}
		>
			{children}
		</RdxDropdownMenu.Item>
	);
}

export const DropdownMenu = {
	Root: DropdownMenuRoot,
	Trigger: DropdownMenuTrigger,
	Content: DropdownMenuContent,
	Item: DropdownMenuItem,
};

