import {ChevronLeftIcon, ChevronRightIcon} from '@radix-ui/react-icons';
import 'swiper/css';

import {Swiper, SwiperSlide} from 'swiper/react';

import {EyeIcon} from '../../../components/icons/EyeIcon';
import {AccountCard} from './AccountCard';
import {AccountsSliderNavigation} from './AccountsSliderNavigation';

export function Accounts() {
	return (
		<div className='bg-teal-900 rounded-2xl w-full h-full px-4 py-8 md:p-10 flex flex-col'>

			<div>
				<span className='tracking-[-0.5px] text-white block'>
          Saldo total
				</span>

				<div className='flex items-center gap-2'>
					<strong className='text-2xl tracking-[-1px] text-white'>
            R$ 1000,00
					</strong>

					<button>
						<EyeIcon open />
					</button>
				</div>
			</div>

			<div className='flex-1 flex flex-col justify-end'>
				<div>
					<Swiper
						spaceBetween={16}
						slidesPerView={2.1}
					>
						<div className='flex items-center justify-between mb-4' slot='container-start'>
							<strong className='text-white tracking-[-1px] text-lg font-bold'>
                Minhas contas
							</strong>

							<AccountsSliderNavigation/>
						</div>

						<SwiperSlide>
							<AccountCard
								color='#7950F2'
								name='Nubank'
								balance={1230.23}
								type='CASH'
							/>
						</SwiperSlide>

						<SwiperSlide>
							<AccountCard
								color='#7950F2'
								name='Nubank'
								balance={1230.23}
								type='CASH'
							/>
						</SwiperSlide>

						<SwiperSlide>
							<AccountCard
								color='#7950F2'
								name='Nubank'
								balance={1230.23}
								type='CASH'
							/>
						</SwiperSlide>
					</Swiper>
				</div>
			</div>

		</div >
	);
}
