

export const responseValidate = (response: any) => {
    if(response.status == 200){
        return response.data;
    }else{
        return new Error(response)
    }
}
