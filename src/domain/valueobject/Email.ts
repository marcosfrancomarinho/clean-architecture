export class Email {
  private constructor(private email: string) {}

  public static create(email: string): Email {
    this.validate(email);
    return new Email(email);
  }

  private static validate(email: string): void {
    const regex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const checking: boolean = regex.test(email.trim());
    if (!checking) throw new Error('invalid email');
  }

  public get value(): string {
    return this.email;
  }
}
