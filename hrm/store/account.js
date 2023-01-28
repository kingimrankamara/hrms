import { baseUrl } from "./base";
let userType 
export const state = () => ({
    user:null,
    authToken:null,
    isStudent:false,
    isStaff:false,
    isParent:false,
    
});
export const  mutations= { 
    setAuthToken(state, payload){
        state.authToken=payload;
        if(userType=='student'){
            state.isStudent=true;
            let authToken={
                token:payload,
                userType:'student'
            }
            authToken =JSON.stringify(authToken)
            window.localStorage.setItem("authToken", authToken);
        }
        else if(userType=='staff'){
            state.isStaff=true;
            let authToken={
                token:payload,
                userType:'staff'
            }
            authToken =JSON.stringify(authToken)
            window.localStorage.setItem("authToken", authToken);
        }else{
            state.isParent=true; 
            let authToken={
                token:payload,
                userType:'parent'
            }
            authToken =JSON.stringify(authToken)
            window.localStorage.setItem("authToken", authToken);
        }
    },
    setUser(state, payload){
        state.user=payload;
    }
};
export const   actions= {  
    
    staffLogin({dispatch, commit},payload){
        dispatch('settings/setLoading',{loading:true,message:'Loging In'},{root:true})

        this.$axios.$post(`${baseUrl}/api/auth/staff/login`, payload)
        .then((res) => {
            commit("setAuthToken",res);
            userType='staff';
            dispatch("getUser",res)
            dispatch('settings/setLoading',{loading:false,message:''},{root:true})
        }).catch(res=>{
            dispatch('settings/setLoading',{loading:false,message:'Authenticating'},{root:true});
            let message =err.response.data.message;
            dispatch('management/setSnackAlert',{value:true,text:message,color:'error'},{root:true});
        })
    },

   
    logout({dispatch, commit}){
        window.localStorage.removeItem("authToken");
        commit("setAuthToken", null);
        commit("setUser", null);
    },

    //verify local store token
    verifyToken({ dispatch, commit }, payload){
        userType=payload.userType;
        dispatch("getUser",payload.token)
    },

    //forget password #### request code
    requestCode({dispatch, commit},payload){
        dispatch('settings/setLoading',{loading:true,message:'Loging In'},{root:true})

        this.$axios.$post(`${baseUrl}/api/resetpassword`, payload)
        .then((res) => {
            dispatch('settings/setLoading',{loading:false,message:''},{root:true})
            window.localStorage.setItem("staffId", payload.staffId);
            dispatch('settings/setRedirect',true,{root:true});
        }).catch(err=>{
            dispatch('settings/setLoading',{loading:false,message:'Authenticating'},{root:true});
            let message =err.response.data.message;
            dispatch('management/setSnackAlert',{value:true,text:message,color:'error'},{root:true});
        })
    },
    verifyCode({dispatch, commit},payload){
        dispatch('settings/setLoading',{loading:true,message:'Loging In'},{root:true})

        this.$axios.$post(`${baseUrl}/api/resetpassword/verifyCode`, payload)
        .then((res) => {
            dispatch('settings/setLoading',{loading:false,message:''},{root:true});
            
            // set passAuth
            window.localStorage.setItem("passAuth", res);
            dispatch('settings/setRedirect',true,{root:true});
        }).catch(err=>{
            dispatch('settings/setLoading',{loading:false,message:'Authenticating'},{root:true});
            let message =err.response.data.message;
            dispatch('management/setSnackAlert',{value:true,text:message,color:'error'},{root:true});
        })
    },
    newPassword({dispatch, commit},payload){
        dispatch('settings/setLoading',{loading:true,message:'Loging In'},{root:true})
        let authtoken= window.localStorage.getItem('passAuth')
        this.$axios.$post(`${baseUrl}/api/resetpassword/newPassword`, payload,
        {
            headers: {
                authtoken,
            },
        })
        .then((res) => {
            dispatch('settings/setLoading',{loading:false,message:''},{root:true});
            dispatch('settings/setRedirect',true,{root:true});
            $nuxt.$router.push('/login');
        }).catch(err=>{
            dispatch('settings/setLoading',{loading:false,message:'Authenticating'},{root:true});
            let message =err.response.data.message || 'error';
            dispatch('management/setSnackAlert',{value:true,text:message,color:'error'},{root:true});
        })
    },


    //attendance /clock-in/clock-out
    clockIn({dispatch, commit,state},payload){
        dispatch('settings/setLoading',{loading:true,message:'Loging In'},{root:true})
        let authtoken= state.authToken
        this.$axios.$post(`${baseUrl}/api/attendance/checkin`,{staffId:{_id:payload._id}},
        {
            headers: {
                authtoken,
            },
        })
        .then((res) => {
            dispatch('settings/setLoading',{loading:false,message:'Clocking in'},{root:true});
        }).catch(err=>{
            dispatch('settings/setLoading',{loading:false,message:''},{root:true});
            let message =err.response.data.message || 'error';
            dispatch('management/setSnackAlert',{value:true,text:message,color:'error'},{root:true});
        })
    },
    //get user 
    getUser({ dispatch, commit }, payload) {
        let token = payload;
        dispatch('settings/setLoading',{loading:true,message:'Authenticating'},{root:true})
        this.$axios
            .$get(`${baseUrl}/api/${userType}/verify`,{
            headers: {
                authtoken: token,
            },
            })
            .then((response) => {
            commit("setAuthToken", token);
            commit("setUser", response);
            dispatch('settings/setLoading',{loading:false,message:''},{root:true})
            if(userType=='staff'){

                dispatch('management/getCompany',token,{root:true});
                dispatch('management/getdepartments',token,{root:true});
                dispatch('management/getStaff',token,{root:true});
                dispatch('management/getLeaves',token,{root:true});
                
                dispatch('accounting/getFees',token,{root:true});
            }
            })
            .catch((error) => {
            // commit("setLoading", false);
            dispatch('settings/setLoading',{loading:false,message:'Authenticating'},{root:true});
            $nuxt.$router.push('/login');
            });
        },
};
export const getters= { 
    getUser(state){
        return state.user;
    },
    getAuthToken(state){
        return state.authToken;
    },  
    
    isAdmin(state){
        return state.isAdmin
    },
    }
  
