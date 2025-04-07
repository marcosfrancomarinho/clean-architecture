
export type InputLoginUserDTO = {
  email: string;
  password: string;
};
export type OutputLoginUserDTO = {
  token: string;
};
export interface ILoginUseCase {
  execute(inputLoginUser: InputLoginUserDTO): Promise<OutputLoginUserDTO>;
}
