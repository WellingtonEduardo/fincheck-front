import {useDashboard} from '../../components/DashboardContext/useDashboard';

export function useNewAccountModal() {
	const {
		isNewAccountModalOpen,
		closeNewAccountModal,
	} = useDashboard();

	return {
		isNewAccountModalOpen,
		closeNewAccountModal,
	};
}
