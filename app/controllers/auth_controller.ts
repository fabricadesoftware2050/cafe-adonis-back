import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {

  async register({request,response}: HttpContext) {
    try {
      const data = request.only(['fullName','email','password','role'])
      const exists = await User.query().where('email',data.email).first()
      if(!exists){
        const user = await User.create(data)
        const token = await User.accessTokens.create(user)
        return response.json({
          message:'Operación exitosa',
          type:'Bearer',
          token:token.value!.release()
        })
      }else{
        return response.badRequest({
          message:'Ya existe una cuenta con este correo'
        })
      }
    } catch (error) {
      return response.badRequest({message:"Servicio no disponible"})
    }
  }

  async login({request,response}: HttpContext) {
    try {
      const data = request.only(['email','password'])
      const user = await User.verifyCredentials(data.email,data.password)
      const token = await User.accessTokens.create(user)

        return response.json({
          message:'Operación exitosa',
          type:'Bearer',
          token:token.value!.release(),
          user
        })

    } catch (error) {
      return response.unauthorized({message:"Revise sus credenciales"})
    }
  }

  async logout({auth,response}: HttpContext) {
    try {
      const userId = await auth.user?.id
      const user = await User.findOrFail(userId)
      await User.accessTokens.delete(user,user.id)

        return response.json({
          message:'Operación exitosa',
        })

    } catch (error) {
      return response.unauthorized({message:"Revise sus credenciales"})
    }
  }

  async me({auth,response}: HttpContext) {
    try {
      await auth.authenticate()
      const user = await auth.getUserOrFail()
        return response.json({
          message:'Operación exitosa',
          data:user
        })

    } catch (error) {
      return response.unauthorized({message:"Revise sus credenciales"})
    }
  }

}
