export class Transaction {
    amount: {
      currency: string;
      details: {
        subtotal: string;
        shipping: string;
        shipping_discount: string;
      };
      total: string;
    };
    description: string;
    relatedResources: any;
  
    constructor(data: any) {
      this.amount = data.amount;
      this.description = data.description;
      this.relatedResources = data.related_resources;
    }
  
    static fromJson(json: any): Transaction {
      return new Transaction({
        amount: json?.amount ?? {},
        description: json?.description ?? '',
        related_resources: json?.relatedResources ?? null
      });
    }
  
    toJson(): any {
      return {
        amount: this.amount,
        description: this.description,
        relatedResources: this.relatedResources
      };
    }
  }
  