type Tuple<T, N extends number> = N extends N ? number extends N ? T[] : _TupleOf<T, N, []> : never;
type _TupleOf<T, N extends number, R extends unknown[]> = R['length'] extends N ? R : _TupleOf<T, N, [T, ...R]>;

export type MeterValues = Tuple<number, 10>;

export type MeterData = {
  id?: string;
  year: number;
  month: number;
  meters: MeterValues[];
};
