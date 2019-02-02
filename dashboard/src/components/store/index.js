import {createStore} from 'redux'
import blue from "@material-ui/core/colors/blue";
//import {connectToMongo} from "../../mongoDB/User";

//var mongo = connectToMongo()

const initialState = {
    columnFilterOption: [
        { label: 'AvgPx<6>', value: 'AvgPx'},
        { label: 'BeginString<8>', value: 'BeginString'},
        { label: 'BodyLength<9>', value: 'BodyLength'},
        { label: 'CheckSum<10>', value: 'CheckSum'},
        { label: 'ClOrdID<11>', value: 'ClOrdID'},
        { label: 'CumQty<14>', value: 'CumQty'},
        { label: 'ExecID<17>', value: 'ExecID'},
        { label: 'ExecTransType<20>', value: 'ExecTransType'},
        { label: 'HandlInst<21>', value: 'HandlInst'},
        { label: 'IDSource<22>', value: 'IDSource'},
        { label: 'LastPx<31>', value: 'LastPx'},
        { label: 'LastShares<32>', value: 'LastShares'},
        { label: 'MsgSeqNum<34>', value: 'MsgSeqNum'},
        { label: 'MsgType<35>', value: 'MsgType'},
        { label: 'OrderID<37>', value: 'OrderID'},
        { label: 'OrderQty<38>', value: 'OrderQty'},
        { label: 'OrdStatus<39>', value: 'OrdStatus'},
        { label: 'OrdType<40>', value: 'OrdType'},
        { label: 'PossDupFlag<43>', value: 'PossDupFlag'},
        { label: 'Rule80A(aka OrderCapacity)<47>', value: 'Rule80A(aka OrderCapacity)'},
        { label: 'SecurityID<48>', value: 'SecurityID'},
        { label: 'SenderCompID<49>', value: 'SenderCompID'},
        { label: 'SenderSubID<50>', value: 'SenderSubID'},
        { label: 'SendingTime<52>', value: 'SendingTime'},
        { label: 'Side<54>', value: 'Side'},
        { label: 'Symbol<55>', value: 'Symbol'},
        { label: 'TargetCompID<56>', value: 'TargetCompID'},
        { label: 'TargetSubID<57>', value: 'TargetSubID'},
        { label: 'TimeInForce<59>', value: 'TimeInForce'},
        { label: 'TransactTime<60>', value: 'TransactTime'},
        { label: 'PossResend<97>', value: 'PossResend'},
        { label: 'ExDestination<100>', value: 'ExDestination'},
        { label: 'ClientID<109>', value: 'ClientID'},
        { label: 'OrigSendingTime<122>', value: 'OrigSendingTime'},
        { label: 'TargetLocationID<143>', value: 'TargetLocationID'},
        { label: 'ExecType<150>', value: 'ExecType'},
        { label: 'LeavesQty<151>', value: 'LeavesQty'},
        { label: 'NumDaysInterest<157>', value: 'NumDaysInterest'},
        { label: 'SecondaryOrderID<198>', value: 'SecondaryOrderID'},
        { label: 'Unknown<526>', value: 'Unknown'},
        { label: 'Unknown<5020>', value: 'Unknown'},
        { label: 'Unknown<5180>', value: 'Unknown'},
        { label: 'Unknown<9800>', value: 'Unknown'},
        { label: 'Unknown<9801>', value: 'Unknown'},
        { label: 'Unknown<12062>', value: 'Unknown'},
        { label: 'Unknown<15000>', value: 'Unknown'}
    ],
    columnFilterObject: [],
    columnFilter: [],
    darkTheme: true,
    palette: { // color theme of the dashboard
        primary: {
            main: '#e60000',
        },
        secondary: blue,
    },
    logColor: { // manage the color of logs in different type and different theme
        darkProxy: '#e57373',
        darkEvent: '#4fc3f7',
        darkGateway: '#81c784',
        lightProxy: '#673ab7',
        lightEvent: '#03a9f4',
        lightGateway: '#ff9800',
    },
    resultLog: [], // array of log objects to be displayed in result table
    isLoggedIn: true, // the holder of whether the user have logged in
    isAdmin: true, // the boolean value holding whether the user is admin
    snackMessage: null, // message to be shown in snack bar
    snackMessagePopUp: false, // flag to indicate the pop up of snack bar
};

const reducer = (state = initialState, action) => {
    // console.log(action.type);
    switch(action.type){
        case 'CHANGE_LOGCOLOR':
            // console.log('enter CHANGE_LOGCOLOR');
            let _logColor = state.logColor;
            let _colorType = action.payload.logType;
            _colorType = _colorType.charAt(0).toUpperCase() + _colorType.slice(1);
            _logColor[(state.darkTheme ? 'dark' : 'light') + _colorType] = action.payload.colorHex;
            // console.log((state.darkTheme ? 'dark' : 'light') + _colorType)
            return Object.assign({}, state, {logColor: _logColor});
        case 'TOGGLE_DARKTHEME':
            // console.log('enter TOGGLE_DARKTHEME')
            return Object.assign({}, state, {darkTheme: !state.darkTheme});
        case 'ADD_COLUMNFILTER':
            // console.log('enter ADD_COLUMNFILTER')
            let _columnFilter = state.columnFilter;
            let _columnFilterObject = state.columnFilterObject;
            if (!_columnFilter.includes(action.payload.columnFilter)) {
                let _addColumnFilterObject = state.columnFilterOption.filter(x => x.value === action.payload.columnFilter);
                if (_addColumnFilterObject.length === 0)
                    _columnFilterObject.push({label: action.payload.columnFilter, value: action.payload.columnFilter});
                else
                    _columnFilterObject.push(_addColumnFilterObject[0]);
                _columnFilter.push(action.payload.columnFilter);
                return Object.assign({}, state, {columnFilter: _columnFilter, columnFilterObject: _columnFilterObject})
            }
            return state;
        case 'TRACE_ORDER':
            // console.log('enter TRACE_ORDER')
            return Object.assign({}, state, {resultLog: [...new Set(action.payload.resultLog)]});
        case 'UPDATE_SEARCH':
            // console.log('enter UPDATE_SEARCH')
            return Object.assign({}, state, {resultLog: action.payload.resultLog});
        case 'UPDATE_COLUMNFILTEROBJECT':
            // console.log('enter UPDATE_COLUMNFILTEROBJECT')
            _columnFilter = [];
            // console.log(action.payload.columnFilterObject);
            for(let i = 0; i < action.payload.columnFilterObject.length; i++)
                _columnFilter.push(action.payload.columnFilterObject[i].value)
            return Object.assign({}, state, {
                columnFilterObject: action.payload.columnFilterObject,
                columnFilter: _columnFilter
            });
        case 'POPUP_SNACKBAR':
            // console.log('POPUP_SNACKBAR')
            return Object.assign({}, state, {snackMessage: action.payload.snackMessage, snackMessagePopUp: true});
        case 'CLOSE_SNACKBAR':
            // console.log('CLOSE_SNACKBAR')
            return Object.assign({}, state, {snackMessage: null, snackMessagePopUp: false});
        default:
            return state
    }
};

// window redux debug tool
const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store
