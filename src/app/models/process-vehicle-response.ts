export class VehicleResponse {

    VehicleId! : number;

    ReturnCode! : VehicleValidationResultCode;

    TextCode! : string;
}

export enum VehicleValidationResultCode {
 
    NotSpecified ,
    Invalid ,
    Valid 
}
