export class Token {
  private constructor(private token: string) {}

  public static create(token: string): Token {
    this.validate(token);
    return new Token(token);
  }
  private static validate(token: string): void {
    if (!token || token.trim().length === 0) throw new Error('Invalid token');
  }
  public getValue(): string {
    return this.token;
  }
}
