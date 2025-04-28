export class Question {
  constructor(
    public id: string,
    public text: string,
    public type: number,
    public expectedAnswer: string,
    public mandatory: boolean
  ) {}

  static fromJson(json: any): Question {
    return new Question(
      json?.id ?? '',
      json?.text ?? '',
      json?.type ?? 0,
      json?.expectedAnswer ?? '',
      json?.mandatory ?? false
    );
  }

  toJson(): any {
    return {
      id: this.id,
      text: this.text,
      type: this.type,
      expectedAnswer: this.expectedAnswer,
      mandatory: this.mandatory
    };
  }
    
  }

  