module.exports = {

    getHelpWords(){
        const data = [
            "张","李","王","韩","董","崔","陈","古","刘","疏",
            "周","彭","一","宣","彤","三","四","五","八","十"
        ]
        
        //得到一个拥有10个助记词的数组
        const arrWords = [] 
        let tmpRandom = [] 
        for(let i=1;i<=10;i++) {
            //生成随机数(0-20)
            let x = parseInt( Math.random() * 20 ) 
            
            if(tmpRandom.length===0){
                //这是第一次生成的随机数
                arrWords.push(x)
                tmpRandom.push(x)  //临时空间不管任何时候都要加入随机数
            }else{
                
                let index = tmpRandom.findIndex( (item)=>{
                    return x===item
                } )
        
                if(index>-1) {
                    //表示当前随机数已经生成过来
                    i--
                }else{
                    arrWords.push(x) //把随机数塞进目标空间中  
                }
        
                tmpRandom.push(x)  //临时空间不管任何时候都要加入随机数
            }
        }
        
        //生成助记词
        const randomWords = [] 
        
        for(let num of arrWords){
            randomWords.push( data[ num ] ) 
        }


        return randomWords
    }

}