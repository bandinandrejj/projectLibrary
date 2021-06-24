interface IObjectKeys {
  [key: string]: object | string | boolean | number | null;
}

export interface User extends IObjectKeys {
  userLogin: {value: string, type: string,  meaningLibrarian: string,},
  userPass: {value: string, type: string,  meaningLibrarian: string,},
  userName: {value: string, type: string,  meaningLibrarian: string,},
  userLastName: {value: string, type: string,  meaningLibrarian: string,},
  userPhone: {value: string, type: string,  meaningLibrarian: string,},
  userAdress: {value: string, type: string,  meaningLibrarian: string,},
  userFlag: {value: string, type: string,  meaningLibrarian: string,},
}
