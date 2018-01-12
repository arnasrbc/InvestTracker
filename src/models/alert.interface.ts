export interface IAlert {
    id?: string;
    entityName: string;
    entityCategory: string;
    entityId: string;
    eventCategory: string;
    message: string;
    timestamp: string;
  }

export interface IAlertWithIcon {
  id?: string;
  entityName: string;
  entityCategory: string;
  entityId: string;
  eventCategory: string;
  title: string;
  message: string;
  timestamp: string;
  icon: string;
}
