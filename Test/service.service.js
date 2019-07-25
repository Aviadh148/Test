module.service("serviceService", function($timeout,dataService) {
    
    let iset = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    let forbidden = []
    this.xSet = ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X']
    var chosen1= 0, chosen2= 0
    for(let i = 0 ; i < iset.length/2; i++){
        let x = Math.floor(Math.random() * 10) + 1
        if(forbidden.includes(x)){
            i--
        }
        else{
            iset[i] = x
            iset[iset.length-i-1] = x
            forbidden.push(x)
        }
    }
    let i, j, y
    for (i = iset.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1))
        x = iset[i]
        iset[i] = iset[j]
        iset[j] = x
    }
      console.log(iset)
      this.mySet= iset

      var remainder = 0
      this.getNumber= function(n){
          if(chosen2 != 0){
              alert("press Reset")
          }
          else{
            if(this.xSet[n] == 'X'){
                if(chosen1 == 0){
                    chosen1 = this.mySet[n]
                    remainder = n
                    this.xSet[n] = this.mySet[n]
                }
                else{
                    chosen2= this.mySet[n]
                    dataService.guesses++
                    this.xSet[n] = this.mySet[n]
                    if(chosen1 == chosen2){
                        dataService.correct++
                        console.log("Nice!")
                        this.reset()
                    }
                    else{
                        console.log("Try again!")
                        $timeout(() => {
                            this.xSet[n]= 'X'
                            this.xSet[remainder]= 'X'
                            this.reset()
                        },1000)
                    }
                }
              }
          }          
    }
    this.reset = function(){
        if(chosen2 != 0){
            chosen1 = 0
            chosen2 = 0
        }
        else{
            if(chosen1 != 0){
            chosen1 = 0
            this.xSet[remainder]= 'X'
        }
    }
    }
})