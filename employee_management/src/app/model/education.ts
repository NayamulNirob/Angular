import { Employee } from "./employee";

export class Education {
    educationId!:number;
    educationName!:string;
    educationDescription!:string;
    passingYear!:number;

    employee: Employee[] = [];

}
