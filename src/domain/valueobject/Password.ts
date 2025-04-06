export type IConstraints = { type: string; regex: RegExp; message: string };

export class Password {
  private constructor(private password: string) {}

  public static create(password: string): Password {
    this.validate(password);
    return new Password(password);
  }

  private static validate(password: string): void {
    const constraints: IConstraints[] = [
      { type: 'size', regex: /^\S{8,}$/, message: 'password must contain 8 characters' },
      { type: 'alfa', regex: /[a-zA-Z]/, message: 'password must contain letters' },
      { type: 'number', regex: /\d/, message: 'password must contain numbers' },
      { type: 'uppercase', regex: /[A-Z]/, message: 'password must contain at least one capital letter' },
      { type: 'symbol', regex: /[\W_]/, message: 'password must contain at least one symbol' },
    ];
    for (const { type, regex, message } of constraints) {
      if (!regex.test(password.trim())) throw new Error(`/password ${type}/ ${message}`);
    }
  }
  public get value(): string {
    return this.password;
  }
}
