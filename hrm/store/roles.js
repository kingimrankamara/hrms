export const state = () => ({
    roles: [
      "Staff", 
      "Bursear", 
      "Admin","Principal",
      "Teacher","Registerer",
      "HR","Tech Support"],
  })
  
  export const getters = {
    getRoles(state){
      return state.roles;
    }
  }