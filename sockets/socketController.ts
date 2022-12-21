

export const socketController = (socket:any) => {





    socket.on('mensaje', (payload:object)=>{
        
        socket.broadcast.emit('vuelta', payload )
        socket.emit('vuelta',payload )

    })

}

