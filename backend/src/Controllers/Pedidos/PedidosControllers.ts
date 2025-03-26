import { Request, Response } from 'express'
import { PedidosServices } from '../../Services/Pedidos/PedidosServices'


class PedidosControllers {
    async criarPedidos(req: Request, res: Response) {
        const { id_cliente, id_produto, valor } = req.body
        const enviaDadosServices = new PedidosServices()
        const resposta = await enviaDadosServices.criarPedidos({
            id_cliente,
            id_produto,
            valor
        })
        return res.json(resposta)
    }

    async adcionarItensPedido(req: Request, res: Response) {
        const { id_produto, id_carrinho, valor  } = req.body
        console.log(id_produto, id_carrinho, valor)
        const enviaDadosServices = new PedidosServices()
        const resposta = await enviaDadosServices.adcionarItensPedido({
            id_carrinho,
            id_produto,
            valor
        })
        return res.json(resposta)
    }

    async buscarPedidosCliente(req: Request, res: Response) {
        const id = req.usuarioId
        const enviarDadosServices = new PedidosServices()
        const resposta = await enviarDadosServices.buscarPedidosCliente(id)
        return res.json(resposta)
    }

    async verificaPedidos(req: Request, res: Response) {
        const id = req.usuarioId
        const enviarDadosServices = new PedidosServices()
        const resposta = await enviarDadosServices.verificaPedido(id)
        return res.json(resposta)
    }
}

export { PedidosControllers }