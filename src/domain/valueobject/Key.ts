export class Key {
  private constructor(private key: string) {}

  public static create(process: NodeJS.ProcessEnv): Key {
    const key = process.KEY_SECRET as string;
    this.validate(key);
    return new Key(key);
  }

  private static validate(key: string): void {
    if (!key || key.trim().length === 0) throw new Error('Secret key invalid or not found');
  }

  public getValue(): string {
    return this.key;
  }
}
