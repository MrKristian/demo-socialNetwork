const ADD_MESSAGE = 'ADD-MESSAGE';

let initialState = {
    dialogData:[
        {name:'Marian', id:1},
        {name:'Ostap', id:2},
        {name:'Bodya', id:3}
    ],
    messageData:[
        {message: 'Hi', id:1},
        {message: 'fsd', id:2},
        {message: 'ss', id:3}
    ]
};
const dialogsReducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_MESSAGE:
            const messageText= action.newMessageBody;
            return{
                ...state,
                messageData:[...state.messageData, {message: messageText}]
            };
        default:
            return state;
    };
};

export const addMessage = (newMessageBody) => ({ type: ADD_MESSAGE, newMessageBody });

export default dialogsReducer;