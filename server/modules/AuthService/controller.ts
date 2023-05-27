import { AuthApiSignInData, AuthApiSignUpData } from "../../../shared/auth/api";
import { BaseEventHandler } from "../../../shared/BaseEvents/BaseEventHandler";
import { AuthSessionHandler } from "./AuthSessionHandler";

BaseEventHandler.get('auth:signIn').addHandler((player: PlayerMp, jsonData: string) => {
    const authSession = AuthSessionHandler.get(player);

    if(!authSession) {
        return;
    }

    const data: AuthApiSignInData = JSON.parse(jsonData);
    authSession.onPlayerTryLogin(data.username, data.password);
}, 1);

BaseEventHandler.get('auth:signUp').addHandler((player: PlayerMp, jsonData: string) => {
    const authSession = AuthSessionHandler.get(player);

    if(!authSession) {
        return;
    }

    const data: AuthApiSignUpData = JSON.parse(jsonData);
    authSession.onPlayerTryRegister(data.username, data.password, data.email, data.promocode);
}, 1);

BaseEventHandler.get('playerQuit').addHandler((player: PlayerMp) => {
    const authSession = AuthSessionHandler.get(player);

    if(authSession) {
        AuthSessionHandler.remove(authSession);
    }
}, 0);