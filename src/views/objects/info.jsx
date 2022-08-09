
import inicio from '../../images/inicio.webp';
import nophoto from '../../images/no-photo.webp';
import aguasysuelos from '../../images/aguas y suelos.webp';
import edificio9 from '../../images/edificio9.webp';
import edificio8 from '../../images/edificio8.webp';
import evaEspe from '../../images/evaluacion especializada.webp';
import biotec from '../../images/biotecnologia.webp';
import plantas from '../../images/plantas piloto.webp';
import cemim from '../../images/cemim.webp';

import caracterizacion from '../../images/caracterizacion.webp'
import resistencia from '../../images/resistencia.webp'
import corrosion from '../../images/corrosion.webp'
import altas from '../../images/altas.webp'
import recubrimientos from '../../images/recubrimiento.webp'


export const infoViewLup = [
  {
    _id: 1,
    caption: 'CARACTERIZACIÓN AVANZADA DE SISTEMAS GEOLÓGICOS',
    image: nophoto,
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
    link: '/casg',
  },
  {
    _id: 2,
    caption:
      'LABORATORIO DE TECNOLOGÍAS PARA OPTIMIZACIÓN DE PERFORACIÓN Y COMPLETAMIENTO',
    image: nophoto,
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
    link: '/topc',
  },
  {
    _id: 3,
    caption:
      'LABORATORIO DE TECNOLOGÍAS AVANZADAS PARA CARACTERIZACIÓN DE HIDROCARBUROS & COMPUESTOS ORGÁNICOS',
    image: nophoto,
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
    link: '/tahc&co',
  },
  {
    _id: 4,
    caption: 'LABORATORIO DE OPTIMIZACIÓN DE PRODUCCIÓN Y RECOBRO MEJORADO',
    image: nophoto,
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
    link: '/op&rm',
  },
]

export const infoViewLmd = [
  {
    _id: 1,
    caption: 'LABORATORIO AGUAS Y SUELOS',
    image: aguasysuelos,
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
    link: '/las',
  },
  {
    _id: 2,
    caption:
      'LABORATORIO FENOMENOS INTERFACIALES Y EVALUACIÓN DE HIDROCARBUROS',
    image: edificio9,
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
    link: '/aut/fieh',
  },
  {
    _id: 3,
    caption:
      'LABORATORIO EVALUACIÓN ESPECIALZIADA DE HIDROCARBUROS, CATALIZADORES Y COMBUSTIBLES',
    image: evaEspe,
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
    link: '/ehcc',
  },
  {
    _id: 4,
    caption: 'LABORATORIO BIOTECNOLOGÍA',
    image: biotec,
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
    link: '/bio',
  },
  {
    _id: 5,
    caption: 'LABORATORIO INGENIERIA E INTEGRIDAD DE MATERIALES',
    image: edificio8,
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
    link: '/aut/lim',
  },
  {
    _id: 6,
    caption: 'PLANTAS PILOTO',
    image: plantas,
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
    link: '/pp',
  },
  {
    _id: 7,
    caption: 'SISTEMAS DE INFORMACIÓN DE LABORATORIO Y CEMIM',
    image: cemim,
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
    link: '/cemim',
  },
]

export const infoViewLabLim = [
  {
    _id: 1,
    caption: 'Caracterización de materiales',
    image: caracterizacion,
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
    link: '/aut/lim',
    area: 'cam',
  },
  {
    _id: 2,
    caption: 'Resistencia de materiales',
    image: resistencia,
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
    link: '/aut/lim',
    area: 'resistencia',
  },
  {
    _id: 3,
    caption: 'Corrosión',
    image: corrosion,
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
    link: '/aut/lim',
    area: 'corrosion',
  },
  {
    _id: 4,
    caption: 'Corrosión a alta temperatura',
    image: altas,
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
    link: '/aut/lim',
    area: 'cat',
  },
  {
    _id: 5,
    caption: 'Recubrimientos',
    image: recubrimientos,
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
    link: '/aut/lim',
    area: 'recubrimientos',
  },
]

export const infoViewLabFieh = [
  {
    _id: 1,
    caption: 'Fenómenos interfaciales',
    image: inicio,
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
    link: '/aut/fieh',
    area: 'fir',
  },
  {
    _id: 2,
    caption: 'Destilación de crudos',
    image: inicio,
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
    link: '/aut/fieh',
    area: 'crudos',
  },
]

export const infoViewHome = [
  {
    _id: 1,
    caption: 'Departamento de Laboratorios Upstream',
    image: inicio,
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
    link: '/lup',
  },
  {
    _id: 2,
    caption: 'Departamento de Laboratorios Midstream / Downstream',
    image: inicio,
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
    link: '/session',
  },
]
