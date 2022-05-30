//------------------------------------------------ problems 1-5 --------------------------------------------------------

// one method
function identity(x){
    return x;
}

console.log(identity(3));

//second method

var identity1 = function identity1(x) { 
    return x;
 }

 console.log(identity1(4));


 // add and mul functions

 function add(a,b){
     return a+b;
 }

 function mul(a,b) { 
     return a*b;
  }

  console.log('addition:'+add(+2,3));
  console.log('multi:'+mul(2,3));


  // function that take argument and returns the function that returns the argument

 function identityf(x) { 
     return function(){
         return x;
     };
  }
  var idf = identityf(3);
  console.log(idf());

  //function for add from two invocations

  function addf(a){
      return function(b){
          return a+b;
      };
  }

  console.log(addf(10)(20));

  
  //----
  function applyf(add){
      return function(x){
          return function(y){
              return add(x,y);
          }
      }
  }

  var ad = applyf(add);
  console.log(ad(15)(5));
  

  //----------------------------------------------------problems 6-9---------------------------------------------------------

  //1)

  function curry(fun, x){
      return function(y){
        
            return fun(x,y);
        
      }
  }

 // ad = curry(add,3);
  //console.log(ad(4));

  console.log(curry(add,3)(7));
  console.log(curry(mul,3)(7));

  


  //2) without writing function 3 ways to create a function --- /use defined functions

  inc = addf(1);
  console.log(inc(5));

  inc = applyf(add)(1)
  console.log(inc(5));

  inc = curry(add,1);
  console.log(inc(5));

  //3) methodize a binary function

function methodize(add){
    return function(y){
        return add(this,y);
    };
}

Number.prototype.add = methodize(add);
console.log((4).add(6));

//4) demethodize a function to binary

function demethod(add){
    return function(x,y){
        return add.call(x,y);
    };
}
 
console.log(demethod(Number.prototype.add)(4,5));


//----------------------------------- problems 10-12 ------------------------------------------------------------

//1)
function twice(fun){
    return function(x){
        return fun(x,x);
    };
}

var double = twice(add);
console.log(double(11));

var square = twice(mul);
console.log(square(11));

// 2)

function composeu(fun1,fun2){
    return function(x){
       /* x = fun1(x,x);
        return fun2(x,x); */ //working

        return fun2(fun1(x));
    };
}
console.log(composeu(double,square)(3));

//3)

function composeb(fun1, fun2){
    return function(x,y,z){
        return fun2(fun1(x,y),z);
    }
}

console.log(composeb(add,mul)(2,3,5));

//----------------------------------------------------- problems 13-15 -------------------------------------------------------

function once(fun){
    return function(){
        var f= fun;
        fun = null;
        return f.apply(this,arguments);
    };
}

    add_once = once(add);
    console.log(add_once(7,4));

//2)

function counterf(x){
    return{
    inc: function (){
        x+=1;
        return x;
    },
    dec: function (){
        x-=1;
        return x;
    }

};

}

counter = counterf(10);
console.log(counter.inc());
console.log(counter.dec());

//15)

function revokable(nice){
   /* return{
        invoke: function (x){
            return x;
        },
        revoke: function (){
            this.invoke = null;
            
        }
    }; */ //working

    return{
        invoke: function (){
            return nice.apply(this,arguments);

        },
        revoke: function (){
            nice = null;
        }
    };
}

temp = revokable(alert);
console.log(temp.invoke(5));

