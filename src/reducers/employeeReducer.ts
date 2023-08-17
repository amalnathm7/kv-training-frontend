import { createReducer } from "@reduxjs/toolkit";
import { addEmployee, deleteEmployee, editEmployee } from "../actions/employeeAction";
import { EmployeeType } from "../types/EmployeeType";

const initialState: EmployeeType[] = [
    // {
    //     "id": "1",
    //     "name": "Daniel Brown",
    //     "role": {
    //         role: "Manager",
    //         permissionLevel: 0
    //     },
    //     "joiningDate": new Date(),
    //     "status": "Active",
    //     "experience": 6,
    //     "department": {
    //         name: "HR",
    //         id: "1"
    //     },
    //     "address": {
    //         id: "1",
    //         addressLine1: "Line 1",
    //         addressLine2: "Line 2",
    //         city: "Kannur",
    //         state: "Kerala",
    //         country: "India",
    //         pincode: "123213"
    //     }
    // },
    // {
    //     "id": "2",
    //     "name": "Daniel Brown",
    //     "role": {
    //         role: "Developer",
    //         permissionLevel: 0
    //     },
    //     "joiningDate": new Date(),
    //     "status": "Inactive",
    //     "experience": 6,
    //     "department": {
    //         name: "Dev",
    //         id: "1"
    //     },
    //     "address": {
    //         id: "1",
    //         addressLine1: "Line 1",
    //         addressLine2: "Line 2",
    //         city: "Kannur",
    //         state: "Kerala",
    //         country: "India",
    //         pincode: "123213"
    //     }
    // },
    // {
    //     "id": "3",
    //     "name": "Daniel Brown",
    //     "role": {
    //         role: "UI/UX",
    //         permissionLevel: 0
    //     },
    //     "joiningDate": new Date(),
    //     "status": "Probation",
    //     "experience": 6,
    //     "department": {
    //         name: "Design",
    //         id: "1"
    //     },
    //     "address": {
    //         id: "1",
    //         addressLine1: "Line 1",
    //         addressLine2: "Line 2",
    //         city: "Kannur",
    //         state: "Kerala",
    //         country: "India",
    //         pincode: "123213"
    //     }
    // },
    // {
    //     "id": "4",
    //     "name": "Daniel Brown",
    //     "role": {
    //         role: "Manager",
    //         permissionLevel: 0
    //     },
    //     "joiningDate": new Date(),
    //     "status": "Active",
    //     "experience": 6,
    //     "department": {
    //         name: "Product",
    //         id: "1"
    //     },
    //     "address": {
    //         id: "1",
    //         addressLine1: "Line 1",
    //         addressLine2: "Line 2",
    //         city: "Kannur",
    //         state: "Kerala",
    //         country: "India",
    //         pincode: "123213"
    //     }
    // }
];

const employeeReducer = createReducer(initialState, (builder) => {
    builder.addCase(addEmployee, (state, action) => {
        state = [...state, action.payload];

        return state;
    });

    builder.addCase(editEmployee, (state, action) => {
        const index = state.findIndex((employee) => employee.id === action.payload.id);

        state[index] = action.payload;

        return state;
    });

    builder.addCase(deleteEmployee, (state, action) => {
        state = state.filter((employee) => employee.id !== action.payload.id);

        return state;
    });
});

export default employeeReducer;
