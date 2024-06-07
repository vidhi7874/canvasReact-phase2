import { API_PATH } from '../../configuration/API';
import { axiosInstance } from '../apis';

export async function getSidebarServiceData() {
  const res = await axiosInstance.get(API_PATH.GENERATE_HTML);
  return res;
}
