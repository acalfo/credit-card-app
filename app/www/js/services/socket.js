angular.module('app')

.factory('SocketService',function(){
    //Create socket and connect to http://chat.socket.io
    //  var myIoSocket = io.connect('http://localhost:9000');

    //   mySocket = socketFactory({
    //     ioSocket: myIoSocket
    //   });

    // return mySocket;

    this.connect = function() {
      return io.connect('http://localhost:9000');
    }



    return this;
})
