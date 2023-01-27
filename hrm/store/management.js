import { baseUrl } from "./base";
export const state = () => ({
        departments:[],
        staff:[],
        leaves:[],
        company:{},
        attendance:[
            {day:'2022-11-02',act:{in:"8:11:30",out:'17:00:00'}},
            {day:'2022-11-03',act:{in:"8:11:30",out:'17:30:00'}},
            {day:'2022-11-04',act:{in:"8:11:30",out:'17:00:00'}},
            {day:'2022-11-23',act:{in:"8:11:30",out:'17:00:00'}},
            {day:'2022-11-20',act:{in:"8:11:30",out:'17:00:00'}},
            {day:'2022-11-10',act:{in:"8:11:30",out:'17:00:00'}},
            {day:'2022-10-05',act:{in:"8:11:30",out:'16:30:00'}},
            {day:'2022-10-20',act:{in:"8:11:30",out:'17:30:00'}},
            {day:'2022-10-30',act:{in:"10:11:30",out:'16:00:00'}},
            {day:'2022-10-21',act:{in:"8:11:30",out:'17:00:00'}},
            {day:'2022-10-19',act:{in:"8:11:30",out:'17:00:00'}},
            {day:'2022-10-10',act:{in:"9:11:30",out:'18:30:00'}},
            {day:'2022-10-11',act:{in:"8:11:20",out:'17:00:00'}},
            {day:'2022-10-16',act:{in:"8:11:00",out:'17:00:00'}},
        ],
        snackAlert:{
            color:'black',
            text:'',
            value:false
        }
     });
export const  mutations= { 
        pushData(state,payload){
            console.log( state[payload.itemsName])
            state[payload.itemsName].push(payload.data)
        },
        setData(state,payload){
            state[payload.itemsName]=payload.data
        },        
        //general update
        updateItem(state,payload){
            let itemName=payload.itemsName
            let item=  state[itemName].find(item=>{
                return item._id== payload.data._id
            });
            let i =state[itemName].indexOf(item);
            //state[itemName][i]=payload.data;
            state[itemName][i]= Object.assign({}, payload.data)
        },
        removeItem(state,payload){
            let items=payload.itemsName
            let a=  state[items].find(item=>{
                return item._id== payload.data._id
            });
            let i =state[items].indexOf(a);
            state[items].splice(i, 1)
            //this.departments.splice(this.editedIndex, 1)
        },
        setAttendance(state,payload){
            console.log("in attenda======");
            let att =state.attendance.find(at=>{

                return at.day == payload.day
            })
            if(att){
                att.act=payload.act
            }else{
                state.attendance.push(payload)
            }
            console.log(att,payload);
        },
        setSnackAlert(state,payload){
            state.snackAlert=payload
        }
     };
     export const    actions= {  
        setAttendance({commit},payload){
           
            commit("setAttendance",payload);
        },
        setSnackAlert({commit},payload){
            commit("setSnackAlert",payload);
        },
        companySetup({dispatch,commit},payload){
            dispatch('settings/setLoading',{loading:true,message:'Adding Employee'},{root:true})
            this.$axios
            .$post(`${baseUrl}/api/pp/upload`, payload.pp)
            .then((response) => {
               payload.data.logo=response.pp;
               this.$axios
            .$post(`${baseUrl}/api/company/create`, payload.data)
            .then((response) => {
                commit("setData", {itemsName:"company",data:response.data});
                dispatch('settings/setLoading',{loading:false,message:''},{root:true});
                dispatch('settings/setRedirect',true,{root:true});
            });
            });
        },
        getCompany({dispatch,commit}, payload) {
            let token = payload;
            dispatch('settings/setLoading',{loading:true,message:'Getting Staff'},{root:true})
            this.$axios
             .$get(`${baseUrl}/api/company/getCompany`, {
                headers: {
                  authtoken: token,
                },
              })
              .then((response) => {
                commit("setData", {itemsName:"company",data:response[0]});
                dispatch('settings/setLoading',{loading:false,message:''},{root:true});
                
              })
          },
        addDepartment({dispatch, commit},payload){
            dispatch('settings/setLoading',{loading:true,message:'Creating'},{root:true})
            this.$axios
            .$post(`${baseUrl}/api/department/create`, payload)
            .then((res) => {
                commit("pushData",{data:res.data, itemsName:"departments"});
                dispatch('settings/setLoading',{loading:false,message:''},{root:true})
            }).catch(err=>{
                dispatch('settings/setLoading',{loading:false,message:''},{root:true})
                console.log(err)
            })
        },
        updateDepartment({ dispatch, commit},payload){
            dispatch('settings/setLoading',{loading:true,message:'Updating'},{root:true})
            this.$axios
            .$post(`${baseUrl}/api/department/update/${payload._id}`, payload)
            .then((res) => {
                commit("updateItem",{data:res, itemsName:"departments"});
                dispatch('settings/setLoading',{loading:false,message:'Loging In'},{root:true})
            }).catch(err=>{
                console.log(err)
            })
        },
        deleteDepartment({commit},payload){
            this.$axios
            .$post(`${baseUrl}/api/department/delete/${payload._id}`)
            .then((res) => {
                commit("removeItem",{data:{_id:payload}, itemsName:"departments"});
            }).catch(err=>{
                console.log(err)
            })
        },
        
        addStaff({dispatch,commit},payload){
            dispatch('settings/setLoading',{loading:true,message:'Adding Employee'},{root:true})
            this.$axios
            .$post(`${baseUrl}/api/pp/upload`, payload.pp)
            .then((response) => {
               payload.data.pp=response.pp;
               this.$axios
            .$post(`${baseUrl}/api/staff/create`, payload.data)
            .then((response) => {
                commit("pushData", {itemsName:"staff",data:response.data});
                dispatch('settings/setLoading',{loading:false,message:''},{root:true});
                dispatch('settings/setRedirect',true,{root:true});
            });
            });

        },
        updateStaff({dispatch,commit},payload){
            dispatch('settings/setLoading',{loading:true,message:'updating Employee'},{root:true})
            this.$axios
            .$post(`${baseUrl}/api/staff/update`, payload)
            .then((response) => {
               payload.data.pp=response.pp;
               this.$axios
            });

        },
        
 

        getStaff({dispatch,commit}, payload) {
            let token = payload;
            dispatch('settings/setLoading',{loading:true,message:'Getting Staff'},{root:true})
            this.$axios
             .$get(`${baseUrl}/api/staff/getStaff`, {
                headers: {
                  authtoken: token,
                },
              })
              .then((response) => {
                commit("setData", {itemsName:"staff",data:response});
                dispatch('settings/setLoading',{loading:false,message:''},{root:true});
                
              })
          },
           //get single staff by id
        getStaffById({commit }, payload) {
            let token = payload;
            this.$axios
               .$get(`${baseUrl}/api/staff/get/${payload}`, {
                headers: {
                    authtoken: token,
                },
                })
                .then((response) => {
                commit("setData", {itemsName:"st",data:response});
                })
        },
        deleteStaff({commit},payload){
            this.$axios
            .$post(`${baseUrl}/api/staff/delete/${payload}`, payload)
            .then((res) => {
                commit("removeItem",{data:{_id:payload}, itemsName:"staff"});
            }).catch(err=>{
                console.log(err)
            })
        },

        //get department 
        getdepartments({dispatch,commit }, payload) {
            dispatch('settings/setLoading',{loading:true,message:'Getting Departments'},{root:true})
            let token = payload;
            this.$axios
             .$get(`${baseUrl}/api/department/getDepartments`, {
                headers: {
                  authtoken: token,
                },
              })
              .then((response) => {
                commit("setData", {itemsName:"departments",data:response});
                dispatch('settings/setLoading',{loading:false,message:''},{root:true})
              })
        },
        
        requestLeave({dispatch, commit},payload){
            dispatch('settings/setLoading',{loading:true,message:'Requesting'},{root:true})
            this.$axios
            .$post(`${baseUrl}/api/leave/create`, payload)
            .then((res) => {
                commit("pushData",{data:res.data, itemsName:"leaves"});
                dispatch('settings/setLoading',{loading:false,message:''},{root:true});
                dispatch('settings/setRedirect',true,{root:true});
            }).catch(err=>{
                console.log(err)
            })
        },
        getLeaves({dispatch,commit }, payload) {
            dispatch('settings/setLoading',{loading:true,message:'Getting Leave Requests'},{root:true})
            let token = payload;
            this.$axios
             .$get(`${baseUrl}/api/leave/getLeaves`, {
                headers: {
                  authtoken: token,
                },
              })
              .then((response) => {
                commit("setData", {itemsName:"leaves",data:response});
                dispatch('settings/setLoading',{loading:false,message:''},{root:true})
              })
        },
        updateLeave({ dispatch, commit},payload){
            dispatch('settings/setLoading',{loading:true,message:'Updating'},{root:true})
            this.$axios
            .$post(`${baseUrl}/api/leave/update/${payload._id}`, payload)
            .then((res) => {
                commit("updateItem",{data:res, itemsName:"leaves"});
                dispatch('settings/setLoading',{loading:false,message:'Loging In'},{root:true})
            }).catch(err=>{
                console.log(err)
            })
        },


        //lone requests 
        requestLone({dispatch, commit},payload){
            dispatch('settings/setLoading',{loading:true,message:'Requesting'},{root:true})
            this.$axios
            .$post(`${baseUrl}/api/lonerequest/request`, payload)
            .then((res) => {
                commit("pushData",{data:res.data, itemsName:"leaves"});
                dispatch('settings/setLoading',{loading:false,message:''},{root:true});
                dispatch('settings/setRedirect',true,{root:true});
            }).catch(err=>{
                console.log(err)
            })
        },
       
    };
    export const getters= { 

        getDepartments(state){
            return state.departments;
        },  
        getStaff(state){
            return state.staff;
        },
        
        getStaffById:(state) => (id) => {
           
            return state.staff.find((st) => st._id === id);
        },
        baseUrl(){
            return baseUrl
        },
        getLeaves(state){
            return state.leaves
        },
        getLeavesById:(state) => (id) => {
            let l= state.leaves.filter((le) => le.requestedBy._id == id);
            return l
        },
        getCompany(state){
            return state.company
        },
        getAttendance(state){
            return state.attendance;
        },
        dates(state){
            console.log("jhjlll")
            let d=[]
             state.attendance.forEach(data => {
                d.push(data.day)
            });
            return d
        },
        times(state){
            console.log("jhjlll")
            let d=[]
             state.attendance.forEach(data => {
                d.push(data.act)
            });
            return d
        },
        snackAlert(state){
            return state.snackAlert;
        },
    }
  
