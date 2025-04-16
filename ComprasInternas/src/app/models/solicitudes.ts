export interface Solicitud {
    idSolicitud: number;
    idUsuario: number;
    descripcion?: string;
    monto: number;
    fechaEsperada: string;
    estadoSolicitud?: string;
    estado: number;
    idSupervisor: number;
    comentario?: string;
    fechaRegistro: string;
    fechaModificacion: string;
  }
  