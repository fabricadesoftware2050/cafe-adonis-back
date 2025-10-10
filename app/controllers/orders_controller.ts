import Order from '#models/order';
import type { HttpContext } from '@adonisjs/core/http'

export default class OrdersController {
  /**
     * Display a list of resource
     */
    async index({ response, request }: HttpContext) {
      const page = request.input('page');
      const search = request.input('search');
      let all = []
      if(page){
        const limit = request.input('limit');
        all = await Order.query().orderBy('createdAt','desc').paginate(page,limit)
      }else if(search){
            all = await Order.query().whereLike('id',search).orderBy('createdAt','desc').paginate(page)
          }else{
        all = await Order.query().orderBy('createdAt','desc')
      }
      return response.json({
        message:"Operación exitosa",
        data:all
      })

    }

    /**
     * Handle form submission for the create action
     */
    async store({ request,response }: HttpContext) {
      const data = request.all()

        const model = await Order.create(data)
        return response.json({
          message:"Operación exitosa",
          data:model
        })

    }

    /**
     * Show individual record
     */
    async show({ params, response }: HttpContext) {
      const data = await Order.findOrFail(params.id)
      return response.json({
        message:"Operación exitosa",
        data
      })
    }

    /**
     * Handle form submission for the edit action
     */
    async update({ params, request,response }: HttpContext) {
      let model = await Order.findOrFail(params.id)
      if(model){
        const data = request.all()
        model.user = data.user
        model.cliente = data.cliente
        model.mesa = data.mesa
        model.details = data.details
        model.total = data.total
        model.discount = data.discount
        model.save()
         return response.json({
          message:"Operación exitosa",
          data:model
        })
      }else{
        return response.badRequest({
          message:"No se logró la operación",
          model
        })
      }

    }

    /**
     * Delete record
     */
    async destroy({ params, response }: HttpContext) {
       let model = await Order.findOrFail(params.id)
      if(model){
        model.delete()
        return response.json({
          message:"Operación exitosa"
        })
      }else{
         return response.badRequest({
          message:"No se logró la operación",
          model
        })
      }
    }
}
