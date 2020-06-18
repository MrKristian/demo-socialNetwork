import prosileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarRecurser from "./sidebar-reducer";

let store = {
    _callSubscriber(){},
    _state:{
        profile:{
            posts:[
                {nick:'Adam', post:'Ok', likecount:2},
                {nick:'Oscar', post:'Enjou', likecount:5}
            ],
            newPostText:'it'
    
        },
        dialog:{
            dialogData:[
                {name:'Marian', id:1},
                {name:'Ostap', id:2},
                {name:'Bodya', id:3}
            ],
            messageData:[
                {message: 'Hi', id:1},
                {message:'fsd', id:2},
                {message:'ss', id:3}
            ],
            newMessageText:''
        },
        sidebarItems:{
            friends:[
                {id:1, name:'Ostap'},
                {id:2, name:'Bodya'},
                {id:3, name:'Dima'}
            ]
        }
    },
    getState(){
        return this._state;
    },
    subscribe(observer){
        this._callSubscriber = observer;
    },
    dispatch(action){

        this._state.profile = prosileReducer(this._state.profile, action);
        this._state.dialog = dialogsReducer(this._state.dialog, action);
        this._state.sidebarItems = sidebarRecurser(this._state.sidebarItems, action);

        this._callSubscriber(this._state);

    }
};

export default store;