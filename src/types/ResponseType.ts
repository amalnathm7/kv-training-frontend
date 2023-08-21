export type ResponseType<type> = {
  data: type;
  errors: [];
  message: string;
  meta: {
    offset: number;
    length: number;
    took: number;
    total: number;
  };
};
