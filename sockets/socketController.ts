

export const socketController = (socket:any) => {


    let clientes:any = []


    socket.on('mensaje', (payload:object)=>{
        
        socket.broadcast.emit('vuelta', payload )
        socket.emit('vuelta',payload )

    })

}

