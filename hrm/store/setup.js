import { baseUrl } from "./base";
export const state = () => ({
        institution:null,
        schools:[],
        classes:[],
        rooms:[],
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
        }
     };
     export const    actions= {  
        initInstitution({commit},payload){
            this.$axios
            .$post(`${baseUrl}/api/institution/create`, payload)
            .then((res) => {
                commit("pushTodepartment",res.data);
            }).catch(err=>{
                console.log(err)
            })
        },
        updateInstitution({commit},payload){
            this.$axios
            .$post(`${baseUrl}/api/institution/update/${payload._id}`, payload)
            .then((res) => {
                commit("updateItem",{data:payload, itemNmae:"Institution"});
            }).catch(err=>{
                console.log(err)
            })
        },
        
        addSchools({commit},payload){
            this.$axios
            .$post(`${baseUrl}/api/schools/create`, payload)
            .then((response) => {
                commit("pushData", {itemsName:"staff",data:response});
            });
        },

        addRooms({commit},payload){
            this.$axios
            .$post(`${baseUrl}/api/rooms/create`, payload)
            .then((response) => {
                commit("pushData", {itemsName:"students",data:response});
              
            }).catch(err=>{
                console.log(err)
            })
        },

        //subjects
        addClasses({commit},payload){
            this.$axios
            .$post(`${baseUrl}/api/classes/create`, payload)
            .then((response) => {
                commit("pushData", {itemsName:"subjects",data:response});
              
            }).catch(err=>{
                console.log(err)
            })
        },

       

        getSchools({commit }, payload) {
            let token = payload;
            this.$axios
             .$get(`${baseUrl}/api/staff/getStaff`, {
                headers: {
                  authtoken: token,
                },
              })
              .then((response) => {
                commit("setData", {itemsName:"staff",data:response});
              })
          },
       
        //get department 
        getInstitution({commit }, payload) {
            let token = payload;
            this.$axios
             .$get(`${baseUrl}/api/department/getDepartments`, {
                headers: {
                  authtoken: token,
                },
              })
              .then((response) => {
                commit("setData", {itemsName:"Institution",data:response});
              })
          },

          //subjects
          getSubjects({commit }, payload) {
            let token = payload;
            this.$axios
             .$get(`${baseUrl}/api/subject/getSubjects`, {
                headers: {
                  authtoken: token,
                },
              })
              .then((response) => {
                commit("setData", {itemsName:"subjects",data:response});
              })
          },

          //get students 
        getStudents({commit }, payload) {
            let token = payload;
            this.$axios
             .$get(`${baseUrl}/api/student/getStudents`, {
                headers: {
                  authtoken: token,
                },
              })
              .then((response) => {
                commit("setData", {itemsName:"students",data:response});
              })
          },
        //get single student
        getStudent({commit }, payload) {
        let token = payload;
        this.$axios
            .$get(`${baseUrl}/api/student/get/${payload}`, {
            headers: {
                authtoken: token,
            },
            })
            .then((response) => {
            commit("setData", {itemsName:"student",data:response});
            })
        },
    };
    export const getters= { 
        getStudents(state){
            return state.students;
        },
        getStudent(state){
            return state.student;
        },
        getDepartments(state){
            return state.Institution;
        },  
        getStaff(state){
            return state.staff;
        },
        getSubject(state){
            return state.subject;
        },
        getStaffById(state){
            return state.st
        }
    }
  
