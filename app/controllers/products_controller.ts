import Product from '#models/product'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProductsController {
  /**
   * Display a list of resource
   */
  async index({ response, request }: HttpContext) {
    const page = request.input('page');
    const search = request.input('search');
    let all = []
    if(page){
      const limit = request.input('limit');
      all = await Product.query().paginate(page,limit)
    }else if(search){
      all = await Product.query().whereLike('name','%'+search+'%').paginate(page)
    }else{
      all = await Product.all()
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
    const exists = await Product.query().where('reference',data.reference).first()
    if(!exists){
      const model = await Product.create(data)
      return response.json({
        message:"Operación exitosa",
        data:model
      })
    }else{
      return response.badRequest({
        message:"Ya existe un item con esa referencia "+data.reference
      })
    }
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    const data = await Product.findOrFail(params.id)
    return response.json({
      message:"Operación exitosa",
      data
    })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request,response }: HttpContext) {
    let product = await Product.findOrFail(params.id)
    if(product){
      const data = request.all()
      product.name = data.name
      product.description = data.description
      product.image_url = data.image_url
      product.category = data.category
      product.price = data.price
      product.reference = data.reference
      product.tax = data.tax
      product.stock = data.stock
      product.save()
       return response.json({
        message:"Operación exitosa",
        product
      })
    }else{
      return response.badRequest({
        message:"No se logró la operación",
        product
      })
    }

  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
     let product = await Product.findOrFail(params.id)
    if(product){
      product.delete()
      return response.json({
        message:"Operación exitosa"
      })
    }else{
       return response.badRequest({
        message:"No se logró la operación",
        product
      })
    }
  }
}
