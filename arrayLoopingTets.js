let array1 = [
   {
      id:'okdwokx'
   },
   {
      id:'pldpls'
   },
   {
      id:'ldpdwl'
   }
]
array1.forEach(
   (element ,index)=>{
      if(element.id ==='okdwokx'){
         let foundIndex = index
         array1.splice(foundIndex,1)
      }
   }
)
console.log(array1)