(function (window) {
  const PENDING = 'pending'
  const RESOLVED = 'resolved'
  const REJECTED = 'rejected'
  function Promise(excutor) {
    const self = this
    self.status = PENDING
    self.data = undefined
    self.callbacks = []

    function resolve(value) {
      self.status = RESOLVED
      self.data =value

      if(self.callbacks.length>0){
        setTimeout(()=>{
          self.callbacks.forEach(cbsobj => {
            cbsobj.onResolved(value) 
          })
        })
      }
    }

    function reject(reason) {
      self.status = REJECTED
      self.data = reason

      if(self.callbacks.length>0){
        setTimeout(()=>{
          self.callbacks.forEach(cbsobj => {
            cbsobj.onRejected(reason) 
          })
        })
      }
    }

    excutor(resolve,reject)
  }
   

  Promise.prototype.then = function (onResolved,onRejected) {
    this.callbacks.push({
      onResolved,
      onRejected
    })
  }

  window.Promise =Promise
})(window)