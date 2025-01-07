import { AxiosError } from "axios";
import { productItem } from "../types/types";


const isError = (response: productItem | AxiosError): response is AxiosError => {
    return (response as AxiosError).message !== undefined;
  }

  export default isError