export type FormType = 'text' | 'email' | 'number' | 'multiline' | 'select';

export interface IFormFields {
  fieldName: string;
  type: FormType;
  value: string;
  options: string[];
}

export interface IFormState {
  fields: IFormFields[];
  response: string;
  loading: boolean;
}
