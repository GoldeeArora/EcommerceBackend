import { Category } from "../entities/Category";

export const getAllCategories = async(_req: any,res : any)=>{

    const getAll = await Category.find().catch((err)=>{
 console.log(err)
    })
    if(getAll)
    {

        res.status(200).json(getAll);
        return;
    }
    else{
        res.status(400).json({
            "error" : "Can't fetch the api"
        })
    }
}

export const addCategories = async (req: any,res: any)=>{
    const { name } = req.body;
   
    if(!name)
    {
        res.status(400).json({
            error: "Please Enter the name of the category"
          });
          return;
    }
    const alreadyExistCategory = await Category.findBy({name});
    console.log(alreadyExistCategory.length)
    if(alreadyExistCategory.length!=0)
    {
        res.status(400).json({
            error: "Category Already Exists"
          });
          return;
    }
    const category = await Category.create({name}).save();
    if(category)
    res.status(200).json(category)
else{
    res.status(400).json({
        "error": "Couldn't able to create the category"
    })
    return;
}
    
return
}