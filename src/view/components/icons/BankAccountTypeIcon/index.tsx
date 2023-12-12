import {iconsMap} from './iconsMap';

type BankAccountTypeIconProps = {
	type: keyof typeof iconsMap;
};

export function BankAccountTypeIcon({type}: BankAccountTypeIconProps) {
	const Icon = iconsMap[type];

	return <Icon />;
}
