import React, {useEffect} from 'react';
import './styles.sass'
import {useAppSelector} from "../../hooks/redux";
import DisclaimerPage from "./pages/DislaimerPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import PasswordRecoveryPage from "./pages/PasswordRecoveryPage";
import {sendNotify} from "../../utils/notify";
import {NotificationPositions, NotificationTypes} from "../../../../shared/notifications/types";

const Auth: React.FC = () => {
	const {isOpen} = useAppSelector(state => state.auth)

	const sendErrorNotify = (text: string) => {
		sendNotify({
			type: NotificationTypes.Error,
			text,
			position: NotificationPositions.TopLeft,
			duration: 3,
		})
	}

	useEffect(() => {
		if(isOpen) {
			// @ts-ignore
			window.soundSystem.playSound({file: 'auth/bg', volume: .1, loop: true})
		} else {
			// @ts-ignore
			window.soundSystem.stopSound('auth/bg')
		}
	}, [isOpen])

	useEffect(() => {
		// setTimeout(() => {
		// 	dispatch(authActions.show({ disclaimerDuration: 5 }))
		// }, 1000)
		// -----------------
		// setTimeout(() => {
		// 	dispatch(authActions.show({ disclaimerDuration: 0 }))
		// 	setTimeout(() => {
		// 		dispatch(authActions.setPage(PageIds.PasswordRecovery))
		// 	}, 100)
		// }, 100)
	}, [])

	return (
		<div className='Auth'>
			<SignInPage sendErrorNotify={sendErrorNotify}/>
			<SignUpPage sendErrorNotify={sendErrorNotify}/>
			<PasswordRecoveryPage sendErrorNotify={sendErrorNotify}/>
			<DisclaimerPage/>
		</div>
	);
};

export default Auth;
