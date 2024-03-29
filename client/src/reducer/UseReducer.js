const storedUser=localStorage.getItem("user");
export const initialState=storedUser?JSON.parse(storedUser): { user: null, role: null };


export const reducer=(state,action)=>{
    switch(action.type){
    case "USER":
        localStorage.setItem("user",JSON.stringify(action.payload));
        return { ...state, user: action.payload.user, role: action.payload.role };
        // return action.payload;
        case "ADD_HELPER_ID":
            localStorage.setItem("user", JSON.stringify({ ...state, helperId: action.payload.helperId }));
            return { ...state, helperId: action.payload.helperId }; 
        case "ADD_USER_ID":
            localStorage.setItem("user", JSON.stringify({ ...state, userId: action.payload.userId }));
            return { ...state, userId: action.payload.userId };     
    default:
    return state;

    }

   


}