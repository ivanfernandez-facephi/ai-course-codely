import { DomainEvent } from './eventBus/DomainEvent';

export abstract class AggregateRoot {
  private readonly domainEvents: DomainEvent[];

  constructor() {
    this.domainEvents = [];
  }

  record(event: DomainEvent): void {
    this.domainEvents.push(event);
  }

  pullDomainEvents(): DomainEvent[] {
    const domainEvents = this.domainEvents.splice(0);
    return domainEvents;
  }

  abstract toPrimitives(): any;
}
