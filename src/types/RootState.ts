// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

import { IFormState } from '../app/pages/slice/types';

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  formState: IFormState;
}
