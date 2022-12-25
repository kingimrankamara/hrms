import { baseUrl } from "./base";

export const state = () => ({
        levels:[],
        programs:[],
        loading:{
            loading:false,
            message:""
        },
        redirect:false,
     });
 
export const mutations= { 
       
      
        setLoading(state, payload){
            state.loading=payload;
        },
        setRedirect(state, payload){
            state.redirect=payload;
        },
        
     };

export const actions= { 

    setLoading({commit},payload){
       commit("setLoading",payload)
    },
    setRedirect({commit},payload){
        commit("setRedirect",payload)
    }
  
   

  
    };
export const  getters= { 
    loading(state){
        return state.loading;
    },
    getRedirect(state){
        return state.redirect
    }
}
  
