export interface IAlert {
    id?: string;
    entity: string;
    entityCategory: string;
    entityid: string;
    eventCategory: string;
    message: string;
    timestamp: string;
  }

export interface IAlertWithIcon {
  id?: string;
  entity: string;
  entityCategory: string;
  entityid: string;
  eventCategory: string;
  message: string;
  timestamp: string;
  icon: string;
}
