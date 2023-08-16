import DispatchConstants from "../constants/dispatchConstants";
import { EmployeeType } from "../types/EmployeeType";
import { createAction } from "@reduxjs/toolkit";

const addEmployee = createAction<EmployeeType>(DispatchConstants.createEmployee);
const editEmployee = createAction<EmployeeType>(DispatchConstants.editEmployee);
const deleteEmployee = createAction<{ id: string }>(DispatchConstants.deleteEmployee);

export { addEmployee, editEmployee, deleteEmployee };
