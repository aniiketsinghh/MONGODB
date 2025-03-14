// using next as a middleware ! your kackend connect with your frontend thats why you are adding that next , its like a checker or if else condition if its true then okk else won't connect

const asyncHandler=(requestHandler)=>{
    (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next))
        .catch((error)=>next(error))
    }
}