export default function LoadingButton({isLoading, text}){
    return(
        <>
            {
                  isLoading 
                  ?
                  
                    [...Array(5)].map((dot,index) => (
                      <div key={index}
                      style={{ animationDelay: `${index * 0.5}s` }}
                      className='h-2.5 w-2.5 rounded-full bg-blue animate-bounce'></div>
                    ))
                    
                  : 
                  text
                  }
        </>
    )
}