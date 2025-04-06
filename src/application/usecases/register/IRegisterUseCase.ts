export type InputRegisterUserDTO = {
  name: string;
  email: string;
  password: string;
};
export type OutputRegisterUserDTO = {
  id: number;
};

export interface IRegisterUseCase {
  execute(inputRegisterUser: InputRegisterUserDTO): Promise<OutputRegisterUserDTO>;
}
