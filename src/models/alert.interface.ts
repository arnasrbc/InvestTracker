export interface IAlert {
    id?: string;
    entityName: string;
    entityCategory: string;
    entityId: string;
    eventCategory: string;
    message: string;
    timestamp: string;
    firstLoad: boolean;
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
  firstLoad: boolean;
}
