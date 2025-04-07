export class UserId {
  private constructor(private id: number) {}

  public static create(id: number): UserId {
    this.validate(id);
    return new UserId(id);
  }

  private static validate(id: number) {
    if (!id || isNaN(id)) throw new Error('invalid id');
  }
  public getValue(): number {
    return this.id;
  }
}
