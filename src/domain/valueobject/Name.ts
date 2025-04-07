export class Name {
  private constructor(private name: string) {}

  public static create(name: string): Name {
    this.validate(name);
    return new Name(name);
  }

  private static validate(name: string): void {
    const regex: RegExp = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?: [A-Za-zÀ-ÖØ-öø-ÿ]+)*$/;
    const checking: boolean = regex.test(name.trim());
    if (!checking) throw new Error('invalid name');
  }
  public getValue(): string {
    return this.name;
  }
}
