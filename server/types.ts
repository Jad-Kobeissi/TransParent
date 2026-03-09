export interface TAdmin {
  id: number;
  username: string;
  password: string;
}

export interface TChild {
  id: number;
  name: string;
  grade: string;
  parentId: number;
  Parent: TParent;
  Incident: TIncident[];
}

export interface TIncident {
  id: number;
  title: string;
  description: string;
  childId: number;
  occurredAt: Date;
  severity: Severity;
  type: Type;
  child: TChild;
}

export interface TParent {
  id: number;
  name: string;
  email: string;
  child: TChild[];
}
export interface TAdmin {
  id: number;
  identifier: string;
}

enum Type {
  positive,
  negative,
  informational,
}
enum Severity {
  low,
  medium,
  high,
}
export interface TJWT {
  id: number;
  children: TChild[];
  parent: TParent | null;
  isAdmin: boolean;
}
