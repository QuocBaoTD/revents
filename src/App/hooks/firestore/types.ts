import { OrderByDirection, WhereFilterOp } from "firebase/firestore";

export type CollectionOptions = {
  queries?: QueryOptions[];
  sort?: SortOptions;
  limit?: number; //update
  pagination?: boolean; //update
  reset?: boolean; // update
  get?: boolean; //update
};

export type QueryOptions = {
  attribute: string;
  operator: WhereFilterOp;
  value: string | number | boolean | Date | any[];
};

type SortOptions = {
  attribute: string;
  order: OrderByDirection;
};
