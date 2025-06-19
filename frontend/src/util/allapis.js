
const allapis = async(endpoint,apiMethod,apiBody,errorMsg,responseSuccessCallback,responseErrorCallback,finallyCallback) => {
    try{

        let response;
        if(apiMethod === 'GET'){
            response = await fetch(`${import.meta.env.VITE_DEV_BACKEND_URL}${endpoint}`);
        }else{
            response = await fetch(`${import.meta.env.VITE_DEV_BACKEND_URL}${endpoint}`,{
                method: apiMethod,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(apiBody)
            });
        }

        const result = await response.json();

        if(response.ok){
            if(responseSuccessCallback) responseSuccessCallback(result)
        }else{
            if(responseErrorCallback) responseErrorCallback(result);
        }

        return result;
        
    }catch(err){
        console.log(err);
        throw new Error(errorMsg);
    }finally{
        if(finallyCallback) finallyCallback();
    }
}

export default allapis;