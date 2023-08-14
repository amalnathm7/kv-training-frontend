import DispatchConstants from "../constants/dispatch";

const initialState = [
    {
        "id": "1",
        "name": "Daniel Brown",
        "role": {
            role: "Manager",
            permissionLevel: 0
        },
        "joiningDate": new Date(),
        "status": "Active",
        "experience": 6,
        "department": {
            name: "HR",
            id: "1"
        },
        "address": {
            id: "1",
            addressLine1: "Line 1",
            addressLine2: "Line 2",
            city: "Kannur",
            state: "Kerala",
            country: "India",
            pincode: "123213"
        }
    },
    {
        "id": "2",
        "name": "Daniel Brown",
        "role": {
            role: "Developer",
            permissionLevel: 0
        },
        "joiningDate": new Date(),
        "status": "Inactive",
        "experience": 6,
        "department": {
            name: "Dev",
            id: "1"
        },
        "address": {
            id: "1",
            addressLine1: "Line 1",
            addressLine2: "Line 2",
            city: "Kannur",
            state: "Kerala",
            country: "India",
            pincode: "123213"
        }
    },
    {
        "id": "3",
        "name": "Daniel Brown",
        "role": {
            role: "UI/UX",
            permissionLevel: 0
        },
        "joiningDate": new Date(),
        "status": "Probation",
        "experience": 6,
        "department": {
            name: "Design",
            id: "1"
        },
        "address": {
            id: "1",
            addressLine1: "Line 1",
            addressLine2: "Line 2",
            city: "Kannur",
            state: "Kerala",
            country: "India",
            pincode: "123213"
        }
    },
    {
        "id": "4",
        "name": "Daniel Brown",
        "role": {
            role: "Manager",
            permissionLevel: 0
        },
        "joiningDate": new Date(),
        "status": "Active",
        "experience": 6,
        "department": {
            name: "Product",
            id: "1"
        },
        "address": {
            id: "1",
            addressLine1: "Line 1",
            addressLine2: "Line 2",
            city: "Kannur",
            state: "Kerala",
            country: "India",
            pincode: "123213"
        }
    }
];

const employeeReducer = (state = initialState, action) => {
    let newState;
    let index;

    switch (action.type) {
        case DispatchConstants.createEmployee:
            newState = [...state, action.payload];
            break;
        case DispatchConstants.editEmployee:
            index = state.findIndex((employee) => employee.id === action.payload.id);
            state[index] = action.payload;
            newState = state;
            break;
        case DispatchConstants.deleteEmployee:
            newState = state.filter((employee) => employee.id !== action.payload.id);
            break;
        default:
            newState = state;
    }

    return newState;
};

export default employeeReducer;
