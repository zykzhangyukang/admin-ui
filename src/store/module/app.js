export default {
    namespaced: true,
    state: {
        menuToggle: false,
        const: [],
    },
    getters: {},
    mutations: {
        setAppMenuToggle(state , toggle) {
            state.menuToggle = toggle;
        },
        setConstList(state , list){
            Object.keys(list).forEach(key => {
                state.const[key] = list[key]
            });
        },
    },
    actions: {
    }
}
