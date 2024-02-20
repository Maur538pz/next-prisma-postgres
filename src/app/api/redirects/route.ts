import { NextResponse } from "next/server";
import { prisma } from '@/libs/prisma'
import { transporter } from '@/libs/nodemailer'


const admins = ['jhualpal@unsa.edu.pe']

interface DataSend {
  name: string
  lastname: string
  email: string
  phoneNumber: string
  message: string
}
async function sendInfoAdmins (data: DataSend) {
  try {
    const res= await transporter.sendMail({
      from: `Nose we 👻<${process.env.AUTH_USER_GMAIL}>`,
      to:`${admins[0]}`,
      subject: 'Prueva de envio',
      text: `${JSON.stringify(data)}`
    })
    return {send: true, status:200}
  } catch (error) {
    return {send: false, status: 500}
  }
}

interface ResponseSearch {
  id?: number
  isSaved: boolean
}

async function searchEmail (email: string, phoneNumber: string) {
  const res = await prisma.infoRedirect.findFirst({
    where: {
      OR: [
        {email},
        {phoneNumber}
      ]
    }
  })
  console.log('respuesta de coincidencias en la db...')
  console.log(res)
  if (res?.createAt) return {id: res.id,isSaved: true}
  return {isSaved: false}
  
}

async function changeStateRedirect (id: number) {
  const res = await prisma.infoRedirect.update({
    where: {
      id
    },
    data: {
      redirect:true
    }
  })
  console.log('-----------------------UPDATE-REDIRECT--------------')
  console.log(res)
}

export function GET() {
  return NextResponse.json({message:'hello from api/redirects'})
}



export async function POST(request: Request) {
  const {name, lastname, email, phoneNumber, message} = await request.json()
  let idRegistered: undefined | number = 0

  // * Comprobar si el email , numero existe para no volver a agregarlos
  console.log('buscando si se escribio antes \n')
  const findInfo = await searchEmail(email,phoneNumber)
  if (findInfo.id) {
    console.log('asignando id encontrado')
    idRegistered = findInfo.id
  }
  console.log('resultado de las coincidencias',findInfo)


  // * Guardar la informacion en la base de datos
  if (!findInfo.isSaved) {
    console.log('guardando datos en bd \n')
    const info = await prisma.infoRedirect.create({
      data: {
        name,
        lastname,
        email,
        phoneNumber,
        message
      }
    })
    console.log('asignando id registrado')
    idRegistered= info.id
    
  }
  

  // * redirigir la informacion
  console.log('enviando informacion a los admins\n')
  const res = await sendInfoAdmins({
      name,
      lastname,
      email,
      phoneNumber,
      message
  })

  console.log('cambiando estado del id indicado : ',idRegistered)
  
  
  // ! Comprobar si se envio el mensaje correctamente
  if( res.send && idRegistered) {
    console.log('Cambiamos el estado del informacion .........')
    changeStateRedirect( idRegistered )
  }

  console.log('------------------end----------------')
  //console.log('respuest de la base de datos :' ,info.id)
  return NextResponse.json({message:'Info saved'})
}