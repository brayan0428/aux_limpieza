export interface Servicio {
  id_usuario?: number;
  id_empleado: number;
  servicio: string;
  nombreServicio: string;
  cantidad_dias: number;
  fecha_inicio: string;
  horas: number;
  hora_inicio: string;
  hora_fin: string;
  valor: number;
  estado: number;
  direccion?: string;
  ciudad?: string;
  numero_tarjeta?: string;
  nombre_titular?: string;
  cvv?: number;
  expiracion?: string;
  tipo_tarjeta?: string;
  formapago?: string;
  valor_normal?: number;
  valor_especial?: number;
}
