import { baseUrl } from "./base";
export const state = () => ({
        fees:[],
        feesTypes:[],
        unpainFees:[],
        invoice:[],
        salaries:[],
        unpaidSalaries:[],
        lones:[],
        studentBills:null
     });
export const  mutations= { 
        pushData(state,payload){
            state[payload.itemsName].push(payload.data)
        },
        setData(state,payload){
            state[payload.itemsName]=payload.data
        },        
        //general update
        updateItem(state,payload){
            let items=payload.itemsName
            let a=  state[items].find(item=>{
                return item._id== payload.data._id
            });
            let i =state.items.indexOf(a);
            state.items[i]=payload.date;
        },

        feesTypes(state,payload){
            payload.forEach(fees => {
                
            });
        }
     };
     export const    actions= {  
       
        acceptPayment({commit},payload){
            let id=payload._id
            this.$axios
            .$post(`${baseUrl}/api/billing/payment/${id}`, payload.data)
            .then((response) => {
                commit("pushData", {itemsName:"staff",data:response});
            });
        },
        updatePayment({commit},payload){
            let id=payload._id
            this.$axios
            .$post(`${baseUrl}/api/billing/update/${id}`, payload.data)
            .then((response) => {
                //commit("pushData", {itemsName:"staff",data:response});
            });
        },
        deletePayment({dispatch,commit},payload){
            let id=payload._id
            this.$axios
            .$post(`${baseUrl}/api/billing/delete/${id}`, payload.data)
            .then((response) => {
                //commit("pushData", {itemsName:"staff",data:response});
            });
        },

        getFees({commit}, payload) {
            let token = payload;
            this.$axios
             .$get(`${baseUrl}/api/billing/getStudentsBill`, {
                headers: {
                  authtoken: token,
                },
              })
              .then((response) => {
                commit("setData", {itemsName:"fees",data:response});
                commit('feesTypes', response)
              })
          },

        getStudentBills({commit }, id) {
            let token = "payload";
            this.$axios
               .$get(`${baseUrl}api/billing/get/student/${id}`, {
                headers: {
                    authtoken: token,
                },
                })
                .then((response) => {
                commit("setData", {itemsName:"studentBills",data:response});
                })
        },
  
    };
    export const getters= { 
        studentBills(state){
            return state.studentBills
        },
        Fees(state){
            return state.fees;
        },
        feesTypes(state){
            return state.feesTypes;
        },
    }
  
