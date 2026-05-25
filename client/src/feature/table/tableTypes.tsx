export interface Position {
  x: number;
  y: number;
}

export interface Table {
  id: number;
  name: string;
  type: string;
  category: string;
  color: string;
  status: number;
  position: Position;
  isLocked: boolean;
}

export interface CreateTableRequestDto {
  name: string;
  type: string;
  category: string;
  color: string;
  status: number;
  position: Position;
  isLocked: boolean;
}

export interface ModifyTableDetailsRequestDto {
  name: string;
  type: string;
  category: string;
  color: string;
  status: 10;
  isLocked: boolean;
}

export interface Timeslot {
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}
