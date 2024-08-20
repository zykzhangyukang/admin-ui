export default {
    namespaced: true,
    state: {
        token:'',
        info: {}
    },
    getters: {},
    mutations: {
        setUserToken(state, token){
            if(token){
                state.token = token;
            }else{
                state.token = ''
            }
            localStorage.setItem("token", state.token);
        },
        setUserInfo(state, info) {
            if(info){
                state.info = info;
            }else{
                state.info = {}
            }
        },
    },
    actions: {
    }
}
