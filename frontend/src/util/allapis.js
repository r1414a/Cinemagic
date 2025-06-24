
const allapis = async(endpoint,apiMethod,isgoogleAuth,apiBody,errorMsg,responseSuccessCallback,responseErrorCallback,finallyCallback) => {
    try{

        let response,options;
        if(apiMethod === 'GET'){
            isgoogleAuth ?
            options = {
                method: "GET",
                credentials: "include"
            }
            :
            options = {
                method: "GET",
            }
            response = await fetch(`${import.meta.env.VITE_DEV_BACKEND_URL}${endpoint}`,options);
        }else{

            isgoogleAuth
            ?
            options = {
                method: apiMethod,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(apiBody),
                credentials: "include"
            }

            :
            options = {
                method: apiMethod,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(apiBody)
            }

            response = await fetch(`${import.meta.env.VITE_DEV_BACKEND_URL}${endpoint}`,options);
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