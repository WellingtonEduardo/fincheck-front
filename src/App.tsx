import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {Router} from './Router';
import {Toaster} from 'react-hot-toast';

const queryClient = new QueryClient();

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>

			<Toaster />

			<Router />

		</QueryClientProvider>
	);
}

