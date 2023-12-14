import React from 'react'

function StuComprehension({index,element,data,setData}) {

  function mcq(i,ans){
      let ques={...data}
      ques.questions[index].questions[i].ans=ans
      setData(ques)
  }


  return (
    <div>
        
      <div>
        <h3 className='ml-3 font-semibold '>Fill in the blanks.</h3>
        <p className='ml-3 first-letter:uppercase'>{element.passage}</p>
      </div>
      <div className='mt-5 ml-3'>
          {element.questions.map((que,i)=>
            <div key={i} className='p-3 my-3 rounded-md  ring-1 ring-gray-300'>
                <h3 className=' font-bold'>Q. {index+1}.{i+1}</h3>
                <p className=' my-4'> {que.question}</p>
                 {
                  que.option.map((el,j)=><div key={j} className='flex gap-3'>
                    <input value={que.ans} onChange={()=>mcq(i,el)} type="radio" name={`${i}`} />
                    <label >{el}</label>
                  </div>)
                 }
            </div>
          )}
      </div>
    </div>
  )
}

export default StuComprehension
