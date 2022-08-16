class slhttp {
  get = (url) => {
    return new Promise(function(resolve,reject){
      fetch(url)
      .then(res=>{
        if(res.status>=200 && res.status<300){
        return res.json()
      }
      throw new Error(res.status + res.statusText);
    })
      .then(data=>resolve(data))
      .catch((err)=>reject(err))
    })
  }
    }